import React from "react";
import LoginBanner from "@/assets/images/pcdao_officer_login_banner.svg";
import {Link, useNavigate} from "react-router-dom";
import {InputWithIcon} from "../../../ui/inputwithicon.jsx";
import {CheckCircle, Numpad} from "@phosphor-icons/react";

import axios from 'axios'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {Button} from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import {otpValidation} from "./UserLoginWithOTPValidation.js";
import {toast} from "react-toastify";

function UserForgetPassword({phoneNum}) {
    const navigate = useNavigate();
    const form = useForm({
        resolver: zodResolver(otpValidation),
        defaultValues: {
            otp: ''
        },
    });

    const onSubmit = async (values) => {
        const {otp} = values
        console.log(otp);

        /* Once its verified  */
        navigate("/user");
    }
    return (<>
        <div className="text-left mb-5">
            <div className="flex flex-col space-y-3">
                <h2 className="md:max-lg:text-xl mid_hd_screen:max-full_hd_screen:text-3xl text-4xl tracking-tight raleway-font">
                    Login with OTP
                </h2>
            </div>
        </div>

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div
                    className="md:max-lg:space-y-1 mid_hd_screen:max-full_hd_screen:space-y-2 space-y-4 mb-7">
                    <FormField
                        control={form.control}
                        name="otp"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="font-raleway font-light text-base">Please enter OTP sent on mobile
                                    number <span className="font-medium"> {phoneNum}</span></FormLabel>
                                <FormControl>
                                    <InputWithIcon
                                        startIcon={Numpad}
                                        placeholder="Enter OTP"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="text-white w-full bg-statebluecolor">
                        Verify OTP <CheckCircle size={24} color="#ffffff"/>
                    </Button>
                </div>
            </form>
        </Form>

    </>);
}

export default UserForgetPassword;
