function triggerFileInput() {
  document.getElementById("fileInput").click();
}

// Handle the file upload process
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

      // Parse the file data using SheetJS
      const workbook = XLSX.read(data, { type: "binary" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonSheet = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      console.log(jsonSheet);

      // Convert the sheet data into an array of items
      const entries = jsonSheet.map((row) => ({
        Name: row[0],
        LastName: row[1],
        SongTitle: row[2],
        Composer: row[3],
        Genre: row[4],
        ClassNumber: row[5],
        Age: row[6],
        Email: row[7],
      }));

      console.log(entries);
      alert("File uploaded and processed successfully!");

      participants = entries;
      console.log("Participants: ", participants);

      getClasses();
      participantsIntoClasses();
      classLength();
      displayFileName();
      populateSchedule();
    };
    reader.readAsBinaryString(file);
  } else {
    alert("No file selected!");
  }
}

function displayFileName() {
  const fileInput = document.getElementById("fileInput");
  const fileNameDisplay = document.getElementById("fileNameDisplay");

  // Check if any file is selected
  if (fileInput.files.length > 0) {
    // Get the file object
    const file = fileInput.files[0];
    // Display the file name
    fileNameDisplay.textContent = `Uploaded file: ${file.name}`;
  } else {
    // If no file is selected, clear the display
    fileNameDisplay.textContent = "No File Chosen, Please Reload Page";
  }
}
