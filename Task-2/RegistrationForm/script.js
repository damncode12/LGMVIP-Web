// Check if there is any existing data in the local storage
var existingData = localStorage.getItem("enrollmentData");
if (existingData) {
  var parsedData = JSON.parse(existingData);
  document.getElementById("name").value = parsedData.name;
  document.getElementById("email").value = parsedData.email;
  document.getElementById("phone").value = parsedData.phone;
  document.getElementById("website").value = parsedData.website;
  document.getElementById("gender").value = parsedData.gender;
  var skills = document.getElementsByName("skills");
  parsedData.skills.forEach(function (skill) {
    for (var i = 0; i < skills.length; i++) {
      if (skills[i].value === skill) {
        skills[i].checked = true;
        break;
      }
    }
  });
  document.getElementById("image-display").src = parsedData.image;
}

// Retrieve the existing enrollment list from local storage
var existingEnrollmentList = localStorage.getItem("enrollmentList");
var enrollmentList = existingEnrollmentList ? JSON.parse(existingEnrollmentList) : [];

// Display the existing enrollment list on page load
displayEnrollmentList();

function submitForm() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;
  var website = document.getElementById("website").value;
  var gender = document.getElementById("gender").value;
  var skills = [];
  var skillCheckboxes = document.getElementsByName("skills");
  for (var i = 0; i < skillCheckboxes.length; i++) {
    if (skillCheckboxes[i].checked) {
      skills.push(skillCheckboxes[i].value);
    }
  }
  var image = document.getElementById("upload").value;

  // Check if any field is left blank
  if (name === "" || email === "" || phone === "" || website === "" || gender === "" || skills.length === 0 || image === "") {
    alert("Please fill in all the fields.");
    return;
  }

  document.getElementById("name-display").textContent = "Name: " + name;
  document.getElementById("email-display").textContent = "Email: " + email;
  document.getElementById("phone-display").textContent = "Phone: " + phone;
  document.getElementById("website-display").textContent = "Website: " + website;
  document.getElementById("gender-display").textContent = "Gender: " + gender;
  document.getElementById("skills-display").textContent = "Skills: " + skills.join(", ");
  document.getElementById("image-display").src = image;

  // Store the enrollment data in local storage
  var enrollmentData = {
    name: name,
    email: email,
    phone: phone,
    website: website,
    gender: gender,
    skills: skills,
    image: image
  };
  localStorage.setItem("enrollmentData", JSON.stringify(enrollmentData));

  document.getElementById("enrollment-form").style.display = "none";
  document.getElementById("enrollment-data").style.display = "block";

  // Update the enrollment list
  updateEnrollmentList(name);
}

function updateEnrollmentList(name) {
  enrollmentList.push(name);
  localStorage.setItem("enrollmentList", JSON.stringify(enrollmentList));

  var enrollmentListData = document.getElementById("enrollment-list-data");
  var listItem = document.createElement("li");
  listItem.textContent = name;
  enrollmentListData.appendChild(listItem);

  document.getElementById("enrollment-list").style.display = "block";
}

function displayEnrollmentList() {
  var enrollmentListData = document.getElementById("enrollment-list-data");
  enrollmentListData.innerHTML = "";
  enrollmentList.forEach(function (name) {
    var listItem = document.createElement("li");
    listItem.textContent = name;
    enrollmentListData.appendChild(listItem);
  });
}
window.onbeforeunload = function () {
  localStorage.removeItem("enrollmentData");
};