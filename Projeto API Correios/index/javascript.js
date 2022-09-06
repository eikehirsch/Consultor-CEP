let localidade = document.querySelector('.resultado__localidade');
let bairro = document.querySelector('.resultado__bairro');
let logradouro = document.querySelector('.resultado__logradouro');
let complemento = document.querySelector('.resultado__complemento');
let uf = document.querySelector('.resultado__uf');
let cepDigitado = document.querySelector('.cep__input');
let alertaErro = document.querySelector('.erro');
alertaErro.innerHTML = '';


cepDigitado.addEventListener('keypress', () => {
     cepDigitadoLength = cepDigitado.value.length;
     if(cepDigitadoLength === 5){
          cepDigitado.value += '-';
     }
})

async function consultarCep() {
     let cepDigitado = document.querySelector('.cep__input').value;
     if(cepDigitado.length != 9){
          alertaErro.innerHTML = "Erro! O CEP digitado precisa ter 8 dígitos e apenas números."
     }else{
          alertaErro.innerHTML = '';
     }

     let resultado = await fecthAPI(`https://viacep.com.br/ws/${cepDigitado}/json/`);
     console.log(resultado);
     if(resultado.hasOwnProperty('erro')){
               alertaErro.innerHTML = "Erro! O CEP digitado não foi encontrado."
     }else{
          alertaErro.innerHTML = '';

          localidade.value = resultado.localidade;
          bairro.value = resultado.bairro;
          logradouro.value = resultado.logradouro;
          complemento.value = resultado.complemento;
          if(resultado.complemento == ''){
               complemento.value = "Complemento não informado"
          }
          uf.value = resultado.uf;
     }
}

//#region apiFetch
const fecthAPI = async (url) => {
     const APIResponse = await fetch(url);
     const data = await APIResponse.json();
     return data;     
}
//#endregion 

