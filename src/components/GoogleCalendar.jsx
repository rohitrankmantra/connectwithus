import React from "react";

const GoogleCalendar = () => {
  return (
    <div className="w-full h-[800px] p-4 md:w-8/12 mx-auto">
      <iframe src="https://calendar.google.com/calendar/embed?src=hfomcalendar%40gmail.com&ctz=America%2FNew_York" 
        style={{ border: 0 }}
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="no"
        title="Google Calendar"
      ></iframe>
    </div>
  );
};

export default GoogleCalendar;
