import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiClient from "../../../auth/ApiClient"; // Adjust path as per your project structure

function AdminUploadOfficerForm() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [progress, setProgress] = useState(0);

  const form = useForm({
    defaultValues: {
      json_file: "",
    },
  });

  // Handle file selection and validation
  const handleFileChange = (event, field) => {
    const uploadFile = event.target.files[0];

    if (uploadFile) {
      // Validate file type
      if (
        uploadFile.type !== "application/json" &&
        !uploadFile.name.endsWith(".json")
      ) {
        toast.error("Only .json files are allowed.");
        setSelectedFile(null);
        return;
      }

      // Validate file size (10MB max)
      const maxSize = 10 * 1024 * 1024;
      if (uploadFile.size > maxSize) {
        toast.error("File size must be less than 10MB.");
        setSelectedFile(null);
        return;
      }

      setSelectedFile(uploadFile);
      field.onChange(uploadFile); // Bind file to react-hook-form
    }
  };

  // Submit handler for form
  const onSubmit = async () => {
    if (!selectedFile) {
      toast.error("Please select a file before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setIsFormSubmitted(true);
      setProgress(20);

      const response = await apiClient.post("/registration-processing/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      });

      toast.success(response.data || "File uploaded successfully!");
      setProgress(100);
      navigate("/success"); // Redirect on success, adjust path as necessary
    } catch (error) {
      console.error("Error uploading file:", error);
      const message =
        error.response?.data || "Failed to upload the file. Please try again.";
      toast.error(message);
      setProgress(0);
    } finally {
      setIsFormSubmitted(false);
    }
  };

  return (
    <div className="bg-adminBreadCrumbsBg flex flex-col p-10 rounded-lg">
      <h3 className="font-raleway text-2xl text-center font-bold">Upload JSON File</h3>
      <div className="flex flex-col space-y-3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="md:max-lg:space-y-1 space-y-6 mb-7">
              <div className="w-full flex flex-col space-y-4 my-2">
                <FormField
                  control={form.control}
                  name="json_file"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-titleColor text-base font-raleway">
                        Select JSON File:
                      </Label>
                      <Input
                        id="document"
                        type="file"
                        accept=".json"
                        onChange={(e) => handleFileChange(e, field)}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {isFormSubmitted && (
                  <>
                    <span>Upload Progress:</span>
                    <Progress value={progress} className="w-[60%]" />
                  </>
                )}
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
                    json_file: "",
                  });
                  setSelectedFile(null);
                  setIsFormSubmitted(false);
                  setProgress(0);

                  // Reset the file input manually
                  const fileInput = document.getElementById("document");
                  if (fileInput) {
                    fileInput.value = "";
                  }
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

export default AdminUploadOfficerForm;
