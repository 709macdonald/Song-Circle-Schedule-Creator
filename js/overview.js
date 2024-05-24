function toggleDropdownInfo(dropdownId) {
  var dropdownUserInput = document.getElementById(dropdownId + "UserInput");
  var dropdownDropdown = document.getElementById(dropdownId + "DropdownButton");
  var svgIcon = dropdownDropdown.querySelector("use");

  if (
    dropdownUserInput.style.display === "none" ||
    dropdownUserInput.style.display === ""
  ) {
    dropdownUserInput.style.display = "block";
    svgIcon.setAttribute("xlink:href", "./images/caret-down.svg#icon");
  } else {
    dropdownUserInput.style.display = "none";
    svgIcon.setAttribute("xlink:href", "./images/caret-right.svg#icon");
  }
}
