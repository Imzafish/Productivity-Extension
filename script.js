function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    m = checkTime(m);
    document.getElementById('txt').innerHTML = h + ":" + m;
    setTimeout(startTime, 1000);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i; // Add zero in front of numbers < 10
    }
    return i;
}

window.addEventListener('load', startTime);

document.addEventListener('DOMContentLoaded', () => {
    const openTODO = document.getElementById('openTODO');
    const closeTODO = document.getElementById('todo-text');
    const todoContainer = document.getElementById('todo-container');
    const newTodoInput = document.getElementById('new-todo');
    const taskContainer = document.getElementById('todo-menu');
    const tasksKey = 'tasks';

    function toggleVisibility(container, visibleClass) {
        if (container.classList.contains(visibleClass)) {
            container.classList.remove(visibleClass);
            openTODO.style.opacity = '1';
            openTODO.style.pointerEvents = 'auto';
        } else {
            container.classList.add(visibleClass);
            openTODO.style.opacity = '0';
            openTODO.style.pointerEvents = 'none';
        }
    }

    openTODO.addEventListener('click', () => {
        toggleVisibility(todoContainer, 'todo-container-visible');
    });

    closeTODO.addEventListener('click', () => {
        toggleVisibility(todoContainer, 'todo-container-visible');
    });

    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem(tasksKey)) || [];
        tasks.forEach(task => addTaskToDOM(task.text, task.completed));
    };

    const saveTasks = () => {
        const tasks = Array.from(taskContainer.querySelectorAll('.task-item')).map(task => ({
            text: task.querySelector('.task-text').textContent,
            completed: task.querySelector('.task-checkbox').checked
        }));
        localStorage.setItem(tasksKey, JSON.stringify(tasks));
    };

    const removeTaskFromDOM = (taskElement) => {
        taskElement.remove();
        saveTasks();
    };

    const addTaskToDOM = (text, completed = false) => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');

        taskItem.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${completed ? 'checked' : ''}>
            <span class="task-text">${text}</span>
        `;
        taskContainer.appendChild(taskItem);

        const checkbox = taskItem.querySelector('.task-checkbox');
        checkbox.addEventListener('change', () => {
            saveTasks();

            if (checkbox.checked) {
                setTimeout(() => {
                    if (checkbox.checked) {
                        removeTaskFromDOM(taskItem);
                    }
                }, 20000);
            }
        });
    };

    newTodoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && newTodoInput.value.trim() !== '') {
            const taskCount = taskContainer.querySelectorAll('.task-item').length;
            if (taskCount >= 8) {
                alert('You can only have 8 tasks.');
                return;
            }

            addTaskToDOM(newTodoInput.value.trim());
            newTodoInput.value = '';
            saveTasks();
        }
    });

    window.addEventListener('storage', (event) => {
        if (event.key === tasksKey) {
            taskContainer.innerHTML = '';
            loadTasks();
        }
    });

    loadTasks();
});

document.addEventListener('DOMContentLoaded', () => {
    const BGImage = document.getElementById('BGImage');
    const imageDescription = document.getElementById('image-description');
    const imageLink = document.getElementById('image-link');
    const infoFilePath = 'backgrounds/info.txt';
    const imageFolderPath = 'backgrounds/';

    const getDailyIndex = () => {
        const today = new Date();
        return today.getDate() % 1; // Change for amount of backgrounds
    };

    const fetchImageDescriptions = async () => {
        const response = await fetch(infoFilePath);
        if (!response.ok) throw new Error('Failed to load info file');
        const text = await response.text();
        return text.split('\n').map(line => {
            const [description, link] = line.split('|').map(part => part.trim());
            return { description, link };
        });
    };

    const setDailyBackground = async () => {
        const descriptions = await fetchImageDescriptions();
        const index = getDailyIndex();
        const imagePath = `${imageFolderPath}${index + 1}.jpg`;
        const { description = 'No description available', link = '#' } = descriptions[index] || {};

        BGImage.style.backgroundImage = `url('${imagePath}')`;
        imageDescription.textContent = description;
        imageLink.href = link;
    };

    setDailyBackground();
});

