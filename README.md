# OpenAI Provider Plugin for 302 AI Studio

Official OpenAI API provider plugin for [302 AI Studio](https://github.com/302ai/302-AI-Studio-SV).

## Features

- 🚀 Support for all GPT models (GPT-3.5, GPT-4, GPT-4 Turbo, GPT-4o)
- 🧠 Support for reasoning models (o1, o3)
- 👁️ Vision capabilities (GPT-4 Vision, GPT-4o)
- 🔧 Function calling support
- 🌐 Custom base URL support (for proxies)
- 🏢 Organization ID support

## Installation

### Via Plugin Marketplace

1. Open 302 AI Studio
2. Go to Settings → Plugins → Marketplace
3. Search for "OpenAI Provider"
4. Click "Install"

### Manual Installation

1. Download the latest `.zip` file from [Releases](https://github.com/302ai/openai-plugin/releases)
2. In 302 AI Studio, go to Settings → Plugins
3. Click "Install from File" and select the downloaded ZIP

## Configuration

After installation, configure the plugin:

1. Go to Settings → Providers
2. Select "OpenAI" provider
3. Enter your OpenAI API key
4. (Optional) Configure custom base URL or organization ID

### Configuration Options

- **API Key** (required): Your OpenAI API key from [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- **Base URL** (optional): Custom API endpoint (default: `https://api.openai.com/v1`)
- **Organization ID** (optional): Your OpenAI organization ID for multi-org accounts

## Supported Models

This plugin automatically fetches and supports all available GPT models from your OpenAI account, including:

- GPT-4o and GPT-4o mini
- GPT-4 Turbo and GPT-4
- GPT-3.5 Turbo
- o1 and o3 (reasoning models)

## Development

### Prerequisites

- Node.js 20+
- pnpm 8+

### Setup

```bash
# Install dependencies
pnpm install

# Build plugin
pnpm run build

# Package as ZIP
pnpm run package
```

### Project Structure

```
openai-plugin/
├── src/
│   └── index.ts          # Plugin implementation
├── dist/                 # Compiled output (generated)
├── plugin.json           # Plugin metadata
├── package.json
├── tsconfig.json
├── tsup.config.ts
└── scripts/
    └── package.js        # ZIP packaging script
```

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Links

- [302 AI Studio](https://github.com/302ai/302-AI-Studio-SV)
- [Plugin SDK Documentation](https://github.com/302ai/302-AI-Studio-SV/tree/main/packages/plugin-sdk)
- [OpenAI Documentation](https://platform.openai.com/docs)
- [Report Issues](https://github.com/302ai/openai-plugin/issues)
