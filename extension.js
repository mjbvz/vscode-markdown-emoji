//@ts-check
'use strict'

function activate() {
    return {
        extendMarkdownIt(md) {
            return md.use(require('markdown-it-emoji'));
        }
    };
}
exports.activate = activate;
