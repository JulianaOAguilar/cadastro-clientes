$('#Cep').mask('00000-000');
var number = document.querySelector("#number");
number.disabled = true;




function searchCep() {
    var cepInsert = document.getElementById("Cep").value.replace("-", "");


    if (cepInsert.length != 8) {
        number.disabled = true;
        setCepInfo({});
        errorAlert();
        return;
    }


    clearErrorAlert();
    $.getJSON(`https://viacep.com.br/ws/${cepInsert}/json/`, (itens) => {

        if (itens.erro) {

            

         number.disabled = true;
            setCepInfo({});
            errorAlert();
            return false;
            
        }
        number.disabled = false;
        setCepInfo(itens);
        clearErrorAlert();
    })

}





function errorAlert() {
    document.getElementById("error").innerHTML = "<div class='text-danger'> CEP inválido! </div> ";
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

