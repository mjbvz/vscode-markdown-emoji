'use strict'
import * as vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {
    const markdown = vscode.extensions.getExtension('Microsoft.vscode-markdown')
    if (!markdown) {
        return
    }

     markdown.activate().then(() => markdown.exports.addPlugin(plugin))
}

function plugin(md: any): any {
    return md.use(require('markdown-it-emoji'))
}