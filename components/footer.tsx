import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/site-config'

export default function Footer() {
  return (
    <footer className="text-muted-foreground my-2 text-sm">
      © {new Date().getFullYear()}{' '}
      <Button variant="link" className="text-muted-foreground p-0 font-medium">
        <a href={siteConfig.links.mailTo}>{siteConfig.creator}</a>
      </Button>
      . All rights reserved.
    </footer>
  )
}