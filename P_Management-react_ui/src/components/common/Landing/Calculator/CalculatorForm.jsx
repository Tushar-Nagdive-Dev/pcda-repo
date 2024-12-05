import React from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
 Form,
 FormControl,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from '@/components/ui/form'
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from '@/components/ui/select'

/* Date Picker */
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import {
 Popover,
 PopoverContent,
 PopoverTrigger,
} from '@/components/ui/popover'

import captchaDemoPic from '@/assets/images/captcha_demo.png'


function CalculatorForm() {
 const form = useForm({
  // resolver: zodResolver(GalleryFormValidation),
  defaultValues: {
   selection_corps: '',
   selection_rank_before: '',
   selection_basic_pay_before: '',
   rank_after_promotion: '',
   date_of_promotion: '',
   date_of_next_increment_promotion: '',
   captcha: '',
  },
 })

 function onSubmit(values) {
  console.log(values)
 }

 return (
  <div className="w-full flex flex-col space-y-6">
   <h3 className="text-2xl font-bold text-darkOrange">Option Calculator For Fixation on Promotion in 7th CPC</h3>
   <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4">
     <FormField
      control={form.control}
      name="selection_corps"
      render={({ field }) => (
       <FormItem>
        <FormLabel className="text-titleColor text-base font-raleway">Select CORPS:</FormLabel>
        <FormControl>
         <Select
          onValueChange={(value) => field.onChange(value)} // Update form value
          // defaultValue={field.value} // Set the default value
         >
          <SelectTrigger className="w-full border-darkOrange ring-darkOrange focus:ring-darkOrange">
           <SelectValue placeholder="Select CORPS" />
          </SelectTrigger>
          <SelectContent>
           <SelectItem value="MNS">
            MNS
           </SelectItem>
           <SelectItem value="NCC">
            NCC
           </SelectItem>
           <SelectItem value="Regular">
            Regular
           </SelectItem>
          </SelectContent>
         </Select>
        </FormControl>
        <FormMessage />
       </FormItem>
      )}
     />
     <div className="grid grid-cols-2 gap-3">
      <FormField
       control={form.control}
       name="selection_rank_before"
       render={({ field }) => (
        <FormItem>
         <FormLabel className="text-titleColor text-base font-raleway">Select Rank Before Promotion</FormLabel>
         <FormControl>
          <Select
           onValueChange={(value) => field.onChange(value)}
          >
           <SelectTrigger className="w-full border-darkOrange ring-darkOrange focus:ring-darkOrange">
            <SelectValue placeholder="Select Present Rank" />
           </SelectTrigger>
           <SelectContent>
            <SelectItem value="Lieutenantt">
             Lieutenant
            </SelectItem>
            <SelectItem value="Captain">
             Captain
            </SelectItem>
            <SelectItem value="Major">
             Major
            </SelectItem>
            <SelectItem value="Colonel">
             Colonel
            </SelectItem>
           </SelectContent>
          </Select>
         </FormControl>
         <FormMessage />
        </FormItem>
       )}
      />

      <FormField
       control={form.control}
       name="selection_basic_pay_before"
       render={({ field }) => (
        <FormItem>
         <FormLabel className="text-titleColor text-base font-raleway">Select Basic Pay Before Promotion</FormLabel>
         <FormControl>
          <Select
           onValueChange={(value) => field.onChange(value)}
          >
           <SelectTrigger className="w-full border-darkOrange ring-darkOrange focus:ring-darkOrange">
            <SelectValue placeholder="Select" />
           </SelectTrigger>
           <SelectContent>
            <SelectItem value="41200">
             41200
            </SelectItem>
            <SelectItem value="43000">
             43000
            </SelectItem>
            <SelectItem value="45000">
             45000
            </SelectItem>
           </SelectContent>
          </Select>
         </FormControl>
        </FormItem>
       )}
      />
     </div>

     <FormField
      control={form.control}
      name="rank_after_promotion"
      render={({ field }) => (
       <FormItem>
        <FormLabel className="text-titleColor text-base font-raleway">Rank After Promotion</FormLabel>
        <FormControl>
         <>
          <Input placeholder="Rank After Promotion" value={'Select Rank and Pay'} disabled={true}
                 className="border-darkOrange ring-darkOrange focus:ring-darkOrange" />
         </>
        </FormControl>
        <FormMessage />
       </FormItem>
      )}
     />

     <div className="grid grid-cols-2 gap-3">
      <FormField
       control={form.control}
       name="date_of_promotion"
       render={({ field }) => (
        <FormItem className="flex flex-col">
         <FormLabel className="text-titleColor text-base font-raleway">Date of Promotion</FormLabel>
         <FormControl>
          <Popover>
           <PopoverTrigger asChild>
            <Button
             variant={'outline'}
             className={cn(
              'justify-start text-left font-normal border-darkOrange ring-darkOrange focus:ring-darkOrange',
              !field.value && 'text-muted-foreground',
             )}
            >
             <CalendarIcon />
             {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
            </Button>
           </PopoverTrigger>
           <PopoverContent className="w-auto p-0">
            <Calendar
             mode="single"
             selected={field.value}
             onSelect={field.onChange}
             initialFocus
            />
           </PopoverContent>
          </Popover>
         </FormControl>
         <FormMessage />
        </FormItem>
       )}
      />

      <FormField
       control={form.control}
       name="date_of_next_increment_promotion"
       render={({ field }) => (
        <FormItem className="flex flex-col">
         <FormLabel className="text-titleColor text-base font-raleway">Date of Next Increment At The Time Of
          Promotion</FormLabel>
         <FormControl>
          <Popover>
           <PopoverTrigger asChild>
            <Button
             variant={'outline'}
             className={cn(
              'justify-start text-left font-normal border-darkOrange ring-darkOrange focus:ring-darkOrange',
              !field.value && 'text-muted-foreground',
             )}
            >
             <CalendarIcon />
             {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
            </Button>
           </PopoverTrigger>
           <PopoverContent className="w-auto p-0">
            <Calendar
             mode="single"
             selected={field.value}
             onSelect={field.onChange}
             initialFocus
            />
           </PopoverContent>
          </Popover>
         </FormControl>
         <FormMessage />
        </FormItem>
       )}
      />
     </div>

     <div className="grid grid-cols-2 gap-3 items-center py-6">
      <img src={captchaDemoPic} className="w-full h-full border border-darkOrange rounded-lg" />
      <FormField
       control={form.control}
       name="captcha"
       render={({ field }) => (
        <FormItem className="flex flex-col">
         <FormLabel className="text-titleColor text-base font-raleway">Enter Captcha</FormLabel>
         <FormControl>
          <>
           <Input placeholder="Enter Captcha" value={field.value}
                  className="border-darkOrange ring-darkOrange focus:ring-darkOrange" />
          </>
         </FormControl>
         <FormMessage />
        </FormItem>
       )}
      />
     </div>

     <div className="w-full flex flex-row-reverse pt-10">
      <div className="flex gap-2">
       <button
        className="w-fit rounded-full md:px-6 hd_screen:px-8 py-3 bg-mainprimarycolor text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
        onClick={() => form.reset()}
       >
        Reset
       </button>
       <button
        className="w-fit rounded-full md:px-6 hd_screen:px-8 py-3 bg-statebluecolor text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
        // onClick={}
       >
        Open Pay Calculator
       </button>
      </div>
     </div>
    </form>
   </Form>
  </div>
 )
}

export default CalculatorForm