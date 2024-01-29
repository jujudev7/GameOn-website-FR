function editNav() {
  const x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalBg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelector(".close"); // we select the close btn (x)
const modalConfirmation = document.querySelector(".bg-confirm");
const confirmationClose = document.querySelector(".bg-confirm .close"); // we select the close btn (x)
const closeBtn = document.querySelector(".close-confirmation");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalBg.style.display = "block";
}

// launch modal confirmation
function launchModalConfirmation() {
  modalConfirmation.style.display = "block";
}

// close modal event
modalClose.addEventListener("click", closeModal); // we listen if the user click on the cross btn, if yes, we close the modal

// close modal function
function closeModal() {
  modalBg.style.display = "none"; // hide the modal
} 

// close modal Confirmation event
confirmationClose.addEventListener("click", closeModalConfirmation); // we listen if the user click on the cross btn, if yes, we close the confirmation modal

// close modal confirmation function
function closeModalConfirmation() {
  modalConfirmation.style.display = "none"; // hide the confirmation modal
} 

closeBtn.addEventListener("click", closeModalConfirmation); // we listen if the user click on the close confirmation btn, if yes, we close the confirmation modal

const form = document.querySelector("form");

// we listen the form when user click on submit
form.addEventListener("submit", (event) => {
  // we prevent the browser not to execute the default behavior associated with the event (submitting and reloading the page) 
  event.preventDefault();
  if (validate()) {
    closeModal();
    launchModalConfirmation();
    form.reset(); // we reset the values of the form, empty out the fields
    resetStyleClasses(); // we remove classes "valid" / "invalid"
  }
});

function validate() {
  // we get the values of the fields
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;
  const birthdate = document.getElementById("birthdate").value;
  const quantity = document.getElementById("quantity").value;
  const location = document.querySelector('input[name="location"]:checked');
  const checkbox1 = document.getElementById("checkbox1").checked;

  // we select all inputs, in order to show to the user if the field is valid or not
  const inputFirstname = document.getElementById("firstname"); 
  const inputLastname = document.getElementById("lastname");
  const inputEmail = document.getElementById("email");
  const inputBirthdate = document.getElementById("birthdate");
  const inputQuantity = document.getElementById("quantity");
  const radioBtnIcons = document.querySelectorAll(".location .checkbox-icon"); 
  const inputCheckbox1 = document.querySelector(".cgu .checkbox-icon");

  const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  // ^: Start of the string
  // [^\s@]+: One or more characters that are neither spaces nor '@' for the part before the '@'".
  // @: the character "@".
  // [^\s@]+: One or more characters that are neither spaces nor '@' for the part after the '@'".
  // \.: the character "." (dot),  that is escaped because it has a special meaning in regex.
  // [^\s@]{2,}: indicates that the sequence of characters after the last dot '.' (the domain name extension) must contain at least 2 characters that are neither spaces nor '@' until the end of the string $."

  // we select "error zones" to inject texte when we find an error
  const errorFirstname = document.getElementById("error-firstname");
  const errorLastname = document.getElementById("error-lastname");
  const errorEmail = document.getElementById("error-email");
  const errorBirthdate = document.getElementById("error-birthdate");
  const errorQuantity = document.getElementById("error-quantity");
  const errorLocation = document.getElementById("error-location");
  const errorCgu = document.getElementById("error-cgu");

  let isValid = true;

  // Firstname validation
  if (firstname.trim() == "") {
    errorFirstname.textContent = "Veuillez renseigner votre prénom svp";
    inputFirstname.classList.add("invalid");
    isValid = false;
  } else if (firstname.trim().length < 2) {
    errorFirstname.textContent = "Votre prénom est trop court !";
    inputFirstname.classList.add("invalid");
    inputFirstname.classList.remove("valid");
    isValid = false;
  } else {
    inputFirstname.classList.add("valid");
    errorFirstname.textContent = "";
  }

  // Lastname validation 
  if (lastname.trim() == "") {
    errorLastname.textContent = "Veuillez renseigner votre nom de famille svp";
    inputLastname.classList.add("invalid");
    isValid = false;
  } else if (lastname.trim().length < 2) {
    errorLastname.textContent = "Votre nom est trop court !";

    inputLastname.classList.add("invalid");
    inputLastname.classList.remove("valid");
    isValid = false;
  } else {
    inputLastname.classList.add("valid");
    errorLastname.textContent = "";
  }

  // Email validation
  if (!emailRegExp.test(email)) {  // = if (emailRegExp.test(email) == false) {
    errorEmail.textContent = "Veuillez saisir une adresse e-mail valide svp";
    inputEmail.classList.add("invalid");
    inputEmail.classList.remove("valid");
    isValid = false;
  } else {
    inputEmail.classList.add("valid");
    errorEmail.textContent = "";
  }

  // Quantity validation
  if (quantity.trim() == "" || quantity.trim() > 99) {
    errorQuantity.textContent =
      "Veuillez saisir un nombre valide de tournois svp";
    inputQuantity.classList.add("invalid");
    inputQuantity.classList.remove("valid");
    isValid = false;
  } else {
    inputQuantity.classList.add("valid");
    inputQuantity.classList.remove("invalid");
    errorQuantity.textContent = "";
  }

  // Location validation
  if (location == null) {
    errorLocation.textContent = "Veuillez choisir une ville svp";

    for (let i = 0; i < radioBtnIcons.length; i++) {
      radioBtnIcons[i].style.border = "2px solid red";
    }
  } else {
    errorLocation.textContent = "";
    for (let i = 0; i < radioBtnIcons.length; i++) {
      radioBtnIcons[i].style.border = "";
    }
  }

  // Terms and Conditions validation 
  if (!checkbox1) {
    errorCgu.textContent = "Veuillez accepter les conditions d'utilisation svp";
    inputCheckbox1.style.border = "2px solid red";
    isValid = false;
  } else {
    errorCgu.textContent = "";
    inputCheckbox1.style.border = "2px solid rgb(0, 255, 21)";
  }

    //////////////////////////////////////////
   //         Birthdate Validation         //
  //////////////////////////////////////////

  // creating Date objects
  const birthdateUser = new Date(birthdate); // birthdate of the user
  const today = new Date(); // the current date and time
  const thirteenYearsAgo = new Date(); 
  thirteenYearsAgo.setFullYear(today.getFullYear() - 13); // set the value of the object 13 years before the current date
  const _123YearsAgo = new Date();
  _123YearsAgo.setFullYear(today.getFullYear() - 123); // set the value of the object 123 years before the current date

  if (birthdate == "" || birthdate == null) {
    errorBirthdate.textContent = "Veuillez entrer votre date de naissance svp";
    inputBirthdate.classList.add("invalid");
    inputBirthdate.classList.remove("valid");
    isValid = false;
  } else if (birthdateUser < _123YearsAgo) {
    errorBirthdate.textContent =
      "Veuillez entrer une date de naissance valide svp";
    inputBirthdate.classList.add("invalid");
    inputBirthdate.classList.remove("valid");
    isValid = false;
  } else if (birthdateUser > thirteenYearsAgo) {
    errorBirthdate.textContent =
      "Désolé, vous n'avez pas l'âge requis pour participer !";
    inputBirthdate.classList.add("invalid");
    inputBirthdate.classList.remove("valid");
    isValid = false;
  } else if (
    birthdateUser >= _123YearsAgo &&
    birthdateUser <= thirteenYearsAgo
  ) {
    errorBirthdate.textContent = "";
    inputBirthdate.classList.add("valid");
    inputBirthdate.classList.remove("invalid");
  }

  // If all validations are OK, the form is valid
  return isValid;
}

// we remove classes "valid" / "invalid" when form is valid
function resetStyleClasses() {
  const fields = document.querySelectorAll('.text-control');
  const inputCheckbox1 = document.querySelector(".cgu .checkbox-icon");

  fields.forEach(function(field) {
      field.classList.remove('valid', 'invalid');
  });

  inputCheckbox1.style.border = "";
}