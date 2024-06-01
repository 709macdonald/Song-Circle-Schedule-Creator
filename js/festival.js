let festival = {
  name: "",
  venue: "",
  dates: [],
};
let i = 0;

// FESTIVAL INPUT FIELDS

const festivalUserInput = document.getElementById("festivalUserInput");

festivalUserInput.addEventListener("input", function (event) {
  updateFestivalData();
});

function updateFestivalData() {
  const festivalName = document.getElementById("festivalName").value;
  const festivalVenue = document.getElementById("festivalVenue").value;

  // Ensure the dates array is not lost during update
  festival.name = festivalName;
  festival.venue = festivalVenue;

  localStorage.setItem("festival", JSON.stringify(festival));
}

// FESTIVAL DATES

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
  var cell2_2 = row2.insertCell(1);
  var cell2_3 = row2.insertCell(2);

  var dateInputElement = document.createElement("input");
  dateInputElement.type = "date";
  dateInputElement.className = "dateInput";
  dateInputElement.id = "festivalDate" + i;
  dateInputElement.placeholder = "Select a date";
  dateInputElement.addEventListener("input", () => {
    const date = dateInputElement.value;
    const newI = parseInt(dateInputElement.id.replace("festivalDate", ""), 10);

    if (festival.dates[newI]) {
      festival.dates[newI].date = date;
    } else {
      festival.dates[newI] = { date: date, startTime: "", endTime: "" };
    }

    localStorage.setItem("festival", JSON.stringify(festival));
  });
  cell2_1.appendChild(dateInputElement);

  var startTimeInputElement = document.createElement("input");
  startTimeInputElement.className = "timeInput";
  startTimeInputElement.type = "time";
  startTimeInputElement.id = "festivalStartTime" + i;
  startTimeInputElement.addEventListener("input", () => {
    const startTime = startTimeInputElement.value;
    const newI = parseInt(
      startTimeInputElement.id.replace("festivalStartTime", ""),
      10
    );

    if (festival.dates[newI]) {
      festival.dates[newI].startTime = startTime;
    } else {
      festival.dates[newI] = { date: "", startTime: startTime, endTime: "" };
    }

    localStorage.setItem("festival", JSON.stringify(festival));
  });
  cell2_2.appendChild(startTimeInputElement);

  var endTimeInputElement = document.createElement("input");
  endTimeInputElement.className = "timeInput";
  endTimeInputElement.type = "time";
  endTimeInputElement.id = "festivalEndTime" + i;
  endTimeInputElement.addEventListener("input", () => {
    const endTime = endTimeInputElement.value;
    const newI = parseInt(
      endTimeInputElement.id.replace("festivalEndTime", ""),
      10
    );

    if (festival.dates[newI]) {
      festival.dates[newI].endTime = endTime;
    } else {
      festival.dates[newI] = { date: "", startTime: "", endTime: endTime };
    }

    localStorage.setItem("festival", JSON.stringify(festival));
  });
  cell2_3.appendChild(endTimeInputElement);

  // Ensure the festival.dates array has a corresponding entry for the new inputs
  if (!festival.dates[i]) {
    festival.dates.push({
      date: "",
      startTime: "",
      endTime: "",
    });
  }

  i++;
}

function deleteDateInputs() {
  // Check if there's more than one row
  if (festival.dates.length > 1) {
    var table = document.getElementById("festivalDatesTable");
    var lastRowIndex = table.rows.length - 1;

    // Remove the last row from the table
    table.deleteRow(lastRowIndex);

    // Remove data from the array
    festival.dates.pop(); // Remove the last element directly

    // Decrement i
    i--;

    // Update local storage after removing the row
    localStorage.setItem("festival", JSON.stringify(festival));
  } else {
    console.log("Cannot delete the last row.");
  }
}

// RELOAD FESTIVAL

document.addEventListener("DOMContentLoaded", populateFestivalFromStorage);

function populateFestivalFromStorage() {
  const savedFestivalString = localStorage.getItem("festival");

  if (savedFestivalString) {
    const savedFestival = JSON.parse(savedFestivalString);

    document.getElementById("festivalName").value = savedFestival.name;
    document.getElementById("festivalVenue").value = savedFestival.venue;

    festival.name = savedFestival.name;
    festival.venue = savedFestival.venue;
  }
}

document.addEventListener("DOMContentLoaded", populateDatesFromStorage);
let runCount = 0;

function populateDatesFromStorage() {
  const savedDates = localStorage.getItem("festival");

  if (savedDates) {
    const storedFestivalDates = JSON.parse(savedDates);

    for (let loopI = 0; loopI < storedFestivalDates.dates.length; loopI++) {
      const dateObject = storedFestivalDates.dates[loopI];

      const date = dateObject.date;
      const startTime = dateObject.startTime;
      const endTime = dateObject.endTime;

      document.getElementById("festivalDate" + loopI).value = date;
      document.getElementById("festivalStartTime" + loopI).value = startTime;
      document.getElementById("festivalEndTime" + loopI).value = endTime;

      document
        .getElementById("festivalDate" + loopI)
        .dispatchEvent(new Event("input"));
      document
        .getElementById("festivalStartTime" + loopI)
        .dispatchEvent(new Event("input"));
      document
        .getElementById("festivalEndTime" + loopI)
        .dispatchEvent(new Event("input"));

      loadDateInputs();
    }
  }
  deleteDateInputs();
}
