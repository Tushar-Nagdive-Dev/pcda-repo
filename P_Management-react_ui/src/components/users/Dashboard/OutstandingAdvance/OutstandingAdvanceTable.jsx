import React from 'react';
import {Button} from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const oadvance = [
    {
        id:1,
        serial_no: "XXX XXX XX34",
        DAK_ID: "XX XX XX",
        type_of_advance: "-",
        from_date: "08 Dec 2023",
        to_date: "10 Dec 2024",
        amount: 4500,
        date_of_passing: "11 Feb 2024"
    },
    {
        id:2,
        serial_no: "XXX XXX XX34",
        DAK_ID: "XX XX XX",
        type_of_advance: "-",
        from_date: "08 Dec 2023",
        to_date: "10 Dec 2024",
        amount: 5000,
        date_of_passing: "11 Feb 2024"
    },
]

function OutstandingAdvanceTable(props) {
    return (
        <div className="w-full flex flex-col space-y-8 px-1">
            <div className="w-full flex justify-between items-center">
                <p className="font-raleway text-xl font-semibold">Details of Outstanding Advance</p>
            </div>

            {/* Table */}
            <Table className="!rounded-xl">
                <TableHeader className="bg-newprimaryColor text-white text-lg">
                    <TableRow>
                        <TableHead className="font-raleway">Serial No.</TableHead>
                        <TableHead className="font-raleway">DAK-ID</TableHead>
                        <TableHead className="font-raleway">Type of Advance</TableHead>
                        <TableHead className="font-raleway">From Date</TableHead>
                        <TableHead className="font-raleway">To Date</TableHead>
                        <TableHead className="font-raleway">Amount</TableHead>
                        <TableHead className="font-raleway">Date of Passing</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="bg-adminBreadCrumbsBg text-titleColor text-lg">
                    {oadvance.map((row, index) => (
                        <TableRow key={row.phone_number}>
                            <TableCell className="font-raleway">{row.serial_no}</TableCell>
                            <TableCell className="font-raleway">{row.DAK_ID}</TableCell>
                            <TableCell className="font-raleway">{row.type_of_advance}</TableCell>
                            <TableCell className="font-raleway">{row.from_date}</TableCell>
                            <TableCell className="font-raleway">{row.to_date}</TableCell>
                            <TableCell className="font-raleway">{row.amount}</TableCell>
                            <TableCell className="font-raleway">{row.date_of_passing}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default OutstandingAdvanceTable;