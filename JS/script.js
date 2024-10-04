// JavaScript
$('#Cep').mask('00000-000');
var number = document.querySelector("#number");
var saveButton = document.querySelector("#save");
number.disabled = true;
saveButton.disabled = true;

function searchCep() {
    var cepInsert = document.getElementById("Cep").value.replace("-", "");
    if (cepInsert.length != 8) {
        number.disabled = true;
        saveButton.disabled = true;
        setCepInfo({});
        errorAlert();
        return;
    }

    clearErrorAlert();
    $.getJSON(`https://viacep.com.br/ws/${cepInsert}/json/`, (itens) => {
        if (itens.erro) {
            number.disabled = true;
            saveButton.disabled = true;
            setCepInfo({});
            errorAlert();
            return false;
        }
        saveButton.disabled = false;
        number.disabled = false;
        setCepInfo(itens);
        clearErrorAlert();
        validateInputs();
    });
}

function errorAlert() {
    document.getElementById("error").innerHTML = "<div class='text-danger'> CEP inválido! </div>";
}

function clearErrorAlert() {
    document.getElementById("error").innerHTML = "";
}

function setCepInfo(itens) {
    document.getElementById("address").value = itens.logradouro || " ";
    document.getElementById("bairro").value = itens.bairro || " ";
    document.getElementById("city").value = itens.localidade || " ";
    document.getElementById("state").value = itens.uf || " ";
}

function saveClient() {
    var ClientInfo = setClientInfo();
    var table = document.getElementById("table");
    var rowcount = table.rows.length;
    var newRow = table.insertRow();

    newRow.innerHTML = `<th scope="row">${rowcount + 1}</th>
        <td>${ClientInfo.nomeCompleto}</td>
        <td>${ClientInfo.endereco}</td>
        <td>${ClientInfo.cep}</td>
        <td>${ClientInfo.bairro}</td>
        <td>${ClientInfo.cidade}</td>
        <td>${ClientInfo.estado}</td>`;

    document.querySelector("form").reset();
}

function setClientInfo() {
    var nomeCompleto = document.getElementById("name").value + " " + document.getElementById("secondName").value;
    var endereco = document.getElementById("address").value + ", " + document.getElementById("number").value;
    var cep = document.getElementById("Cep").value;
    var bairro = document.getElementById("bairro").value;
    var cidade = document.getElementById("city").value;
    var estado = document.getElementById("state").value;

    return { nomeCompleto, endereco, cep, bairro, cidade, estado };
}

function validateInputs() {
    var nome = document.getElementById("name").value.trim();
    var sobrenome = document.getElementById("secondName").value.trim();
    var numero = document.getElementById("number").value.trim();

    if (nome !== "" && sobrenome !== "" && numero !== "") {
        saveButton.disabled = false;  
    } else {
        saveButton.disabled = true;   
    }
}
