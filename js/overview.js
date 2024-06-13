// FESTIVAL DONE BUTTON Check if everything is filled out.

document.addEventListener("DOMContentLoaded", function () {
  const inputFields = document.querySelectorAll(
    "#festivalUserInput .festivalInputs"
  );
  const doneButton = document.getElementById("festivalDoneButton");

  function checkInputs() {
    let allFilled = true;
    inputFields.forEach((input) => {
      if (input.value.trim() === "") {
        input.classList.add("input-error");
        allFilled = false;
      } else {
        input.classList.remove("input-error");
      }
    });
    doneButton.disabled = !allFilled;
  }

  inputFields.forEach((input) => {
    input.addEventListener("input", checkInputs);
  });

  checkInputs();
});

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
