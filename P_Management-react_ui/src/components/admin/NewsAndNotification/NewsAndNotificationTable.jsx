import React, { useEffect, useState } from 'react'
import {newsAndNotificationColumns} from "./data-table-components/admin-news-notification-columns";
import {AdminCommonDataTable} from "../TableComponents/admin-data-table.jsx";
import {DataTableToolbar} from "../TableComponents/admin-data-table-toolbar.jsx";
import {newsAndNotificationcategories} from "./data-table-components/admin-news-notification-data.jsx";
import apiClient from '../../../auth/ApiClient.jsx'

// const data = [
//     {
//         id: "ne1",
//         title: "Form 16 For Financial Year 2023-24",
//         type: "News & Notification",
//         new: "Yes",
//         status: "Active",
//         created_by: "J N Tulekar",
//         created_date: "26 Oct 2024",
//         updated_by: "J N Tulekar",
//         updated_date: "26 Oct 2024",
//         order: 1,
//     },
//     {
//         id: "ne2",
//         title: "Message to Army Officers regarding Income Tax Regime.",
//         type: "News",
//         new: "Yes",
//         status: "Inactive",
//         created_by: "J N Tulekar",
//         created_date: "26 Nov 2023",
//         updated_by: "J N Tulekar",
//         updated_date: "26 Nov 2023",
//         order: 1,
//     },
// ];

function NewsAndNotificationTable() {
    const [mappedData, setMappedData] = useState([]); // State to hold the mapped data

    useEffect(() => {
        getAllNewAndNotification();
    }, []);

    const getAllNewAndNotification = async () => {
        try {
            const response = await apiClient.get("news");
            const data = response.data.map((item) => ({
                id: String(item.id),
                title: item.titleEnglish,
                type: item.type === "NEWS_AND_NOTIFICATION" ? "News & Notification" : "News",
                new: item.isNew ? "Yes" : "No",
                status: item.status === "ACTIVE" ? "Active" : "Inactive",
                created_by: item.createdBy,
                created_date: formatDate(item.createdDate),
                updated_by: item.updatedBy,
                updated_date: formatDate(item.updatedDate),
                order: String(item.uiOrder),
            }));
            setMappedData(data); // Update state
        } catch (error) {
            console.error("Error fetching news and notifications:", error);
        }
    };

    function formatDate(dateString) {
        if (!dateString) return ""; // Handle null or undefined dates
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
        }); // Example: "Dec 03, 2024"
    }

    return (
        <div>
            <AdminCommonDataTable data={mappedData} columns={newsAndNotificationColumns} searchInputField={"title"}
                                  filterField={"type"} filterFieldName={"Type"}
                                  filterCategoriesList={newsAndNotificationcategories}>
                <DataTableToolbar/>
            </AdminCommonDataTable>
        </div>
    )
        ;
}

export default NewsAndNotificationTable;
