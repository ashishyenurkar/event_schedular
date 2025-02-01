import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ScheduleFormProps {
  selectedSchedule: {
    scheduleName: string;
    dayOfWeek: string[];
    hour: number;
    minute: number;
  } | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
}

const ScheduleForm: React.FC<ScheduleFormProps> = ({ selectedSchedule, onChange, onSave }) => {
  if (!selectedSchedule) return <div className="text-center">Select a schedule to edit</div>;

  return (
    <Card className="bg-gray-800 p-6 rounded-lg">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Schedule Name:</Label>
          <Input
            name="scheduleName"
            value={selectedSchedule.scheduleName}
            onChange={onChange} // Ensure this triggers handleChange correctly
            className="w-full"
          />
        </div>
        <div>
          <Label>Send on Days:</Label>
          <Input
            name="dayOfWeek"
            value={selectedSchedule.dayOfWeek.join(", ")}
            onChange={onChange} // Ensure this triggers handleChange correctly
            className="w-full"
          />
        </div>
        <div>
          <Label>Start Time:</Label>
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              name="hour"
              value={selectedSchedule.hour}
              onChange={onChange} // Ensure this triggers handleChange correctly
              className="w-1/2"
            />
            <span>:</span>
            <Input
              type="number"
              name="minute"
              value={selectedSchedule.minute}
              onChange={onChange} // Ensure this triggers handleChange correctly
              className="w-1/2"
            />
          </div>
        </div>
      </div>

      <Button onClick={onSave} className="bg-purple-600 w-full mt-6 py-2 text-white rounded-lg hover:bg-purple-500">
        Save
      </Button>
    </Card>
  );
};

export default ScheduleForm;
