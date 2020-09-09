let socket = io()

let form = document.querySelector('form')
let input = document.querySelector('input')
let chat = document.querySelector('.chatPart')

function formSubmitHandler(e){
    e.preventDefault()
    socket.emit('chat message', input.value)
    input.value = ''
}

socket.on('chat message', function(msg){
    let message = chat.appendChild(document.createElement('div'))
    message.classList.add('message')
    message.textContent = msg
})


form.addEventListener('submit', (e) => formSubmitHandler(e))