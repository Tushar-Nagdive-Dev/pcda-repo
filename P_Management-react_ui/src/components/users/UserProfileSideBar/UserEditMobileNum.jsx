import React, {useEffect, useState} from 'react';
import {InputWithIcon} from "../../ui/inputwithicon.jsx";
import { Input } from "../../ui/input"
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

function UserEditMobileNum() {
    const form = useForm({
        resolver: zodResolver(),
        defaultValues: {
            oldmobilenumber: '',
            newmobilenumber: '',
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
        const {oldmobilenumber, newmobilenumber, captcha} = values


        if(oldmobilenumber === newmobilenumber) {
            toast.error('Old Phone number and new phone number cannot be match');
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
                        name="oldmobilenumber"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Old Mobile Number</FormLabel>
                                <FormControl>
                                    <Input
                                        //startIcon={UserRound}
                                        placeholder="Enter Old Mobile Number"
                                        {...field}
                                        type="text"
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="newmobilenumber"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>New Mobile Number</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter New Mobile Number"
                                        {...field}
                                        type="text"
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

export default UserEditMobileNum;