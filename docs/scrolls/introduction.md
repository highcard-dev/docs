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

init: "start"

commands:
  start:
    procedures:
      - mode: exec
        data:
          - ./game-server
          - --port=7777
  
  stop:
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

# Default command to run
init: "start"

# Command definitions
commands:
  # Start server
  start:
    needs: [install]              # Prerequisites
    run: restart                  # Restart policy
    dependencies: [jdk21]         # System dependencies
    procedures:
      - mode: exec
        data:
          - bash
          - ./start.sh
  
  # Stop server
  stop:
    procedures:
      - mode: rcon                # Use RCON plugin
        data: stop
  
  # Install server
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
  
  # Update server
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
| `init` | string | ✅ | Initial command to run |
| `commands` | object | ✅ | Command definitions |
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

```yaml
commands:
  my_command:
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
| `rcon` | RCON command | `string` - Command to send |
| `signal` | Send Unix signal | `string` - Signal name |
| `http` | HTTP request | `object` - Request config |
| `write` | Write file | `object` - File path + content |

### Dependencies

Built-in system dependencies:

- `jdk8`, `jdk11`, `jdk17`, `jdk21` - Java runtimes
- `nodejs`, `python3` - Language runtimes
- `wget`, `curl` - Download tools
- `git` - Version control
- `cacert` - SSL certificates

Custom dependencies can be added per-scroll.

## Creating Your Own Scroll

### Step 1: Fork the Repository

```bash
git clone https://github.com/highcard-dev/scrolls
cd scrolls

# Create your scroll directory
mkdir -p scrolls/custom/my-game/1.0.0
cd scrolls/custom/my-game/1.0.0
```

### Step 2: Create scroll.yaml

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

init: "start"

commands:
  start:
    needs: [install]
    run: restart
    procedures:
      - mode: exec
        data:
          - ./start-server.sh
  
  stop:
    procedures:
      - mode: signal
        data: SIGTERM
  
  install:
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

### Step 3: Add Start Script

```bash
#!/bin/bash
# start-server.sh

./game-server \
  --port=$PORT_GAME \
  --max-players=20 \
  --world-name=MyWorld
```

### Step 4: Test Locally

```bash
# Build scroll
druid scroll build .

# Test deployment
druid scroll deploy ./scroll.yaml

# Start server
druid start
```

### Step 5: Publish to Registry

```bash
# Tag version
git tag v1.0.0

# Push to GitHub
git push origin main --tags

# Registry auto-builds on tag push
# Artifact available at: artifacts.druid.gg/my-org/scroll-my-game:1.0.0
```

## ColdStarter Integration

Scrolls integrate with ColdStarter for wake-on-demand.

### Adding ColdStarter Support

1. **Create packet handler:**

```lua
-- packet_handler/my_game.lua
function handle(ctx, data)
    -- Parse incoming packet
    local packet_type = detectPacketType(data)
    
    -- Respond to status query
    if packet_type == "STATUS" then
        sendData(buildStatusResponse({
            name = "My Game Server",
            players = 0,
            max = 20,
            status = "Waking up..."
        }))
    end
    
    -- Trigger wake on connection
    if packet_type == "CONNECT" then
        finish()  -- Start the server
    end
end
```

2. **Reference in scroll.yaml:**

```yaml
ports:
  - name: game
    port: 7777
    protocol: tcp
    sleep_handler: packet_handler/my_game.lua
```

3. **Configure idle shutdown:**

```yaml
coldstarter:
  idle_timeout: 300      # 5 minutes idle = sleep
  wake_timeout: 60       # Max 60s wake time
  snapshot_mode: auto    # Enable snapshots
```

## Plugin System

Scrolls can enable plugins for additional functionality.

### Available Plugins

| Plugin | Description | Configuration |
|--------|-------------|---------------|
| `rcon` | Remote console access | Port, password |
| `sftp` | File transfer | User, password |
| `metrics` | Prometheus metrics | Port, endpoints |
| `backup` | Automated backups | Schedule, retention |

### Example: RCON Plugin

```yaml
plugins:
  rcon:
    port: 25575
    password: ${RCON_PASSWORD}  # From environment
```

Use in commands:

```yaml
commands:
  stop:
    procedures:
      - mode: rcon
        data: stop
  
  say_hello:
    procedures:
      - mode: rcon
        data: say Hello players!
```

## Environment Variables

Scrolls support environment variable substitution:

```yaml
commands:
  start:
    procedures:
      - mode: exec
        data:
          - ./server
          - --port=${PORT_GAME}              # From port definition
          - --max-players=${MAX_PLAYERS}     # Custom variable
          - --world=${WORLD_NAME}            # User-provided
```

Built-in variables:

- `${PORT_<name>}` - Port numbers from port definitions
- `${SCROLL_DIR}` - Path to scroll directory
- `${DATA_DIR}` - Path to persistent data
- `${VERSION}` - Scroll version
- `${APP_VERSION}` - Application version

## Best Practices

### 1. Use Semantic Versioning

```yaml
version: 1.2.3
app_version: 2024.1.0

# version = scroll version (your changes)
# app_version = game/app version (upstream)
```

### 2. Minimize Container Size

```yaml
# ✅ Good: Download only what's needed
install:
  procedures:
    - mode: exec
      data: [wget, -q, -O, server.jar, $URL]

# ❌ Bad: Cloning entire repo
install:
  procedures:
    - mode: exec
      data: [git, clone, --depth=1, $REPO]
```

### 3. Handle Updates Gracefully

```yaml
update:
  procedures:
    # Backup before update
    - mode: exec
      data: [cp, -r, world, world.backup]
    
    # Download new version
    - mode: exec
      data: [wget, -O, server.jar, $NEW_URL]
    
    # Verify integrity
    - mode: exec
      data: [sha256sum, -c, server.jar.sha256]
```

### 4. Use Idempotent Commands

```yaml
# ✅ Good: Can run multiple times safely
install:
  run: once
  procedures:
    - mode: exec
      data:
        - bash
        - -c
        - |
          if [ ! -f server.jar ]; then
            wget -O server.jar $URL
          fi

# ❌ Bad: Fails on second run
install:
  procedures:
    - mode: exec
      data: [wget, -O, server.jar, $URL]  # Error if exists
```

### 5. Document Custom Variables

```yaml
# scroll.yaml
# 
# Environment Variables:
#   MAX_PLAYERS - Maximum player count (default: 20)
#   WORLD_NAME - World name (default: world)
#   DIFFICULTY - Game difficulty (default: normal)
#

commands:
  start:
    procedures:
      - mode: exec
        data:
          - ./server
          - --max-players=${MAX_PLAYERS:-20}
          - --world=${WORLD_NAME:-world}
          - --difficulty=${DIFFICULTY:-normal}
```

## Contributing Scrolls

### Contribution Guidelines

1. **Fork the [scrolls repository](https://github.com/highcard-dev/scrolls)**

2. **Create scroll in proper directory:**
   ```
   scrolls/<game-name>/<variant>/<version>/
   ```

3. **Test thoroughly:**
   - Fresh install works
   - Start/stop works
   - Update works
   - ColdStarter handler (if applicable)
   - Plugins work

4. **Follow naming conventions:**
   ```yaml
   name: artifacts.druid.gg/community/<game>-<variant>
   desc: <Game Name> - <Variant> (<Version>)
   ```

5. **Submit pull request** with:
   - Description of the game/app
   - Testing performed
   - Any special requirements
   - Links to official documentation

### Review Process

PRs are reviewed for:
- ✅ Scroll.yaml syntax valid
- ✅ Commands work as expected
- ✅ Dependencies properly specified
- ✅ ColdStarter integration (if game supports)
- ✅ Documentation clear
- ✅ No hardcoded secrets

Approved scrolls are:
1. Merged to main branch
2. Auto-built by CI/CD
3. Published to artifacts.druid.gg
4. Available in Druid CLI

## Troubleshooting

### Scroll Won't Build

**Error**: `invalid scroll.yaml format`

**Solution**: Validate YAML syntax
```bash
druid scroll validate scroll.yaml
```

### Command Fails to Execute

**Error**: `command 'install' failed with exit code 1`

**Solution**: Check logs
```bash
druid logs
# Review output for error messages
```

### Port Already in Use

**Error**: `failed to bind port 25565: address already in use`

**Solution**: Change port or stop conflicting service
```yaml
ports:
  - name: game
    port: 25566  # Use different port
```

### Dependencies Not Found

**Error**: `dependency 'jdk21' not available`

**Solution**: Check available dependencies
```bash
druid scroll deps
# Lists all available system dependencies
```

## Advanced Topics

### Custom Dependency Providers

Define custom dependencies:

```yaml
dependencies:
  my_lib:
    install:
      - mode: exec
        data:
          - wget
          - https://example.com/lib.tar.gz
      - mode: exec
        data: [tar, -xzf, lib.tar.gz]
    
    env:
      LD_LIBRARY_PATH: /path/to/lib

commands:
  start:
    dependencies: [my_lib]
    procedures:
      - mode: exec
        data: [./server]
```

### Multi-Stage Procedures

Complex installation workflows:

```yaml
commands:
  install:
    procedures:
      # Stage 1: Download
      - mode: exec
        data: [wget, -O, installer.sh, $URL]
      
      # Stage 2: Make executable
      - mode: exec
        data: [chmod, +x, installer.sh]
      
      # Stage 3: Run installer
      - mode: exec
        data: [./installer.sh, --unattended]
      
      # Stage 4: Cleanup
      - mode: exec
        data: [rm, installer.sh]
```

### Conditional Procedures

Use shell scripts for conditional logic:

```yaml
commands:
  update:
    procedures:
      - mode: exec
        data:
          - bash
          - -c
          - |
            if [ -f server.jar.old ]; then
              rm server.jar.old
            fi
            mv server.jar server.jar.old
            wget -O server.jar $NEW_URL
```

## Examples

### Simple HTTP Server

```yaml
name: artifacts.druid.gg/examples/http-server
desc: Simple Python HTTP Server
version: 1.0.0
app_version: 3.11

ports:
  - name: http
    protocol: tcp
    port: 8080

init: "start"

commands:
  start:
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

init: "start"

commands:
  start:
    needs: [init_db]
    procedures:
      - mode: exec
        data:
          - postgres
          - -D
          - /data/postgres
  
  init_db:
    run: once
    procedures:
      - mode: exec
        data:
          - initdb
          - -D
          - /data/postgres
```

## Learn More

- [Community Scrolls Repository](https://github.com/highcard-dev/scrolls) - Browse and contribute scrolls
- [Druid CLI Repository](https://github.com/highcard-dev/druid-cli) - Core CLI tool

## FAQ

**Q: Can I use Docker images as scrolls?**  
A: Not directly. Scrolls are OCI artifacts (like Docker), but use a different format. You can convert Docker workflows to scroll.yaml.

**Q: How do I version scrolls?**  
A: Use semantic versioning for `version` (your changes) and track upstream version in `app_version`.

**Q: Can scrolls depend on other scrolls?**  
A: Not yet. This is a planned feature. Currently use `dependencies` for system-level deps.

**Q: What's the difference between scrolls and containers?**  
A: Scrolls are *deployment templates* stored as OCI artifacts. They define *how* to run applications in containers, not the containers themselves.

**Q: Can I sell premium scrolls?**  
A: Technically yes (it's just OCI artifacts), but the Druid community focuses on open-source scrolls. Commercial support/services are welcome.
