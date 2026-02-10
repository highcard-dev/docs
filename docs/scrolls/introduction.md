---
sidebar_position: 1
title: Scroll System
description: Declarative deployment packages
---

# Scroll System

Scrolls are OCI artifacts that define how to deploy applications on Druid.

## Structure

```
scrolls/minecraft/papermc/1.21.7/
├── scroll.yaml              # Main manifest
├── start.sh                 # Scripts
├── packet_handler/
│   └── minecraft.lua        # ColdStarter handler
└── plugins/
    └── rcon.yaml            # Plugins
```

## scroll.yaml

### Minimal Example

```yaml
name: artifacts.druid.gg/my-org/my-game
desc: My Game Server
version: 1.0.0
app_version: 2024.1

ports:
  - name: game
    protocol: tcp
    port: 7777

init: "start"

commands:
  start:
    procedures:
      - mode: exec
        data: [./game-server]
```

### Complete Example

```yaml
name: artifacts.druid.gg/druid-team/scroll-minecraft-paper
desc: PaperMC Minecraft Server
version: 0.0.1
app_version: 1.21.7

ports:
  - name: main
    protocol: tcp
    port: 25565
    sleep_handler: packet_handler/minecraft.lua
    start_delay: 10
    finish_after_command: install
    check_activity: true

init: "start"

commands:
  start:
    needs: [install]
    run: restart
    dependencies: [jdk21]
    procedures:
      - mode: exec
        data: [bash, ./start.sh]
  
  stop:
    procedures:
      - mode: rcon
        data: stop
  
  install:
    run: once
    dependencies: [wget, cacert]
    procedures:
      - mode: exec
        data: [wget, -O, paper.jar, https://api.papermc.io/.../paper.jar]

plugins:
  rcon: {}
```

## Fields

### Top-Level

| Field | Required | Description |
|-------|----------|-------------|
| `name` | ✅ | OCI artifact name |
| `desc` | ✅ | Description |
| `version` | ✅ | Scroll version (semver) |
| `app_version` | ✅ | App version |
| `ports` | ✅ | Port definitions |
| `init` | ✅ | Initial command |
| `commands` | ✅ | Commands |
| `plugins` | ❌ | Plugins |

### Port Configuration

```yaml
ports:
  - name: game
    protocol: tcp              # tcp | udp
    port: 25565
    sleep_handler: handler.lua # ColdStarter handler (optional)
    start_delay: 10            # Seconds before ready (optional)
    finish_after_command: cmd  # Enable after command (optional)
    check_activity: true       # Idle detection (optional)
```

### Command

```yaml
command_name:                  # Any name you choose
  needs: [other_cmd]           # Prerequisites (optional)
  run: restart                 # once | always | restart (optional)
  dependencies: [jdk21]        # Nix packages (optional)
  procedures:
    - mode: exec
      data: [bash, script.sh]
```

**Command names are completely customizable** - no required names.

### Procedure Modes

| Mode | Data Format |
|------|-------------|
| `exec` | `string[]` - Command + args |
| `exec-tty` | `string[]` - TTY command |
| `stdin` | `string[2]` - `[process, data]` |
| `scroll-switch` | `string` - OCI artifact |
| `rcon` | `string` - RCON command (plugin) |

Plugins can add more modes.

## ColdStarter

Wake-on-demand system for cost savings. Configured via port options:

```yaml
ports:
  - name: game
    port: 25565
    sleep_handler: packet_handler/minecraft.lua  # Required
    start_delay: 10                              # Seconds to wait
    check_activity: true                         # Enable idle detection
    finish_after_command: install                # Wait for command
```

### Packet Handlers

Lua handlers respond to game protocols while server sleeps:

```lua
function handle(ctx, data)
    -- Parse incoming packet
    if isStatusRequest(data) then
        sendData("Server starting...")
    end
    
    if isConnectionAttempt(data) then
        finish()  -- Wake server
    end
end
```

**Lua API:**
- `sendData(string)` - Send data to client
- `finish()` - Trigger server wake
- `get_queue()` - Get queue status
- `get_snapshot_percentage()` - Snapshot progress
- `get_finish_sec()` - Time since wake started

**Examples:** [github.com/highcard-dev/scrolls](https://github.com/highcard-dev/scrolls)

## Nix Dependencies

Druid uses Nix for isolated, reproducible environments. Any package from [nixpkgs](https://search.nixos.org/packages) can be used:

```yaml
dependencies: [jdk21, wget, git]
```

Multiple versions coexist without conflict:

```yaml
# Minecraft 1.12
dependencies: [jdk8]

# Minecraft 1.21
dependencies: [jdk21]
```

## Creating Scrolls

### 1. Create scroll.yaml

```yaml
name: artifacts.druid.gg/my-org/my-game
desc: My Game
version: 1.0.0
app_version: 1.0.0

ports:
  - name: game
    protocol: tcp
    port: 7777

init: "start"

commands:
  start:
    dependencies: [wget]
    procedures:
      - mode: exec
        data: [./game-server]
```

### 2. Test

```bash
druid scroll validate
druid serve
druid run start
```

## Learn More

- [Scroll Repository](https://github.com/highcard-dev/scrolls)
- [Druid CLI](https://github.com/highcard-dev/druid-cli)
- [Nix Packages](https://search.nixos.org/packages)
