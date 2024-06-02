function generatePDF() {
  const scheduleContainer = document.getElementById("scheduleContainer");
  html2pdf().from(scheduleContainer).save("schedule.pdf");
}

document
  .getElementById("generatePDFButton")
  .addEventListener("click", generatePDF);

function exportGoogleDoc() {
  // Get the contents of scheduleContainer
  var scheduleContent = document.getElementById("scheduleContainer").innerHTML;

  // Create an HTML file
  var htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Schedule</title>
    <style>
    <link rel="stylesheet" href="styles/overview.css" />
    <link rel="stylesheet" href="styles/sidebar.css" />
    <link rel="stylesheet" href="styles/schedule.css" />
    <link rel="stylesheet" href="styles/class.css" />
    <link rel="stylesheet" href="styles/festival.css" />
    <link rel="stylesheet" href="styles/googlesheets.css" />
    <link rel="stylesheet" href="styles/schedule.css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
    </style>
</head>
<body>
    <div id="scheduleContainer">
        ${scheduleContent}
    </div>
    <script>
        // Add your JavaScript code here
    </script>
</body>
</html>
`;

  // Save the HTML file
  var blob = new Blob([htmlContent], { type: "text/html" });
  var link = document.createElement("a");
  link.download = "myschedule.html";
  link.href = window.URL.createObjectURL(blob);
  link.click();
}
