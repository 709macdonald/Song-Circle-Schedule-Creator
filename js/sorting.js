let participants = [];
let finalClassList = [];
let classParticipants = {};
const classLengths = [];
var classStartTimes = [];
let finishedSchedule = [];

function getClasses() {
  everyClass = participants.map((participant) => participant.ClassNumber);

  finalClassList = [...new Set(everyClass)];
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
}

function classLength() {
  Object.keys(classParticipants).forEach((classKey) => {
    let numOfParticipants = classParticipants[classKey].participants.length;
    let totalPerformanceLength = 0;

    classParticipants[classKey].participants.forEach((participant) => {
      totalPerformanceLength += parseInt(participant.PerformanceLength, 10); // Corrected property name
    });

    const adjudicationWritingTime = parseInt(
      classes.adjudicationWritingTime,
      10
    );
    const classAdjudicationTime = parseInt(classes.classAdjudicationTime, 10);
    const bufferTime = parseInt(classes.bufferTime, 10);

    const totalAdjudicationWritingTime =
      numOfParticipants * adjudicationWritingTime;
    const totalPerformanceLengthInSeconds = totalPerformanceLength;
    const totalClassLengthInSeconds =
      totalPerformanceLengthInSeconds +
      totalAdjudicationWritingTime +
      classAdjudicationTime +
      bufferTime;

    classLengths.push({
      classKey,
      totalClassLength: totalClassLengthInSeconds,
    });
  });

  findClassStartTimes();

  return classLengths;
}

function findClassStartTimes() {
  if (!festival || !festival.dates || festival.dates.length === 0) {
    console.error("Error: Festival dates are missing or empty.");
    return;
  }

  let festivalStartDate = festival.dates[0]?.date;
  let festivalStartTime = festival.dates[0]?.startTime;
  let lastDayCounter = festival.dates.length - 1;
  let festivalEndDate = festival.dates[lastDayCounter]?.date;

  if (festivalStartDate && festivalStartTime && festivalEndDate) {
    let festivalStartDateTime = festivalStartDate + "T" + festivalStartTime;
    let startTime = new Date(festivalStartDateTime);
    let cumulativeTime = startTime.getTime();
    let classStartTimes = [];

    for (let i = 0; i < classLengths.length; i++) {
      let classLength = classLengths[i].totalClassLength; // class length in seconds
      let inBetweenTime = classes.inBetweenTime; // in-between time should also be in seconds if it was previously in minutes

      let classStartTime = new Date(cumulativeTime);

      let currentDayIndex = festival.dates.findIndex(
        (date) => date.date === classStartTime.toISOString().split("T")[0]
      );

      if (currentDayIndex === -1) {
        console.error("Error: Current day index not found.");
        break;
      }

      let endTimeCurrentDay = new Date(
        festival.dates[currentDayIndex].date +
          "T" +
          festival.dates[currentDayIndex].endTime
      );

      if (
        classStartTime.getTime() + classLength * 1000 >
        endTimeCurrentDay.getTime()
      ) {
        let nextDateIndex = currentDayIndex + 1;

        if (nextDateIndex < festival.dates.length) {
          let nextDateStartTime = festival.dates[nextDateIndex].startTime;
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
        classKey: classLengths[i].classKey,
        startTime: classStartTime,
        length: classLength,
      });

      cumulativeTime += classLength * 1000; // convert class length to milliseconds
      cumulativeTime += inBetweenTime * 1000; // convert in-between time to milliseconds
    }

    combineSchedule(classStartTimes, classParticipants);
  } else {
    console.error(
      "Error: Festival start date, start time, or end date is missing."
    );
  }
}

function combineSchedule(classStartTimes, classParticipants) {
  finishedSchedule = classStartTimes.map((classTime) => {
    const { classKey, startTime, length } = classTime;
    const participants = classParticipants[classKey]?.participants || [];

    // Convert length from seconds to milliseconds
    const endTime = new Date(startTime.getTime() + length * 1000);

    return {
      classKey,
      startTime,
      endTime,
      length,
      participants,
    };
  });

  populateScheduleTitle();
  populateScheduleClasses();
}
