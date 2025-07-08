<div align="center" id="top">

# Monday.com API MCP Server

</div>

A server implementation for the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) that provides an interface to interact with Monday.com API.

## 💻 Claude Desktop Demo

https://github.com/user-attachments/assets/ed8d24e1-256b-4f6b-9d84-38e54a8703fd

## Prerequisites

Before running the MCP server, make sure you have:

1. Node v16 or higher installed (v20+ recommended)
2. NPM v5.2.0 or higher installed
3. Either:
   - [Nango](https://nango.dev) setup with Monday.com integration (recommended)
   - [Monday.com API key](https://developer.monday.com/api-reference/docs/authentication) (legacy)

**Note for Docker users:** This version uses node-fetch v2.7.0 for better compatibility with older Node.js versions and Docker containers.

## ⚙️ Usage

### With Nango (Recommended)

1. Set up your Nango environment variables in a `.env` file:
   ```bash
   NANGO_CONNECTION_ID=your-connection-id
   NANGO_INTEGRATION_ID=your-integration-id
   NANGO_BASE_URL=https://api.nango.dev
   NANGO_SECRET_KEY=your-secret-key
   ```

2. Run the server:
   ```bash
   npx @mondaydotcomorg/monday-api-mcp
   ```

### With Direct Token (Legacy)

```bash
npx @mondaydotcomorg/monday-api-mcp -t abcd123 --use-nango false
```

The Monday API token can also be provided via the `MONDAY_TOKEN` environment variable.

### Command Line Arguments

| Argument | Flags | Description | Required | Default |
|----------|-------|-------------|----------|---------|
| Use Nango | `--use-nango`, `-n` | Use Nango for authentication | No | `true` |
| Monday API Token | `--token`, `-t` | Monday.com API token (deprecated - use Nango) | No | - |
| API Version | `--version`, `-v` | Monday.com API version | No | `current` |
| Read Only Mode | `--read-only`, `-ro` | Enable read-only mode | No | `false` |
| Dynamic API Tools | `--enable-dynamic-api-tools`, `-edat` | (Beta) Enable dynamic API tools (Mode that includes the whole API schema, not supported when using read-only mode) | No | `false` |

## 💻 Claude Desktop Integration

### With Nango (Recommended)

```json
{
  "mcpServers": {
    "monday-api-mcp": {
      "command": "npx",
      "args": [
        "@mondaydotcomorg/monday-api-mcp"
      ],
      "env": {
        "NANGO_CONNECTION_ID": "your-connection-id",
        "NANGO_INTEGRATION_ID": "your-integration-id",
        "NANGO_BASE_URL": "https://api.nango.dev",
        "NANGO_SECRET_KEY": "your-secret-key"
      }
    }
  }
}
```

### With Direct Token (Legacy)

```json
{
  "mcpServers": {
    "monday-api-mcp": {
      "command": "npx",
      "args": [
        "@mondaydotcomorg/monday-api-mcp",
        "-t",
        "abcd123",
        "--use-nango",
        "false"
      ]
    }
  }
}
```

## 💻 Cursor Integration

### Using Nango (Recommended)

```json
{
  "mcpServers": {
    "monday-api-mcp": {
      "command": "npx",
      "args": [
        "@mondaydotcomorg/monday-api-mcp"
      ],
      "env": {
        "NANGO_CONNECTION_ID": "your-connection-id",
        "NANGO_INTEGRATION_ID": "your-integration-id",
        "NANGO_BASE_URL": "https://api.nango.dev",
        "NANGO_SECRET_KEY": "your-secret-key"
      }
    }
  }
}
```

### Using Direct Token (Legacy)

```json
{
  "mcpServers": {
    "monday-api-mcp": {
      "command": "npx",
      "args": [
        "@mondaydotcomorg/monday-api-mcp",
        "-t",
        "abcd123",
        "--use-nango",
        "false"
      ],
      "env": {}
    }
  }
}
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
