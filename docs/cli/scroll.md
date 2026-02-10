---
sidebar_position: 3
title: Scrolls
---

# Scrolls

Scrolls are OCI artifacts that define how to deploy applications on Druid.

**Full documentation:** See [Scroll System](../scrolls/introduction.md)

## Quick Reference

### Structure

```
scroll-dir/
├── scroll.yaml         # Manifest
├── start.sh           # Scripts
└── packet_handler/    # ColdStarter handlers
```

### Commands

```bash
# Validate scroll
druid scroll validate

# Run scroll
druid serve

# Run specific command
druid run <command>
```

### Publishing

```bash
druid registry login
druid registry push
```

---

For complete scroll.yaml format, field reference, examples, and ColdStarter configuration, see:

**→ [Scroll System Documentation](../scrolls/introduction.md)**
