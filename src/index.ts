import type MarkdownIt from 'markdown-it';
import * as emoji from 'markdown-it-emoji';

export function activate() {
    return {
        extendMarkdownIt(md: MarkdownIt) {
            return md.use(emoji);
        }
    };
}

