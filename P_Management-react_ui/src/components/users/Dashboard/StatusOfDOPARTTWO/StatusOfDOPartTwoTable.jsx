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

const statusofdoii = [
    {
        id:1,
        DAK_ID: "XX XX XX",
        cda_account_no: "C78211",
        doiino: "12345",
        doiidate: "10 Sept 2024",
        date_of_receipt: "10 Dec 2024",
        status: "Pending"
    },
    {
        id:2,
        DAK_ID: "XX XX XX",
        cda_account_no: "C78211",
        doiino: "12345",
        doiidate: "10 Sept 2024",
        date_of_receipt: "10 Dec 2024",
        status: "Pending"
    },
]

function StatusOfDOPartTwoTable(props) {
    return (
        <div className="w-full flex flex-col space-y-8 px-1">
            <div className="w-full flex justify-between items-center">
                <p className="font-raleway text-xl font-semibold">DO PART II Order Status</p>
            </div>

            {/* Table */}
            <Table className="!rounded-xl">
                <TableHeader className="bg-newprimaryColor text-white text-lg">
                    <TableRow>
                        <TableHead className="font-raleway">Sr. No.</TableHead>
                        <TableHead className="font-raleway">DAK-ID</TableHead>
                        <TableHead className="font-raleway">CDA Account No</TableHead>
                        <TableHead className="font-raleway">DOII No.</TableHead>
                        <TableHead className="font-raleway">DOII Date</TableHead>
                        <TableHead className="font-raleway">Date of Reciept</TableHead>
                        <TableHead className="font-raleway">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="bg-adminBreadCrumbsBg text-titleColor text-lg">
                    {statusofdoii.map((row, index) => (
                        <TableRow key={row.phone_number}>
                            <TableCell className="font-raleway">{index + 1}</TableCell>
                            <TableCell className="font-raleway">{row.DAK_ID}</TableCell>
                            <TableCell className="font-raleway">{row.cda_account_no}</TableCell>
                            <TableCell className="font-raleway">{row.doiino}</TableCell>
                            <TableCell className="font-raleway">{row.doiidate}</TableCell>
                            <TableCell className="font-raleway">{row.date_of_receipt}</TableCell>
                            <TableCell className="font-raleway">{row.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default StatusOfDOPartTwoTable;