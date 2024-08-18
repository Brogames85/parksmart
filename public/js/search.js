const sForm = document.getElementById("searchForm");
sForm.addEventListener("submit", searchCar);
function searchCar(e) {
    e.preventDefault();
    const searchCarNumber = document
        .getElementById("searchCarNumber")
        .value.trim()
        .toUpperCase();
    if (!(/^[A-Z]{2}[ -]?[0-9]{1,2}(?:[ -]?[A-Z])?(?:[ -]?[A-Z]*)?[ -]?[0-9]{4}$/.test(searchCarNumber))) {
        alert('Please write a valid car plate number in this format -\nMP09AB1234')
        return;
    }
    const fd = new FormData(sForm);
        const urlEncoded = new URLSearchParams(fd).toString();
    fetch("/search", {
        method: "POST",
        body: urlEncoded,
        headers: {
            "Content-type": "application/x-www-form-urlencoded",
        },
    }).then(async (response) => {
        const x = await response.json();
        if (x.data === null) {
            alert("Car is not registered yet.");
            return;
        }
        alert(
            `Car Number: ${x.data.carNumber}\nOwner's Phone Number: ${x.data.phoneNumber}`,
        );
    });
}
