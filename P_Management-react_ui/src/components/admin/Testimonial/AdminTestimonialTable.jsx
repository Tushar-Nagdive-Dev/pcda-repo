import React from 'react'
import { testimonialColumns} from "./data-table-components/admin-testimonial-columns";
import {AdminCommonDataTable} from "../TableComponents/admin-data-table.jsx";
import {DataTableToolbar} from "../TableComponents/admin-data-table-toolbar.jsx";

const data = [
    {
      id: "ts1",
      person_name: "Kenneth Allen",
      position: "Major",
      title: "Vestibulum tempus imperdiet sem ac porttitor. Vivamus pulvinar commodo orci,...",
      status: "Active",
      created_by: "J N Tulekar",
      created_date: "26 Oct 2024",
      updated_by: "J N Tulekar",
      updated_date: "26 Oct 2024",
    },
    {
        id: "ts1",
        person_name: "Sanjay Patil",
        position: "Major",
        title: "Vestibulum tempus imperdiet sem ac porttitor. Vivamus pulvinar commodo orci,...",
        status: "Active",
        created_by: "J N Tulekar",
        created_date: "22 Oct 2024",
        updated_by: "J N Tulekar",
        updated_date: "26 Oct 2024",
      },
  ];

function AdminTestimonialTable() {
  return (
    <div>
        <AdminCommonDataTable data={data} columns={testimonialColumns} searchInputField={"person_name"}>
            <DataTableToolbar/>
        </AdminCommonDataTable>
    </div>
  )
}

export default AdminTestimonialTable