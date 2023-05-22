async function buscaEndereco(cep) {
    let mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = "";
    try {
        var consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var consultaCepConvertida = await consultaCep.json();
        if(consultaCepConvertida.erro){
            throw Error('Este cep não existe!');
        }
        
        let cidade = document.getElementById('cidade');
        let logradouro = document.getElementById('endereco');
        let estado = document.getElementById('estado');
        let bairro = document.getElementById('bairro');

        cidade.value = consultaCepConvertida.localidade;
        logradouro.value = consultaCepConvertida.logradouro;
        estado.value = consultaCepConvertida.uf;
        bairro.value = consultaCepConvertida.bairro;

        console.log(consultaCepConvertida);
        return  consultaCepConvertida;
    } catch (erro) {
        mensagemErro.innerHTML = `<p>Cep inválido. Por favor tente Novamente! </p>` 
        console.log(erro);
    }
};


let cep = document.getElementById('cep');

cep.addEventListener('focusout', () => buscaEndereco(cep.value));