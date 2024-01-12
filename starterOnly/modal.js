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

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalBg.style.display = "block";
}

// close modal event
modalClose.addEventListener("click", closeModal); // we add en event on click for close btn with addEventListener()

// close modal function
function closeModal() {
  modalBg.style.display = "none";
} // we create the function closeModal() to modify display property for hiding the modal

const form = document.querySelector("form");

// Ajout d'un écouteur d'événement sur le formulaire pour écouter le submit
form.addEventListener("submit", (event) => {
  // On empêche le comportement par défaut
  event.preventDefault();
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

  let inputs = document.querySelectorAll("input");
  // console.log("000000000001:" + inputs);

  const inputFirstname = document.getElementById("firstname"); // on sélectionne chaque input afin d'indiquer à l'utilisateur si le champ est valide ou non
  const inputLastname = document.getElementById("lastname");
  const inputEmail = document.getElementById("email");
  const inputBirthdate = document.getElementById("birthdate");
  const inputQuantity = document.getElementById("#quantity");
  const checkboxIcons = document.querySelectorAll(".location .checkbox-icon");
  const inputCheckbox1 = document.querySelector(".cgu .checkbox-icon");
  // const emailRegExp = new RegExp("[\w]+@[\w-]+\\.[\w]{2,4}");
  const emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+$");

  let isValid = true;

  inputs.forEach(function (input) {
    // console.log("000000000002:" + input);
    input.classList.add("invalid");
    /*
    if (input.value.trim() === "" || input.value.trim() === !isValid) {
      input.classList.add("invalid");
      isValid = false;
    } else {
      input.classList.remove("invalid");
    }
    */
  });
  console.log("000000000001" + firstname);

  // // Validation du prénom
  if (firstname.trim() == "") {
    alert("Veuillez renseigner votre prénom svp");
    inputFirstname.classList.add("invalid");
    return false;
  } else if (firstname.trim().length < 2) {
    alert("Votre prénom est trop court !");
    inputFirstname.classList.add("invalid");
    inputFirstname.classList.remove("valid");
    return false;
  } else {
    inputFirstname.classList.add("valid");
  }

  // // Validation du nom
  if (lastname.trim() == "") {
    alert("Veuillez renseigner votre nom de famille svp");
    inputLastname.classList.add("invalid");
    return false;
  } else if (lastname.trim().length < 2) {
    alert("Votre nom est trop court !");
    inputLastname.classList.add("invalid");
    inputLastname.classList.remove("valid");
    return false;
  } else {
    inputLastname.classList.add("valid");
  }

  // // // Validation de l'e-mail
  // // Ici, vous pouvez utiliser une expression régulière pour valider l'e-mail
  // // Dans cet exemple, la validation est simple (doit contenir '@' et '.')
  // if (!emailRegExp.test(email)) {
  //   alert("Veuillez saisir une adresse e-mail valide.");
  //   return false;
  // } else {
  //   inputEmail.classList.add("valid"); // Ajoute une classe "valid" lorsque le champ est rempli
  // }

  // // Validation de la date de naissance
  // // Vous pouvez ajouter une validation plus spécifique si nécessaire
  // if (birthdate.trim() == "") {
  //   alert("Veuillez saisir votre date de naissance.");
  //   return false;
  // }

  // // Validation de la quantité de tournois
  // if (quantity.trim() == "" || isNaN(quantity)) {
  //   alert("Veuillez saisir un nombre valide pour la quantité de tournois.");
  //   return false;
  // }

  // // Validation du choix de location
  // if (!location) {
  //   alert("Veuillez sélectionner une location.");
  //   return false;
  // }

  // // Validation de la case à cocher des conditions d'utilisation
  // if (!checkbox1) {
  //   alert("Veuillez accepter les conditions d'utilisation.");
  //   return false;
  // }

  // Si toutes les validations sont passées, le formulaire est valide
  //   return true; // Le formulaire est valide
  // }

  return isValid;
}
