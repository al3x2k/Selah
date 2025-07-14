//Starts the fast
function startFast(){
  //Grab the input values from the Start a Fast page
  const reason = document.getElementById('reason').value;
  const fastType = document.getElementById('fastType').value;
  const endTime = document.getElementById('endTime').value;

  //Check if all the inputs are filled out
  if(!reason || !fastType || !endTime){
    alert('Please fill out all the fields including the fast type!');
    return;
  }

  //Create a new fast object
  const fastData = {
    reason: reason,
    endTime: new Date(endTime).getTime(), //Convert the end time to a timestamp
    startTime: Date.now(), //Get the current timestamp
    fastType: fastType,
    completed: false
  };
  
//Saving the fast data to local storage
localStorage.setItem("currentFast", JSON.stringify(fastData));

//Redirect to the countdown page
window.location.href = "countdown.html"
}

function loadCountdown(){
  // Grab the fast data from local storage
  const fastData = JSON.parse(localStorage.getItem("currentFast"));

  //Check if the data exists
  if(!fastData){
    document.body.innerHTML = "<h2>No fast in progress</h2>";
    return;
  }

  //Display the fast data
  document.getElementById("reasonDisplay").innerText = fastData.reason;
  document.getElementById("typeDisplay").innerText = fastData.fastType;

  // Countdown logic
  const countdownEl = document.getElementById("countdown");

  const interval = setInterval(() => {
    const now = Date.now();
    const distance = fastData.endTime - now;

    if (distance <= 0) {
      clearInterval(interval);
      countdownEl.textContent = "Fast Complete!";
      document.getElementById("encouragement").textContent = "Well done. Take a moment to reflect. 💛";

      // Mark fast as completed and store it
      fastData.completed = true;
      let logs = JSON.parse(localStorage.getItem("fastLogs")) || [];
      logs.push(fastData);
      localStorage.setItem("fastLogs", JSON.stringify(logs));
      localStorage.removeItem("currentFast");
      return;
    }

    // Convert milliseconds to days, hours, minutes, seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display it!
    countdownEl.textContent = `${days} day${days !== 1 ? "s" : ""}, ${hours} hour${hours !== 1 ? "s" : ""},     ${minutes} min${minutes !== 1 ? "s" : ""}, ${seconds} sec${seconds !== 1 ? "s" : ""}`;

  }, 1000);
  
}

// Helper to format fast type names
function formatFastType(type) {
  const labels = {
    soul: "Soul Fast",
    food: "Food Fast",
    prayer: "Prayer-Focused Fast",
    worship: "Worship-Focused Fast",
    media: "Media Fast",
    custom: "Custom Fast"
  };
  return labels[type] || "Unknown Type";
}

// Run this only on the countdown page
if (window.location.pathname.includes("countdown.html")) {
  loadCountdown();
}

function endFast(){
// Grab the fast data from local storage
const fastData = JSON.parse(localStorage.getItem("currentFast"));

  // Check if the data exists
  if(!fastData){
    alert("No fast in progress");
    return;
  }

  fastData.completed = true;

  //Save the updated fast data to local storage
  let logs = JSON.parse(localStorage.getItem("fastLogs")) || [];
  logs.push(fastData);
  localStorage.setItem("fastLogs", JSON.stringify(logs));

  //Remove the current fast data from local storage
  localStorage.removeItem("currentFast");

  //Give feedback to the user
  alert("Fast ended and saved to the log!");
  window.location.href = "index.html";
}

function displayRandomVerse(fastType){
  //Grab the verse bank
  const verses = verseBank[fastType];

  //Check if the verse bank exists
  if(!verses)return;

  const randomIndex = Math.floor(Math.random() * verses.length);
  const verse = verses[randomIndex];

  //Display the verse
  document.getElementById("encouragement").innerText = verse;
  }

