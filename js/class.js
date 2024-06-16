let classes = {
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
  parseInt(document.getElementById("adjTimeMins").value, 10) || 0;
  var adjTimeSecs =
    parseInt(document.getElementById("adjTimeSecs").value, 10) || 0;
  var classAdjTimeMins =
    parseInt(document.getElementById("classAdjTimeMins").value, 10) || 0;
  var classAdjTimeSecs =
    parseInt(document.getElementById("classAdjTimeSecs").value, 10) || 0;
  var bufferTimeMins =
    parseInt(document.getElementById("bufferTimeMins").value, 10) || 0;
  var bufferTimeSecs =
    parseInt(document.getElementById("bufferTimeSecs").value, 10) || 0;
  var inBetweenTimeMins =
    parseInt(document.getElementById("inBetweenTimeMins").value, 10) || 0;
  var inBetweenTimeSecs =
    parseInt(document.getElementById("inBetweenTimeSecs").value, 10) || 0;

  var adjTime = adjTimeMins * 60 + adjTimeSecs;
  var classAdjTime = classAdjTimeMins * 60 + classAdjTimeSecs;
  var bufferTime = bufferTimeMins * 60 + bufferTimeSecs;
  var inBetweenTime = inBetweenTimeMins * 60 + inBetweenTimeSecs;

  classes.maxPerformanceLength = maxPerformanceLength;
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

    function setMinutesAndSeconds(elementIdMins, elementIdSecs, totalSeconds) {
      const mins = Math.floor(totalSeconds / 60);
      const secs = totalSeconds % 60;
      document.getElementById(elementIdMins).value = mins;
      document.getElementById(elementIdSecs).value = secs;
    }
    setMinutesAndSeconds(
      "adjTimeMins",
      "adjTimeSecs",
      savedClasses.adjudicationWritingTime
    );
    setMinutesAndSeconds(
      "classAdjTimeMins",
      "classAdjTimeSecs",
      savedClasses.classAdjudicationTime
    );
    setMinutesAndSeconds(
      "bufferTimeMins",
      "bufferTimeSecs",
      savedClasses.bufferTime
    );
    setMinutesAndSeconds(
      "inBetweenTimeMins",
      "inBetweenTimeSecs",
      savedClasses.inBetweenTime
    );

    classes.adjudicationWritingTime = savedClasses.adjudicationWritingTime;
    classes.classAdjudicationTime = savedClasses.classAdjudicationTime;
    classes.bufferTime = savedClasses.bufferTime;
    classes.inBetweenTime = savedClasses.inBetweenTime;
  }
}

// DONE BUTTON

const classInputFields = document.querySelectorAll(".classInputs");
const classSubmitButton = document.getElementById("classDoneButton");

function validateClassInputs() {
  let allFilled = true;

  classInputFields.forEach(function (input) {
    if (input.value.trim() === "") {
      input.classList.add("empty");
      allFilled = false;
    } else {
      input.classList.remove("empty");
    }
  });

  if (allFilled) {
    showGoogleSheetInformation();
  } else {
    alert("Please fill in all the fields.");
  }
}

classSubmitButton.addEventListener("click", function (event) {
  event.preventDefault();
  validateClassInputs();
});
