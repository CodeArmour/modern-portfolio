import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { useActiveSection } from '@/components/context/active-section-provider'
import type { SectionName } from '@/lib/types'

export const useSectionInView = (
  sectionName: SectionName,
  threshold = 0.75,
) => {
  const { ref, inView } = useInView({
    threshold,
  })

  const { setActiveSection, timeOfLastClick } = useActiveSection()

  useEffect(() => {
    console.log(`${sectionName} inView:`, inView) // Debug log
    if (inView && Date.now() - timeOfLastClick > 1000) {
      setActiveSection(sectionName)
    }
  }, [inView, sectionName, setActiveSection, timeOfLastClick])

  return {
    ref,
    inView, // Return this for debugging
  }
}