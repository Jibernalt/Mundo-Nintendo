function validateForm() {
    let email = $('#inputEmail').val().trim();
    let name = $('#inputName').val().trim();
    let phone = $('#inputPhone').val().trim();

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    console.log("Valor de correo electrónico:", email); 

    if (email === "") {
        alert('El correo es requerido');
        return false;
    } else if (!emailRegex.test(email)) {
        alert('El correo no es válido');
        return false;
    }

    if (name === "") {
        alert('El nombre es requerido');
        return false;
    }

    if (phone === "") {
        alert('El Valor del juego es requerido');
        return false;
    }

    return true;
}

function showData() {
    let listPeople;

    if (localStorage.getItem('listPeople') == null) {
        listPeople = [];
    } else {
        listPeople = JSON.parse(localStorage.getItem("listPeople"));
    }

    var html = "";

    $.each(listPeople, function (index, element) {
        html += "<tr>";
        html += "<td>" + element.email + "</td>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.phone + "</td>";
        html += '<td><button onclick="deleteData(' + index + ')" class="btn btn-danger">Eliminar dato</button> <button onclick="openEditModal(' + index + ')" class="btn btn-warning">Editar dato</button></td>';
        html += "</tr>";
    });

    $('#tableData tbody').html(html);
}

$(document).ready(function () {
    showData();
});

function AddData() {
    if (validateForm()) {
        let email = $('#inputEmail').val().trim();
        let name = $('#inputName').val().trim();
        let phone = $('#inputPhone').val().trim();

        var listPeople;
        if (localStorage.getItem('listPeople') == null) {
            listPeople = [];
        } else {
            listPeople = JSON.parse(localStorage.getItem("listPeople"));
        }

        listPeople.push({
            email: email,
            name: name,
            phone: phone,
        });

        localStorage.setItem('listPeople', JSON.stringify(listPeople));

        showData();

        $('#inputEmail, #inputName, #inputPhone').val("");
    }
}

function deleteData(index) {
    var listPeople;
    if (localStorage.getItem('listPeople') == null) {
        listPeople = [];
    } else {
        listPeople = JSON.parse(localStorage.getItem("listPeople"));
    }

    listPeople.splice(index, 1);
    localStorage.setItem('listPeople', JSON.stringify(listPeople));
    showData();
}

function updateData() {
    if (validateForm()) {
        let email = $('#editEmail').val().trim();
        let name = $('#editName').val().trim();
        let phone = $('#editPhone').val().trim();

        var listPeople;
        if (localStorage.getItem('listPeople') == null) {
            listPeople = [];
        } else {
            listPeople = JSON.parse(localStorage.getItem("listPeople"));
        }

        listPeople[currentIndex].email = email;
        listPeople[currentIndex].name = name;
        listPeople[currentIndex].phone = phone;

        localStorage.setItem('listPeople', JSON.stringify(listPeople));

        showData();

        closeEditModal();
    }
}

function openEditModal(index) {
    $('#btnAdd').hide();

    var listPeople;
    if (localStorage.getItem('listPeople') == null) {
        listPeople = [];
    } else {
        listPeople = JSON.parse(localStorage.getItem("listPeople"));
    }

    $('#editEmail').val(listPeople[index].email);
    $('#editName').val(listPeople[index].name);
    $('#editPhone').val(listPeople[index].phone);

    $('#btnUpdateModal').show();

    $('#btnUpdateModal').click(function () {
        updateData();
    });

    $('#editModal').show();
}

function closeEditModal() {
    $('#editModal').hide();
    $('#btnAdd').show();
}