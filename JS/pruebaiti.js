document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    const searchInput = document.getElementById('search');

    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const dueDate = document.getElementById('due-date').value;
        const priority = document.getElementById('priority').value;

        addTask(title, description, dueDate, priority);
        taskForm.reset();
    });

    function addTask(title, description, dueDate, priority) {
        const taskRow = document.createElement('tr');
        taskRow.innerHTML = `
            <td>${title}</td>
            <td>${description}</td>
            <td>${dueDate}</td>
            <td>${priority}</td>
            <td>Pendiente</td>
            <td>
                <button class="complete-btn">Completar</button>
                <button class="delete-btn">Eliminar</button>
            </td>
        `;
        taskList.appendChild(taskRow);
    }

    taskList.addEventListener('click', function(event) {
        if (event.target.classList.contains('complete-btn')) {
            const taskRow = event.target.parentElement.parentElement;
            taskRow.classList.toggle('completed');
            const status = taskRow.classList.contains('completed') ? 'Completada' : 'Pendiente';
            taskRow.querySelector('td:nth-child(5)').textContent = status;
        }

        if (event.target.classList.contains('delete-btn')) {
            const taskRow = event.target.parentElement.parentElement;
            taskRow.remove();
        }
    });

    searchInput.addEventListener('input', function(event) {
        const searchValue = event.target.value.toLowerCase();
        const tasks = taskList.querySelectorAll('tr');
        
        tasks.forEach(function(task) {
            const title = task.querySelector('td').textContent.toLowerCase();
            if (title.includes(searchValue)) {
                task.style.display = 'table-row';
            } else {
                task.style.display = 'none';
            }
        });
    });
});
