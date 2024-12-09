import React from "react";

function UserDashboardCountCard({ title, number }) {
    return (
        <div className="h-full flex flex-col justify-center rounded-sm bg-adminCard p-6">
            <h4 className="text-adminTextColor font-bold text-[90px] font-raleway">{number}</h4>
            <p className="text-adminTextColor text-xl font-raleway font-medium">{title}</p>
        </div>
    );
}

export default UserDashboardCountCard;
