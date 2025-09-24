window.onload = function () {
    let editDonorData = localStorage.getItem("editDonorData");
    if (editDonorData) {
        let donor = JSON.parse(editDonorData);

        document.querySelector('input[placeholder="Enter your name"]').value = donor.name;
        document.querySelector('input[placeholder="Enter your Age"]').value = donor.age;
        document.querySelector('input[placeholder="Enter your Phone no."]').value = donor.phone;
        document.getElementById("Sex").value = donor.sex;
        document.getElementById("Blood type").value = donor.blood;
        document.querySelector('input[placeholder="Enter your weight"]').value = donor.weight;
        document.querySelector('input[placeholder="Enter the date"]').value = donor.lastDonated;

        localStorage.removeItem("editDonorData");
    }
};

function savedata() {
    let donors = JSON.parse(localStorage.getItem("donors")) || [];

    let name = document.querySelector('input[placeholder="Enter your name"]').value.trim();
    let age = document.querySelector('input[placeholder="Enter your Age"]').value.trim();
    let phone = document.querySelector('input[placeholder="Enter your Phone no."]').value.trim();
    let sex = document.getElementById("Sex").value;
    let blood = document.getElementById("Blood type").value;
    let weight = document.querySelector('input[placeholder="Enter your weight"]').value.trim();
    let lastDonated = document.querySelector('input[placeholder="Enter the date"]').value.trim();

    let donor = { name, age, phone, sex, blood, weight, lastDonated };

    let editIndex = localStorage.getItem("editIndex");
    if (editIndex !== null) {
        donors[editIndex] = donor;
        localStorage.removeItem("editIndex");
    } else {
        donors.push(donor);
    }

    localStorage.setItem("donors", JSON.stringify(donors));

    window.location.href = "./home.html";
}
