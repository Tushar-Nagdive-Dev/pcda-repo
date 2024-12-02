import React from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
 Form,
 FormControl,
 FormDescription,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from "@/components/ui/form";
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import { FAQValidation } from './FAQFormValidation.js'
import AdminFormTable from '../AdminFormTable.jsx'
import { PlusIcon } from 'lucide-react'

function AdminFAQFillForm() {
 const form = useForm({
  resolver: zodResolver(FAQValidation),
  defaultValues: {
   /* It dont need to store in useForm, use Customized as per your standard */
   question: "" ,
   answer: "",
   wing: "",
   section: "",
   active: "",
  },
 });


 function onSubmit(values) {
  console.log(values);
 }
 return (
  <div className="bg-adminBreadCrumbsBg flex flex-col p-10 rounded-lg">
   <h3 className="font-raleway text-2xl text-center font-bold">
    Add FAQ Module
   </h3>
   <div className="flex flex-col space-y-3">
    <Form {...form}>
     <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="md:max-lg:space-y-1 space-y-6 mb-7">
       <FormField
        control={form.control}
        name="question"
        render={({ field }) => (
         <FormItem>
          <FormLabel className="text-titleColor text-base font-raleway">Question:</FormLabel>
          <FormControl>
           <Input placeholder={"Type Question here"} {...field} />
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />
        <FormField
         control={form.control}
         name="answer"
         render={({ field }) => (
          <FormItem>
           <FormLabel className="text-titleColor text-base font-raleway">Name</FormLabel>
           <FormControl>
            <Textarea placeholder="Type here" {...field} />
           </FormControl>
           <FormMessage />
          </FormItem>
         )}
        />
        <div className="w-full grid grid-cols-2 gap-2">
         <FormField
          control={form.control}
          name="wing"
          render={({ field }) => (
           <FormItem>
            <FormLabel className="text-titleColor text-base font-raleway">
             Wing
            </FormLabel>
            <FormControl>
             <Select
              onValueChange={(value) => field.onChange(value)} // Update form value
              // defaultValue={field.value} // Set the default value
             >
              <SelectTrigger className="w-full">
               <SelectValue placeholder="Select Wing" />
              </SelectTrigger>
              <SelectContent>
               <SelectItem value="Ledger">
                Ledger
               </SelectItem>
               <SelectItem value="Transportation">Transportation</SelectItem>
              </SelectContent>
             </Select>
            </FormControl>
            <FormMessage />
           </FormItem>
          )}
         />
         <FormField
          control={form.control}
          name="Section"
          render={({ field }) => (
           <FormItem>
            <FormLabel className="text-titleColor text-base font-raleway">
             Section
            </FormLabel>
            <FormControl>
             <Select
              onValueChange={(value) => field.onChange(value)} // Update form value
              // defaultValue={field.value} // Set the default value
             >
              <SelectTrigger className="w-full">
               <SelectValue placeholder="Select Section" />
              </SelectTrigger>
              <SelectContent>
               <SelectItem value="general">General</SelectItem>
               {/* Add more option here*/}
              </SelectContent>
             </Select>
            </FormControl>
            <FormMessage />
           </FormItem>
          )}
         />
        </div>

        <FormField
         control={form.control}
         name="active"
         render={({ field }) => (
          <FormItem className="flex gap-2 items-center">
           <FormControl>
            <>
             <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
             />
            </>
           </FormControl>
           <FormLabel className="text-titleColor text-base font-raleway">Active</FormLabel>
           <FormMessage />
          </FormItem>
         )}
        />

       </div>
       <div className="w-full flex justify-center">
        <Button
         type="submit"
         className="w-fit text-white  bg-newprimaryColor"
         size="lg"
        >
         Submit
        </Button>
       </div>
     </form>
    </Form>
   </div>
  </div>
)
}

export default AdminFAQFillForm