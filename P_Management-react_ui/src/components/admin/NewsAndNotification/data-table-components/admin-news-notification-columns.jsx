import React from "react";
import { DataTableColumnHeader } from "./admin-news-notification-data-table-column-header";
import { DataTableRowActions } from "./admin-news-notification-data-table-row-actions";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

export const adminColumns = [
  {
    id: "sr_no",
    header: ({ table }) => <p className>Sr. No.</p>,
    cell: (info) => <p>{info.row.index + 1}</p>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px] capitalize">{row.getValue("title")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <p className>Type</p>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium capitalize">
            {row.getValue("type")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "new",
    header: ({ column }) => (
      <p className>New</p>
    ),
    cell: ({ row }) => {
      const value = row.getValue("new")?.toLowerCase(); // Get the value of the cell
      const textColor = value === "yes" ? "text-green-500" : "text-red-500"; // Define conditional color
      return (
        <div className="flex items-center">
          <span className={`capitalize ${textColor}`}>{value}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <p className>Status</p>
    ),
    cell: ({ row }) => {
      const type = row.getValue("status")?.toLowerCase();
      return (
        <div className="flex w-fit items-center">
          {type === "active" ? (
            <div className="w-full px-3 py-1 rounded-full text-newprimaryColor bg-white border-[1px] border-newprimaryColor">
              {row.getValue("status")}
            </div>
          ) : (
            <div className="w-full px-3 py-1 rounded-full text-red-500 bg-white border-[1px] border-red-500">
              {row.getValue("status")}
            </div>
          )}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "created_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created Date" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_date"));
      return (
        <div className="flex items-center">
          <span className="capitalize">{row.getValue("created_date")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const rowDate = new Date(row.getValue(id));
      const [startDate, endDate] = value;
      return rowDate >= startDate && rowDate <= endDate;
    },
  },
  {
    accessorKey: "order",
    header: ({ column }) => (
      <p className>Order</p>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Select value={row.getValue("order")}>
            <SelectTrigger className="w-fit">
              <SelectValue
                placeholder="Select Order"
              />
            </SelectTrigger>
            <SelectContent side="bottom" className="h-64">
              <SelectGroup>
                {Array.from(Array(50).keys()).map((item) => (
                  <SelectItem value={item}>{item + 1}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    header: ({ column }) => (
      <p className>Actions</p>
    ),
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
