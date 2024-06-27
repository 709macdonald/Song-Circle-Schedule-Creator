function showClassInformation() {
  const festivalDiv = document.getElementById("festivalHiddenDiv");
  const festivalTitle = document.getElementById("festivalTitle");
  const festivalThumb = document.getElementById("festivalThumb");
  const classDiv = document.getElementById("classHiddenDiv");
  const classTitle = document.getElementById("classTitle");

  festivalDiv.style.display = "none";
  classDiv.style.display = "block";
  festivalThumb.style.display = "none";
  festivalTitle.style.color = "var(--green)";
  classTitle.style.color = "var(--primary-black)";
}

function showGoogleSheetInformation() {
  const classDiv = document.getElementById("classHiddenDiv");
  const classTitle = document.getElementById("classTitle");
  const classThumb = document.getElementById("classThumb");

  const googleSheetDiv = document.getElementById("googleSheetHiddenDiv");
  const googleSheetTitle = document.getElementById("googleSheetTitle");

  classDiv.style.display = "none";
  googleSheetDiv.style.display = "block";
  classThumb.style.display = "none";
  classTitle.style.color = "var(--green)";
  googleSheetTitle.style.color = "var(--primary-black)";
  document.getElementById("uploadGoogleSheet").removeAttribute("disabled");
}

function showSchedule() {
  const googleSheetDiv = document.getElementById("googleSheetInfo");
  const classDiv = document.getElementById("classInfo");
  const festivalDiv = document.getElementById("festivalInfo");
  const scheduleDiv = document.getElementById("scheduleContainer");
  const exportButton = document.getElementById("export");
  const mainDiv = document.getElementById("mainBar-Hide");

  googleSheetDiv.style.display = "none";
  classDiv.style.display = "none";
  festivalDiv.style.display = "none";
  scheduleDiv.style.display = "block";
  exportButton.style.display = "block";
  mainDiv.style.display = "none";
}

// CLASS INFORMATION POP-UPS

document.addEventListener("DOMContentLoaded", (event) => {
  function showDescription(descriptionId, tooltipContent) {
    const descriptionDiv = document.getElementById(descriptionId);
    descriptionDiv.innerHTML = tooltipContent;
  }

  function clearDescription(descriptionId) {
    const descriptionDiv = document.getElementById(descriptionId);
    descriptionDiv.innerHTML = "";
  }

  const labels = document.querySelectorAll(".popUpLabel");
  labels.forEach((label, index) => {
    const descriptionId = label.getAttribute("data-description");
    const tooltipId = `tooltip-input${index + 1}`;
    const tooltipContent = document.getElementById(tooltipId).innerHTML;

    label.addEventListener("mouseover", () =>
      showDescription(descriptionId, tooltipContent)
    );
    label.addEventListener("mouseout", () => clearDescription(descriptionId));
  });
});

// Mobible Info menu

function toggleInstructions() {
  var instructionsDiv = document.querySelector(".instructionsDiv");
  if (
    instructionsDiv.style.display === "none" ||
    instructionsDiv.style.display === ""
  ) {
    instructionsDiv.style.display = "block";
  } else {
    instructionsDiv.style.display = "none";
  }
}
