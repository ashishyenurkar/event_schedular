import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import ScheduleForm from "./ScheduleForm";
import SuccessMessage from "./SuccessMessage";

const API_URL = "https://api-test.salestarget.ai/campaigns/11d24be5-b937-4881-951e-ed8319b7106a";
const UPDATE_URL = "https://api-test.salestarget.ai/campaigns/11d24be5-b937-4881-951e-ed8319b7106a/update";

const App = () => {
  const [campaign, setCampaign] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        setCampaign(res.data);
      })
      .catch((error) => {
        console.error("Error fetching campaign data:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSelectSchedule = (schedule) => {
    setSelectedSchedule(schedule);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedSchedule((prev) => ({
      ...prev,
      [name]: name === "dayOfWeek" ? value.split(",").map((item) => item.trim()) : value,
    }));
  };

  const handleSave = () => {
    if (!selectedSchedule || !campaign) {
      setMessage("No schedule or campaign selected!");
      setMessageType("error");
      return;
    }
    setIsSaving(true);
    
    const updatedSchedules = campaign.timeSchedule.map((schedule) =>
      schedule.scheduleName === selectedSchedule.scheduleName ? selectedSchedule : schedule
    );

    const updatedCampaign = { ...campaign, timeSchedule: updatedSchedules };

    axios
      .put(UPDATE_URL, updatedCampaign)
      .then(() => {
        setMessage("Schedule updated successfully!");
        setMessageType("success");
      })
      .catch(() => {
        setMessage("Error updating schedule. Please try again.");
        setMessageType("error");
      })
      .finally(() => setIsSaving(false));
  };

  return (
    <div className="flex bg-gray-900 text-white min-h-screen p-6">
      <Sidebar schedules={campaign?.timeSchedule || []} selectedSchedule={selectedSchedule} onSelectSchedule={handleSelectSchedule} />
      <main className="flex-1 p-6">
        {loading ? (
          <div className="text-center text-lg">Loading schedules...</div>
        ) : (
          <>
            <ScheduleForm selectedSchedule={selectedSchedule} onChange={handleChange} onSave={handleSave} isSaving={isSaving} />
            <SuccessMessage message={message} messageType={messageType} onClose={() => setMessage("")} />
          </>
        )}
      </main>
    </div>
  );
};

export default App;
