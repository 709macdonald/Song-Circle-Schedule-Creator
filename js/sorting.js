let participants = []; // Found in googlesheet.js
let finalClassList = [];
let classParticipants = {};

function getClasses() {
  everyClass = participants.map((participant) => participant.ClassNumber);

  finalClassList = [...new Set(everyClass)];

  console.log("every class: ", everyClass);
  console.log("Final Class List", finalClassList);
}

function participantsIntoClasses() {
  // Initialize the classParticipants object with empty arrays for each class
  finalClassList.forEach((classNum) => {
    classParticipants[classNum] = [];
  });

  // Sort participants into their respective classes
  participants.forEach((participant) => {
    classParticipants[participant.ClassNumber].push(participant);
  });

  console.log(classParticipants);
}

function classLength() {
  Object.keys(classParticipants).forEach((classKey) => {
    let numOfParticipants = classParticipants[classKey].length;

    const classLength = document.getElementById();
    console.log(`Length of class ${classKey}: ${numOfParticipants}`);
  });
}
