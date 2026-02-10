---
sidebar_position: 4
title: ColdStarter System
description: Understand how Druid's ColdStarter system enables wake-on-demand automation and 70-90% cost savings
---

# ColdStarter System

ColdStarter is Druid's intelligent wake-on-demand system that automatically starts your game server when players connect, while keeping costs near zero when idle. It's the core technology that makes Druid cost-effective for hobby servers.

## What is ColdStarter?

ColdStarter acts as a lightweight listener proxy that intercepts incoming connections to your game server. When a player tries to connect:

1. **Sleeping**: Server is powered down, consuming minimal resources (~0 cost)
2. **Wake signal**: Player connects, ColdStarter intercepts the connection
3. **Starting**: ColdStarter wakes the server in the background
4. **Ready**: Player is connected to the now-running server

The magic? **Your server still appears "online" in server browsers even when sleeping.**

## Key Benefits

### 💰 **70-90% Cost Savings**

Pay only for active playtime, not idle time. A typical hobby server might run:
- **Traditional hosting**: 24/7 = 720 hours/month
- **With ColdStarter**: 50-150 hours/month actual playtime

**Example cost breakdown:**
```
Traditional: $10/month × 720 hours = $10
Druid: $0.014/hour × 100 hours = $1.40/month

Savings: 86%
```

### ⚡ **Seamless User Experience**

- Server shows as "online" in Minecraft/Rust/etc. server browsers
- Players connect normally (10-30 second wake time)
- Status messages show "Starting..." or "Waking up..." 
- No configuration needed by players

### 🌍 **Always Available**

Your server is accessible 24/7, but only costs money when actually in use. Perfect for:
- Hobby servers with irregular play schedules
- Friend groups in different time zones
- Testing and development environments
- Event-based servers

## How It Works

### Architecture

```
Player → ColdStarter Listener → [Wake] → Game Server
            ↓
    Lua Packet Handler
    (Server status response)
```

### 1. Listener Proxy

When your server goes idle (no players for X minutes):
- Main game server shuts down
- Lightweight ColdStarter listener starts on the same port
- Memory footprint: ~10-50MB (vs 2-8GB for game server)

### 2. Packet Handler

ColdStarter uses **Lua packet handlers** to understand game-specific connection protocols:

```lua
-- Example: Minecraft status packet handler
function handle(ctx, data)
    if isStatusRequest(data) then
        -- Send fake "server online" response
        sendData(generateStatusResponse({
            version = "§2▶ Starting...",
            players = { online = 0, max = 20 },
            description = "Waking up... 30s"
        }))
    elseif isLoginAttempt(data) then
        -- Trigger server wake
        finish()
    end
end
```

Each game has a custom packet handler:
- **Minecraft**: Responds to status + login packets
- **Rust**: Responds to query protocol
- **Source games**: Responds to A2S_INFO queries
- **Hytale**: Protocol TBD (ready for launch)

### 3. Wake Process

When a player attempts to connect:

1. **Intercept**: ColdStarter receives connection
2. **Respond**: Send "Starting..." status to player
3. **Wake**: Restore server container from snapshot
4. **Handoff**: Transfer connection to real server
5. **Cleanup**: ColdStarter listener shuts down

Typical wake time: **10-30 seconds** (varies by game/world size)

### 4. Server Browser Integration

The clever part: **Server browsers never know the server is asleep.**

- **Minecraft**: Shows in server list with "🕐 Waiting..." status
- **Rust**: Appears in Rust+ app and server browser
- **Steam games**: Shows in Steam server browser
- **Direct connect**: Works normally with IP:PORT

## Supported Games

ColdStarter has optimized handlers for:

| Game | Status | Protocol Handler |
|------|--------|------------------|
| Minecraft (all variants) | ✅ Stable | `minecraft.lua` |
| Rust | ✅ Stable | `rust.lua` |
| Hytale | ✅ Ready | `hytale.lua` |
| ARK: Survival | ✅ Stable | LGSM generic |
| Palworld | ✅ Stable | LGSM generic |
| Valheim | ✅ Stable | LGSM generic |
| 7 Days to Die | ✅ Stable | LGSM generic |
| Other LGSM games | ✅ Stable | Generic handler |

**Total**: 95 published scrolls with ColdStarter support

## Configuration

ColdStarter is configured automatically per-scroll. Key settings:

### Scroll Configuration

```yaml
# scroll.yaml
ports:
  - name: game
    port: 25565
    protocol: tcp
    sleep_handler: "minecraft.lua"  # Packet handler
    check_activity: true             # Monitor for idle
    
coldstarter:
  idle_timeout: 300                  # Shutdown after 5min idle
  wake_timeout: 60                   # Max wake time
  snapshot_mode: "auto"              # Enable snapshots
```

### Advanced Options

- **idle_timeout**: How long to wait before sleeping (seconds)
- **wake_timeout**: Max time allowed for wake (kills if exceeded)
- **snapshot_mode**: `auto` | `manual` | `none`
- **custom_handler**: Path to custom Lua packet handler

## Cost Optimization Tips

### 1. Enable Snapshots

Faster wake times = better player experience:
```yaml
coldstarter:
  snapshot_mode: "auto"
  snapshot_schedule: "0 4 * * *"  # Daily at 4 AM
```

### 2. Tune Idle Timeout

Balance responsiveness vs cost:
- **5 minutes**: Best for active servers (minimal downtime)
- **15 minutes**: Good default for most hobby servers
- **30 minutes**: Maximum savings for rarely-used servers

### 3. Monitor Usage

Check your actual playtime:
```bash
druid metrics
# Shows: active hours, sleep hours, cost breakdown
```

## Technical Details

### Packet Handler API

Lua handlers have access to:

```lua
-- Send data back to client
sendData(string)

-- Close connection
close(data)

-- Trigger server wake + handoff
finish()

-- Get queue status (install/restore)
get_queue()

-- Get snapshot progress
get_snapshot_mode()
get_snapshot_percentage()

-- Time since wake started
get_finish_sec()

-- Debug logging
debug_print(string)
```

### Custom Handlers

Create your own for unsupported games:

```lua
-- custom_game.lua
function handle(ctx, data)
    -- 1. Parse incoming packet
    local packet_type = parsePacket(data)
    
    -- 2. Handle status requests
    if packet_type == "STATUS" then
        sendData(buildStatusResponse({
            name = "My Server",
            players = 0,
            max_players = 20,
            status = "Waking up..."
        }))
    end
    
    -- 3. Handle connection attempts
    if packet_type == "CONNECT" then
        sendData("Please wait, server starting...")
        finish()  -- Wake the server
    end
end
```

Place in `scrolls/<game>/packet_handler/custom_game.lua`

## Performance

### Resource Usage

| State | CPU | RAM | Cost/hour |
|-------|-----|-----|-----------|
| **Active** (playing) | 100% | 2-8GB | $0.014 |
| **Sleeping** (ColdStarter) | &lt;1% | 10-50MB | ~$0 |
| **Waking** (starting up) | 50-100% | 2-8GB | $0.014 |

### Wake Times

| Game | Cold Start | With Snapshot |
|------|-----------|---------------|
| Minecraft (small world) | 30-45s | 10-15s |
| Minecraft (large world) | 60-90s | 20-30s |
| Rust | 40-60s | 15-25s |
| Palworld | 30-50s | 10-20s |
| ARK | 60-120s | 20-40s |

## Troubleshooting

### Server Won't Wake

**Symptoms**: Players connect but server stays asleep

**Solutions**:
1. Check packet handler logs: `druid logs coldstarter`
2. Verify port configuration matches game protocol
3. Test with direct connect (bypass DNS/proxy)
4. Check firewall rules allow incoming traffic

### Slow Wake Times

**Symptoms**: Takes &gt;60s to start

**Solutions**:
1. Enable snapshots for faster restore
2. Reduce world/mod size
3. Check available CPU/RAM resources
4. Consider pre-warming (disable auto-sleep during peak hours)

### "Server Offline" in Browser

**Symptoms**: Server doesn't appear when sleeping

**Solutions**:
1. Verify `sleep_handler` is set in scroll.yaml
2. Check ColdStarter process is running
3. Test packet handler directly
4. Review game-specific protocol requirements

## FAQ

**Q: Can players still see my server when it's asleep?**  
A: Yes! ColdStarter responds to status queries, so your server appears "online" with a "Starting..." message.

**Q: What happens if multiple players connect at once?**  
A: ColdStarter queues all connections and wakes the server once. All players connect when ready.

**Q: Does this work with mods/plugins?**  
A: Yes, ColdStarter is transparent to the game server. Mods/plugins work normally.

**Q: Can I disable ColdStarter?**  
A: Yes, set `coldstarter.enabled: false` in scroll.yaml or keep the server always-on.

**Q: How much does it cost when sleeping?**  
A: Nearly zero (~$0.001/hour for the listener process). The container is fully stopped.

##