import React, { useEffect } from "react";

interface SuccessMessageProps {
  message: string;
  onClose: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (message) {
      setTimeout(onClose, 2000);
    }
  }, [message]);

  if (!message) return null;

  return (
    <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 rounded-lg text-white ${message.includes("Error") ? "bg-red-500" : "bg-green-500"}`}>
      {message}
    </div>
  );
};

export default SuccessMessage;
