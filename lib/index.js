"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const coc_nvim_1 = require("coc.nvim");
const fs_1 = tslib_1.__importDefault(require("fs"));
function activate(context) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let { subscriptions } = context;
        const config = coc_nvim_1.workspace.getConfiguration().get('wxml');
        const enable = config.enable;
        if (enable === false)
            return;
        const file = context.asAbsolutePath('./node_modules/wxml-langserver/lib/wxmlServerMain.js');
        if (!fs_1.default.existsSync(file)) {
            let res = yield coc_nvim_1.workspace.runTerminalCommand('yarn install --production', context.extensionPath);
            if (!res.success)
                return;
        }
        const selector = config.filetypes || ['wxml'];
        let serverOptions = {
            module: file,
            args: ['--node-ipc'],
            transport: coc_nvim_1.TransportKind.ipc,
            options: {
                cwd: coc_nvim_1.workspace.root,
                execArgv: config.execArgv
            }
        };
        let clientOptions = {
            documentSelector: selector,
            synchronize: {
                configurationSection: 'wxml'
            },
            outputChannelName: 'wxml',
            initializationOptions: config.initializationOptions
        };
        let client = new coc_nvim_1.LanguageClient('wxml', 'wxml langserver', serverOptions, clientOptions);
        subscriptions.push(coc_nvim_1.services.registLanguageClient(client));
    });
}
exports.activate = activate;
//# sourceMappingURL=index.js.map