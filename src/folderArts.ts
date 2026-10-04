const folderModules = import.meta.glob('./assets/folders/*.png', {
  eager: true,
  import: 'default',
}) as Record<string, string>

export const folderArts = Object.entries(folderModules)
  .sort(([a], [b]) => {
    const na = Number((a.split('/').pop() ?? '').replace('.png', ''))
    const nb = Number((b.split('/').pop() ?? '').replace('.png', ''))
    return na - nb
  })
  .map(([, src]) => src)

export function folderArtFor(index: number) {
  return folderArts[index] ?? folderArts[0]
}
