import React, { useEffect, useState } from "react";
import headerStyle from "./Header.module.css";
import API_BASE_URLS from "../../../config";

function NoteHeader() {

  const [messages, setMessages] = useState([
    "Message to Army Officers regarding Income Tax Regime.", 
    "Statement of Account for the month of October 2024 has been uploaded.",
    "Form 16 for the Financial Year 2023-24 (Assessment Year 2024-25) has been uploaded."
  ]);

  // useEffect(() => {
  //   async function fetchMessages() {
  //     try {
  //       // Replace this with an actual API call
  //       const response = await fetch(`${API_BASE_URLS.MESSAGE}`);
  //       const data = await response.json();
  //       setMessages(data); // Assuming `data` is an array of strings
  //     } catch (error) {
  //       console.error("Error fetching messages:", error);
  //     }
  //   }

  //   fetchMessages();
  // }, []);

  return (
    <div className={`${headerStyle.note_header_section} px-custom py-2`}>
      <div className="flex gap-4">
        <p>
          <b>Key Updates:</b>
        </p>
        <marquee>
          {/* <ul className="flex gap-5 w-full list-disc space-x-2">
            <li>
            Message to Army Officers regarding Income Tax Regime.
            </li>
            <li>
            Statement of Account for the month of October 2024 has been uploaded.
            </li>
            <li>
            Form 16 for the Financial Year 2023-24 (Assessment Year 2024-25) has been uploaded.
            </li>
          </ul> */}
          <ul className="flex gap-5 w-full list-disc space-x-2">
            {messages.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>

        </marquee>
      </div>
    </div>
  );
}

export default NoteHeader;
