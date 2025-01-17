import React from "react";
import {AdminDataTableColumnHeader} from "../../TableComponents/admin-data-table-column-header.jsx";
import { FAQDataTableRowActions } from "./admin-faq-data-table-row-actions";

export const faqColumns = (refreshFAQ) => [
  {
    id: "sr_no",
    header: ({ table }) => <p className>Sr. No.</p>,
    cell: (info) => <p>{info.row.index + 1}</p>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "question",
    header: ({ column }) => (
      <AdminDataTableColumnHeader column={column} title="Question" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px] capitalize">{row.getValue("question")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <p className>Status</p>,
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
    accessorKey: "wing",
    header: ({ column }) => <p className>Wing</p>,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium capitalize">
            {row.getValue("wing")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "section",
    header: ({ column }) => <p className>Section</p>,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium capitalize">
            {row.getValue("section")}
          </span>
        </div>
      );
    },
  },
  // {
  //   accessorKey: "created_by",
  //   header: ({ column }) => <p className>Created By</p>,
  //   cell: ({ row }) => {
  //     return (
  //       <div className="flex space-x-2">
  //         <span className="max-w-[200px] line-clamp-3 font-medium capitalize">
  //           {row.getValue("created_by") || "-"}
  //         </span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  {
    accessorKey: "created_date",
    header: ({ column }) => (
      <AdminDataTableColumnHeader column={column} title="Created Date" />
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
  // {
  //   accessorKey: "updated_by",
  //   header: ({ column }) => <p className>Updated By</p>,
  //   cell: ({ row }) => {
  //     return (
  //       <div className="flex space-x-2">
  //         <span className="max-w-[200px] line-clamp-3 font-medium capitalize">
  //           {row.getValue("updated_by") || "-"}
  //         </span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  {
    accessorKey: "updated_date",
    header: ({ column }) => <p className>Updated Date</p>,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[200px] line-clamp-3 font-medium capitalize">
            {row.getValue("updated_date")}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    header: ({ column }) => <p className>Actions</p>,
    cell: ({ row }) => <FAQDataTableRowActions row={row} refreshFAQ={refreshFAQ}/>,
  },
];
