import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "cli/api/druid-cli",
    },
    {
      type: "category",
      label: "scroll",
      items: [
        {
          type: "doc",
          id: "cli/api/get-scroll",
          label: "Get current scroll",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "cli/api/add-command",
          label: "Add command to current scroll",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "cli/api/run-command",
          label: "Run a command",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "cli/api/run-procedure",
          label: "Run a procedure",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "cli/api/get-procedures",
          label: "Get procedure statuses",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "logs",
      items: [
        {
          type: "doc",
          id: "cli/api/list-all-logs",
          label: "List all log streams",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "cli/api/list-stream-logs",
          label: "List logs for a specific stream",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "metrics",
      items: [
        {
          type: "doc",
          id: "cli/api/get-metrics",
          label: "Get process metrics",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "cli/api/get-ps-tree",
          label: "Get process tree",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "process",
      items: [
        {
          type: "doc",
          id: "cli/api/get-procedures",
          label: "Get procedure statuses",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "cli/api/get-processes",
          label: "List running processes",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "queue",
      items: [
        {
          type: "doc",
          id: "cli/api/get-queue",
          label: "Get command queue",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "websocket",
      items: [
        {
          type: "doc",
          id: "cli/api/create-token",
          label: "Create WebSocket token",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "cli/api/get-consoles",
          label: "List all consoles",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "port",
      items: [
        {
          type: "doc",
          id: "cli/api/get-ports",
          label: "Get port information",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "cli/api/add-port",
          label: "Add a port to watch",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "cli/api/delete-port",
          label: "Remove a watched port",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "health",
      items: [
        {
          type: "doc",
          id: "cli/api/get-health-auth",
          label: "Get health status",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "coldstarter",
      items: [
        {
          type: "doc",
          id: "cli/api/finish-coldstarter",
          label: "Finish cold start",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "daemon",
      items: [
        {
          type: "doc",
          id: "cli/api/get-scroll",
          label: "Get current scroll",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "cli/api/add-command",
          label: "Add command to current scroll",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "cli/api/run-command",
          label: "Run a command",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "cli/api/run-procedure",
          label: "Run a procedure",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "cli/api/get-procedures",
          label: "Get procedure statuses",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "cli/api/list-all-logs",
          label: "List all log streams",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "cli/api/list-stream-logs",
          label: "List logs for a specific stream",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "cli/api/get-metrics",
          label: "Get process metrics",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "cli/api/get-ps-tree",
          label: "Get process tree",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "cli/api/get-processes",
          label: "List running processes",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "cli/api/get-queue",
          label: "Get command queue",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "cli/api/create-token",
          label: "Create WebSocket token",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "cli/api/get-consoles",
          label: "List all consoles",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "cli/api/get-ports",
          label: "Get port information",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "cli/api/add-port",
          label: "Add a port to watch",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "cli/api/delete-port",
          label: "Remove a watched port",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "cli/api/get-health-auth",
          label: "Get health status",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "cli/api/finish-coldstarter",
          label: "Finish cold start",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "cli/api/stop-daemon",
          label: "Stop daemon",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "cli/api/enable-watch",
          label: "Enable development mode",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "cli/api/disable-watch",
          label: "Disable development mode",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "cli/api/get-watch-status",
          label: "Get watch mode status",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "watch",
      items: [
        {
          type: "doc",
          id: "cli/api/enable-watch",
          label: "Enable development mode",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "cli/api/disable-watch",
          label: "Disable development mode",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "cli/api/get-watch-status",
          label: "Get watch mode status",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
