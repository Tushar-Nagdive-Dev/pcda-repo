import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../../../auth/ApiClient'; // Adjust the path as needed
import { toast } from 'react-toastify';
import { FilePdf } from '@phosphor-icons/react';

function EditDownloadForm() {
  const { id } = useParams(); // Get document ID from the URL
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      title: '',
      titleInHindi: '',
      status: 'Active',
      uiOrder: 1,
    },
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [currentFileUrl, setCurrentFileUrl] = useState(null);

  const handleFileChange = (event) => {
    const uploadFile = event.target.files[0];

    if (uploadFile) {
      // Check file type
      if (uploadFile.type !== 'application/pdf') {
        toast.error('Only PDF files are allowed.');
        setSelectedFile(null);
        return;
      }

      // Check file size (e.g., 10MB limit)
      const maxSize = 10 * 1024 * 1024; // 10MB in bytes
      if (uploadFile.size > maxSize) {
        toast.error('File size must be less than 10MB.');
        setSelectedFile(null);
        return;
      }
      setSelectedFile(event.target.files[0]);
    }
  };

  const fetchDocumentDetails = async () => {
    try {
      const response = await apiClient.get(`/document/${id}`);
      const data = response.data;

      // Populate form values
      form.reset({
        title: data.title,
        titleInHindi: data.titleInHindi,
        status: data.status ? 'Active' : 'In-Active',
        uiOrder: data.uiOrder,
      });

      // Set current file URL
      setCurrentFileUrl(`http://localhost:8888/${data.documentPath}`);
    } catch (error) {
      console.error('Error fetching document details:', error);
      toast.error('Failed to fetch document details.');
    }
  };

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('titleInHindi', values.titleInHindi);
      formData.append('status', values.status === 'Active');
      formData.append('uiOrder', values.uiOrder);
      if (selectedFile) {
        formData.append('file', selectedFile);
      }

      const response = await apiClient.put(`/document/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        toast.success('Document updated successfully!');
        navigate('/pcdao/download'); // Redirect after successful update
      } else {
        toast.error('Failed to update document. Please try again.');
      }
    } catch (error) {
      console.error('Error updating document:', error);
      toast.error('Failed to update document. Please try again.');
    }
  };

  useEffect(() => {
    fetchDocumentDetails();
  }, [id]);

  const getFileNameFromUrl = (url) => {
    return url ? url.substring(url.lastIndexOf('/') + 1) : 'No file available';
  };

  return (
    <div className="bg-adminBreadCrumbsBg flex flex-col p-10 rounded-lg">
      <h3 className="font-raleway text-2xl text-center font-bold">
        Edit Download Module
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
                    <FormLabel className="text-titleColor text-base font-raleway">
                      Title
                    </FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="titleInHindi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-titleColor text-base font-raleway">
                      Title in Hindi
                    </FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter title in Hindi" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-full flex flex-col space-y-1 my-2">
                <Label className="text-titleColor text-base font-raleway">
                  Document:
                </Label>
                <Input
                  id="document"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                />
                {currentFileUrl && (
                  <a
                    href={currentFileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-2 py-4"
                  >
                    <div>
                      Stored File: <FilePdf size={30} color="#D21416" />
                    </div>
                    {getFileNameFromUrl(currentFileUrl)}
                  </a>
                )}
              </div>

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
                        onValueChange={(value) => field.onChange(value)}
                        defaultValue={field.value}
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
              <FormField
                control={form.control}
                name="uiOrder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-titleColor text-base font-raleway">
                      Order
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue>{field.value || 'Select Order'}</SelectValue>
                        </SelectTrigger>
                        <SelectContent side="bottom" className="h-64">
                          {Array.from({ length: 50 }).map((_, index) => (
                            <SelectItem key={index} value={index + 1}>
                              {index + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full flex justify-center">
              <Button
                type="submit"
                className="w-fit text-white bg-newprimaryColor"
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

export default EditDownloadForm;
