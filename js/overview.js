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
  window.location.reload();
}
