import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginValidation } from "./LoginValidationSchema";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import captchaDemoPic from "@/assets/images/captcha_demo.png";
import { Numpad, SignIn } from "@phosphor-icons/react";
import { InputWithIcon } from "../ui/inputwithicon";
import { KeyRound, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../auth/ApiClient";

function LoginComponent() {
  const navigate = useNavigate()
  const form = useForm({
    resolver: zodResolver(LoginValidation),
    defaultValues: {
      userid: "",
      password: "",
      captcha: "",
    },
  });

  const [captchaImage, setCaptchaImage] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch captcha on component mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = async () => {
    try {
      const response = await axios.get("http://localhost:8888/auth/generate");
      const { captchaImage, token } = response.data;

      if (captchaImage && token) {
        setCaptchaImage(captchaImage);
        setCaptchaToken(token);
      } else {
        setError("Failed to load captcha. Please try again.");
      }
    } catch (err) {
      setError("Error fetching captcha. Please try again.");
    }
  };

  const onSubmit = async (values) => {
    const { userid, password, captcha } = values;

    if (!captcha) {
      setError("Please enter the captcha.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8888/auth/login", {
        username: userid,
        password,
        captchaToken,
        captchaInput: captcha,
      });
      setSuccess(response.data.message);
      setError("");
      setToken(response.data.token);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
      setSuccess("");
      generateCaptcha(); // Refresh captcha on failure
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4 mb-7">
              {/* User ID Field */}
              <FormField
                control={form.control}
                name="userid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User ID</FormLabel>
                    <FormControl>
                      <InputWithIcon
                        startIcon={UserRound}
                        placeholder="Enter User ID"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <InputWithIcon
                        startIcon={KeyRound}
                        placeholder="Enter Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Captcha Field */}
              <div className="space-y-3 text-center">
                {captchaImage ? (
                  <img
                    src={captchaImage}
                    alt="captcha"
                    className="mb-3"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                ) : (
                  <img
                    src={captchaDemoPic}
                    alt="captcha placeholder"
                    className="h-full"
                  />
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
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputWithIcon
                        startIcon={Numpad}
                        placeholder="Enter Captcha"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="text-white w-full bg-statebluecolor">
              Sign In <SignIn size={24} color="#ffffff" />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default LoginComponent;
