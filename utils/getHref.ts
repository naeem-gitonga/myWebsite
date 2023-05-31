export default function getHref(redirectUrl: string): string {
  let href = '';
  if (redirectUrl.includes('&where=')) {
    const [url, where] = redirectUrl.split('&where=');
    href = `/interstitial?url=${url}&siteName=${where}`;
  }

  if (redirectUrl.includes('?where=')) {
    const [url, where] = redirectUrl.split('?where=');
    href = `/interstitial?url=${url}&siteName=${where}`;
  }
  return href;
}
