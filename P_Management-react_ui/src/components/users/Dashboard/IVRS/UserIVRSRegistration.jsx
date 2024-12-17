import React from 'react'
import { Button } from '@/components/ui/button'
import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogFooter,
 DialogHeader,
 DialogTitle,
 DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
import { useForm } from 'react-hook-form'

function UserIVRSRegistration({ children }) {
 const form = useForm({
  // resolver: zodResolver(),
  defaultValues: {
   mobile_no: '',
   tpin: '',
   reentertpin: '',
   language: '',
  },
 })

 // call api for register phone number
 const onSubmit = async (values) => {
  console.log(values)
 }

 return (
  <Dialog>
   <DialogTrigger asChild>{children}</DialogTrigger>
   <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
     <DialogTitle>Register/Update For IVRS</DialogTitle>
    </DialogHeader>
    <Form {...form} className="overflow-y-auto">
     <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
      <div className="md:max-lg:space-y-1 mid_hd_screen:max-full_hd_screen:space-y-2 space-y-4 mb-8">
       <FormField
        control={form.control}
        name="mobile_no"
        render={({ field }) => (
         <FormItem>
          <FormLabel>Enter Mobile No./Landline no.</FormLabel>
          <FormControl>
           <Input
            //startIcon={UserRound}
            placeholder="Enter Mobile No./Landline no."
            {...field}
            type="text"
           />
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />

       <FormField
        control={form.control}
        name="tpin"
        render={({ field }) => (
         <FormItem>
          <FormLabel>Enter TPIN</FormLabel>
          <FormControl>
           <Input
            //startIcon={UserRound}
            placeholder="Enter TPIN"
            {...field}
            type="text"
           />
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />

       <FormField
        control={form.control}
        name="Re-enter TPIN"
        render={({ field }) => (
         <FormItem>
          <FormLabel>Re-enter TPIN</FormLabel>
          <FormControl>
           <Input
            //startIcon={UserRound}
            placeholder="Re-enter TPIN"
            {...field}
            type="text"
           />
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />

       <FormField
        control={form.control}
        name="language"
        render={({ field }) => (
         <FormItem>
          <FormLabel>Choose your language for IVRS Facility</FormLabel>
          <FormControl>
           <Select onValueChange={field.onChange}>
            <SelectTrigger className="w-full">
             <SelectValue placeholder="Choose Language" />
            </SelectTrigger>
            <SelectContent>
             <SelectItem value="English">English</SelectItem>
             <SelectItem value="Hindi">Hindi</SelectItem>
            </SelectContent>
           </Select>
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />
      </div>

      <DialogFooter className="w-full flex flex-row-reverse">
       <Button
        type="submit"
        className="text-statebluecolor border-statebluecolor border  bg-transparent w-fit"
       >
        Reset
       </Button>
       <Button type="submit" className="text-white bg-statebluecolor w-fit">
        Register/Update
       </Button>
      </DialogFooter>
     </form>
    </Form>
   </DialogContent>
  </Dialog>
 )
}

export default UserIVRSRegistration
