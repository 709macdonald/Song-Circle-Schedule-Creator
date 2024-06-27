// EDIT BUTTON

function editButton() {
  if (confirm("Are you sure you want to go back and edit?")) {
    window.location.reload();
  }
}

// CLEAR BUTTON

function clearButton() {
  if (confirm("Are you sure you want to erase all data?")) {
    localStorage.removeItem("classes");

    i2 = 0;

    festival = {
      name: "",
      classGenre: "",
      venue: "",
      venueAddress: "",
      dates: [],
    };

    i = 0;

    localStorage.setItem("festival", JSON.stringify(festival));

    window.location.reload();
    localStorage.removeItem("classes");
  }
}
