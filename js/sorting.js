let participants = []; // Found in googlesheet.js
let finalClassList = [];
let classParticipants = {};
const schedule = [];
var classStartTimes = [];
let finishedSchedule = [];

function getClasses() {
  everyClass = participants.map((participant) => participant.ClassNumber);

  finalClassList = [...new Set(everyClass)];

  console.log("every class: ", everyClass);
  console.log("Final Class List", finalClassList);
}

function participantsIntoClasses() {
  finalClassList.forEach((classNum) => {
    classParticipants[classNum] = {
      classKey: classNum,
      participants: participants.filter(
        (participant) => participant.ClassNumber === classNum
      ),
    };
  });

  console.log("Class Participants", classParticipants);
}

function classLength() {
  console.log(classes);
  Object.keys(classParticipants).forEach((classKey) => {
    let numOfParticipants = classParticipants[classKey].participants.length; // Access the length of participants array

    // Get the values directly from the classes object and parse them as integers
    const individualPerformanceLength = parseInt(classes.performanceLength, 10);
    const adjudicationWritingTime = parseInt(
      classes.adjudicationWritingTime,
      10
    );
    const classAdjudicationTime = parseInt(classes.classAdjudicationTime, 10);
    const bufferTime = parseInt(classes.bufferTime, 10);

    // Perform the calculations
    const totalPerformanceLength =
      numOfParticipants * individualPerformanceLength;
    const totalAdjudicationWritingTime =
      numOfParticipants * adjudicationWritingTime;
    const totalClassLength =
      totalPerformanceLength +
      totalAdjudicationWritingTime +
      classAdjudicationTime +
      bufferTime;

    console.log(
      `Total length of class ${classKey}: ${totalClassLength} minutes`
    );

    // Store the total class length in minutes directly
    schedule.push({ classKey, totalClassLength });
  });

  console.log("Schedule info", schedule);
  console.log("festival info", festival);
  myValues();

  return schedule;
}

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

    var classStartTimes = []; // Initialize an array to store class start times

    // Calculate start times for each class
    for (var i = 0; i < schedule.length; i++) {
      // Extract class length and inBetweenTime from the schedule
      var classLength = schedule[i].totalClassLength;
      var inBetweenTime = classes.inBetweenTime;

      // Create Date object for current class start time
      var classStartTime = new Date(cumulativeTime);

      // Check if current class end time exceeds endTime of the current day
      var currentDayIndex = festival.dates.findIndex(
        (date) => date.date === classStartTime.toISOString().split("T")[0]
      );
      var endTimeCurrentDay = new Date(
        festival.dates[currentDayIndex].date +
          "T" +
          festival.dates[currentDayIndex].endTime
      );

      if (
        classStartTime.getTime() + classLength * 60 * 1000 >
        endTimeCurrentDay.getTime()
      ) {
        // Move to the start of the next day
        var nextDateIndex = currentDayIndex + 1;

        if (nextDateIndex < festival.dates.length) {
          // Set the class start time to the next date's user-inputted start time
          var nextDateStartTime = festival.dates[nextDateIndex].startTime;
          classStartTime = new Date(
            festival.dates[nextDateIndex].date + "T" + nextDateStartTime
          );

          // Reset cumulative time to the new day's start time
          cumulativeTime = classStartTime.getTime();

          console.log(
            `Transitioning to next day: ${festival.dates[nextDateIndex].date}, Start Time: ${nextDateStartTime}`
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
