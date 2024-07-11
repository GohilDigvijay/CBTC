document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const completedTaskList = document.getElementById('completedTaskList');

    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const timestamp = new Date().toLocaleString();
            const taskItem = createTaskItem(taskText, timestamp);
            taskList.appendChild(taskItem);
            taskInput.value = '';
        }
    });

    function createTaskItem(text, timestamp) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${text}</span>
            <span class="timestamp">Added: ${timestamp}</span>
            <button class="completeBtn">Complete</button>
        `;

        li.querySelector('.completeBtn').addEventListener('click', () => {
            const completeTimestamp = new Date().toLocaleString();
            li.querySelector('.completeBtn').remove();
            li.querySelector('.timestamp').textContent = Completed: ${completeTimestamp};
            li.classList.add('completed');
            completedTaskList.appendChild(li);
        });

        return li;
    }
});