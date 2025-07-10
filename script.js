let currentEditingRow = null;
function Submit() {


    document.querySelectorAll(".errmsg").forEach(label => label.textContent = "");
    let isValid = true;
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let address = document.getElementById("address").value.trim();
    let sports = document.querySelectorAll('input[name="sport"]:checked');
    let gender = document.querySelectorAll('input[name="gender"]:checked');
    let country = document.getElementById("country").value;

    if (name === "") {
        document.querySelector('label[for="name"]+input+label.errmsg').textContent = "Name is Required";
        isValid = false;
    }

    if (email === "") {
        document.querySelector('label[for="email"]+input+label.errmsg').textContent = "Email is Must";
        isValid = false;
    }
    if (password === "") {
        document.querySelector('label[for="password"]+input+label.errmsg').textContent = "Passwo is Important";
        isValid = false;
    }

    if (address === "") {
        document.querySelector('label[for="address"]+textarea+label.errmsg').textContent = "Address is Should";
        isValid = false;
    }

    if (sports.length === 0) {
        document.querySelector('label[for="sport"].errmsg').textContent = "Select At Least Once";
        isValid = false;
    }

    if (gender.length === 0) {
        document.querySelector('label[for="gender"].errmsg').textContent = "You Can Prooved YourSelf";
        isValid = false;
    }

    if (country === "") {
        document.querySelector('label[for="country"].errmsg').textContent = "Select Your County";
        isValid = false;
    }
    if (isValid) {
        let sportlist = Array.from(sports).map(s => s.value).join(",");
        let GenderValue = gender[0].value;

        if (currentEditingRow) {
            currentEditingRow.cells[0].innerText = name;
            currentEditingRow.cells[1].innerText = email;
            currentEditingRow.cells[2].innerText = password;
            currentEditingRow.cells[3].innerText = address;
            currentEditingRow.cells[4].innerText = sportlist;
            currentEditingRow.cells[5].innerText = GenderValue;
            currentEditingRow.cells[6].innerText = country;
            currentEditingRow = null;

            document.getElementById("submitBtn").value = "Submit";
        } else {
            let table = document.querySelector(".tablecontent table");
            let newRow = table.insertRow(-1);

            newRow.insertCell(0).innerText = name;
            newRow.insertCell(1).innerText = email;
            newRow.insertCell(2).innerText = password;
            newRow.insertCell(3).innerText = address;
            newRow.insertCell(4).innerText = sportlist;
            newRow.insertCell(5).innerText = GenderValue;
            newRow.insertCell(6).innerText = country;
            newRow.insertCell(7).innerHTML = `<button onclick="editRow(this)">Edit</button>`;
            newRow.insertCell(8).innerHTML = `<button onclick="deleteRow(this)">Delete</button>`;
        }

        document.querySelector("form")?.reset();
        document.getElementById("submitBtn").value = "Submit";
        document.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(e => e.checked = false);
    }


}
function deleteRow(button) {
    let row = button.parentElement.parentElement;
    row.remove();
}

function editRow(button) {

    document.getElementById("submit").value = "update";

    currentEditingRow = button.parentElement.parentElement;
    document.getElementById("name").value = currentEditingRow.cells[0].innerText;
    document.getElementById("email").value = currentEditingRow.cells[0].innerText;
    document.getElementById("password").value = currentEditingRow.cells[0].innerText;
    document.getElementById("address").value = currentEditingRow.cells[0].innerText;

    let sports = currentEditingRow.cells[4].innerText.split(",");
    document.querySelectorAll('input[name="sport"]').forEach(input => {
        input.checked = sports.includes(input.value);
    });

    let gender=currentEditingRow.cells[5].innerText;
    document.querySelectorAll('input[name="gender"]').forEach(input=>{
        input.checked=(input.value===gender);
    });

    document.getElementById("country").value = currentEditingRow.cells[6].innerText;

}


function reset() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("address").value = "";
    document.getElementById("country").value = "";
    document.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(e => e.checked = false);

}