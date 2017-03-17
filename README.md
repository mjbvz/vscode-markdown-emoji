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

----

# API Proposal, Take Two (not yet implemented)

Extensions can enhance VSCode's markdown preview by:

* Providing stylesheets for the preview page
* Providing [markdown-it plugins](https://github.com/markdown-it/markdown-it#syntax-extensions) that add support for new markdown syntax

## Changing the Styling of the Markdown Preview
To change the styling of markdown preview page, just add a `markdown.preview` entry to the `contributes` section of your extension's `package.json`, like so:

```json
{
    "contributes": {
        "markdown.preview": {
            "styles": ["./my_custom_style.css"]
        }
    }
}
```

`styles` should be an array of extension relative paths to CSS files. These stylesheets will be included on the markdown preview page, and will be included after the default markdown preview stylings but before the user's custom stylesheets.


## Using Markdown-It Plugins to Support New Markdown Syntax
To support new markdown syntax, first add `markdown-it.plugins` entry in the extension's `package.json`

```json
{
    "contributes": {
        "markdown-it.plugins": true
    }
}
```

This tells VSCode that your extension provides *markdown-it* plugins and that it should be activated before the markdown preview is shown. 

To register the plugins themselves, in your extension's `activate` function, just return an object with an `extendMarkdownIt` method. This method takes a *markdown-it* instance and must return a modified version of that instance.


```ts
export function activate(context: vscode.ExtensionContext) {
    return {
        extendMarkdownIt(md: any): any {
            return md.use(require('markdown-it-emoji'))
        }
    }
}
```

VSCode's markdown extension will invoke `extendMarkdownIt` when the markdown preview is shown for the first time.

> 🎵 **Note**: Your extension can still use other activation points that are triggered before a markdown preview is ever shown. The `plugins` entry only means that your extension will be activated when the preview is first shown if it has not already been activated previously.