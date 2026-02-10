---
sidebar_position: 2
title: ColdStarter
description: Wake-on-demand system for cost savings
---

# ColdStarter

ColdStarter automatically wakes your server when players connect, then puts it to sleep when idle. You only pay for active time.

## How It Works

1. **Idle**: No players → server sleeps (minimal cost)
2. **Connect**: Player tries to join → ColdStarter intercepts
3. **Wake**: Server starts in background (10-30 seconds)
4. **Play**: Player connects to running server

Your server still shows as "online" in server browsers while sleeping.

## Cost Savings

Typical hobby server:
- **Without ColdStarter**: 720 hours/month (24/7)
- **With ColdStarter**: 100 hours/month (actual playtime)

**Result**: ~85% cost reduction

## Configuration

Configured per-scroll via `scroll.yaml`:

```yaml
ports:
  - name: game
    port: 25565
    protocol: tcp
    sleep_handler: packet_handler/minecraft.lua
    start_delay: 10
    check_activity: true
```

### Port Options

- `sleep_handler` - Path to Lua packet handler (required for ColdStarter)
- `start_delay` - Seconds to wait before port is ready
- `check_activity` - Enable idle detection
- `finish_after_command` - Wait for command to finish before opening port

## Packet Handlers

Lua handlers respond to game protocols while server is asleep.

**Example:** [minecraft.lua](https://github.com/highcard-dev/scrolls/blob/main/scrolls/minecraft/papermc/1.21.7/packet_handler/minecraft.lua)

### Lua API

```lua
-- Send data to client
sendData(string)

-- Trigger server wake
finish()

-- Get snapshot/queue status
get_queue()
get_snapshot_percentage()
get_finish_sec()
```

## Supported Games

All 95 published scrolls support ColdStarter:
- Minecraft (all variants)
- Rust (Vanilla, Oxide)
- Hytale
- 10 LGSM games (Palworld, ARK, CS2, etc.)

## Custom Handlers

Create `packet_handler/game.lua` in your scroll:

```lua
function handle(ctx, data)
    -- Parse packet
    if isStatusRequest(data) then
        sendData("Server starting...")
    end
    
    -- Wake on connect
    if isConnectionAttempt(data) then
        finish()
    end
end
```
