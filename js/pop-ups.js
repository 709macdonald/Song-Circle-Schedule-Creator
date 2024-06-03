function showToolTip(inputId) {
  var tooltipId = "tooltip-" + inputId;
  var tooltip = document.getElementById(tooltipId);
  tooltip.classList.add("active");
  updateTooltipPosition(inputId);
}

function hideToolTip(inputId) {
  var tooltipId = "tooltip-" + inputId;
  var tooltip = document.getElementById(tooltipId);
  tooltip.classList.remove("active");
}

function updateTooltipPosition(elementId) {
  var tooltipId = "tooltip-" + elementId;
  var tooltip = document.getElementById(tooltipId);
  if (!tooltip) {
    console.error("Tooltip element not found with id:", tooltipId);
    return;
  }

  var element = document.getElementById(elementId);
  if (!element) {
    console.error("Element not found with id:", elementId);
    return;
  }

  var elementRect = element.getBoundingClientRect();
  tooltip.style.position = "absolute";
  tooltip.style.top =
    elementRect.top + elementRect.height + window.pageYOffset + "px";
  tooltip.style.left = elementRect.left + window.pageXOffset + "px";
}
