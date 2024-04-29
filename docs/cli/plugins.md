# Plugins

The druid-cli has support for [Go Plugins](https://github.com/hashicorp/go-plugin). Go Plugins by HashiCorp provide an easy way to provide a plugin interface for your Go Application (druid-cli is written in Go). If a plugins crashes, the application stays alive. Communication between the the host process (druid-cli) and the plugin process is done via Grpc.

This is the proto file, wich actas as a plugin interface:
https://github.com/highcard-dev/druid-cli/blob/master/plugin/proto/plugin_service.proto

Improvements to the plugin interface is planed. At the moment, plugins can provide new [procedure modes](scroll#processescommandsprocedures), wich is a powerful way to communicate with the application managed by the druid-cli in any way you want or generally extend the capabilities of the druid-cli

## Examples

At the moment there are 2 official plugins. You can use them as a template

https://github.com/highcard-dev/druid-cli/blob/master/plugin/rcon_web_rust/rcon_web_rust.go

https://github.com/highcard-dev/druid-cli/blob/master/plugin/rcon/rcon.go
