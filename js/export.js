function generatePDF() {
  const scheduleContainer = document.getElementById("scheduleContainer");
  html2pdf().from(scheduleContainer).save("schedule.pdf");
}

// NEEDS GOOGLE API and I'm not a real website.
function createEvent() {
  console.log("createEvent() function called");
  finishedSchedule.forEach((event, index) => {
    console.log("Processing event:", event);
    gapi.client.calendar.events
      .insert({
        calendarId: "primary",
        resource: {
          summary:
            finishedSchedule[index].classKey +
            " " +
            classes.genre +
            ":" +
            "Located at " +
            festival.venue,
          start: {
            dateTime: finishedSchedule[index].startTime.toISOString(),
            timeZone: "YOUR_TIME_ZONE",
          },
          end: {
            dateTime: finishedSchedule[index].endTime.toISOString(),
            timeZone: "YOUR_TIME_ZONE",
          },
        },
      })
      .then(function (response) {
        console.log("Event created: ", response);
      })
      .catch(function (error) {
        console.error("Error creating event: ", error);
      });
  });
}
