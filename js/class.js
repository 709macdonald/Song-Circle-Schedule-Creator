let classes = [];

let i2 = 0;

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

  var dateLabelElement = document.createElement("label");
  dateLabelElement.textContent = "Class Number:";
  cell1_1.appendChild(dateLabelElement);

  var startTimeLabelElement = document.createElement("label");
  startTimeLabelElement.textContent = "Min Age:";
  cell1_2.appendChild(startTimeLabelElement);

  var endTimeLabelElement = document.createElement("label");
  endTimeLabelElement.textContent = "Max Age:";
  cell1_3.appendChild(endTimeLabelElement);
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

  var dateInputElement = document.createElement("input");
  dateInputElement.type = "input";
  dateInputElement.id = "venueDate" + i2;
  dateInputElement.placeholder = "Class Number";
  dateInputElement.addEventListener("input", () => {
    const date = dateInputElement.value;
    const dateId = dateInputElement.id.toString();
    const newI = parseInt(dateId.charAt(dateId.length - 1), 10);

    currentVenue.dates[newI].date = date;
    localStorage.setItem("currentVenue", JSON.stringify(currentVenue));
  });
  cell2_1.appendChild(dateInputElement);

  var startTimeInputElement = document.createElement("input");
  startTimeInputElement.type = "number";
  startTimeInputElement.id = "venueStartTime" + i2;
  startTimeInputElement.addEventListener("input", () => {
    const startTime = startTimeInputElement.value;
    const startTimeId = startTimeInputElement.id.toString();
    const newI = parseInt(startTimeId.charAt(startTimeId.length - 1), 10);

    currentVenue.dates[newI].startTime = startTime;
    localStorage.setItem("currentVenue", JSON.stringify(currentVenue));
  });
  cell2_2.appendChild(startTimeInputElement);

  var endTimeInputElement = document.createElement("input");
  endTimeInputElement.type = "number";
  endTimeInputElement.id = "venueEndTime" + i2;
  endTimeInputElement.addEventListener("input", () => {
    const endTime = endTimeInputElement.value;
    const endTimeId = endTimeInputElement.id.toString();
    const newI = parseInt(endTimeId.charAt(endTimeId.length - 1), 10);

    currentVenue.dates[newI].endTime = endTime;
    localStorage.setItem("currentVenue", JSON.stringify(currentVenue));
  });
  cell2_3.appendChild(endTimeInputElement);

  classes.push({
    date: "",
    startTime: "",
    endTime: "",
  });

  i2++;
}

function deleteClassInputs() {
  // Check if there's more than one row
  if (classes.length > 1) {
    var table = document.getElementById("classesTable");
    var lastRowIndex = table.rows.length - 1;

    // Remove the last row from the table
    table.deleteRow(lastRowIndex);

    // Remove data from the array
    classes.pop(); // Remove the last element directly

    // Decrement i
    i2--;

    // Update local storage after removing the row
    localStorage.setItem("currentVenue", JSON.stringify(currentVenue));
  } else {
    console.log("Cannot delete the last row.");
  }
}
