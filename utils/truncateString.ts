export function truncateStringWithEllipsis(str: string): string {
  const maxLength = 150;
  const withoutPTag = str.replaceAll(/<\/?p>/g, '');
  // Check if the string is longer than the maxLength
  if (withoutPTag.length > maxLength) {
    // If so, truncate the string to maxLength and add '...'
    return withoutPTag.substring(0, maxLength) + '...';
  } else {
    // If not, return the string as is
    return withoutPTag;
  }
}
