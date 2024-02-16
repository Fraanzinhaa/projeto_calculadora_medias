const form = document.getElementById('form-atividade'); //criando uma variavel form com id do formulario
const imgAprovado = '<img src="./images/aprovado.png" alt="Emoji celebrando">';
const imgReprovado = '<img src="./images/reprovado.png" alt="Emoji decepcionado">';
const atividades = []; //para CALCUlar a media final vamos precisar adicionar em um array todas as atividades que o usuario digitou
const notas = []; //e nesse array vamos precisar armazenar todas as notas que foram informadas pelo usuário 
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';
const notaMinima = parseFloat(prompt("Digite a nota mínima"));

let linhas = ''; //ela esta aqui pra ficar global

form.addEventListener('submit', function(e) { //evento de submit form.addEventListener('submit') e remover aquele comportamento do formulario de quando ser submetido atualizar a tela function(e) e.preventDefault()
    e.preventDefault();
    
    adicionaLinha();
    atualizaTabela();
    atualizaMediaFinal();
});

function adicionaLinha() { //a responsabilidade dessa função é apenas adicionar uma linha nova a nossa variavel linha
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');

    if (atividades.includes(inputNomeAtividade.value)) {
        alert(`A atividade: ${inputNomeAtividade.value} já foi inserida`);
    } else {
    atividades.push(inputNomeAtividade.value);
    notas.push(parseFloat(inputNotaAtividade.value));

    let linha = '<tr>'; //vamos adc essas informações no corpo da tabela..aqui criamos a variavel linha ela vai receber nosso codigo html como uma string
    linha += `<td>${inputNomeAtividade.value}</td>`;//isso é a mesma coisa que uma concatenação tipo linha = linha + 'outro conteudo' podemos fazer diretamendo com o +=
    linha += `<td>${inputNotaAtividade.value}</td>`;
    linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`; //aqui em cima para dizer se o aluno foi aprovado ou nao estaremos usando o operador ternario ->> o if no caso positivo usamos interrogação e o else usa os dois pontos :
    linha += '</tr>';

    linhas += linha;
    //alert(`Atividade: ${inputNomeAtividade.value} - Nota: ${inputNotaAtividade.value}`);
    }
    inputNomeAtividade.value = '';     //vamos limpar o campo depois de adc o conteudo
    inputNotaAtividade.value = '';
}

function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody')//agora precisamos colocar todo esse conteudo no corpo da tabela...para inserir um conteudo dentro de uma tag usamos o atributo innerhtml
    corpoTabela.innerHTML = linhas; //para inserir um conteudo dentro de uma tag
}

function atualizaMediaFinal() {
    const mediaFinal = calculaMediaFinal();

    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2); //tofixed vai limitar as casas decimais
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

function calculaMediaFinal() {
    let somaDasNotas = 0; //para calcular a media criamos um laço for

    for (let i = 0; i < notas.length; i++) { //notas.lentth é a quantidades de notas que o usuario inseriu
        somaDasNotas += notas [i];
    }

    return somaDasNotas / notas.length;
}