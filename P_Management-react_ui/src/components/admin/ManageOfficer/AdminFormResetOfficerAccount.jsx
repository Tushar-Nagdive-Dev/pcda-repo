import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import apiClient from "../../../auth/ApiClient"; // Adjust the import path

function AdminFormResetOfficerAccount() {
  const { id } = useParams(); // Get the user ID from the route parameters
  const navigate = useNavigate();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const form = useForm({
    defaultValues: {
      officer_name: "",
      account_no: "",
      password: "",
    },
  });

  useEffect(() => {
    fetchOfficerData(); // Fetch the officer details when the component mounts
  }, []);

  useEffect(() => {
    form.setValue("password", generatePassword()); // Set a random password initially
  }, []);

  // Function to generate a random password
  const generatePassword = () => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const digits = "0123456789";

    const uppercaseChar = uppercase[Math.floor(Math.random() * uppercase.length)];
    const lowercaseChar = lowercase[Math.floor(Math.random() * lowercase.length)];
    const digitChar = digits[Math.floor(Math.random() * digits.length)];

    const allChars = uppercase + lowercase + digits;
    const remainingChars = Array.from(
      { length: 5 },
      () => allChars[Math.floor(Math.random() * allChars.length)]
    ).join("");

    return (uppercaseChar + lowercaseChar + digitChar + remainingChars)
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  };

  // Fetch officer data from the API
  const fetchOfficerData = async () => {
    try {
      const response = await apiClient.get(`/registration-processing/user/${id}`);
      const data = response.data;

      if (response.status === 200) {
        form.setValue("officer_name", data.officerName);
        form.setValue("account_no", data.accountNo);
        form.setValue("password", data.password);
      }
    } catch (error) {
      console.error("Error fetching officer data:", error);
      toast.error("Failed to fetch officer details.");
    }
  };

  // Generate a new password on button click
  const generatePasswordAction = () => {
    form.setValue("password", generatePassword());
  };

  // Handle form submission
  const onSubmit = async (values) => {
    setIsFormSubmitted(true);
    console.log("Form Values Submitted:", values);

    try {
      // Call your API for password reset or update
      const response = await apiClient.post(
        `/registration-processing/reset-password/${id}`,
        {
          password: values.password,
        }
      );

      if (response.status === 200) {
        toast.success("Password reset successfully!");
        navigate("/admin/dashboard"); // Redirect on success
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Failed to reset password. Please try again.");
    } finally {
      setIsFormSubmitted(false);
    }
  };

  return (
    <div className="bg-adminBreadCrumbsBg flex flex-col p-10 rounded-lg space-y-6">
      <div className="max-w-[750px] w-full flex flex-col mx-auto">
        <h3 className="font-raleway text-2xl text-center font-bold px-5 py-3 bg-newprimaryColor text-white border border-transparent">
          Password Reset
        </h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="border border-t-0 border-adminTextColor px-5 py-3"
          >
            <div className="md:max-lg:space-y-1 space-y-6 mb-7">
              <div className="w-full flex flex-col space-y-4 my-2">
                <div className="flex justify-between">
                  <Label className="text-titleColor font-raleway text-base">
                    Officer Name:
                  </Label>
                  <Label className="text-titleColor font-raleway text-base">
                    {form.watch("officer_name") || "Loading..."}
                  </Label>
                </div>
                <div className="flex justify-between">
                  <Label className="text-titleColor font-raleway text-base">
                    Account Number:
                  </Label>
                  <Label className="text-titleColor font-raleway text-base">
                    {form.watch("account_no") || "Loading..."}
                  </Label>
                </div>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between gap-3">
                      <Label className="text-titleColor text-base font-raleway">
                        Password:
                      </Label>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter Random Password"
                            className="max-w-[300px]"
                          />
                        </FormControl>
                        <button
                          type="button"
                          className="px-3 py-2 rounded-md text-white bg-newprimaryColor"
                          onClick={generatePasswordAction}
                        >
                          Generate
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="w-full flex justify-center gap-3">
              <Button
                type="submit"
                className="w-fit text-white bg-newprimaryColor"
                size="lg"
                disabled={isFormSubmitted}
              >
                Submit
              </Button>
              <Button
                type="button"
                className="w-fit text-adminTextColor border border-newprimaryColor bg-transparent"
                size="lg"
                onClick={() => {
                  form.reset({
                    officer_name: "",
                    account_no: "",
                    password: generatePassword(),
                  });
                  toast.info("Form has been reset.");
                }}
              >
                Reset
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default AdminFormResetOfficerAccount;
