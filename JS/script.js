$('#Cep').mask('00000-000');





function searchCep() {
    var cepInsert = document.getElementById("Cep").value.replace("-", "");
    $.getJSON(`https://viacep.com.br/ws/${cepInsert}/json/`, (itens) => {

 
        var logradouro = itens.logradouro;
        var bairro = itens.bairro;
        var localidade = itens.localidade;
        var uf = itens.uf;

        console.log(logradouro);
        console.log(bairro);
        console.log(localidade);
        console.log(uf);


    });
    
};
