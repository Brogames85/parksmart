// Removed localStorage initialisation because not needed

// Attach event listener for the register button
/*document
    .getElementById("registerCarButton")
    .addEventListener("click", registerCar);*/
const rform = document
    .querySelector("#registerCar")
    
rform.addEventListener("submit", registerCar);

// Handle car registration
function registerCar(e) {
    e.preventDefault();
    const carNumber = document
        .getElementById("carNumber")
        .value.trim()
        .toUpperCase();
    const phoneNumber = document.getElementById("phoneNumber").value.trim();
    if (phoneNumber.length != 10 || !(/^\d+$/.test(phoneNumber)) || !(/^[A-Z]{2}[ -]?[0-9]{1,2}(?:[ -]?[A-Z])?(?:[ -]?[A-Z]*)?[ -]?[0-9]{4}$/.test(carNumber))) {
        alert("Please enter a valid phone number and car number plate. Format of car plate number is -\nMP09AB1234 \n Format of Phone Number is \n1234567890");
    } else {
        const fd = new FormData(rform);
        const urlEncoded = new URLSearchParams(fd).toString();
        fetch("/register", {
            method: "POST",
            body: urlEncoded,
            headers: {
                "Content-type": "application/x-www-form-urlencoded",
            },
        }).then(async (response) => {
            const x = await response.json();
            if (x.task === "success") {
                alert("Car registered successfully!");
                rform.reset();
            } else if (x.task === "exists") {
                alert("Car already exists!");
            } else {
                alert("Error registring car. Please try again.");
            }
        });
    }
}
