import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SidebarProps {
  schedules: { scheduleName: string }[];
  selectedSchedule: { scheduleName: string } | null;
  onSelectSchedule: (schedule: { scheduleName: string }) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ schedules, selectedSchedule, onSelectSchedule }) => {
  return (
    <aside className="w-1/4 border-r border-gray-700 p-4">
      <h2 className="text-lg font-semibold mb-4">Schedules</h2>
      {schedules.map((schedule, index) => (
        <Card key={index} className="bg-gray-800 p-4 mb-2 rounded-lg">
          <div
            className={cn(
              "p-3 bg-gray-700 mt-2 rounded-lg cursor-pointer hover:bg-gray-600",
              selectedSchedule?.scheduleName === schedule.scheduleName && "bg-purple-800"
            )}
            onClick={() => onSelectSchedule(schedule)}
          >
            {schedule.scheduleName}
          </div>
        </Card>
      ))}
    </aside>
  );
};

export default Sidebar;
