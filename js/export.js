function generatePDF() {
  const scheduleContainer = document.getElementById("scheduleContainer");
  html2pdf().from(scheduleContainer).save("schedule.pdf");
}

// ical

function generateICalEvent(eventDetails) {
  const { title, description, startDate, endDate, location } = eventDetails;

  const dateFormat = (date) => {
    return date.toISOString().replace(/-|:|\.\d+/g, "");
  };

  const content = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:${location}
DTSTART:${dateFormat(startDate)}
DTEND:${dateFormat(endDate)}
END:VEVENT
END:VCALENDAR`;

  return content;
}

function generateICalEvents(finishedSchedule, festival) {
  const iCalURLs = [];

  finishedSchedule.forEach((event) => {
    const eventDetails = {
      title: event.classKey,
      description: `${festival.name}, Class: ${event.classKey}, ${festival.classGenre}`, // Include class key in description
      startDate: event.startTime,
      endDate: event.endTime,
      location: festival.venueAddress,
    };
    const iCalContent = generateICalEvent(eventDetails);
    const iCalURL = encodeURI("data:text/calendar;charset=utf8," + iCalContent);
    iCalURLs.push(iCalURL);
  });

  return iCalURLs;
}

function handleDownloadICalButtonClick() {
  const iCalURLs = generateICalEvents(finishedSchedule, festival);

  iCalURLs.forEach((iCalURL, index) => {
    const event = finishedSchedule[index];
    const filename = `${festival.name}_Class#_${event.classKey}.ics`;

    const link = document.createElement("a");
    link.href = iCalURL;
    link.download = filename; // Set the filename for the download
    link.click();
  });
}

document
  .getElementById("downloadICalButton")
  .addEventListener("click", handleDownloadICalButtonClick);
