let participants = [];
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
    let numOfParticipants = classParticipants[classKey].participants.length;
    const individualPerformanceLength = parseInt(classes.performanceLength, 10);
    const adjudicationWritingTime = parseInt(
      classes.adjudicationWritingTime,
      10
    );
    const classAdjudicationTime = parseInt(classes.classAdjudicationTime, 10);
    const bufferTime = parseInt(classes.bufferTime, 10);

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
  let lastDayCounter = festival.dates.length - 1;
  let festivalEndDate = festival.dates[lastDayCounter].date;

  if (festival && festival.dates && festival.dates.length > 0) {
    festivalStartDate = festival.dates[0]?.date;
    festivalStartTime = festival.dates[0]?.startTime;
    lastDayCounter = festival.dates.length - 1;
    festivalEndDate = festival.dates[lastDayCounter]?.date;

    var festivalStartDateTime = festivalStartDate + "T" + festivalStartTime;

    var startTime = new Date(festivalStartDateTime);

    var cumulativeTime = startTime.getTime();

    var classStartTimes = [];
    for (var i = 0; i < schedule.length; i++) {
      var classLength = schedule[i].totalClassLength;
      var inBetweenTime = classes.inBetweenTime;

      var classStartTime = new Date(cumulativeTime);

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
        var nextDateIndex = currentDayIndex + 1;

        if (nextDateIndex < festival.dates.length) {
          var nextDateStartTime = festival.dates[nextDateIndex].startTime;
          classStartTime = new Date(
            festival.dates[nextDateIndex].date + "T" + nextDateStartTime
          );

          cumulativeTime = classStartTime.getTime();

          console.log(
            `Transitioning to next day: ${festival.dates[nextDateIndex].date}, Start Time: ${nextDateStartTime}`
          );
        } else {
          console.error("Error: Class exceeds festival end time.");
          break;
        }
      }

      classStartTimes.push({
        classKey: schedule[i].classKey,
        startTime: classStartTime,
        length: classLength,
      });

      cumulativeTime += classLength * 60 * 1000;
      cumulativeTime += inBetweenTime * 60 * 1000;
    }

    console.log("Classes and Start Times", classStartTimes);
    combineSchedule(classStartTimes, classParticipants);
  } else {
    console.error("Error: Festival dates are missing or empty.");
  }
}

function combineSchedule(classStartTimes, classParticipants) {
  finishedSchedule = classStartTimes.map((classTime) => {
    const { classKey, startTime, length } = classTime;
    const participants = classParticipants[classKey]?.participants || [];

    const endTime = new Date(startTime.getTime() + length * 60 * 1000);

    return {
      classKey,
      startTime,
      endTime,
      length,
      participants,
    };
  });

  console.log("Finished Schedule", finishedSchedule);
  createClassDisplay(finishedSchedule);
  populateScheduleTitle();
  populateScheduleClasses();
}
