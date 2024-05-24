let currentVenue = {
  name: "",
  dates: [],
};
let venues = [];
let i = 0;

document.addEventListener("DOMContentLoaded", function () {
  loadDateLabels();
  loadDateInputs();
});

function loadDateLabels() {
  var table = document.getElementById("festivalDatesTable");

  var row1 = table.insertRow();
  var cell1_1 = row1.insertCell(0);
  cell1_1.className = "venueLabels";
  var cell1_2 = row1.insertCell(1);
  cell1_2.className = "venueLabels";
  var cell1_3 = row1.insertCell(2);
  cell1_3.className = "venueLabels";

  var dateLabelElement = document.createElement("label");
  dateLabelElement.textContent = "Date:";
  cell1_1.appendChild(dateLabelElement);

  var startTimeLabelElement = document.createElement("label");
  startTimeLabelElement.textContent = "Start Time:";
  cell1_2.appendChild(startTimeLabelElement);

  var endTimeLabelElement = document.createElement("label");
  endTimeLabelElement.textContent = "End Time:";
  cell1_3.appendChild(endTimeLabelElement);
}

function loadDateInputs() {
  var table = document.getElementById("festivalDatesTable");

  // Insert second row
  var row2 = table.insertRow();
  var cell2_1 = row2.insertCell(0);
  cell2_1.className = "venueInput";
  var cell2_2 = row2.insertCell(1);
  cell2_2.className = "venueInput";
  var cell2_3 = row2.insertCell(2);
  cell2_3.className = "venueInput";

  var dateInputElement = document.createElement("input");
  dateInputElement.type = "date";
  dateInputElement.id = "venueDate" + i;
  dateInputElement.placeholder = "Select a date";
  dateInputElement.addEventListener("input", () => {
    const date = dateInputElement.value;
    const dateId = dateInputElement.id.toString();
    const newI = parseInt(dateId.charAt(dateId.length - 1), 10);

    currentVenue.dates[newI].date = date;
    localStorage.setItem("currentVenue", JSON.stringify(currentVenue));
  });
  cell2_1.appendChild(dateInputElement);

  var startTimeInputElement = document.createElement("input");
  startTimeInputElement.type = "Time";
  startTimeInputElement.id = "venueStartTime" + i;
  startTimeInputElement.addEventListener("input", () => {
    const startTime = startTimeInputElement.value;
    const startTimeId = startTimeInputElement.id.toString();
    const newI = parseInt(startTimeId.charAt(startTimeId.length - 1), 10);

    currentVenue.dates[newI].startTime = startTime;
    localStorage.setItem("currentVenue", JSON.stringify(currentVenue));
  });
  cell2_2.appendChild(startTimeInputElement);

  var endTimeInputElement = document.createElement("input");
  endTimeInputElement.type = "Time";
  endTimeInputElement.id = "venueEndTime" + i;
  endTimeInputElement.addEventListener("input", () => {
    const endTime = endTimeInputElement.value;
    const endTimeId = endTimeInputElement.id.toString();
    const newI = parseInt(endTimeId.charAt(endTimeId.length - 1), 10);

    currentVenue.dates[newI].endTime = endTime;
    localStorage.setItem("currentVenue", JSON.stringify(currentVenue));
  });
  cell2_3.appendChild(endTimeInputElement);

  currentVenue.dates.push({
    date: "",
    startTime: "",
    endTime: "",
  });

  i++;
}

function deleteDateInputs() {
  // Check if there's more than one row
  if (currentVenue.dates.length > 1) {
    var table = document.getElementById("festivalDatesTable");
    var lastRowIndex = table.rows.length - 1;

    // Remove the last row from the table
    table.deleteRow(lastRowIndex);

    // Remove data from the array
    currentVenue.dates.pop(); // Remove the last element directly

    // Decrement i
    i--;

    // Update local storage after removing the row
    localStorage.setItem("currentVenue", JSON.stringify(currentVenue));
  } else {
    console.log("Cannot delete the last row.");
  }
}
