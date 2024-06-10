function showClassInformation() {
  const festivalDiv = document.getElementById("festivalHiddenDiv");
  const festivalTitle = document.getElementById("festivalTitle");
  const festivalThumb = document.getElementById("festivalThumb");
  const classDiv = document.getElementById("classHiddenDiv");
  const classTitle = document.getElementById("classTitle");

  festivalDiv.style.display = "none";
  classDiv.style.display = "block";
  festivalThumb.style.display = "block";
  festivalTitle.style.color = "var(--gray-out)";
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
  classThumb.style.display = "block";
  classTitle.style.color = "var(--gray-out)";
  googleSheetTitle.style.color = "var(--primary-black)";
}

function showSchedule() {
  const googleSheetDiv = document.getElementById("googleSheetInfo");
  const classDiv = document.getElementById("classInfo");
  const festivalDiv = document.getElementById("festivalInfo");
  const scheduleDiv = document.getElementById("scheduleContainer");

  googleSheetDiv.style.display = "none";
  classDiv.style.display = "none";
  festivalDiv.style.display = "none";
  scheduleDiv.style.display = "block";
}

// CLASS INFORMATION POP-UPS

document.addEventListener("DOMContentLoaded", (event) => {
  function showDescription(descriptionId) {
    const description = document.getElementById(descriptionId).innerHTML;
    document.getElementById("descriptionDisplay").innerHTML = description;
  }

  function clearDescription() {
    document.getElementById("descriptionDisplay").innerHTML = "";
  }

  const labels = document.querySelectorAll(".label");
  labels.forEach((label, index) => {
    const tooltipId = `tooltip-input${index + 1}`;
    label.addEventListener("mouseover", () => showDescription(tooltipId));
    label.addEventListener("mouseout", clearDescription);
  });
});
