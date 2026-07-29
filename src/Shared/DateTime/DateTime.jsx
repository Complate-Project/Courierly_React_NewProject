import React, { useEffect, useState } from 'react';

const DateTime = () => {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  // 🕒 Time & 📅 Date Updater
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      // Format time
      const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setTime(now.toLocaleTimeString([], timeOptions));

      // Format date
      const dateOptions = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      };
      setDate(now.toLocaleDateString([], dateOptions));
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex gap-2 items-center leading-tight">
      <span className="text-gray-600 font-medium text-sm">{time}</span>
      <span className="text-gray-500 text-xs">{date}</span>
    </div>
  );
};

export default DateTime;
