---
sidebar_position: 2
title: ColdStarter
description: Wake-on-demand for cost savings
---

# ColdStarter

Automatically wakes your server when players connect, sleeps when idle. **~85% cost savings.**

## How It Works

1. Server sleeps when idle → minimal cost
2. Player connects → ColdStarter intercepts
3. Server wakes (10-30 seconds)
4. Player connects to running server

Server still shows "online" in browsers while sleeping.

## Configuration

Configured via `scroll.yaml` ports:

```yaml
ports:
  - name: game
    port: 25565
    sleep_handler: packet_handler/minecraft.lua
    start_delay: 10
    check_activity: true
```

**Full port configuration:** See [Scroll System](../scrolls/introduction.md#port-configuration)

## Packet Handlers

Lua handlers respond to game protocols while sleeping:

```lua
function handle(ctx, data)
    if isStatusRequest(data) then
        sendData("Server starting...")
    end
    if isConnectionAttempt(data) then
        finish()  -- Wake server
    end
end
```

**Example:** [minecraft.lua](https://github.com/highcard-dev/scrolls/blob/main/scrolls/minecraft/papermc/1.21.7/packet_handler/minecraft.lua)

**Lua API:** `sendData()`, `finish()`, `get_queue()`, `get_snapshot_percentage()`

**Full details:** See [Scroll System](../scrolls/introduction.md#coldstarter)
