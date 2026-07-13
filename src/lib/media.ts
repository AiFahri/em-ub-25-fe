/**
 * Resolusi URL media/gambar.
 *
 * Backend lama menyimpan gambar di host `https://is3.cloudhost.id/emub/`
 * (kini nonaktif) dan hanya mengirim path relatif. Beberapa komponen
 * menempelkan host itu di depan nilai `imageUrls`.
 *
 * Helper ini membuat penempelan host tersebut AMAN: bila nilai sudah berupa
 * URL absolut (http/https) atau path lokal (diawali "/"), nilai dipakai apa
 * adanya — sehingga URL gambar dari internet (mis. Unsplash) atau aset lokal
 * tidak dirusak. Selain itu, path relatif tetap ditempel ke host lama
 * (kompatibel bila backend diaktifkan kembali).
 */

const LEGACY_IMAGE_HOST = 'https://is3.cloudhost.id/emub/';

export function resolveMediaUrl(url?: string | null): string | undefined {
  if (!url) return undefined;
  const trimmed = url.trim();
  if (trimmed === '') return undefined;
  if (/^https?:\/\//i.test(trimmed)) return trimmed; // sudah URL penuh
  if (trimmed.startsWith('/')) return trimmed; // aset lokal /public
  return `${LEGACY_IMAGE_HOST}${trimmed.replace(/^\/+/, '')}`;
}
