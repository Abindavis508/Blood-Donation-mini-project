window.onload = function () {
    displayDonors();
    document.getElementById("search").addEventListener("input", searchDonors);
};

function displayDonors(donors = null) {
    donors = donors || JSON.parse(localStorage.getItem("donors")) || [];
    let donorDetailsDiv = document.getElementById("donorDetails");

    if (!donors.length) {
        donorDetailsDiv.innerHTML = "<p>No donor data available.</p>";
        return;
    }

    let tableHTML = `
        <table class="border-collapse border border-gray-300 w-full">
            <thead>
                <tr class="bg-gray-200">
                    <th class="border px-4 py-2">#</th>
                    <th class="border px-4 py-2">Name</th>
                    <th class="border px-4 py-2">Age</th>
                    <th class="border px-4 py-2">Phone</th>
                    <th class="border px-4 py-2">Sex</th>
                    <th class="border px-4 py-2">Blood Group</th>
                    <th class="border px-4 py-2">Weight</th>
                    <th class="border px-4 py-2">Last Donated</th>
                    <th class="border px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
    `;

    donors.forEach((donor, index) => {
        tableHTML += `
            <tr id="row-${index}" class="border">
                <td class="border px-4 py-2">${index + 1}</td>
                <td class="border px-4 py-2" id="name-${index}">${donor.name}</td>
                <td class="border px-4 py-2" id="age-${index}">${donor.age}</td>
                <td class="border px-4 py-2" id="phone-${index}">${donor.phone}</td>
                <td class="border px-4 py-2" id="sex-${index}">${donor.sex}</td>
                <td class="border px-4 py-2" id="blood-${index}">${donor.blood}</td>
                <td class="border px-4 py-2" id="weight-${index}">${donor.weight}</td>
                <td class="border px-4 py-2" id="lastDonated-${index}">${donor.lastDonated}</td>
                <td class="border px-4 py-2 flex gap-2">
                    <button onclick="editRow(${index})" class="bg-yellow-400 px-2 rounded">Edit</button>
                    <button onclick="deleteDonor(${index})" class="bg-red-500 px-2 rounded text-white">Delete</button>
                </td>
            </tr>
        `;
    });

    tableHTML += "</tbody></table>";
    donorDetailsDiv.innerHTML = tableHTML;
}

function editRow(index) {
    let donors = JSON.parse(localStorage.getItem("donors")) || [];

    document.getElementById(`name-${index}`).innerHTML = `<input value="${donors[index].name}" id="input-name-${index}" class="border px-1 w-full">`;
    document.getElementById(`age-${index}`).innerHTML = `<input type="number" value="${donors[index].age}" id="input-age-${index}" class="border px-1 w-full">`;
    document.getElementById(`phone-${index}`).innerHTML = `<input type="number" value="${donors[index].phone}" id="input-phone-${index}" class="border px-1 w-full">`;

    document.getElementById(`sex-${index}`).innerHTML = `
        <select id="input-sex-${index}" class="border px-1 w-full">
            <option value="Male" ${donors[index].sex === "Male" ? "selected" : ""}>Male</option>
            <option value="Women" ${donors[index].sex === "Women" ? "selected" : ""}>Women</option>
        </select>
    `;

    document.getElementById(`blood-${index}`).innerHTML = `
        <select id="input-blood-${index}" class="border px-1 w-full">
            <option value="A+" ${donors[index].blood === "A+" ? "selected" : ""}>A+</option>
            <option value="A-" ${donors[index].blood === "A-" ? "selected" : ""}>A-</option>
            <option value="B+" ${donors[index].blood === "B+" ? "selected" : ""}>B+</option>
            <option value="B-" ${donors[index].blood === "B-" ? "selected" : ""}>B-</option>
            <option value="O+" ${donors[index].blood === "O+" ? "selected" : ""}>O+</option>
            <option value="O-" ${donors[index].blood === "O-" ? "selected" : ""}>O-</option>
            <option value="AB+" ${donors[index].blood === "AB+" ? "selected" : ""}>AB+</option>
            <option value="AB-" ${donors[index].blood === "AB-" ? "selected" : ""}>AB-</option>
        </select>
    `;

    document.getElementById(`weight-${index}`).innerHTML = `<input type="number" value="${donors[index].weight}" id="input-weight-${index}" class="border px-1 w-full">`;
    document.getElementById(`lastDonated-${index}`).innerHTML = `<input type="date" value="${donors[index].lastDonated}" id="input-lastDonated-${index}" class="border px-1 w-full">`;

    // Change buttons
    document.querySelector(`#row-${index} td:last-child`).innerHTML = `
        <button onclick="saveRow(${index})" class="bg-green-500 px-2 rounded text-white">Save</button>
        <button onclick="displayDonors()" class="bg-gray-400 px-2 rounded text-white">Cancel</button>
    `;
}

function saveRow(index) {
    let donors = JSON.parse(localStorage.getItem("donors")) || [];

    donors[index] = {
        name: document.getElementById(`input-name-${index}`).value,
        age: document.getElementById(`input-age-${index}`).value,
        phone: document.getElementById(`input-phone-${index}`).value,
        sex: document.getElementById(`input-sex-${index}`).value,
        blood: document.getElementById(`input-blood-${index}`).value,
        weight: document.getElementById(`input-weight-${index}`).value,
        lastDonated: document.getElementById(`input-lastDonated-${index}`).value
    };

    localStorage.setItem("donors", JSON.stringify(donors));
    displayDonors();
}

function deleteDonor(index) {
    let donors = JSON.parse(localStorage.getItem("donors")) || [];
    donors.splice(index, 1);
    localStorage.setItem("donors", JSON.stringify(donors));
    displayDonors();
}

function searchDonors() {
    let searchValue = document.getElementById("search").value.toLowerCase();
    let donors = JSON.parse(localStorage.getItem("donors")) || [];

    let filtered = donors.filter(donor =>
        donor.name.toLowerCase().includes(searchValue) ||
        donor.blood.toLowerCase().includes(searchValue)
    );

    displayDonors(filtered);
}
