import React from 'react'
import { TestimonialDataTable } from "./data-table-components/admin-testimonial-data-table";
import { adminColumns } from "./data-table-components/admin-testimonial-columns";

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
        created_date: "26 Oct 2024",
        updated_by: "J N Tulekar",
        updated_date: "26 Oct 2024",
      },
  ];

function AdminTestimonialTable() {
  return (
    <div>
      <TestimonialDataTable data={data} columns={adminColumns} />
    </div>
  )
}

export default AdminTestimonialTable