import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const SubAccordion = AccordionPrimitive.Root

const SubAccordionItem = React.forwardRef(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn(
    "rounded-lg transition-all",
    "data-[state=open]:bg-selectedSecondary ", 
    "data-[state=closed]:bg-white ",
    className
    )} {...props} />
))
SubAccordionItem.displayName = "AccordionItem"

const SubAccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium hover:underline rounded-md px-5 transition-all [&[data-state=open]>svg]:rotate-180",
        "text-mainprimarycolor",
        className
      )}
      {...props}>
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
SubAccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const SubAccordionContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="p-5 rounded-b-lg overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}>
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))

SubAccordionContent.displayName = AccordionPrimitive.Content.displayName

export { SubAccordion, SubAccordionItem, SubAccordionTrigger, SubAccordionContent }


{/* <AccordionPrimitive.Trigger
ref={ref}
className={cn(
  "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
  className
)}
{...props}>
{children}
<ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
</AccordionPrimitive.Trigger> */}