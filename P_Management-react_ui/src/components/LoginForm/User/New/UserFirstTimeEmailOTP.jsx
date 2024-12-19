import React, { useContext, useState } from 'react'
import { DemoUserFlowContext } from '../../../../context/DemoUserFlowPurposeContext'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
 Form,
 FormControl,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from '@/components/ui/form'

function UserFirstTimeEmailOTP() {
 const [email, setEmail] = useState('example@example.com')
 const [isVerifiedEmail, setIsVerifiedEmail] = useState(false)
 const demouserloginctx = useContext(DemoUserFlowContext)
 const form = useForm({
  // resolver: zodResolver(),
  defaultValues: {
   email_otp: '',
  },
 })

 // call api for register phone number
 const onSubmit = async (values) => {
  const { otp } = values
  setIsVerifiedEmail(true)
  demouserloginctx.setIsRegisteredUser(true)
 }
 return (
  <>
   {isVerifiedEmail ? (
    <div className="flex flex-col space-y-4 justify-center items-center h-full">
     <h2 className="text-xl font-raleway text-green-500">
      Verification Successful!!
     </h2>
     <p className="font-raleway">
      Your EMAIL ID and PHONE NUMBER has been successfully verified.
     </p>
     <p className="font-raleway">Please Log in again access your dashboard.</p>
     <Link to={'/login'} className="px-6 py-3 text-white bg-statebluecolor">
      Login Again
     </Link>
    </div>
   ) : (
    <div className="w-full h-full flex flex-col justify-center items-center space-y-10">
     <h2 className="text-xl font-raleway">Email Registration</h2>
     <Form {...form} className="overflow-y-auto">
      <form onSubmit={form.handleSubmit(onSubmit)} className="px-20 w-full">
       <div className="md:max-lg:space-y-1 mid_hd_screen:max-full_hd_screen:space-y-2 space-y-4 mb-8">
        <FormField
         control={form.control}
         name="email_otp"
         render={({ field }) => (
          <FormItem>
           <FormLabel>
            Please enter OTP sent on email:
           </FormLabel>
           <FormControl>
            <Input
             //startIcon={UserRound}
             placeholder="Enter OTP"
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
  </>
 )
}

export default UserFirstTimeEmailOTP
