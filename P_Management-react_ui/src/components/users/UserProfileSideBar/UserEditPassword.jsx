import React, {useEffect, useState} from 'react';
import {InputWithIcon} from "../../ui/inputwithicon.jsx";
import { Input } from "../../ui/input"
import {KeyRound, UserRound} from "lucide-react";
import {Numpad, SignIn} from "@phosphor-icons/react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import axios from "axios";
import {toast} from "react-toastify";

import {Button} from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'

function UserEditPassword() {
    const form = useForm({
        resolver: zodResolver(),
        defaultValues: {
            currentpassword: '',
            newpassword: '',
            confirmnewpassword: '',
            captcha: '',
        },
    })

    const [captchaImage, setCaptchaImage] = useState('')
    const [captchaToken, setCaptchaToken] = useState('')


    // Fetch captcha when the component mounts
    useEffect(() => {
        generateCaptcha()
    }, [])

    const generateCaptcha = async () => {
        try {
            const response = await axios.get('http://localhost:8888/auth/generate')
            const {captchaImage, token} = response.data

            if (captchaImage && token) {
                setCaptchaImage(captchaImage)
                setCaptchaToken(token)
            } else {
                toast.error('Failed to load captcha. Please try again.')
            }
        } catch (err) {
            toast.error('Failed to load captcha. Please try again.')
        }
    }

    const onSubmit = async (values) => {
        const {currentpassword, newpassword, confirmnewpassword, captcha} = values


        if(confirmnewpassword !== newpassword) {
            toast.error('New password and confirm new password aren\'t match');
            return;
        }

        if (!captcha) {
            toast.error('Please enter the captcha.')
            return;
        }
    }
    return (
        <Form {...form} className="overflow-y-auto">
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div
                    className="md:max-lg:space-y-1 mid_hd_screen:max-full_hd_screen:space-y-2 space-y-4 mb-8">
                    <FormField
                        control={form.control}
                        name="currentpassword"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Current Password</FormLabel>
                                <FormControl>
                                    <Input
                                        //startIcon={UserRound}
                                        placeholder="Enter Current Password"
                                        {...field}
                                        type="password"
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="newpassword"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter New Passsword"
                                        {...field}
                                        type="password"
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmnewpassword"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Confirm New Password</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter Confirm New Passsword"
                                        {...field}
                                        type="password"
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <div className="space-y-3">
                        {captchaImage ? (
                            <img src={captchaImage} alt="captcha code" className="max-h-16 w-full"/>
                        ) : (
                            <p>Loading captcha...</p>
                        )}
                        <p
                            className="text-statebluecolor cursor-pointer"
                            onClick={generateCaptcha}
                        >
                            Refresh
                        </p>
                    </div>

                    <FormField
                        control={form.control}
                        name="captcha"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <InputWithIcon
                                        startIcon={Numpad}
                                        placeholder="Enter Captcha"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>

                <Button type="submit" className="text-white w-full bg-statebluecolor">
                    Submit
                </Button>
            </form>
        </Form>
    );
}

export default UserEditPassword;