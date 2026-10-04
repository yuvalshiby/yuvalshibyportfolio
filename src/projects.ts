const imageModules = import.meta.glob(
  './images/*.{png,jpg,jpeg,webp,gif,avif}',
  {
    eager: true,
    import: 'default',
  },
) as Record<string, string>

const preferredOrder = [
  'ASAYAN',
  'MEALKEA',
  'YASHKA',
  'BREATHER',
  'CATALOG',
  'DEADLY GREETING',
  'DEPROGRAM',
  'BOJACK HORSEMAN',
  'THE SILENT PATIENT',
]

function slugFromPath(path: string) {
  const file = path.split('/').pop() ?? ''
  return file.replace(/\.[^.]+$/, '')
}

function titleFromSlug(slug: string) {
  if (/[\u0590-\u05FF]/.test(slug)) return slug
  return slug
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

export type Project = {
  slug: string
  title: string
  image: string
}

export const projects: Project[] = Object.entries(imageModules)
  .map(([path, image]) => {
    const slug = slugFromPath(path)
    return {
      slug,
      image,
      title: titleFromSlug(slug),
    }
  })
  .sort((a, b) => {
    const aIndex = preferredOrder.indexOf(a.slug)
    const bIndex = preferredOrder.indexOf(b.slug)
    const aRank = aIndex === -1 ? preferredOrder.length : aIndex
    const bRank = bIndex === -1 ? preferredOrder.length : bIndex
    return aRank - bRank || a.title.localeCompare(b.title)
  })

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}

export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug)
  if (index === -1 || projects.length === 0) return undefined
  return projects[(index + 1) % projects.length]
}
