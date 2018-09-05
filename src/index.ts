import { ExtensionContext, LanguageClient, ServerOptions, workspace, services, TransportKind, LanguageClientOptions } from 'coc.nvim'
import fs from 'fs'

export async function activate(context: ExtensionContext): Promise<void> {
  let { subscriptions } = context
  const file = context.asAbsolutePath('./node_modules/wxml-langserver/lib/wxmlServerMain.js')
  if (!fs.existsSync(file)) {
    let res = await workspace.runTerminalCommand('yarn install', context.extensionPath)
    if (!res.success) return
  }
  const config = workspace.getConfiguration().get('wxml') as any
  const enable = config.enable
  if (enable === false) return
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
