'use strict'
import * as vscode from 'vscode'

export function activate(context) {
    return {
        extendMarkdownIt(md) {
            return md.use(require('markdown-it-emoji'));
        }
    }
}
