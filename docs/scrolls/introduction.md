---
sidebar_position: 1
title: Scroll System Introduction
description: Learn about Druid's Scroll system for packaging and deploying game servers
---

# Scroll System

Scrolls are **OCI-compliant artifacts** that define how to deploy and manage applications (game servers, databases, web services) on Druid. Think of them as **Kubernetes Helm charts but for game servers**.

## What are Scrolls?

A Scroll is a declarative package that contains:

- **Deployment manifest** (`scroll.yaml`) - How to install, start, stop the application
- **Scripts** - Setup scripts, start scripts, update scripts
- **Packet handlers** - ColdStarter Lua handlers for wake-on-demand
- **Plugins** - Extensions like RCON, SFTP, monitoring
- **Configuration templates** - Default configs for the application

### Example Scroll Structure

```
scrolls/minecraft/papermc/1.21.7/
├── scroll.yaml                 # Main manifest
├── start.sh                    # Start script
├── update.sh                   # Update script
├── packet_handler/
│   └── minecraft.lua           # ColdStarter handler
└── plugins/
    └── rcon.yaml               # RCON plugin config
```

## Command Names: Completely Customizable!

**Important:** In Druid scrolls, **command names are completely free** - you can name them whatever you want! 

There are **no required command names**. While you'll see common conventions like `start`, `stop`, `install`, these are just examples. You have total freedom:

- ✅ `launch` instead of `start`
- ✅ `shutdown` instead of `stop`
- ✅ `setup` instead of `install`
- ✅ `do_magic`, `run_server`, `bootstrap` - anything you want!

The only rule: reference your custom names correctly in `init` and `needs`.

**Example with custom names:**

```yaml
init: "launch_server"      # Your custom name

commands:
  setup_everything:        # Custom name 1
    procedures:
      - mode: exec
        data: [./setup.sh]
  
  launch_server:           # Custom name 2
    needs: [setup_everything]
    procedures:
      - mode: exec
        data: [./server]
  
  shutdown_gracefully:     # Custom name 3
    procedures:
      - mode: signal
        data: SIGTERM
```

**All command names shown in this documentation (`start`, `stop`, `install`, etc.) are just conventions, not requirements.**

## Why Scrolls?

### The Problem with Traditional Hosting

Traditional game server hosting requires:
- Manual installation steps
- Custom start scripts per game
- Manual updates
- Platform-specific configurations

**Result**: Inconsistent, error-prone, hard to maintain.

### The Scroll Solution

Scrolls provide:
- ✅ **Declarative deployments** - Define once, deploy anywhere
- ✅ **Version control** - Git-tracked, OCI-stored
- ✅ **Reproducibility** - Same scroll = same result
- ✅ **Community-driven** - 95 published, open for contributions
- ✅ **Automatic updates** - New game versions = new scroll versions

## Scroll Registry

Druid's scroll registry hosts **95 published scrolls**:

### Minecraft Family (81 scrolls)

- **Vanilla** - Official Mojang servers (all versions)
- **PaperMC** - High-performance Minecraft
- **Spigot** - Plugin-compatible servers
- **Forge** - Modded Minecraft
- **Cuberite** - Lightweight C++ server

### Rust (2 scrolls)

- **Vanilla** - Official Rust dedicated server
- **Oxide** - Modded Rust with plugin support

### Hytale (2 scrolls)

- **Vanilla** - Official Hytale server (ready for launch)
- **Modded** - Community mod support

### LGSM Games (10 scrolls)

- **Palworld** - Multiplayer creature collection
- **ARK: Survival** - Dinosaur survival
- **Unturned** - Zombie survival
- **DayZ** - Hardcore survival
- **7 Days to Die** - Zombie crafting
- **Garry's Mod** - Sandbox physics
- **Counter-Strike 2** - FPS competitive
- **Project Zomboid** - Isometric zombie survival
- **Terraria** - 2D adventure sandbox
- **CS:GO** - Legacy Counter-Strike

**Total**: 95 scrolls published, 125 more available via LGSM integration.

## Scroll.yaml Format

The `scroll.yaml` file is the heart of every scroll.

### Minimal Example

```yaml
name: artifacts.druid.gg/my-org/my-game
desc: My Custom Game Server
version: 1.0.0
app_version: 2024.1

ports:
  - name: game
    protocol: tcp
    port: 7777

# Can be ANY command name you choose!
init: "launch"

commands:
  launch:              # Your custom name
    procedures:
      - mode: exec
        data:
          - ./game-server
          - --port=7777
  
  halt:                # Another custom name
    procedures:
      - mode: signal
        data: SIGTERM
```

### Complete Example (Minecraft PaperMC)

```yaml
name: artifacts.druid.gg/druid-team/scroll-minecraft-paper
desc: PaperMC High-Performance Minecraft Server
version: 0.0.1
app_version: 1.21.7

# Port Configuration
ports:
  - name: main
    protocol: tcp
    port: 25565
    sleep_handler: packet_handler/minecraft.lua  # ColdStarter
    start_delay: 10                              # Seconds before ready
    finish_after_command: install                # When to enable port
  
  - name: rcon
    protocol: tcp
    port: 25575

# Default command to run (choose any name!)
init: "start"

# Command definitions (all names are customizable)
commands:
  # Start server (could also be named: launch, run, boot, etc.)
  start:
    needs: [install]              # Prerequisites
    run: restart                  # Restart policy
    dependencies: [jdk21]         # System dependencies
    procedures:
      - mode: exec
        data:
          - bash
          - ./start.sh
  
  # Stop server (could also be named: halt, shutdown, kill, etc.)
  stop:
    procedures:
      - mode: rcon                # Use RCON plugin
        data: stop
  
  # Install server (could also be named: setup, bootstrap, init, etc.)
  install:
    run: once                     # Only run once
    dependencies: [wget, cacert]
    procedures:
      - mode: exec
        data:
          - wget
          - -q
          - -O
          - paper.jar
          - https://api.papermc.io/v2/projects/paper/versions/1.21.7/builds/latest/downloads/paper-1.21.7.jar
      
      - mode: exec
        data:
          - bash
          - -c
          - echo eula=true > eula.txt
  
  # Update server (could also be named: upgrade, refresh, patch, etc.)
  update:
    procedures:
      - mode: exec
        data:
          - sh
          - $SCROLL_DIR/update.sh
      
      - mode: exec
        data:
          - bash
          - -c
          - echo eula=true > eula.txt

# Plugin configuration
plugins:
  rcon: {}                        # Enable RCON plugin
```

## Field Reference

### Top-Level Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | ✅ | OCI artifact name |
| `desc` | string | ✅ | Human-readable description |
| `version` | string | ✅ | Scroll version (semver) |
| `app_version` | string | ✅ | Application version |
| `ports` | array | ✅ | Port definitions |
| `init` | string | ✅ | Initial command to run (use your custom name!) |
| `commands` | object | ✅ | Command definitions (custom names!) |
| `plugins` | object | ❌ | Plugin configurations |

### Port Definition

```yaml
ports:
  - name: game                    # Port identifier
    protocol: tcp                 # tcp | udp
    port: 25565                   # Port number
    sleep_handler: handler.lua    # ColdStarter handler (optional)
    start_delay: 10               # Seconds before ready (optional)
    finish_after_command: install # Enable after command (optional)
    mandatory: true               # Required for health check (optional)
    check_activity: true          # Monitor for idle (optional)
```

### Command Definition

**Remember:** You can name these commands whatever you want!

```yaml
commands:
  your_custom_command_name:       # FREELY choose any name
    needs: [other_command]        # Prerequisites (optional)
    run: restart                  # once | always | restart (optional)
    dependencies: [jdk21, wget]   # System dependencies (optional)
    procedures:                   # Steps to execute
      - mode: exec                # Execution mode
        data:                     # Mode-specific data
          - bash
          - script.sh
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

**Note:** Additional modes can be provided by plugins (e.g., `rcon_web_rust`).

### Dependencies

Druid uses **Nix** for dependency management. This provides:

- ✅ **Reproducible environments** - Same dependencies everywhere
- ✅ **Isolation** - No conflicts between scrolls
- ✅ **Declarative** - Dependencies defined in scroll.yaml
- ✅ **Massive package library** - 80,000+ packages from nixpkgs

**Common dependencies:**

- `jdk8`, `jdk11`, `jdk17`, `jdk21` - Java runtimes
- `nodejs`, `python3` - Language runtimes
- `wget`, `curl` - Download tools
- `git` - Version control
- `cacert` - SSL certificates

**Any package from [nixpkgs](https://search.nixos.org/packages)** can be used as a dependency.

## Creating Your Own Scroll

### Find Examples

Browse the [scrolls repository](https://github.com/highcard-dev/scrolls) for examples of existing scrolls. The structure and patterns used there will help you create your own.

### Step 1: Create scroll.yaml

Create a directory for your scroll and define `scroll.yaml`:

```yaml
name: artifacts.druid.gg/my-org/scroll-my-game
desc: My Custom Game Server
version: 1.0.0
app_version: 1.0.0

ports:
  - name: game
    protocol: tcp
    port: 7777
    sleep_handler: packet_handler/generic.lua

# Choose your own command name!
init: "launch"

commands:
  # Custom command names - use whatever makes sense!
  launch:
    needs: [setup]
    run: restart
    procedures:
      - mode: exec
        data:
          - ./start-server.sh
  
  halt:
    procedures:
      - mode: signal
        data: SIGTERM
  
  setup:
    run: once
    dependencies: [wget]
    procedures:
      - mode: exec
        data:
          - wget
          - -O
          - game-server.tar.gz
          - https://example.com/releases/v1.0.0.tar.gz
      
      - mode: exec
        data:
          - tar
          - -xzf
          - game-server.tar.gz
```

### Step 2: Add Start Script

```bash
#!/bin/bash
# start-server.sh

./game-server \
  --port=$PORT_GAME \
  --max-players=20 \
  --world-name=MyWorld
```

### Step 3: Validate and Test

```bash
# Validate scroll syntax
druid scroll validate

# Start the server with your scroll
druid serve

# Or run a specific command
druid run install
druid run launch
```

The scroll will be loaded from the current directory, and Druid will handle dependency resolution, process execution, and monitoring.

## Examples with Custom Command Names

### HTTP Server

```yaml
name: artifacts.druid.gg/examples/http-server
desc: Simple Python HTTP Server
version: 1.0.0
app_version: 3.11

ports:
  - name: http
    protocol: tcp
    port: 8080

init: "serve"           # Custom name!

commands:
  serve:                # Not "start" - your choice!
    dependencies: [python3]
    procedures:
      - mode: exec
        data:
          - python3
          - -m
          - http.server
          - 8080
```

### Database Server (PostgreSQL)

```yaml
name: artifacts.druid.gg/examples/postgresql
desc: PostgreSQL Database Server
version: 1.0.0
app_version: 15

ports:
  - name: postgres
    protocol: tcp
    port: 5432

init: "run_database"    # Completely custom name!

commands:
  run_database:         # Your choice!
    needs: [initialize_db]
    procedures:
      - mode: exec
        data:
          - postgres
          - -D
          - /data/postgres
  
  initialize_db:        # Also custom!
    run: once
    procedures:
      - mode: exec
        data:
          - initdb
          - -D
          - /data/postgres
```

## Nix Integration

Druid leverages **Nix** for dependency management, providing reproducible, isolated environments for every scroll.

### Why Nix?

**The Problem:** Traditional package managers (apt, yum) have issues:
- ❌ Global installation causes conflicts
- ❌ Different versions can't coexist
- ❌ Hard to reproduce exact environments
- ❌ System updates can break applications

**The Nix Solution:**
- ✅ **Isolated environments** - Each scroll gets its own dependency closure
- ✅ **Reproducible** - Same inputs = same outputs, always
- ✅ **Atomic upgrades** - Rollback on failure
- ✅ **No dependency hell** - Multiple versions coexist
- ✅ **Declarative** - Dependencies defined in scroll.yaml

### How It Works

When you declare dependencies in `scroll.yaml`:

```yaml
commands:
  start:
    dependencies: [jdk21, wget, git]
    procedures:
      - mode: exec
        data: [java, -jar, server.jar]
```

Druid:
1. **Resolves** dependencies from nixpkgs
2. **Downloads** exact versions (or fetches from cache)
3. **Builds** isolated environment with only those dependencies
4. **Executes** commands in that environment

**No pollution of host system.** Each scroll is isolated.

### Available Packages

Druid has access to **80,000+ packages** from [nixpkgs](https://search.nixos.org/packages).

**Common examples:**

```yaml
dependencies:
  # Java (multiple versions can coexist!)
  - jdk8
  - jdk11
  - jdk17
  - jdk21
  
  # Languages
  - nodejs
  - python3
  - go
  - rustc
  
  # Databases
  - postgresql
  - mysql
  - redis
  - mongodb
  
  # Tools
  - wget
  - curl
  - git
  - unzip
  - cacert
  
  # Game-specific
  - steamcmd
  - wine
  - dotnet-sdk
```

### Finding Packages

Search for packages at: https://search.nixos.org/packages

**Example:** Need Mono for a C# game server?

1. Search "mono" on nixpkgs
2. Find package name: `mono`
3. Add to scroll.yaml:

```yaml
dependencies: [mono]
```

### Nix Store

Dependencies are stored in the **Nix store** (`/nix/store/`):

```
/nix/store/
├── abc123-jdk-21.0.1/
│   ├── bin/java
│   └── lib/...
├── def456-wget-1.21.3/
│   └── bin/wget
└── ghi789-nodejs-20.11.0/
    ├── bin/node
    └── lib/...
```

**Benefits:**
- Multiple versions installed simultaneously
- Shared across scrolls (space efficient)
- Immutable (can't be modified after build)
- Atomic (all-or-nothing installation)

### Dependency Caching

Druid caches Nix packages:

- **First deployment:** Downloads dependencies (~10-60s)
- **Subsequent deployments:** Instant (cached)
- **Shared cache:** Same dependencies across scrolls use cache

**This is why Druid is fast** - dependencies are downloaded once, reused everywhere.

### Advanced: Custom Nix Expressions

For complex dependencies, use custom Nix expressions:

```yaml
commands:
  start:
    dependencies:
      - jdk21
      - name: custom-lib
        nix: |
          pkgs.stdenv.mkDerivation {
            name = "custom-lib";
            src = fetchurl {
              url = "https://example.com/lib.tar.gz";
              sha256 = "abc...";
            };
            installPhase = ''
              mkdir -p $out/lib
              cp -r * $out/lib/
            '';
          }
```

### Reproducibility Guarantee

**Same scroll.yaml = Same environment**, even years later:

- Nix pins exact package versions
- nixpkgs is versioned and cached
- Binary cache ensures identical builds

**This is crucial for:**
- Disaster recovery
- Scaling to multiple nodes
- Long-term maintenance

### Comparison: Traditional vs Nix

| Traditional Hosting | Druid with Nix |
|---------------------|----------------|
| Install Java globally | Nix provides jdk21 per-scroll |
| `apt install openjdk-21-jre` | `dependencies: [jdk21]` |
| Conflicts if multiple versions needed | Multiple versions coexist |
| Breaks on system update | Isolated, reproducible |
| Manual setup per server | Declarative, automatic |

### Example: Multi-Version Java

Run Minecraft 1.12 (Java 8) and 1.21 (Java 21) **simultaneously**:

**Scroll 1: Minecraft 1.12**
```yaml
commands:
  start:
    dependencies: [jdk8]
    procedures:
      - mode: exec
        data: [java, -jar, minecraft-1.12.jar]
```

**Scroll 2: Minecraft 1.21**
```yaml
commands:
  start:
    dependencies: [jdk21]
    procedures:
      - mode: exec
        data: [java, -jar, minecraft-1.21.jar]
```

**No conflicts.** Each gets its own Java version.

### Why This Matters

Nix is **foundational to Druid's architecture**:

1. **ColdStarter wake-on-demand** - Fast startup because dependencies are pre-cached
2. **Multi-tenancy** - Isolated environments prevent conflicts
3. **Reproducibility** - Same scroll works everywhere
4. **Scalability** - Scrolls can deploy to any Druid node
5. **Reliability** - Immutable packages can't be corrupted

**Without Nix, Druid's model wouldn't work.**

### Learn More

- [Nix Package Manager](https://nixos.org)
- [Search nixpkgs](https://search.nixos.org/packages)
- [Community Scrolls Repository](https://github.com/highcard-dev/scrolls) - Browse and contribute scrolls
- [Druid CLI Repository](https://github.com/highcard-dev/druid-cli) - Core CLI tool

## FAQ

**Q: Can I use Docker images as scrolls?**  
A: Not directly. Scrolls are OCI artifacts (like Docker), but use a different format. You can convert Docker workflows to scroll.yaml.

**Q: Are command names like `start`, `stop`, `install` required?**  
A: **NO!** Command names are completely free. Use any names you want: `launch`, `halt`, `setup`, `do_magic` - whatever makes sense for your application.

**Q: How do I version scrolls?**  
A: Use semantic versioning for `version` (your changes) and track upstream version in `app_version`.

**Q: Can scrolls depend on other scrolls?**  
A: Not yet. This is a planned feature. Currently use `dependencies` for system-level deps.

**Q: What's the difference between scrolls and containers?**  
A: Scrolls are *deployment templates* stored as OCI artifacts. They define *how* to run applications in containers, not the containers themselves.

**Q: Can I sell premium scrolls?**  
A: Technically yes (it's just OCI artifacts), but the Druid community focuses on open-source scrolls. Commercial support/services are welcome.
