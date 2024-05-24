// Trigger the file input when the button is clicked
function triggerFileInput() {
  document.getElementById("fileInput").click();
}

function handleFileUpload(event) {
  const file = event.target.files[0];

  if (file) {
    const formData = new FormData();
    formData.append("file", file);

    fetch("/upload-endpoint", {
      // Replace '/upload-endpoint' with your actual server endpoint
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Handle the server response
        alert("File uploaded successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("File upload failed!");
      });
  } else {
    alert("No file selected!");
  }
}
