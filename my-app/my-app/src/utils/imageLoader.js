export async function fetchImageManifest() {
  try {
    const res = await fetch('/img/images.json')
    if (!res.ok) throw new Error('no-manifest')
    const data = await res.json()
    if (Array.isArray(data) && data.length) return data.map(p => (p.startsWith('/') ? p : '/' + p))
    return []
  } catch (e) {
    return []
  }
}

export function fallbackImageList(count = 12) {
  const arr = []
  for (let i = 1; i <= count; i++) arr.push(`/img/${i}.jpg`)
  return arr
}

export async function getAvailableImages() {
  const manifest = await fetchImageManifest()
  if (manifest.length) return manifest
  // fallback: try a reasonable set of candidates; the app will rely on the static server to serve them
  return fallbackImageList(20)
}

export function randomFrom(arr) {
  if (!arr || arr.length === 0) return null
  return arr[Math.floor(Math.random() * arr.length)]
}

export async function getRandomImage() {
  const list = await getAvailableImages()
  return randomFrom(list)
}
