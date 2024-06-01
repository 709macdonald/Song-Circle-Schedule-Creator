function populateSchedule() {
  const scheduleTitle = "Schedule Title";
  const scheduleVenue = "Schedule Venue";
  const scheduleStartDate = "DATE"; // Placeholder for the actual date

  // Create and populate the schedule title div
  const scheduleTitleDiv = document.createElement("div");
  scheduleTitleDiv.id = "scheduleTitleDiv";

  const scheduleTitleSpan = document.createElement("span");
  scheduleTitleSpan.id = "scheduleTitle";
  scheduleTitleSpan.className = "scheduleTitle";
  scheduleTitleSpan.textContent = scheduleTitle;

  const scheduleVenueAndDateDiv = document.createElement("div");
  scheduleVenueAndDateDiv.className = "scheduleVenueAndDate";

  const scheduleVenueSpan = document.createElement("span");
  scheduleVenueSpan.id = "scheduleVenue";
  scheduleVenueSpan.textContent = scheduleVenue;

  const scheduleStartDateSpan = document.createElement("span");
  scheduleStartDateSpan.id = "scheduleStartDate";
  scheduleStartDateSpan.textContent = scheduleStartDate;

  scheduleVenueAndDateDiv.appendChild(scheduleVenueSpan);
  scheduleVenueAndDateDiv.appendChild(scheduleStartDateSpan);

  scheduleTitleDiv.appendChild(scheduleTitleSpan);
  scheduleTitleDiv.appendChild(scheduleVenueAndDateDiv);

  document.body.appendChild(scheduleTitleDiv);

  // Create and populate the individual class div
  finishedSchedule.forEach((singleClass) => {
    const individualClassDiv = document.createElement("div");
    individualClassDiv.className = "individualClass";
    individualClassDiv.id = "individualClass";

    const individualClassTimeAndDateDiv = document.createElement("div");
    individualClassTimeAndDateDiv.className = "individualClassTimeAndDate";

    const scheduleClassTimeSpan = document.createElement("span");
    scheduleClassTimeSpan.className = "scheduleClassTime";
    scheduleClassTimeSpan.textContent = `${singleClass.startTime.getHours()}:${singleClass.startTime.getMinutes()}`;

    const scheduleClassDateSpan = document.createElement("span");
    scheduleClassDateSpan.className = "scheduleClassDate";
    scheduleClassDateSpan.textContent = singleClass.startTime.toDateString();

    individualClassTimeAndDateDiv.appendChild(scheduleClassTimeSpan);
    individualClassTimeAndDateDiv.appendChild(scheduleClassDateSpan);

    const individualClassNumberAndParticipantsDiv =
      document.createElement("div");
    individualClassNumberAndParticipantsDiv.className =
      "individualClassNumberAndParticipants";

    const scheduleClassNumberSpan = document.createElement("span");
    scheduleClassNumberSpan.className = "scheduleClassNumber";
    scheduleClassNumberSpan.textContent = `Class Num: ${singleClass.classKey}`;

    const scheduleClassNoParticipantsSpan = document.createElement("span");
    scheduleClassNoParticipantsSpan.className = "scheduleClassNoParticipants";
    scheduleClassNoParticipantsSpan.textContent = `${singleClass.participants.length} Participants`;

    individualClassNumberAndParticipantsDiv.appendChild(
      scheduleClassNumberSpan
    );
    individualClassNumberAndParticipantsDiv.appendChild(
      scheduleClassNoParticipantsSpan
    );

    const individualClassParticipantsDiv = document.createElement("div");
    individualClassParticipantsDiv.className = "individualClassParticipants";

    singleClass.participants.forEach((participant, index) => {
      const participantInfoDiv = document.createElement("div");
      participantInfoDiv.className = "participantInfo";

      const participantClassPositionSpan = document.createElement("span");
      participantClassPositionSpan.className = "participantClassPosition";
      participantClassPositionSpan.textContent = index + 1;

      const participantFirstNameSpan = document.createElement("span");
      participantFirstNameSpan.className = "participantFirstName";
      participantFirstNameSpan.textContent = participant.Name;

      const participantLastNameSpan = document.createElement("span");
      participantLastNameSpan.className = "participantLastName";
      participantLastNameSpan.textContent = participant.LastName;

      participantInfoDiv.appendChild(participantClassPositionSpan);
      participantInfoDiv.appendChild(participantFirstNameSpan);
      participantInfoDiv.appendChild(participantLastNameSpan);

      const participantSongDiv = document.createElement("div");
      participantSongDiv.className = "participantSong";

      const participantSongTitleSpan = document.createElement("span");
      participantSongTitleSpan.className = "participantSongTitle";
      participantSongTitleSpan.textContent = participant.SongTitle;

      const bySpan = document.createElement("span");
      bySpan.textContent = " by ";

      const participantSongComposerSpan = document.createElement("span");
      participantSongComposerSpan.className = "participantSongComposer";
      participantSongComposerSpan.textContent = participant.Composer;

      participantSongDiv.appendChild(participantSongTitleSpan);
      participantSongDiv.appendChild(bySpan);
      participantSongDiv.appendChild(participantSongComposerSpan);

      individualClassParticipantsDiv.appendChild(participantInfoDiv);
      individualClassParticipantsDiv.appendChild(participantSongDiv);
    });

    individualClassDiv.appendChild(individualClassTimeAndDateDiv);
    individualClassDiv.appendChild(individualClassNumberAndParticipantsDiv);
    individualClassDiv.appendChild(individualClassParticipantsDiv);

    document.body.appendChild(individualClassDiv);
  });
}
