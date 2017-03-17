# VSCode Markdown Emoji

> **⚠️Warning⚠️** This extension depends on an experimental vscode API that is subject to change or removal.


Demonstrates how VSCode's builtin Markdown preview can be extended by other extensions. This extension adds emoji support to the preview.

## Enabling

1. Using a VSCode insiders from March 17th+
1. Install the VSIX for this extension
1. Add the setting `"markdown.enableExperimentalExtensionApi": true` to your workspace.


## Markdown Preview Extension Points
To extend VSCode's built-in markdown preview, create an extension that activates on the `"_markdown.onActivateExtensions"` event. 

The extension can then register Markdown-it plugins with VSCode's built-in markdown parser by calling `addPlugin` on the markdown extensions exports:

```ts
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
```
