// MOBILE ALERT

function isMobileDevice() {
  return (
    typeof window.orientation !== "undefined" ||
    navigator.userAgent.indexOf("IEMobile") !== -1
  );
}

if (isMobileDevice()) {
  alert("This site is optimized for Desktop");
}

// EDIT BUTTON

function editButton() {
  if (confirm("Are you sure you want to go back and edit?")) {
    window.location.reload();
  }
}

// CLEAR BUTTON

function clearButton() {
  if (confirm("Are you sure you want to erase all data?")) {
    classes = {
      adjudicationWritingTime: 0,
      classAdjudicationTime: 0,
      bufferTime: 0,
      inBetweenTime: 0,
    };

    i2 = 0;

    festival = {
      name: "",
      classGenre: "",
      venue: "",
      venueAddress: "",
      dates: [],
    };

    i = 0;

    localStorage.setItem("classes", JSON.stringify(classes));
    localStorage.setItem("festival", JSON.stringify(festival));

    editButton();
  }
}

// Assuming you have a button with id "clearButton" in your HTML
document.getElementById("clearButton").addEventListener("click", clearButton);
