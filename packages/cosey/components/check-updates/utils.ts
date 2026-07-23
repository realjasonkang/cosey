export async function getVersionTag() {
  try {
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
      return null;
    }
    const res = await fetch('', {
      cache: 'no-cache',
      method: 'HEAD',
    });

    return res.headers.get('etag') || res.headers.get('last-modified');
  } catch {
    return null;
  }
}
