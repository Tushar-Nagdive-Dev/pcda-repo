import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

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
  TableCell,
  TableRow,
} from '@/components/ui/table';

import AdminFormTable from '../AdminFormTable.jsx';
import { PlusIcon, Trash2 } from 'lucide-react';
import AdminDeleteDialog from '../AdminDeleteDialog.jsx';
import { GalleryFormValidation } from './GalleryFormValidation.js';
import apiClient from '../../../auth/ApiClient.jsx';

const formColumns = ['Sr. No.', 'Upload File', 'Action'];

function GalleryFillForm() {
  const form = useForm({
    resolver: zodResolver(GalleryFormValidation),
    defaultValues: {
      event_name: '',
      type: '',
      year: new Date().getFullYear(),
      active: false,
      gallery: [{ image: null }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'gallery',
  });

  const onSubmit = async (values) => {
    if (!values.year) {
      alert('Year is required!');
      return;
    }

    try {
      const formData = new FormData();
      values.gallery.forEach((item) => {
        if (item.image) {
          formData.append('files', item.image);
        }
      });

      const galleryData = {
        eventName: values.event_name,
        type: values.type.toUpperCase(),
        year: values.year,
        isActive: values.active,
      };

      formData.append(
        'gallery',
        new Blob([JSON.stringify(galleryData)], { type: 'application/json' })
      );

      const response = await apiClient.post('/gallery/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Gallery saved successfully!');
      form.reset();
    } catch (error) {
      console.error(error);
      alert(error.response?.data || 'Failed to save gallery. Please try again.');
    }
  };

  return (
    <div className="flex flex-col p-10 rounded-lg">
      <h3 className="text-2xl text-center font-bold">Gallery Master</h3>
      <div className="flex flex-col space-y-3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-6 mb-7">
              <FormField
                control={form.control}
                name="event_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Name:</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter event name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type:</FormLabel>
                    <FormControl>
                      <select
                        className="w-full border rounded p-2"
                        {...field}
                      >
                        <option value="">Select Type</option>
                        <option value="IMAGE">Image</option>
                        <option value="VIDEO">Video</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year:</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Year"
                        value={field.value || new Date().getFullYear()}
                        onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Active</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col space-y-3 items-center">
                <AdminFormTable columnNameList={formColumns}>
                  {fields.map((field, index) => (
                    <TableRow key={field.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Input
                          type="file"
                          onChange={(e) =>
                            form.setValue(
                              `gallery.${index}.image`,
                              e.target.files ? e.target.files[0] : null
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <AdminDeleteDialog callback={() => remove(index)}>
                          <Trash2 className="cursor-pointer" />
                        </AdminDeleteDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </AdminFormTable>
                <button
                  type="button"
                  onClick={() => append({ image: null })}
                >
                  <PlusIcon />
                </button>
              </div>
            </div>
            <div>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default GalleryFillForm;
