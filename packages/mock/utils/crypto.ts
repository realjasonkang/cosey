import CryptoJS from 'crypto-js';
import Identicon from 'identicon.js';

export function getAvatarBase64(str: string | number) {
  const hash = CryptoJS.MD5(String(str)).toString();

  const avatarData = new Identicon(hash, {
    size: 96,
    format: 'svg',
  }).toString();

  return `data:image/svg+xml;base64,${avatarData}`;
}

export async function calculateMD5Hash(file: File) {
  const arrayBuffer = await new Promise<ArrayBuffer>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.readAsArrayBuffer(file);
  });
  const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer);
  const hash = CryptoJS.MD5(wordArray).toString();
  return hash;
}
