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
modalClose.addEventListener("click", closeModal); // we add en event on click for close btn with addEventListener()

// close modal function
function closeModal() {
  modalBg.style.display = "none";
} // we create the function closeModal() to modify display property for hiding the modal

// close modal Confirmation event
confirmationClose.addEventListener("click", closeModalConfirmation); // we add en event on click for close btn with addEventListener()

// close modal confirmation function
function closeModalConfirmation() {
  modalConfirmation.style.display = "none";
} // we create the function closeModalConfirmation() to modify display property for hiding the modal

closeBtn.addEventListener("click", closeModalConfirmation);

const form = document.querySelector("form");

// Ajout d'un écouteur d'événement sur le formulaire pour écouter le submit
form.addEventListener("submit", (event) => {
  // On empêche le comportement par défaut
  event.preventDefault();
  if (validate()) {
    closeModal();
    launchModalConfirmation();
    form.reset(); // on vide les champs du formulaire
    resetStyleClasses();
  }
});

function validate() {
  // Récupérer les valeurs des champs
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;
  const birthdate = document.getElementById("birthdate").value;
  const quantity = document.getElementById("quantity").value;
  const location = document.querySelector('input[name="location"]:checked');
  const checkbox1 = document.getElementById("checkbox1").checked;

  const inputFirstname = document.getElementById("firstname"); // on sélectionne chaque input afin d'indiquer à l'utilisateur si le champ est valide ou non
  const inputLastname = document.getElementById("lastname");
  const inputEmail = document.getElementById("email");
  const inputBirthdate = document.getElementById("birthdate");
  const inputQuantity = document.getElementById("quantity");
  const radioBtnIcons = document.querySelectorAll(".location .checkbox-icon");
  const inputCheckbox1 = document.querySelector(".cgu .checkbox-icon");

  const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  // ^: Début de la chaîne.
  // [^\s@]+: Un ou plusieurs caractères qui ne sont ni des espaces ni des "@", pour la partie avant le "@".
  // @: Le caractère "@".
  // [^\s@]+: Un ou plusieurs caractères qui ne sont ni des espaces ni des "@", pour la partie après le "@".
  // \.: Le caractère "." (point), qui est échappé car il a une signification spéciale en regex.
  // [^\s@]{2,}: indique que la séquence de caractères après le dernier point "." (l'extension du nom de domaine) doit contenir au minimum 2 caractères qui ne sont ni des espaces ni des "@" jusqu'à la fin de la chaîne $.

  const errorFirstname = document.getElementById("error-firstname");
  const errorLastname = document.getElementById("error-lastname");
  const errorEmail = document.getElementById("error-email");
  const errorBirthdate = document.getElementById("error-birthdate");
  const errorQuantity = document.getElementById("error-quantity");
  const errorLocation = document.getElementById("error-location");
  const errorCgu = document.getElementById("error-cgu");

  let isValid = true;

  // // Validation du prénom
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

  // // Validation du nom
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

  // Validation de l'e-mail
  if (!emailRegExp.test(email)) {
    errorEmail.textContent = "Veuillez saisir une adresse e-mail valide svp";
    inputEmail.classList.add("invalid");
    inputEmail.classList.remove("valid");
    isValid = false;
  } else {
    inputEmail.classList.add("valid");
    errorEmail.textContent = "";
  }

  // Validation de la quantité de tournois
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

  // Validation choix ville
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

  // Validation de la case à cocher des conditions d'utilisation
  if (!checkbox1) {
    errorCgu.textContent = "Veuillez accepter les conditions d'utilisation svp";
    inputCheckbox1.style.border = "2px solid red";
    isValid = false;
  } else {
    errorCgu.textContent = "";
    inputCheckbox1.style.border = "2px solid rgb(0, 255, 21)";
  }

  //////////////////////////////////////////
  //  Validation de la date de naissance  //
  //////////////////////////////////////////

  const birthdateUser = new Date(birthdate);
  const today = new Date();
  const thirteenYearsAgo = new Date();
  thirteenYearsAgo.setFullYear(today.getFullYear() - 13);
  const _123YearsAgo = new Date();
  _123YearsAgo.setFullYear(today.getFullYear() - 123);

  // const age = calculateAge(birthdateUser);

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

  // Si toutes les validations sont passées, le formulaire est valide
  return isValid;
}

// Fonction pour réinitialiser les classes de style sur les champs
function resetStyleClasses() {
  // Sélectionnez tous les champs qui peuvent avoir des classes de style
  const fields = document.querySelectorAll('.text-control');
  const inputCheckbox1 = document.querySelector(".cgu .checkbox-icon");

  // Parcourez les champs et réinitialisez les classes de style
  fields.forEach(function(field) {
      field.classList.remove('valid', 'invalid');
  });

  inputCheckbox1.style.border = "";
  // Réinitialisez également d'autres éléments s'il y a lieu
  // (par exemple, radio buttons, checkboxes, etc.)
}