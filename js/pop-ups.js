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
