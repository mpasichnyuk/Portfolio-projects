const form = document.getElementById('form')
const input = document.getElementById('input')
const todosUL = document.getElementById('todos')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    addTodo()
    console.log('sumbit works!')
})

function addTodo(todo) {
   let todoText = input.value

   if (todo) {
        todoText = todo.text
   }

   if (todoText) {
       const todoEl = document.createElement('li')
       if (todo && todo.complete) {
           todoEl.classList.add('completed')
       }

       todoEl.innerText = todoText
       
       todoEl.addEventListener('click', () => todoEl.classList.toggle('completed'))
       todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault()
            todoEl.remove()
            
        })
       todosUL.appendChild(todoEl)

       input.value = ''
   }
}

const arr = [1, 2, 3, 4, 5, 6];
arr.length