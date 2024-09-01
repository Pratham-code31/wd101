document.addEventListener("DOMContentLoaded", () => {
  const email = document.getElementById("email");
  email.addEventListener("input", () => validate(email));

  const password = document.getElementById("password");
  password.addEventListener("input", () => validatePassword(password));

  const dobInput = document.getElementById("dob");
  dobInput.addEventListener("input", () => validateDob(dobInput));

  const submit = document.getElementById("submit");
  submit.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the form from submitting

    // Validate all fields before saving
    validate(email);
    validatePassword(password);
    validateDob(dobInput);

    // Check if there are any validation errors
    if (document.querySelector(":invalid")) {
      console.log("Form validation failed.");
      return; // Stop if there are validation errors
    }

    console.log("Form is valid. Saving data...");
    saveUserForm();
  });

  function validatePassword(password) {
    if (password.value.length < 8) {
      password.setCustomValidity("Password must be at least 8 characters long.");
    } else {
      password.setCustomValidity("");
    }
    password.reportValidity();
  }

  function validate(element) {
    if (element.validity.typeMismatch) {
      element.setCustomValidity("Please enter a valid email address.");
    } else {
      element.setCustomValidity("");
    }
    element.reportValidity();
  }

  function validateDob(dobInput) {
    const today = new Date();
    const minDate = new Date(
      today.getFullYear() - 55,
      today.getMonth(),
      today.getDate()
    );
    const maxDate = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );

    const dobValue = new Date(dobInput.value);

    if (dobValue < minDate || dobValue > maxDate) {
      dobInput.setCustomValidity(
        "Date of Birth must be between 18 and 55 years old."
      );
    } else {
      dobInput.setCustomValidity("");
    }
    dobInput.reportValidity();
  }

  let userEntries = [];

  const retrieveEntries = () => {
    const entries = localStorage.getItem("user-entries");
    if (entries) {
      userEntries = JSON.parse(entries);
      displayEntries();
    }
  };

  const displayEntries = () => {
    const tableEntries = userEntries
      .map((entry) => {
        const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
        const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
        const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`;
        const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`;
        const acceptedTermsAndConditionsCell = `<td class='border px-4 py-2'>${entry.acceptedTermsAndConditions}</td>`;
        const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptedTermsAndConditionsCell}</tr>`;
        return row;
      })
      .join("\n");

    const table = `<table class="table-auto w-full">
      <tr>
        <th class="px-4 py-2">Name</th>
        <th class="px-4 py-2">Email</th>
        <th class="px-4 py-2">Password</th>
        <th class="px-4 py-2">DOB</th>
        <th class="px-4 py-2">Accepted Terms and Conditions</th>
      </tr>${tableEntries}</table>`;

    let details = document.getElementById("user-entries");
    if (details) {
      details.innerHTML = table;
    } else {
      console.error("Element with ID 'user-entries' not found.");
    }
  };

  const saveUserForm = () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptedTermsAndConditions =
      document.getElementById("checkbox").checked;

    const entry = {
      name,
      email,
      password,
      dob,
      acceptedTermsAndConditions,
    };

    userEntries.push(entry);
    localStorage.setItem("user-entries", JSON.stringify(userEntries));
    displayEntries();
  };

  // Load entries when the page loads
  retrieveEntries();
});
