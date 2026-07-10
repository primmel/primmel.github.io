export function estimateReadingTime(text: string): string {
  const minutes = Math.max(1, Math.round(wordCount(text) / 200));
  return `${minutes} min read`;
}

export function wordCount(text: string): number {
  const trimmed = text.trim();
  if (trimmed === '') return 0;
  return trimmed.split(/\s+/).length;
}
