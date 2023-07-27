export const patterns = {
	h1: /^#\s+(.+)$/gm,
	h2: /^##\s+(.+)$/gm,
	h3: /^###\s+(.+)$/gm,
	h4: /^####\s+(.+)$/gm,
	h5: /^#####\s+(.+)$/gm,
	h6: /^######\s+(.+)$/gm,
	p: /^(?!#{1,6}\s)((?!<(pre|blockquote|Text)\b[^>]*>)(?!.*<\/(pre|blockquote|Text)>$)((?!(?:[-*+\s]+|\d+\.\s+|#\s+|.*?\|.*?\||!\[.*?\]\(.*?\)|```\s*\n(?:.|\n)+?```| {4}(?:.|\n)+?))(?:.|\n)+?))(?=\n{2,}|$)/gm,
	bold: /\*\*(.+?)\*\*/g,
	italic: /([*_])(.*?)\1/g,
	li: /^\s*[-|\\*]\s+(.*)$/gm,
	ul: /(<li.*<\/li>)(?![\s\S]*<\/ul>)/gs,
	ol: /^(?:\d+\.\s+.+$(?:\n(?!$).+)*(?:\n|$))+/gm,
	image: /!\[(.*?)\]\((.*?)\)/g,
	link: /\[(.+?)\]\((.*?)\)/g,
	blockQuote: /^>(?: .+?(?:\n|$))+/gm,
	nestedBlockQuote: /^>( .+?(?:\n|$))+/gm,
	codeBlocks: /```(?:[\s\S]*?\n)?([\s\S]*?)\n```/g,
	codeInline: /(?<!`)(`{1,2})(?!`)(.*?)(?<!`)\1(?!`)/g,
	br: / {2}\n/g,
	hr: /^-{3,}$/gm,
	table: /((?:^|\n)(?:\|[^\n]*?)+\|\n)((?:^|\n)(?:\|(?:[\s\S]*?[^\\])?\|[^\n]*)+\|\n)+/gm,
	strikethrough: /~~(.+?)~~/g,
}
