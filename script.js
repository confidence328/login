document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');
    const taskCount = document.getElementById('taskCount');
    const clearCompletedBtn = document.getElementById('clearCompleted');
    
    // Load tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    // Render initial tasks
    renderTasks();
    updateTaskCount();
    
    // Add task event
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    // Clear completed tasks
    clearCompletedBtn.addEventListener('click', function() {
        tasks = tasks.filter(task => !task.completed);
        saveTasks();
        renderTasks();
        updateTaskCount();
    });
    
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push({
                id: Date.now(),
                text: taskText,
                completed: false
            });
            
            taskInput.value = '';
            saveTasks();
            renderTasks();
            updateTaskCount();
        }
    }
    
    function renderTasks() {
        taskList.innerHTML = '';
        
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.dataset.id = task.id;
            if (task.completed) {
                li.classList.add('completed');
            }
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', function() {
                toggleTaskStatus(task.id);
            });
            
            const span = document.createElement('span');
            span.textContent = task.text;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = '&times;';
            deleteBtn.className = 'delete-btn';
            deleteBtn.addEventListener('click', function() {
                deleteTask(task.id);
            });
            
            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    }
    
    function toggleTaskStatus(id) {
        tasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        
        saveTasks();
        renderTasks();
        updateTaskCount();
    }
    
    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks();
        updateTaskCount();
    }
    
    function updateTaskCount() {
        const remainingTasks = tasks.filter(task => !task.completed).length;
        taskCount.textContent = `${remainingTasks} task${remainingTasks !== 1 ? 's' : ''} remaining`;
    }
    
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(t