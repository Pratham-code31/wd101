const form = document.getElementById("registrationForm");
const dobInput = document.getElementById("dob");
const dobError = document.getElementById("dobError");
const savedDataTable = document.getElementById("savedDataTable");
const savedDataBody = document.getElementById("savedDataBody");

// Function to calculate age based on date of birth
function calculateAge(dob) {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
}

// Function to validate date of birth for age range between 18 and 55
function validateDob() {
  const dobValue = dobInput.value;
  const age = calculateAge(dobValue);
  if (age < 18 || age > 55) {
    dobError.textContent = "Age must be between 18 and 55.";
    return false;
  } else {
    dobError.textContent = "";
    return true;
  }
}

// Function to display data in a table format
function displayData(name, email, password, dob, termsAccepted) {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
        <td>${name}</td>
        <td>${email}</td>
        <td>${password}</td>
        <td>${dob}</td>
        <td>${termsAccepted}</td>
    `;
  savedDataBody.appendChild(newRow);
  savedDataTable.style.display = "table";
}

// Form submission event
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (validateDob()) {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = dobInput.value;
    const termsAccepted = document.getElementById("terms").checked;

    // Save data to localStorage
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("dob", dob);
    localStorage.setItem("termsAccepted", termsAccepted ? "True" : "False");

    // Display the data in the table format
    displayData(name, email, password, dob, termsAccepted ? "True" : "False");

    alert("Registration Successful!");
  }
});

// Load saved data from localStorage when the page loads
window.onload = function () {
  const savedName = localStorage.getItem("name");
  const savedEmail = localStorage.getItem("email");
  const savedDob = localStorage.getItem("dob");
  const savedTerms = localStorage.getItem("termsAccepted");

  if (savedName && savedEmail && savedDob && savedTerms) {
    displayData(savedName, savedEmail, "*****", savedDob, savedTerms);
  }
};

// Add validation on the Date of Birth field when it changes
dobInput.addEventListener("input", validateDob);
