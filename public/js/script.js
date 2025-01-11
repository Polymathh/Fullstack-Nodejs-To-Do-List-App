document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');


    //Fetch tasks
    const fetchTasks = async () => {
        const res = await fetch('/api/tasks');
        const tasks = await res.json();
        taskList.innerHTML = '';
        tasks.forEach((task) => {
            const li = document.createElement('li');
            li.innerHTML = `
            ${task.title} - ${task.status}
            <button onclick='deleteTask(${task.id})'>Delete</button>
            <button onclick="updateTask(${task.id}, '${task.status}')">
            Mark as ${task.status === "pending" ? "completed" : "Pending"}
            </button>
            `;
            taskList.appendChild(li);
        });
    };


    //Add task
    taskForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const title = taskInput.value;
        await fetch("/api/tasks", {
            method: "POST",
            headers: { "Content-Type" : "application/json"},
            body: JSON.stringify({ title }),
        });
        taskInput.value = "";
        fetchTasks();
    });


    //Delete task
    window.deleteTask = async (id) => {
        await fetch(`/api/tasks/${id}`, { method: "DELETE" });
        fetchTasks();
    };


    //Update task
    window.updateTask = async (id, status) => {
        const newStatus = status === "pending" ? "completed" : "pending";
        await fetch(`/api/tasks/${id}`, {
            method: "PUT",
            headers: { "Content Type" : "application/json" },
            body: JSON.stringify({ status: newStatus }),
        });
        fetchTasks();
    };

    fetchTasks();

});