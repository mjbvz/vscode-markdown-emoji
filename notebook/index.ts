/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import type MarkdownIt from 'markdown-it';
import type { RendererContext } from 'vscode-notebook-renderer';
import emoji from 'markdown-it-emoji';

export async function activate(ctx: RendererContext<void>) {
    const markdownItRenderer = (await ctx.getRenderer('vscode.markdown-it-renderer')) as undefined | any;
	if (!markdownItRenderer) {
        throw new Error(`Could not load 'vscode.markdown-it-renderer'`);
	}

	markdownItRenderer.extendMarkdownIt((md: MarkdownIt) => {
		return md.use(emoji);
	});
}
