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

// CLASS NUMBERS AND AGES

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
