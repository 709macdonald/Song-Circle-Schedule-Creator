let participants = []; // Found in googlesheet.js
let totalClasses = [];
let classParticipants = {};

function getClasses() {
  everyClass = participants.map((participant) => participant.ClassNumber);

  totalClasses = [...new Set(everyClass)];

  console.log("every class: ", everyClass);
  console.log("TotalClasses", totalClasses);
}

function participantsIntoClasses() {
  // Initialize the classParticipants object with empty arrays for each class
  totalClasses.forEach((classNum) => {
    classParticipants[classNum] = [];
  });

  // Sort participants into their respective classes
  participants.forEach((participant) => {
    classParticipants[participant.ClassNumber].push(participant);
  });

  console.log(classParticipants);
}
