"use client";

import React from "react";
import { Calendar } from "~/components/ui/calendar";

export const CalendarWidget = () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
        <div className="space-y-4">
            <div className="text-center">
                <p className="text-3xl font-black text-indigo-400">Calendar</p>
            </div>
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                captionLayout="dropdown"
                className="rounded-xl border-slate-800 bg-[#0f172a]/40 p-4 text-slate-200 backdrop-blur-sm"
                classNames={{
                    caption:
                        "flex justify-center pt-1 relative items-center text-sm font-medium text-slate-100",
                    caption_label: "text-sm font-semibold text-indigo-400",
                    nav: "space-x-1 flex items-center",
                    nav_button:
                        "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 transition-opacity text-slate-100",

                    head_cell:
                        "text-slate-500 rounded-md w-9 font-normal text-[0.8rem] uppercase tracking-tighter",
                    cell: "h-9 w-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
                    day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-slate-800 hover:text-indigo-400 rounded-md transition-all",

                    day_selected:
                        "bg-indigo-600 text-white hover:bg-indigo-500 hover:text-white focus:bg-indigo-600 focus:text-white ring-2 ring-indigo-400/30",
                    day_today: "bg-slate-600 text-indigo-400 font-bold",
                    day_outside: "text-slate-600 opacity-50",
                    day_disabled: "text-slate-600 opacity-50",
                }}
            />
        </div>
    );
};
