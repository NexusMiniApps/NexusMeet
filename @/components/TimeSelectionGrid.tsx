import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TimeSelectionGridProps {
  selectedDates: Date[];
}

const timesOfDay = ["Morning", "Afternoon", "Evening"];

const TimeSelectionGrid: React.FC<TimeSelectionGridProps> = ({
  selectedDates,
}) => {
  const [selectedTimes, setSelectedTimes] = useState<Record<string, string[]>>(
    {},
  );
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (
    date: string,
    time: string,
    event: React.MouseEvent | React.TouchEvent,
  ) => {
    event.preventDefault();
    setIsDragging(true);
    toggleTimeSelection(date, time);
  };

  const handleMouseEnter = (date: string, time: string) => {
    if (isDragging) {
      toggleTimeSelection(date, time);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (
    date: string,
    time: string,
    event: React.TouchEvent,
  ) => {
    handleMouseDown(date, time, event);
  };

  const handleTouchMove = (
    date: string,
    time: string,
    event: React.TouchEvent,
  ) => {
    if (isDragging) {
      const touch = event.touches[0];
      if (touch) {
        const target = document.elementFromPoint(touch.clientX, touch.clientY);
        if (
          target &&
          target instanceof HTMLElement &&
          target.dataset.date &&
          target.dataset.time
        ) {
          handleMouseEnter(target.dataset.date, target.dataset.time);
        }
      }
    }
  };

  const handleTouchEnd = () => {
    handleMouseUp();
  };

  const toggleTimeSelection = (date: string, time: string) => {
    setSelectedTimes((prev) => {
      const timesForDate = (prev[date] ?? []) as string[];

      if (timesForDate.includes(time)) {
        return {
          ...prev,
          [date]: timesForDate.filter((t) => t !== time),
        };
      } else {
        return { ...prev, [date]: [...timesForDate, time] };
      }
    });
  };

  return (
    <Table
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchEnd={handleTouchEnd}
      className="mx-auto mt-4 w-full max-w-72 border-collapse items-center overflow-hidden text-center text-xs"
    >
      <TableHeader>
        <TableRow className="border-transparent">
          <TableHead className="w-24 p-0 text-center text-blue-800">
            Date
          </TableHead>
          {timesOfDay.map((time) => (
            <TableHead
              key={time}
              className="w-32 p-0 text-center text-blue-800"
              style={{
                width: "4.7rem",
                minWidth: "4.7rem",
                maxWidth: "4.7rem",
              }}
            >
              {time}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {selectedDates
          .slice()
          .sort((a, b) => a.getTime() - b.getTime())
          .map((date) => {
            const dateString = date.toISOString().split("T")[0];
            const day = date.toLocaleDateString("en-US", { weekday: "short" });
            const formattedDate = date.toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
            });
            return (
              <TableRow key={dateString} className="border-transparent">
                <TableCell style={{ userSelect: "none" }} className="px-0">
                  <div className="text-sm">{day}</div>
                  <div>{formattedDate}</div>
                </TableCell>
                {timesOfDay.map((time) => (
                  <TableCell
                    key={time}
                    className={`cursor-pointer border border-blue-800 ${
                      selectedTimes[dateString as string]?.includes(time)
                        ? "bg-gradient-to-bl from-blue-500 to-blue-200"
                        : ""
                    }`}
                    onMouseDown={(e) => {
                      if (dateString) {
                        handleMouseDown(dateString, time, e);
                      }
                    }}
                    onMouseEnter={() => {
                      if (dateString) {
                        handleMouseEnter(dateString, time);
                      }
                    }}
                    onTouchStart={(e) => {
                      if (dateString) {
                        handleTouchStart(dateString, time, e);
                      }
                    }}
                    onTouchMove={(e) => {
                      if (dateString) {
                        handleTouchMove(dateString, time, e);
                      }
                    }}
                    onDragStart={(e) => e.preventDefault()}
                  >
                    {selectedTimes[dateString as string]?.includes(time)
                      ? ""
                      : ""}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
};

export default TimeSelectionGrid;
