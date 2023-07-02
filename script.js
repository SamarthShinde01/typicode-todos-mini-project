const apiUrl = 'https://jsonplaceholder.typicode.com/todos';

function getTodos() {
  fetch(apiUrl + '?_limit=10')
    .then((res) => res.json())
    .then((data) => {
      data.forEach((todo) => addTodoToDOM(todo));
    });
};

function addTodoToDOM(todo) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(todo.title));

  div.setAttribute('data-id', todo.id);

  if (todo.completed) {
    div.classList.add('done');
  }

  document.getElementById('todo-list').appendChild(div);
}

function createTodo(e) {
  e.preventDefault();
  // console.log(e.target.firstElementChild.value);

  const newTodo = {
    title: e.target.firstElementChild.value,
    completed: false
  }

  fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify(newTodo),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(data => addTodoToDOM(data))
};

function init() {
  document.addEventListener('DOMContentLoaded', getTodos);
  document.querySelector('#todo-form').addEventListener('submit', createTodo);
}

init();
