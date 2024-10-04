$('#Cep').mask('00000-000');





function searchCep() {
    var cepInsert = document.getElementById("Cep").value.replace("-", "");
    $.getJSON(`https://viacep.com.br/ws/${cepInsert}/json/`, (itens) => {

        
    setCepInfo(itens);
       

    });
    
};

function setCepInfo(itens) {
    document.getElementById("address").value = itens.logradouro || " ";
    document.getElementById("bairro").value = itens.bairro || " ";
    document.getElementById("city").value = itens.localidade || " ";
    document.getElementById("state").value = itens.uf || " ";
}