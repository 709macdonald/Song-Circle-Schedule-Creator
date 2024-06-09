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

      console.log(jsonSheet);

      const entries = jsonSheet.map((row) => ({
        Name: row[0],
        LastName: row[1],
        SongTitle: row[2],
        Composer: row[3],
        PerformanceLength: row[4],
        Genre: row[5],
        ClassNumber: row[6],
        Age: row[7],
        Email: row[8],
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
