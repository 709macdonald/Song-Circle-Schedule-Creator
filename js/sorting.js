let participants = []; // Found in googlesheet.js
let finalClassList = [];
let classParticipants = {};
const schedule = [];

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
