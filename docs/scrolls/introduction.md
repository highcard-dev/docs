---
sidebar_position: 1
title: Scroll System
description: Declarative deployment packages for Druid
---

# Scroll System

Scrolls are OCI artifacts that define how to deploy and manage applications on Druid. Like Kubernetes Helm charts, but for game servers.

## What's in a Scroll?

```
scrolls/minecraft/papermc/1.21.7/
├── scroll.yaml              # Main manifest
├── start.sh                 # Start script
├── packet_handler/
│   └── minecraft.lua        # ColdStarter handler
└── plugins/
    └── rcon.yaml            # RCON plugin
```

## Command Names

Command names in `scroll.yaml` are **completely customizable**. No required names - use whatever makes sense:

```yaml
init: "launch"       # Not "start"

commands:
  launch:            # Your choice
    procedures:
      - mode: exec
        data: [./server]
  
  halt:              # Not "stop"
    procedures:
      - mode: stdin
        data: [launch, stop]
```

Names like `start`, `stop`, `install` are just conventions.

## scroll.yaml Format

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
        data: [./game-server, --port=7777]
```

### Complete Example

```yaml
name: artifacts.druid.gg/druid-team/scroll-minecraft-paper
desc: PaperMC High-Performance Minecraft Server
version: 0.0.1
app_version: 1.21.7

ports:
  - name: main
    protocol: tcp
    port: 25565
    sleep_handler: packet_handler/minecraft.lua
    start_delay: 10
    finish_after_command: install
  
  - name: rcon
    protocol: tcp
    port: 25575

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
        data:
          - wget
          - -O
          - paper.jar
          - https://api.papermc.io/v2/projects/paper/versions/1.21.7/builds/latest/downloads/paper-1.21.7.jar
      
      - mode: exec
        data: [bash, -c, 'echo eula=true > eula.txt']

plugins:
  rcon: {}
```

## Field Reference

### Top-Level

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | ✅ | OCI artifact name |
| `desc` | string | ✅ | Description |
| `version` | string | ✅ | Scroll version (semver) |
| `app_version` | string | ✅ | Application version |
| `ports` | array | ✅ | Port definitions |
| `init` | string | ✅ | Initial command (your custom name) |
| `commands` | object | ✅ | Command definitions |
| `plugins` | object | ❌ | Plugin configs |

### Port

```yaml
- name: game                    # Port identifier
  protocol: tcp                 # tcp | udp
  port: 25565                   # Port number
  sleep_handler: handler.lua    # ColdStarter handler (optional)
  start_delay: 10               # Seconds before ready (optional)
  finish_after_command: install # Enable after command (optional)
  check_activity: true          # Monitor for idle (optional)
```

### Command

```yaml
command_name:                   # Freely choose any name
  needs: [other_command]        # Prerequisites (optional)
  run: restart                  # once | always | restart (optional)
  dependencies: [jdk21, wget]   # Nix dependencies (optional)
  procedures:                   # Steps to execute
    - mode: exec                # Execution mode
      data: [bash, script.sh]   # Mode-specific data
```

### Procedure Modes

| Mode | Description | Data Format |
|------|-------------|-------------|
| `exec` | Execute command | `string[]` - Command + args |
| `exec-tty` | Execute with TTY | `string[]` - Command + args |
| `stdin` | Write to process stdin | `string[2]` - `[process_name, stdin_data]` |
| `scroll-switch` | Switch to another scroll | `string` - OCI artifact name |
| `rcon` | RCON command (plugin) | `string` - Command to send |
| `command` | Run another command (deprecated) | `string` - Command name |

**Note:** Plugins can provide additional modes (e.g., `rcon_web_rust`).

### Dependencies

Druid uses **Nix** for dependency management. This provides:

- ✅ **Reproducible environments** - Same dependencies everywhere
- ✅ **Isolation** - No conflicts between scrolls
- ✅ **Declarative** - Dependencies defined in scroll.yaml
- ✅ **Massive package library** - 80,000+ packages from nixpkgs

**Any package from [nixpkgs](https://search.nixos.org/packages)** can be used as a dependency.

## Creating Your Own Scroll

### Find Examples

Browse the [scrolls repository](https://github.com/highcard-dev/scrolls) for examples.

### Step 1: Create scroll.yaml

```yaml
name: artifacts.druid.gg/my-org/my-game
desc: My Game Server
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
        data: [./game-server, --port=7777]
```

### Step 2: Validate and Test

```bash
# Validate scroll syntax
druid scroll validate

# Start the server
druid serve

# Or run specific command
druid run start
```

## Nix Integration

Nix is **foundational** to Druid's architecture.

### Why Nix?

- Multiple versions coexist (jdk8 + jdk21 simultaneously)
- Isolated environments per scroll
- Reproducible builds
- 80,000+ packages available

### How It Works

```yaml
commands:
  start:
    dependencies: [jdk21, wget, git]
    procedures:
      - mode: exec
        data: [java, -jar, server.jar]
```

Druid:
1. Resolves dependencies from nixpkgs
2. Downloads exact versions (or uses cache)
3. Builds isolated environment
4. Executes commands in that environment

### Finding Packages

Search at: https://search.nixos.org/packages

Example:

```yaml
# Need Mono for C# game server?
dependencies: [mono]
```

### Multi-Version Example

Run Minecraft 1.12 (Java 8) and 1.21 (Java 21) simultaneously:

**Scroll 1 (Minecraft 1.12):**
```yaml
dependencies: [jdk8]
```

**Scroll 2 (Minecraft 1.21):**
```yaml
dependencies: [jdk21]
```

No conflicts - each gets its own Java version.

## Supported Games

95 published scrolls:
- 81 Minecraft variants
- 2 Rust (Vanilla, Oxide)
- 2 Hytale
- 10 LGSM games (Palworld, ARK, CS2, etc.)

## Learn More

- [Scrolls Repository](https://github.com/highcard-dev/scrolls)
- [Druid CLI](https://github.com/highcard-dev/druid-cli)
- [Nix Packages](https://search.nixos.org/packages)
