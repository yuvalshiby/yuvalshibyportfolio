import './case-studies.css'
import { BreatherCaseStudy } from './BreatherCaseStudy'
import { CaseStudyChrome } from './chrome'
import { DeprogramCaseStudy } from './DeprogramCaseStudy'
import { SilentPatientCaseStudy } from './SilentPatientCaseStudy'
import { CatalogCaseStudy } from './CatalogCaseStudy'
import { MealkeaCaseStudy } from './MealkeaCaseStudy'
import { DeadlyGreetingsCaseStudy } from './DeadlyGreetingsCaseStudy'
import { BojackHorsemanCaseStudy } from './BojackHorsemanCaseStudy'
import { YashkaCaseStudy } from './YashkaCaseStudy'
import { AsayanCaseStudy } from './AsayanCaseStudy'

export const caseStudySlugs = [
  'BREATHER',
  'CATALOG',
  'DEPROGRAM',
  'THE SILENT PATIENT',
  'DEADLY GREETING',
  'MEALKEA',
  'BOJACK HORSEMAN',
  'YASHKA',
  'ASAYAN',
] as const

export type CaseStudySlug = (typeof caseStudySlugs)[number]

export function hasCaseStudy(slug: string): slug is CaseStudySlug {
  return caseStudySlugs.includes(slug as CaseStudySlug)
}

type Props = {
  slug: CaseStudySlug
  onProjects: () => void
}

export function CaseStudy({ slug, onProjects }: Props) {
  const page =
    slug === 'BREATHER' ? (
      <BreatherCaseStudy onProjects={onProjects} />
    ) : slug === 'CATALOG' ? (
      <CatalogCaseStudy onProjects={onProjects} />
    ) : slug === 'DEPROGRAM' ? (
      <DeprogramCaseStudy onProjects={onProjects} />
    ) : slug === 'THE SILENT PATIENT' ? (
      <SilentPatientCaseStudy onProjects={onProjects} />
    ) : slug === 'MEALKEA' ? (
      <MealkeaCaseStudy onProjects={onProjects} />
    ) : slug === 'BOJACK HORSEMAN' ? (
      <BojackHorsemanCaseStudy onProjects={onProjects} />
    ) : slug === 'YASHKA' ? (
      <YashkaCaseStudy onProjects={onProjects} />
    ) : slug === 'ASAYAN' ? (
      <AsayanCaseStudy onProjects={onProjects} />
    ) : (
      <DeadlyGreetingsCaseStudy onProjects={onProjects} />
    )

  return <CaseStudyChrome onBack={onProjects}>{page}</CaseStudyChrome>
}
