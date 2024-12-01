import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { NewsandNotificationValidation } from "./NewsAndNotificationFormValidation";
import { useParams } from "react-router-dom";

function EditNewsAndNotificationForm() {
  /* To current selected Id from params */
  const { id } = useParams();
  const form = useForm({
    resolver: zodResolver(NewsandNotificationValidation),
    /* Set this defaultvalues from backend data */
    defaultValues: {
      title: "",
      title_hindi: "",
      type: "",
      status: "",
      new: "",
    },
  });

  function onSubmit(values) {
    console.log(values);
  }
  return (
    <div className="bg-adminBreadCrumbsBg flex flex-col p-10 rounded-lg">
      <h3 className="font-raleway text-2xl text-center font-bold">
        Edit News Flash
      </h3>
      <div className="flex flex-col space-y-3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="md:max-lg:space-y-1 space-y-6 mb-7">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title_hindi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title in Hindi</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter title in Hindi" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

<div className="w-full grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-titleColor text-base font-raleway">
                        Type
                      </FormLabel>
                      <FormControl >
                        <Select
                          
                          onValueChange={(value) => field.onChange(value)} // Update form value
                          // defaultValue={field.value} // Set the default value
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="News & Notification">
                              News & Notification
                            </SelectItem>
                            <SelectItem value="News">News</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-titleColor text-base font-raleway">
                        Status
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => field.onChange(value)} // Update form value
                          // defaultValue={field.value} // Set the default value
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="In-Active">In-Active</SelectItem>
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
                name="new"
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
                    <FormLabel>New</FormLabel>
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
  );
}

export default EditNewsAndNotificationForm;
