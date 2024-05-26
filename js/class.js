let classes = {
  genre: "",
  class: [],
  performanceLength: "",
  adjudicationWritingTime: "",
  classAdjudicationTime: "",
  bufferTime: "",
};

let i2 = 0;

// CLASS INPUT FIELDS

const classUserInput = document.getElementById("classUserInput");

classUserInput.addEventListener("input", function (event) {
  updateClassData();
});

function updateClassData() {
  const classGenre = document.getElementById("classGenre").value;
  const performanceLength = document.getElementById("performanceLength").value;
  const adjTime = document.getElementById("adjTime").value;
  const classAdjTime = document.getElementById("classAdjTime").value;
  const bufferTime = document.getElementById("bufferTime").value;

  classes.genre = classGenre;
  classes.performanceLength = performanceLength;
  classes.adjudicationWritingTime = adjTime;
  classes.classAdjudicationTime = classAdjTime;
  classes.bufferTime = bufferTime;

  localStorage.setItem("classes", JSON.stringify(classes));
}

// CLASS NUMBERS AND AGES

document.addEventListener("DOMContentLoaded", function () {
  loadClassLabels();
  loadClassInputs();
});

function loadClassLabels() {
  var table = document.getElementById("classesTable");

  var row1 = table.insertRow();
  var cell1_1 = row1.insertCell(0);
  cell1_1.className = "venueLabels";
  var cell1_2 = row1.insertCell(1);
  cell1_2.className = "venueLabels";
  var cell1_3 = row1.insertCell(2);
  cell1_3.className = "venueLabels";

  var numberLabelElement = document.createElement("label");
  numberLabelElement.textContent = "Class Number:";
  cell1_1.appendChild(numberLabelElement);

  var minAgeLabelElement = document.createElement("label");
  minAgeLabelElement.textContent = "Min Age:";
  cell1_2.appendChild(minAgeLabelElement);

  var maxAgeLabelElement = document.createElement("label");
  maxAgeLabelElement.textContent = "Max Age:";
  cell1_3.appendChild(maxAgeLabelElement);
}

function loadClassInputs() {
  var table = document.getElementById("classesTable");

  // Insert second row
  var row2 = table.insertRow();
  var cell2_1 = row2.insertCell(0);
  cell2_1.className = "venueInput";
  var cell2_2 = row2.insertCell(1);
  cell2_2.className = "venueInput";
  var cell2_3 = row2.insertCell(2);
  cell2_3.className = "venueInput";

  var numberInputElement = document.createElement("input");
  numberInputElement.type = "text";
  numberInputElement.id = "classNumber" + i2;
  numberInputElement.placeholder = "Class Number";
  numberInputElement.classList.add("classNumberInput");
  numberInputElement.addEventListener("input", () => {
    const number = numberInputElement.value;
    const newI = parseInt(numberInputElement.id.replace("classNumber", ""), 10);

    if (classes.class[newI]) {
      classes.class[newI].number = number;
    } else {
      classes.class[newI] = { number: number, minAge: "", maxAge: "" };
    }

    localStorage.setItem("classes", JSON.stringify(classes));
  });
  cell2_1.appendChild(numberInputElement);

  var minAgeInputElement = document.createElement("input");
  minAgeInputElement.type = "number";
  minAgeInputElement.id = "minAge" + i2;
  minAgeInputElement.classList.add("ageInput"); // Add your CSS class here
  minAgeInputElement.addEventListener("input", () => {
    const minAge = minAgeInputElement.value;
    const newI = parseInt(minAgeInputElement.id.replace("minAge", ""), 10);

    if (classes.class[newI]) {
      classes.class[newI].minAge = minAge;
    } else {
      classes.class[newI] = { number: "", minAge: minAge, maxAge: "" };
    }

    localStorage.setItem("classes", JSON.stringify(classes));
  });
  cell2_2.appendChild(minAgeInputElement);

  var maxAgeInputElement = document.createElement("input");
  maxAgeInputElement.type = "number";
  maxAgeInputElement.id = "maxAge" + i2;
  maxAgeInputElement.classList.add("ageInput"); // Add your CSS class here
  maxAgeInputElement.addEventListener("input", () => {
    const maxAge = maxAgeInputElement.value;
    const newI = parseInt(maxAgeInputElement.id.replace("maxAge", ""), 10);

    if (classes.class[newI]) {
      classes.class[newI].maxAge = maxAge;
    } else {
      classes.class[newI] = { number: "", minAge: "", maxAge: maxAge };
    }

    localStorage.setItem("classes", JSON.stringify(classes));
  });
  cell2_3.appendChild(maxAgeInputElement);

  // Ensure the classes.class array has a corresponding entry for the new inputs
  if (!classes.class[i2]) {
    classes.class.push({
      number: "",
      minAge: "",
      maxAge: "",
    });
  }

  i2++;
}

function deleteClassInputs() {
  // Check if there's more than one row
  if (classes.class.length > 1) {
    var table = document.getElementById("classesTable");
    var lastRowIndex = table.rows.length - 1;

    // Remove the last row from the table
    table.deleteRow(lastRowIndex);

    // Remove data from the array
    classes.class.pop(); // Remove the last element directly

    // Decrement i2
    i2--;

    // Update local storage after removing the row
    localStorage.setItem("classes", JSON.stringify(classes));
  } else {
    console.log("Cannot delete the last row.");
  }
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

    classes.genre = savedClasses.genre;
    classes.performanceLength = savedClasses.performanceLength;
    classes.adjudicationWritingTime = savedClasses.adjudicationWritingTime;
    classes.classAdjudicationTime = savedClasses.classAdjudicationTime;
    classes.bufferTime = savedClasses.bufferTime;
  }
}

document.addEventListener("DOMContentLoaded", populateClassTableFromStorage);
let runCount2 = 0;

function populateClassTableFromStorage() {
  const savedClassesString = localStorage.getItem("classes");

  if (savedClassesString) {
    const storedClassInfo = JSON.parse(savedClassesString);

    for (let loopI = 0; loopI < storedClassInfo.class.length; loopI++) {
      const classObject = storedClassInfo.class[loopI];

      const number = classObject.number;
      const minAge = classObject.minAge;
      const maxAge = classObject.maxAge;

      loadClassInputs();

      document.getElementById("classNumber" + loopI).value = number;
      document.getElementById("minAge" + loopI).value = minAge;
      document.getElementById("maxAge" + loopI).value = maxAge;

      document
        .getElementById("classNumber" + loopI)
        .dispatchEvent(new Event("input"));
      document
        .getElementById("minAge" + loopI)
        .dispatchEvent(new Event("input"));
      document
        .getElementById("maxAge" + loopI)
        .dispatchEvent(new Event("input"));
    }
  }
  deleteClassInputs();
}
