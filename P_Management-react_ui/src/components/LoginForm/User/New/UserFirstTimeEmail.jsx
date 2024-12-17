import React, { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { toast } from 'react-toastify'

import { Button } from '@/components/ui/button'
import {
 Form,
 FormControl,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from '@/components/ui/form'
import UserFirstTimeCreateAccount from './UserFirstTimeCreateAccount.jsx'
import { Input } from '../../../ui/input.jsx'

function UserFirstTimeEmail() {
 const [isEmailRegistred, setIsEmailRegistred] = useState(false) // Set True if email registered on backend
 const form = useForm({
  // resolver: zodResolver(),
  defaultValues: {
   email: '',
  },
 })

 useEffect(() => {}, [isEmailRegistred])

 // call api for register email
 const onSubmit = async (values) => {
  const { email } = values
  console.log('Email', email)
  setIsEmailRegistred(true)
 }

 return (
  <React.Fragment>
   {isEmailRegistred ? (
    <UserFirstTimeCreateAccount />
   ) : (
    <div className="w-full h-full flex flex-col justify-center items-center space-y-10">
     <h2 className="text-xl font-raleway">Email Registration</h2>
     <Form {...form}>
      <form
       onSubmit={form.handleSubmit(onSubmit)}
       className="overflow-y-auto px-20 w-full"
      >
       <div className="md:max-lg:space-y-1 mid_hd_screen:max-full_hd_screen:space-y-2 space-y-4 mb-8">
        <FormField
         control={form.control}
         name="phoneNumber"
         render={({ field }) => (
          <FormItem>
           <FormLabel>Email id:</FormLabel>
           <FormControl>
            <Input
             //startIcon={UserRound}
             placeholder="Enter Your Email id"
             {...field}
             type="text"
            />
           </FormControl>
           <FormMessage />
          </FormItem>
         )}
        />
       </div>

       <Button type="submit" className="text-white w-full bg-statebluecolor">
        Submit
       </Button>
      </form>
     </Form>
    </div>
   )}
  </React.Fragment>
 )
}

export default UserFirstTimeEmail
