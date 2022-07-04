class Todo {
    constructor() {
        this.todoBox = document.createElement('div');
        this.list = [];
    }

    addTask = task => {
        if (!this.list.some(item => item.title === task.title)) {
            this.list.push(task);
            return true;
        }
    };

    removeTask = task => {
        let res = false;
        this.list.forEach((item, index) => {
            if (item.title === task.title) {
                const amount = 1;
                this.list.splice(index, amount);
                res = true;
            }
        });
        return res;
    };

    editTask = task => {
        let res = false;
        this.list.forEach((item, index) => {
            if (item.title === task.title) {
                this.list[index] = task;
                res = true;
            }
        });
        return res;
    };

    info = () => {
        const all = this.list.length;
        const completed = this.list.filter(item => item.completed).length;
        return {
            all,
            completed,
            performing: all - completed,
        };
    };

    updateInfo = () => {
        const info = this.info();
        const all = document.querySelector('#all');
        const completed = document.querySelector('#completed');
        const performing = document.querySelector('#performing');
        all.innerText = 'all: ' + info.all;
        completed.innerText = 'completed: ' + info.completed;
        performing.innerText = 'performing: ' + info.performing;
    };

    saveTask = e => {
        e.preventDefault();
        const form = e.currentTarget;
        const task = {
            title: form.querySelector('.title').innerText,
            text: form.querySelector('.text').value,
            completed: form.querySelector('.completed').checked,
        };
        if (this.editTask(task)) {
            this.updateInfo();
        }
    };

    onRemoveTask = (task, todoItem) => {
        if (this.removeTask(task)) {
            this.todoBox.removeChild(todoItem);
            this.updateInfo();
        }
    };

    renderItem = item => {
        const todoItem = document.createElement('form');
        todoItem.setAttribute('action', '#');
        todoItem.addEventListener('submit', this.saveTask);

        const table = document.createElement('table');
        table.setAttribute('width', '100%');
        const row = document.createElement('tr');

        const ceil1 = document.createElement('td');
        ceil1.setAttribute('width', '10%');
        const title = document.createElement('span');
        title.classList.add('title');
        title.innerText = item.title;
        ceil1.appendChild(title);

        const ceil2 = document.createElement('td');
        ceil2.setAttribute('width', '20%');
        const text = document.createElement('input');
        text.setAttribute('required', '');
        text.classList.add('text');
        text.value = item.text;
        ceil2.appendChild(text);

        const ceil3 = document.createElement('td');
        ceil3.setAttribute('width', '5%');
        const completed = document.createElement('input');
        completed.classList.add('completed');
        completed.type = 'checkbox';
        completed.checked = item.completed;
        ceil3.appendChild(completed);

        const ceil4 = document.createElement('td');
        ceil4.setAttribute('width', '20%');
        const save = document.createElement('button');
        save.type = 'submit';
        save.innerText = 'Save task';
        ceil4.appendChild(save);

        const ceil5 = document.createElement('td');
        ceil5.setAttribute('width', '20%');
        const remove = document.createElement('button');
        remove.addEventListener('click', this.onRemoveTask.bind(null, item, todoItem));
        remove.type = 'button';
        remove.innerText = 'Remove task';
        ceil5.appendChild(remove);

        const ceil6 = document.createElement('td');

        row.appendChild(ceil1);
        row.appendChild(ceil2);
        row.appendChild(ceil3);
        row.appendChild(ceil4);
        row.appendChild(ceil5);
        row.appendChild(ceil6);
        table.appendChild(row);
        todoItem.appendChild(table);

        return todoItem;
    };

    createTask = e => {
        e.preventDefault();
        const form = e.currentTarget;
        const task = {
            title: form.querySelector('.title').value,
            text: form.querySelector('.text').value,
            completed: false,
        };
        if (this.addTask(task)) {
            this.todoBox.appendChild(this.renderItem(task));
            this.updateInfo();
        }
    };

    renderCreate = () => {
        const todoItem = document.createElement('form');
        todoItem.setAttribute('action', '#');
        todoItem.addEventListener('submit', this.createTask);

        const table = document.createElement('table');
        table.setAttribute('width', '100%');
        table.setAttribute('height', '100px');
        const row = document.createElement('tr');

        const ceil1 = document.createElement('td');
        ceil1.setAttribute('width', '20%');
        const title = document.createElement('input');
        title.setAttribute('required', '');
        title.setAttribute('maxlength', '10');
        title.classList.add('title');
        ceil1.appendChild(title);

        const ceil2 = document.createElement('td');
        ceil2.setAttribute('width', '20%');
        const text = document.createElement('input');
        text.setAttribute('required', '');
        text.classList.add('text');
        ceil2.appendChild(text);

        const ceil3 = document.createElement('td');
        ceil3.setAttribute('width', '20%');
        const add = document.createElement('button');
        add.type = 'submit';
        add.innerText = 'Add task';
        ceil3.appendChild(add);

        const ceil4 = document.createElement('td');

        row.appendChild(ceil1);
        row.appendChild(ceil2);
        row.appendChild(ceil3);
        row.appendChild(ceil4);
        table.appendChild(row);
        todoItem.appendChild(table);

        return todoItem;
    };

    renderInfo = () => {
        const infoBox = document.createElement('div');

        const all = document.createElement('div');
        all.id = 'all';

        const completed = document.createElement('div');
        completed.id = 'completed';

        const performing = document.createElement('div');
        performing.id = 'performing';

        infoBox.appendChild(all);
        infoBox.appendChild(completed);
        infoBox.appendChild(performing);

        return infoBox;
    };

    render = container => {
        this.list.forEach(item => {
            this.todoBox.appendChild(this.renderItem(item));
        });
        container.prepend(this.todoBox);
        container.prepend(this.renderCreate());
        container.prepend(this.renderInfo());
        this.updateInfo();
    };
}

const todo = new Todo();

todo.addTask({ title: 'task1', text: 'text1', completed: false });
todo.addTask({ title: 'task2', text: 'text2', completed: false });
todo.addTask({ title: 'task3', text: 'text3', completed: false });

todo.render(document.body);
