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
import { Input } from '../../ui/input.jsx'
import UserMobileOtpRegistration from './UserMobileOTPRegistration.jsx'

function UserMobileRegistration() {
 const [phoneNum, setPhoneNum] = useState('99XXXXXX99') // Set Phone Number from backend
 const [isPhoneRegistredAPI, setIsPhoneRegistredAPI] = useState(false) // Set True if phone number is called backend and get otp
 const form = useForm({
  // resolver: zodResolver(),
  defaultValues: {
   phoneNumber: '',
  },
 })

 useEffect(() => {}, [isPhoneRegistredAPI])

 // call api for register phone number
 const onSubmit = async (values) => {
  const { phoneNumber } = values
  console.log('Phone Number', phoneNumber)
  setIsPhoneRegistredAPI(true)
 }

 return (
  <React.Fragment>
   {isPhoneRegistredAPI ? (
    <UserMobileOtpRegistration phoneNum={phoneNum} />
   ) : (
    <div className="w-full h-full flex flex-col justify-center items-center space-y-10">
     <h2 className="text-xl font-raleway">Mobile Registration</h2>
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
           <FormLabel>Mobile Number:</FormLabel>
           <FormControl>
            <Input
             //startIcon={UserRound}
             placeholder="Enter Your Mobile Number"
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

export default UserMobileRegistration
