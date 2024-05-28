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
        SongTitle: row[1],
        Genre: row[2],
        ClassNumber: row[3],
        Age: row[4],
      }));

      console.log(entries);
      alert("File uploaded and processed successfully!");

      participants = entries;
      console.log("Participants: ", participants);

      getClasses();
      participantsIntoClasses();
      classLength();
    };
    reader.readAsBinaryString(file);
  } else {
    alert("No file selected!");
  }
}
