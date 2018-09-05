import { ExtensionContext, LanguageClient, ServerOptions, workspace, services, TransportKind, LanguageClientOptions } from 'coc.nvim'

export async function activate(context: ExtensionContext): Promise<void> {
  let { subscriptions } = context
  const config = workspace.getConfiguration().get('wxml') as any
  const enable = config.enable
  if (enable === false) return
  const file = require.resolve('wxml-langserver')
  if (!file) return
  const selector = config.filetypes || ['wxml']

  let serverOptions: ServerOptions = {
    module: file,
    args: ['--node-ipc'],
    transport: TransportKind.ipc,
    options: {
      cwd: workspace.root,
      execArgv: config.execArgv
    }
  }

  let clientOptions: LanguageClientOptions = {
    documentSelector: selector,
    synchronize: {
      configurationSection: 'wxml'
    },
    outputChannelName: 'wxml',
    initializationOptions: config.initializationOptions
  }

  let client = new LanguageClient('wxml', 'wxml langserver', serverOptions, clientOptions)

  subscriptions.push(
    services.registLanguageClient(client)
  )
}
