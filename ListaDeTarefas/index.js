const inputTarefa = document.getElementById('itens')
const adicionarTarefa = document.getElementById('adicionar')
const tarefas = document.getElementById('tarefas')

function criarTarefa(textoInput){
    const li = document.createElement('li')
    li.innerHTML = textoInput;
    tarefas.appendChild(li)
    criaBtnApagar(li)
}

function criaBtnApagar(li){
    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    botaoApagar.setAttribute('class', 'apagar')
    li.appendChild(botaoApagar)
}

inputTarefa.addEventListener('keypress', function(e){
    if (e.keyCode === 13){
        if (!inputTarefa.value) return
        criarTarefa(inputTarefa.value)
        inputTarefa.value = '';
        console.log('Adicionado com Sucesso')
        salvarNavegador();
    }
})


adicionarTarefa.addEventListener('click', function(e){
    if (!inputTarefa.value) return
    criarTarefa(inputTarefa.value);
    salvarNavegador();
})

document.addEventListener('click', function(e){
    const el = e.target;

    if(el.classList.contains('apagar')){
        el.parentElement.remove();
    }
})

function salvarNavegador(){
    const liTarefas = tarefas.querySelectorAll('li')
    const listaDeTarefas = []

    for (let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto)

    }

    const tarefasJSON = JSON.stringify(listaDeTarefas)
    console.log(tarefasJSON)
    localStorage.setItem('tarefas', tarefasJSON)
}

function adicionarTarefaSalvas(){
    const tarefas = localStorage.getItem('tarefas')
    const listaDeTarefas = JSON.parse(tarefas)
    for (let tarefa of listaDeTarefas){
        criarTarefa(tarefa)
    }
}

adicionarTarefaSalvas()