export function estimateReadingTime(text: string): string {
  const minutes = Math.max(1, Math.round(wordCount(text) / 200));
  return `${minutes} min read`;
}

export function wordCount(text: string): number {
  const trimmed = text.trim();
  if (trimmed === '') return 0;
  return trimmed.split(/\s+/).length;
}

export function makeExcerpt(text: string, maxLen = 200): string {
  const plain = text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#*`>\-]/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (plain.length <= maxLen) return plain;
  return plain.slice(0, maxLen) + '…';
}
