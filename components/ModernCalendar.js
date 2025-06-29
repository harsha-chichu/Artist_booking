"use client";
import React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function ModernCalendar({ bookedDates = [] }) {
  // react-day-picker accepts native JS Dates directly
  const modifiers = { booked: bookedDates };
  const modifiersStyles = {
    booked: {
      backgroundColor: "#34d399", // Tailwind green-400
      color: "white",
      borderRadius: "0.5rem",
    },
  };

  return (
    <DayPicker
      mode="single"
      selected={undefined} // No selection
      modifiers={modifiers}
      modifiersStyles={modifiersStyles}
      showOutsideDays
      styles={{
        caption: {
          textAlign: "center",
          fontSize: "1.25rem",
          marginBottom: "1rem",
        },
      }}
    />
  );
}
