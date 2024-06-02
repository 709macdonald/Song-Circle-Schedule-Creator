let classes = {
  genre: "",
  performanceLength: 0,
  adjudicationWritingTime: 0,
  classAdjudicationTime: 0,
  bufferTime: 0,
  inBetweenTime: 0,
};

let i2 = 0;

// CLASS INPUT FIELDS

const classUserInput = document.getElementById("classUserInput");

classUserInput.addEventListener("input", function (event) {
  updateClassData();
});

function updateClassData() {
  var classGenre = document.getElementById("classGenre").value;
  var performanceLength = document.getElementById("performanceLength").value;
  var adjTime = document.getElementById("adjTime").value;
  var classAdjTime = document.getElementById("classAdjTime").value;
  var bufferTime = document.getElementById("bufferTime").value;
  var inBetweenTime = document.getElementById("inBetweenTime").value;

  classes.genre = classGenre;
  classes.performanceLength = performanceLength;
  classes.adjudicationWritingTime = adjTime;
  classes.classAdjudicationTime = classAdjTime;
  classes.bufferTime = bufferTime;
  classes.inBetweenTime = inBetweenTime;

  localStorage.setItem("classes", JSON.stringify(classes));
}

// RELOAD CLASSES

document.addEventListener("DOMContentLoaded", populateClassesFromStorage);

function populateClassesFromStorage() {
  const savedClassesString = localStorage.getItem("classes");

  if (savedClassesString) {
    const savedClasses = JSON.parse(savedClassesString);

    document.getElementById("classGenre").value = savedClasses.genre;
    document.getElementById("performanceLength").value =
      savedClasses.performanceLength;
    document.getElementById("adjTime").value =
      savedClasses.adjudicationWritingTime;
    document.getElementById("classAdjTime").value =
      savedClasses.classAdjudicationTime;
    document.getElementById("bufferTime").value = savedClasses.bufferTime;
    document.getElementById("inBetweenTime").value = savedClasses.inBetweenTime;

    classes.genre = savedClasses.genre;
    classes.performanceLength = savedClasses.performanceLength;
    classes.adjudicationWritingTime = savedClasses.adjudicationWritingTime;
    classes.classAdjudicationTime = savedClasses.classAdjudicationTime;
    classes.bufferTime = savedClasses.bufferTime;
    classes.inBetweenTime = savedClasses.inBetweenTime;
  }
}

// CREATE DISPLAY IN CLASS PULLDOWN

function formatDateTime(date) {
  return date.toLocaleString();
}

function createClassDisplay(scheduleArray) {
  const parentDiv = document.getElementById("googlesheetClasses");

  scheduleArray.forEach((schedule) => {
    const classDiv = document.createElement("div");
    classDiv.className = "classDisplay-flex";

    const classNameDiv = document.createElement("div");
    classNameDiv.className = "className";
    classNameDiv.textContent = `Class: ${schedule.classKey}`;

    const classNumberDiv = document.createElement("div");
    classNumberDiv.className = "classNumber";
    classNumberDiv.textContent = `${classes.genre}`;

    const participantsDiv = document.createElement("div");
    participantsDiv.className = "participants";
    participantsDiv.textContent = `${schedule.participants.length} Entriess`;

    const totalTimeDiv = document.createElement("div");
    totalTimeDiv.className = "totalTime";
    totalTimeDiv.textContent = `${schedule.length} mins`;

    const classTimeDiv = document.createElement("div");
    classTimeDiv.className = "classDisplay-grid";

    const startTimeDiv = document.createElement("div");
    startTimeDiv.className = "startTime";
    startTimeDiv.textContent = `Start: ${formatDateTime(schedule.startTime)}`;

    const endTimeDiv = document.createElement("div");
    endTimeDiv.className = "endTime";
    endTimeDiv.textContent = `End: ${formatDateTime(schedule.endTime)}`;

    const line = document.createElement("hr");

    classDiv.appendChild(classNameDiv);
    classDiv.appendChild(classNumberDiv);
    classDiv.appendChild(participantsDiv);
    classDiv.appendChild(totalTimeDiv);
    classTimeDiv.appendChild(startTimeDiv);
    classTimeDiv.appendChild(endTimeDiv);

    parentDiv.appendChild(classDiv);
    parentDiv.appendChild(classTimeDiv);
    parentDiv.appendChild(line);
  });
}
