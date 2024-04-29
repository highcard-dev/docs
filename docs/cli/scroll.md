---
sidebar_position: 2
---

# Scroll

A Scroll is an [OCI Artifact](https://github.com/opencontainers/image-spec). It consits of files to bootstrap and maintain the app you want to run ([see Layout](#layout)) and meta data, that give context to the app.

## Layout

A scroll has the following layout

- **scroll.yaml**
  - [Scroll manifest file](#scrollyaml)
- init-files (optional)
  - Files that should be copied into the working directory. **Templates will be rendered out.**
- init-files-template (optional)
  - Files that should be copied into the working directory. **Templates will NOT be rendered out.**
- scroll-switch (optional)
  - directory for files related to scroll switches.
- update (optional)
  - directory for files related to scroll updates.

## Publishing Scrolls

To publish a scroll you can run `druid push ./scroll-dir`, where ./scroll-dir should include at least a scroll.yaml.
You can also just run `druid push`.
In this case it is asumed that a scroll.yaml is in the current working directory.

## scroll.yaml

The scroll.yaml is the most important file in a scroll. It is the only manditory file.

Here is an example:

```yaml
name: registry-1.docker.io/highcard/scroll-minecraft-cuberite
desc: Minecraft Cuberite
version: 0.0.1
app_version: latest
init: "main.start"
processes:
  main:
    commands:
      start:
        needs: [main.install]
        run: restart
        procedures:
          - mode: exec
            data:
              - bash
              - ./start.sh
      stop:
        procedures:
          - mode: stdin
            data:
              - main.start
              - stop
      install:
        run: once
        procedures:
          - mode: exec
            data:
              - wget
              - -q
              - -O
              - Cuberite.tar.gz
              - https://download.cuberite.org/linux-x86_64/Cuberite.tar.gz
          - mode: exec
            data:
              - tar
              - -xzf
              - Cuberite.tar.gz
      update:
        procedures:
          - mode: exec
            data:
              - sh
              - $SCROLL_DIR/update.sh
```

### name

Name if the Scroll

### desc

Description of the scroll

### version

Version of the Scroll.

### app_version

Version of the App. NOT VERSION OF THE SCROLL. E.g if you run mysql 8.0, version should be 8.0 aswell.

### init

Command wich should be run on first startup.

### processes

Key value list of commands to run. The convention is to handle the main logic in a process called `main`.

### processes.commands

Key value list of available commands. A command has the following layout:

- **needs**
  - an array of commands wich need to be run before the command accually starts.
- **run:** available options always (default), restart or once

### processes.commands.procedures

- **procedures:** list of commands to run.
  - **mode**
    - **exec**: run process
    - **exec_tty**: run process in tty mode
    - **stdin**: send data to stdin of a certain process
    - different values are also possible [if you used a plugin](plugins).
  - **data:** array with informations, depending on mode
