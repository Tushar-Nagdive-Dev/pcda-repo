import React from "react";

function AdminDashboardCountCard({ title, number }) {
  return (
    <div className="h-full flex flex-col rounded-sm bg-adminCard p-6">
      <h4 className="text-adminTextColor text-lg font-raleway">{title}</h4>
      <p className="text-adminTextColor font-bold text-[64px] text-center font-raleway">{number}</p>
    </div>
  );
}

export default AdminDashboardCountCard;
