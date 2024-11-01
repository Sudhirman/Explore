let itineraryForm = document.getElementById("itinerary-form");
let itineraryList = document.getElementById("itinerary-list");

let isEditing = false;
let currentEditingItem = null;

// Event listener for adding/editing itinerary items
itineraryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let userName = document.getElementById("user-name").value;
    let userPhone = document.getElementById("user-phone").value;
    let travelDate = document.getElementById("travel-date").value;
    let destinationName = document.getElementById("destination-name").value;
    let destinationCity = document.getElementById("destination-city").value;
    let destinationLandmarks = document.getElementById("destination-landmarks").value;
    let destinationNotes = document.getElementById("destination-notes").value;

    if (isEditing) {
        saveEditedItem(userName, userPhone, travelDate, destinationName, destinationCity, destinationLandmarks, destinationNotes);
    } else {
        addItineraryItem(userName, userPhone, travelDate, destinationName, destinationCity, destinationLandmarks, destinationNotes);
    }

    itineraryForm.reset();
});

// Function to add an item to the itinerary and display it
function addItineraryItem(name, phone, date, country, city, landmarks, notes) {
    let li = document.createElement("li");
    li.className = "itinerary-item";
    li.innerHTML = `
        <strong>Destination: ${country}</strong>
        <p>City: ${city}</p>
        <p>Landmarks: ${landmarks}</p>
        <p>Traveler: ${name} (${phone})</p>
        <p>Date: ${date}</p>
        <p>Notes: ${notes}</p>
        <button onclick="editItineraryItem(this)">Edit</button>
        <button onclick="deleteItineraryItem(this)">Delete</button>`;
    itineraryList.appendChild(li);
}

// Function to delete an item from the itinerary
function deleteItineraryItem(button) {
    button.parentElement.remove();
}

// Function to edit an itinerary item
function editItineraryItem(button) {
    let li = button.parentElement;
    let destinationCountry = li.querySelector("strong").innerText.replace("Destination: ", "").trim();
    let city = li.querySelectorAll("p")[0].innerText.replace("City: ", "").trim();
    let landmarks = li.querySelectorAll("p")[1].innerText.replace("Landmarks: ", "").trim();
    let travelerInfo = li.querySelectorAll("p")[2].innerText.split(" (");
    let name = travelerInfo[0].replace("Traveler: ", "").trim();
    let phone = travelerInfo[1].replace(")", "").trim();
    let date = li.querySelectorAll("p")[3].innerText.replace("Date: ", "").trim();
    let notes = li.querySelectorAll("p")[4].innerText.replace("Notes: ", "").trim();

    document.getElementById("user-name").value = name;
    document.getElementById("user-phone").value = phone;
    document.getElementById("travel-date").value = date;
    document.getElementById("destination-name").value = destinationCountry;
    document.getElementById("destination-city").value = city;
    document.getElementById("destination-landmarks").value = landmarks;
    document.getElementById("destination-notes").value = notes;

    currentEditingItem = li;
    isEditing = true;
    document.querySelector("#itinerary-form button").textContent = "Save Changes";
}

// Function to save an edited itinerary item
function saveEditedItem(name, phone, date, country, city, landmarks, notes) {
    currentEditingItem.querySelector("strong").innerText = `Destination: ${country}`;
    currentEditingItem.querySelectorAll("p")[0].innerText = `City: ${city}`;
    currentEditingItem.querySelectorAll("p")[1].innerText = `Landmarks: ${landmarks}`;
    currentEditingItem.querySelectorAll("p")[2].innerText = `Traveler: ${name} (${phone})`;
    currentEditingItem.querySelectorAll("p")[3].innerText = `Date: ${date}`;
    currentEditingItem.querySelectorAll("p")[4].innerText = `Notes: ${notes}`;

    isEditing = false;
    currentEditingItem = null;
    document.querySelector("#itinerary-form button").textContent = "Add to Itinerary";
}

// Read All Itineraries Button
document.getElementById("btnReadAll").addEventListener("click", () => {
    if (itineraryList.childElementCount === 0) {
        alert("No itineraries to display.");
    } else {
        alert("Displaying all saved itineraries.");
        itineraryList.style.display = "block";
    }
});

// Delete All Itineraries Button
document.getElementById("btnDeleteAll").addEventListener("click", () => {
    if (itineraryList.childElementCount === 0) {
        alert("No itineraries to delete.");
    } else {
        itineraryList.innerHTML = "";
        alert("All itineraries have been deleted.");
    }
});
