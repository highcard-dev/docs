---
title: "druid registry push"
sidebar_label: druid registry push
---

## druid registry push

Generate OCI Artifacts and push to a remote registry

```
druid registry push [flags]
```

### Options

```
  -h, --help              help for push
  -i, --image string      Image to use for the scroll. (Will be added as a manifest annotation gg.druid.scroll.image)
  -c, --min-cpu string    Minimum CPU required to run the application. (Will be added as a manifest annotation gg.druid.scroll.minCpu)
  -d, --min-disk string   Minimum Disk required to run the application. (Will be added as a manifest annotation gg.druid.scroll.minDisk)
  -r, --min-ram string    Minimum RAM required to run the application. (Will be added as a manifest annotation gg.druid.scroll.minRam)
  -m, --pack-meta         Pack the meta folder into the scroll.
  -p, --port strings      Ports to expose. Format webserver=80, dns=53/udp or just ftp (Will be added as a manifest annotation gg.druid.scroll.ports.<name>)
```

### Options inherited from parent commands

```
      --cwd string             Path to environment file (.env) (default "/Users/marc/Development/Highcard/druid/druid-cli")
  -e, --env-file string        Path to environment file (.env) (default "./.env")
      --ignore-version-check   Ignore version check between scroll.yaml and scroll-lock.json
```

