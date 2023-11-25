function validate() {
    let contactName = document.getElementById("name");
    let contactNameError = document.getElementById("nameError");

    let contactSubject = document.getElementById("subject");
    let contactSubjectError = document.getElementById("subjectError");

    let contactMessage = document.getElementById("message");
    let contactMessageError = document.getElementById("messageError");

    let contactEmail = document.getElementById("mail");
    let contactEmailError = document.getElementById("emailError");

    if (contactName.value.length <= 5 && contactName.value.length > 0) {
        contactNameError.style.display = "block";
    } else {
        contactNameError.style.display = "none";
    }

    if (contactSubject.value.length <= 15 && contactSubject.value.length > 0) {
        contactSubjectError.style.display = "block";
    } else {
        contactSubjectError.style.display = "none";
    }

    if (contactMessage.value.length <= 25 && contactMessage.value.length > 0) {
        contactMessageError.style.display = "block";
    } else {
        contactMessageError.style.display = "none";
    }
    
    if (contactEmail.validity.valid == false && contactEmail.value.length > 0) {
        contactEmailError.style.display = "block";
    } else {
        contactEmailError.style.display = "none";
    }
}