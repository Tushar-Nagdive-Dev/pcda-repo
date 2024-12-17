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

const payment = [
    {
        id:1,
        serial_no: "XXX XXX XX34",
        amount: "4500",
        type_of_claim: "-",
        payment_date: "08 Dec 2023",
        station: "-",
    },
    {
        id:2,
        serial_no: "XXX XXX XX34",
        amount: "6500",
        type_of_claim: "-",
        payment_date: "08 Nov 2023",
        station: "-",
    },
]

function PaymentDetailsTable(props) {
    return (
        <div className="w-full flex flex-col space-y-8 px-1">
            <div className="w-full flex justify-between items-center">
                <p className="font-raleway text-xl font-semibold">Payment Details</p>
            </div>

            {/* Table */}
            <Table className="!rounded-xl">
                <TableHeader className="bg-newprimaryColor text-white text-lg">
                    <TableRow>
                        <TableHead className="font-raleway">Serial No.</TableHead>
                        <TableHead className="font-raleway">Amount</TableHead>
                        <TableHead className="font-raleway">Type of Claim</TableHead>
                        <TableHead className="font-raleway">Payment Date</TableHead>
                        <TableHead className="font-raleway">Station</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="bg-adminBreadCrumbsBg text-titleColor text-lg">
                    {payment.map((row, index) => (
                        <TableRow key={row.phone_number}>
                            <TableCell className="font-raleway">{row.serial_no}</TableCell>
                            <TableCell className="font-raleway">{row.amount}</TableCell>
                            <TableCell className="font-raleway">{row.type_of_claim}</TableCell>
                            <TableCell className="font-raleway">{row.payment_date}</TableCell>
                            <TableCell className="font-raleway">{row.station}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default PaymentDetailsTable;