import {
  Accordion,
  AccordionHeader,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import { ReactNode } from 'react'

interface SidebarFieldProps {
  title: string
  children: ReactNode
}

const SidebarField = ({ title, children }: SidebarFieldProps) => {
  return (
    <Accordion
      type="multiple"
      className="w-full pl-5"
    >
      <AccordionItem value={title}>
        <AccordionHeader className="pb-2">
          <AccordionTrigger className="group flex w-full items-center gap-2">
            <p className="font-normal tracking-wider">{title}</p>
            <ChevronDown
              size={16}
              className="transition-all duration-150 group-data-[state=open]:-rotate-90"
            />
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent className="data-[state=closed]:animate-accordion-close data-[state=open]:animate-accordion-open overflow-hidden">
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
export default SidebarField
