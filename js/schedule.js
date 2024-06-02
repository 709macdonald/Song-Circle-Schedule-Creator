function populateScheduleTitle() {
  const scheduleTitleDiv = document.createElement("div");
  scheduleTitleDiv.id = "scheduleTitleDiv";

  const scheduleTitleSpan = document.createElement("span");
  scheduleTitleSpan.className = "scheduleTitle";
  scheduleTitleSpan.textContent = festival.name;
  scheduleTitleDiv.appendChild(scheduleTitleSpan);

  const scheduleVenueAndDate = document.createElement("div");
  scheduleVenueAndDate.className = "scheduleVenueAndDate";

  const scheduleVenue = document.createElement("span");
  scheduleVenue.textContent = festival.venue;
  scheduleVenueAndDate.appendChild(scheduleVenue);

  const startTimeString = festival.dates[0].date;
  console.log(startTimeString);

  const [year, month, day] = startTimeString.split("-");
  const startDate = new Date(year, month - 1, day);

  const dateOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const dateString = startDate.toLocaleDateString("en-US", dateOptions);

  const scheduleStartDate = document.createElement("span");
  scheduleStartDate.textContent = dateString;
  scheduleVenueAndDate.appendChild(scheduleStartDate);

  scheduleTitleDiv.appendChild(scheduleVenueAndDate);

  const targetDiv = document.getElementById("scheduleContainer");

  targetDiv.appendChild(scheduleTitleDiv);
}

let scheduleI = 0;

function populateScheduleClasses() {
  finishedSchedule.forEach((Class) => {
    const individualClassDiv = document.createElement("div");
    individualClassDiv.className = "individualClass";
    individualClassDiv.id = `individualClass_${scheduleI}`;
    console.log(individualClassDiv.id);

    const individualClassTimeAndDateDiv = document.createElement("div");
    individualClassTimeAndDateDiv.className = "individualClassTimeAndDate";

    const startTimeString = Class.startTime;
    const startDate = new Date(startTimeString);

    const dateOptions = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    const dateString = startDate.toLocaleDateString("en-US", dateOptions);
    const timeString = startDate.toLocaleTimeString("en-US", timeOptions);

    const scheduleClassTime = document.createElement("span");
    scheduleClassTime.className = "scheduleClassTime";
    scheduleClassTime.textContent = timeString;
    individualClassTimeAndDateDiv.appendChild(scheduleClassTime);

    const scheduleClassDate = document.createElement("span");
    scheduleClassDate.className = "scheduleClassDate";
    scheduleClassDate.textContent = dateString;
    individualClassTimeAndDateDiv.appendChild(scheduleClassDate);

    individualClassDiv.appendChild(individualClassTimeAndDateDiv);

    const individualClassNumberAndParticipantsDiv =
      document.createElement("div");
    individualClassNumberAndParticipantsDiv.className =
      "individualClassNumberAndParticipants";

    const scheduleClassNumber = document.createElement("span");
    scheduleClassNumber.className = "scheduleClassNumber";
    scheduleClassNumber.textContent = Class.classKey;

    individualClassNumberAndParticipantsDiv.appendChild(scheduleClassNumber);

    const scheduleClassNoParticipants = document.createElement("span");
    scheduleClassNoParticipants.className = "scheduleClassNoParticipants";
    scheduleClassNoParticipants.textContent =
      Class.participants.length + " Entries";

    individualClassNumberAndParticipantsDiv.appendChild(
      scheduleClassNoParticipants
    );
    individualClassDiv.appendChild(individualClassNumberAndParticipantsDiv);

    const targetDiv = document.getElementById("scheduleContainer");

    targetDiv.appendChild(individualClassDiv);
    populateParticipants();
    scheduleI++;
    console.log(scheduleI);
  });
}

function populateParticipants() {
  let classPosition = 1;
  finishedSchedule[scheduleI].participants.forEach((participant, index) => {
    const individualClassParticipantsDiv = document.createElement("div");
    individualClassParticipantsDiv.className = "individualClassParticipants";

    const participantInfoDiv = document.createElement("div");
    participantInfoDiv.className = "participantInfo";

    const participantClassPositionsSpan = document.createElement("span");
    participantClassPositionsSpan.className = "participantClassPosition";
    participantClassPositionsSpan.textContent = classPosition;
    classPosition++;

    participantInfoDiv.appendChild(participantClassPositionsSpan);

    const participantFirstNameSpan = document.createElement("span");
    participantFirstNameSpan.className = "participantFirstName";
    participantFirstNameSpan.textContent =
      "    " + finishedSchedule[scheduleI].participants[index].Name;

    participantInfoDiv.appendChild(participantFirstNameSpan);

    const participantLastNameSpan = document.createElement("span");
    participantLastNameSpan.className = "participantLastName";
    participantLastNameSpan.textContent =
      " " + finishedSchedule[scheduleI].participants[index].LastName;

    participantInfoDiv.appendChild(participantLastNameSpan);

    const participantSongDiv = document.createElement("div");
    participantSongDiv.className = "participantSong";

    const participantSongTitleSpan = document.createElement("span");
    participantSongTitleSpan.className = "participantSongTitle";
    participantSongTitleSpan.textContent =
      finishedSchedule[scheduleI].participants[index].SongTitle;

    participantSongDiv.appendChild(participantSongTitleSpan);

    const participantSongComposerSpan = document.createElement("span");
    participantSongComposerSpan.className = "participantSongComposer";
    participantSongComposerSpan.textContent =
      "  by  " + finishedSchedule[scheduleI].participants[index].composer;

    participantSongDiv.appendChild(participantSongComposerSpan);

    // FOR TH END

    individualClassParticipantsDiv.appendChild(participantInfoDiv);
    individualClassParticipantsDiv.appendChild(participantSongDiv);

    const individualClassDiv = document.getElementById(
      `individualClass_${scheduleI}`
    );

    individualClassDiv.appendChild(individualClassParticipantsDiv);
  });
}
