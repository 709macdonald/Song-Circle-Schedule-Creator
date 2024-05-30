var classStartTimes = [];
let finishedSchedule = [];

function myValues() {
  let festivalStartDate = festival.dates[0].date;
  let festivalStartTime = festival.dates[0].startTime;
  let lastDayCounter = festival.dates.length - 1; // Subtract 1 to get the correct index
  let festivalEndDate = festival.dates[lastDayCounter].date;

  // Check if festival has dates property and if dates array has at least one entry
  if (festival && festival.dates && festival.dates.length > 0) {
    festivalStartDate = festival.dates[0]?.date;
    festivalStartTime = festival.dates[0]?.startTime;
    lastDayCounter = festival.dates.length - 1;
    festivalEndDate = festival.dates[lastDayCounter]?.date;

    // Combine festival start date and time into a single string
    var festivalStartDateTime = festivalStartDate + "T" + festivalStartTime;

    // Parse festival start date and time into a Date object
    var startTime = new Date(festivalStartDateTime);

    // Initialize cumulative time with the festival start time
    var cumulativeTime = startTime.getTime(); // Get start time in milliseconds

    // Calculate start times for each class
    for (var i = 0; i < schedule.length; i++) {
      // Extract class length and inBetweenTime from the schedule
      var classLength = schedule[i].totalClassLength;
      var inBetweenTime = classes.inBetweenTime;

      // Create Date object for current class start time
      var classStartTime = new Date(cumulativeTime);

      // Check if current class end time exceeds endTime of the first day
      var endTimeFirstDay = new Date(
        festivalStartDate + "T" + festival.dates[0].endTime
      );
      if (
        classStartTime.getTime() + classLength * 60 * 1000 >
        endTimeFirstDay.getTime()
      ) {
        // Move to the start of the next day
        var nextDateIndex =
          festival.dates.findIndex(
            (date) => date.date === classStartTime.toISOString().split("T")[0]
          ) + 1;

        if (nextDateIndex < festival.dates.length) {
          // Set the class start time to the next date's user inputted start time
          var nextDateStartTime = festival.dates[nextDateIndex].startTime;
          classStartTime = new Date(
            festival.dates[nextDateIndex].date + "T" + nextDateStartTime
          );
        } else {
          console.error("Error: Class exceeds festival end time.");
          break; // Stop processing classes if the end time is exceeded
        }
      }

      // Add current class start time along with classKey and length to array
      classStartTimes.push({
        classKey: schedule[i].classKey,
        startTime: classStartTime,
        length: classLength,
      });

      // Add current class length to cumulative time for the next class
      cumulativeTime += classLength * 60 * 1000; // Convert class length from minutes to milliseconds

      // Add inBetweenTime to cumulative time for the next class
      cumulativeTime += inBetweenTime * 60 * 1000; // Convert inBetweenTime from minutes to milliseconds
    }

    console.log("Classes and Start Times", classStartTimes); // This will give you the start times for each class along with classKey and length
    combineSchedule(classStartTimes, classParticipants);
  } else {
    console.error("Error: Festival dates are missing or empty.");
  }
}

function combineSchedule(classStartTimes, classParticipants) {
  finishedSchedule = classStartTimes.map((classTime) => {
    const { classKey, startTime, length } = classTime;
    const participants = classParticipants[classKey]?.participants || [];

    // Calculate end time by adding class length to start time
    const endTime = new Date(startTime.getTime() + length * 60 * 1000);

    return {
      classKey,
      startTime,
      endTime, // Include end time in the returned object
      length,
      participants,
    };
  });

  console.log("Finished Schedule", finishedSchedule); // Logging finishedSchedule inside the function
  createClassDisplay(finishedSchedule);
}

// Function to format the date and time
function formatDateTime(date) {
  return date.toLocaleString();
}

// Function to create and fill classDisplay divs
function createClassDisplay(scheduleArray) {
  // Get the parent div
  const parentDiv = document.getElementById("googlesheetClasses");

  // Iterate through the schedule array
  scheduleArray.forEach((schedule) => {
    // Create a new div element with the class 'classDisplay'
    const classDiv = document.createElement("div");
    classDiv.className = "classDisplay";

    // Create and fill span elements for class details
    const classNameSpan = document.createElement("span");
    classNameSpan.className = "className";
    classNameSpan.textContent = `Class: ${schedule.classKey}`;

    const classNumberSpan = document.createElement("span");
    classNumberSpan.className = "classNumber";
    classNumberSpan.textContent = ` - ${classes.genre}`;

    const participantsSpan = document.createElement("span");
    participantsSpan.className = "participants";
    participantsSpan.textContent = `${schedule.participants.length} Participants`;

    const startTimeSpan = document.createElement("span");
    startTimeSpan.className = "startTime";
    startTimeSpan.textContent = `Start Time: ${formatDateTime(
      schedule.startTime
    )}`;

    const endTimeSpan = document.createElement("span");
    endTimeSpan.className = "endTime";
    endTimeSpan.textContent = `End Time: ${formatDateTime(schedule.endTime)}`;

    const totalTimeSpan = document.createElement("span");
    totalTimeSpan.className = "TotalTime";
    totalTimeSpan.textContent = `${schedule.length} minutes`;

    // Append all spans to the classDiv
    classDiv.appendChild(classNameSpan);
    classDiv.appendChild(classNumberSpan);
    classDiv.appendChild(participantsSpan);
    classDiv.appendChild(totalTimeSpan);
    classDiv.appendChild(document.createElement("br"));
    classDiv.appendChild(startTimeSpan);
    classDiv.appendChild(document.createElement("br"));
    classDiv.appendChild(endTimeSpan);
    classDiv.appendChild(document.createElement("hr"));

    // Append the classDiv to the parentDiv
    parentDiv.appendChild(classDiv);
  });
}
