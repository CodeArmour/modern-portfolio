import React, { ReactNode } from 'react'

type Props = {
  heading: string
  content?: ReactNode
}

export default function SectionHeading({ heading, content }: Props) {
  return (
    <div className="mb-10 text-center">
      <h2 className="font-heading text-3xl font-bold">{heading}</h2>
      {content && (
        <p className="text-muted-foreground mt-3 text-sm">{content}</p>
      )}
    </div>
  )
}