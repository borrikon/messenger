let socket = io()

let form = document.querySelector('.chatForm')
let input = document.querySelector('.chatInput')
let chat = document.querySelector('.chatPart')
let modalWindow = document.querySelector('.modal')
let modalForm = document.querySelector('.modalInner')
let nickInput = document.querySelector('.nickName')
let bg = document.querySelector('.background')

let nickName = 'anonimus'

function closeModal(){
    bg.style.display= 'none'
    modalWindow.style.display = 'none'
}

function formSubmitHandler(e){
    e.preventDefault()
    socket.emit('chat message', input.value)
    input.value = ''
}

function modalFormSubmited(e){
    e.preventDefault()

    if(nickInput.value){
        nickName = nickInput.value
        socket.emit('new user', nickName)
    }  

    closeModal()

    let message = chat.appendChild(document.createElement('div'))
    message.classList.add('greeting')
    message.textContent = `New user connected. Say hello to: ${nickName}`
}


socket.on('chat message', function(msg){
    let message = chat.appendChild(document.createElement('div'))
    message.classList.add('message')
    message.textContent = msg
    // let name = message.appendChild(document.createElement('div'))
    // name.classList.add('name')
    // name.textContent = `${nickName}:`
})


form.addEventListener('submit', (e) => formSubmitHandler(e))
modalForm.addEventListener('submit', (e) => modalFormSubmited(e))
