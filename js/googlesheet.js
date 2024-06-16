function triggerFileInput() {
  document.getElementById("fileInput").click();
}

function handleFileUpload(event) {
  const file = event.target.files[0];

  if (file) {
    const allowedExtensions = ["xlsx", "xls", "csv"];
    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      alert(
        "Invalid file type. Please upload a spreadsheet file (xlsx, xls, csv)."
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      const data = e.target.result;

      const workbook = XLSX.read(data, { type: "binary" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      const jsonSheet = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const headerRow = jsonSheet[0];
      const dataRows = jsonSheet.slice(1);

      const entries = dataRows.map((row) => ({
        Name: row[1],
        LastName: row[2],
        SongTitle: row[3],
        Composer: row[4],
        PerformanceLength: row[5],
        Genre: row[6],
        ClassNumber: row[7],
        Age: row[8],
        Email: row[9],
      }));

      console.log(entries);

      alert("File uploaded and processed successfully!");

      participants = entries;
      console.log("Participants: ", participants);

      getClasses();
      participantsIntoClasses();
      classLength();
      displayFileName();
    };
    reader.readAsBinaryString(file);
  } else {
    alert("No file selected!");
  }
}

function displayFileName() {
  const fileInput = document.getElementById("fileInput");
  const fileNameDisplay = document.getElementById("fileNameDisplay");

  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    fileNameDisplay.textContent = `Uploaded file: ${file.name}`;
  } else {
    fileNameDisplay.textContent = "No File Chosen, Please Reload Page";
  }
}

// DONE BUTTON

const fileInput = document.getElementById("fileInput");
const finalSubmitButton = document.getElementById("googleSheetDoneButton");

function validateFileInput() {
  if (!fileInput.files.length) {
    alert("Please upload a file first.");
  } else {
    showSchedule();
  }
}

finalSubmitButton.addEventListener("click", function (event) {
  event.preventDefault();
  validateFileInput();
});
