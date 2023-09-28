const input_to_do = document.querySelector('.input-to-do');
const btn_add_to_do = document.querySelector('.btn-add-to-do');
const to_do = document.querySelector('.to-do');

function img_add(img_add) {
    img_add.src = './assets/img/btn-add-hover.png';
}

function img_add_hover(img_add) {
    img_add.src = './assets/img/btn-add.png';
}

function create_li() {
    const li = document.createElement('li');
    return li;
}

function create_hr() {
    const hr = document.createElement('hr');
    return hr;
}

function create_div() {
    const div = document.createElement('div');
    return div;
}

function create_task(text_input) {
    const li = create_li();
    const hr = create_hr();
    const div = create_div();

    li.innerText = text_input;

    div.appendChild(li);
    div.appendChild(hr);

    to_do.appendChild(div);

    clear_input();
    create_btn_delete(li);
    save_task();
}

function clear_input() {
    input_to_do.value = '';
    input_to_do.focus();
}

function create_btn_delete(li) {

    const img_delete = document.createElement('img');
    img_delete.src = './assets/img/btn-delete.png';
    img_delete.alt = 'button to delete task';
    img_delete.classList.add('img-delete');

    const btn_delete = document.createElement('button');
    btn_delete.appendChild(img_delete);
    btn_delete.style.backgroundColor = 'transparent';
    btn_delete.style.border = 'none';
    btn_delete.style.color = 'none';
    btn_delete.style.cursor = 'pointer';
    btn_delete.setAttribute('title', 'Delete task');

    li.style.display = 'flex';
    li.style.justifyContent = 'space-between';
    li.style.alignItems = 'center';

    li.appendChild(btn_delete);

}

function save_task() {
    const div_task = to_do.querySelectorAll('div');
    const to_do_list = [];

    div_task.forEach(div => {
        const li = div.querySelector('li');
        if (li) {
            const task_text = li.innerText;
            to_do_list.push(task_text);
        }
    });

    const taskJSON = JSON.stringify(to_do_list);

    localStorage.setItem('task', taskJSON);
}

function clear_task() {
    const to_do_list = [];
    const taskJSON = JSON.stringify(to_do_list);

    localStorage.setItem('task', taskJSON);

    const to_do_container = document.getElementById('to_do');
    to_do_container.innerHTML = '';
}

function add_saved_task() {
    const tasks = localStorage.getItem('task');
    const to_do_list = JSON.parse(tasks);

    for (let task of to_do_list) {
        create_task(task);
    }
}

add_saved_task();

function verify_div_ul() {
    const to_do = document.querySelector('.to-do');
    const div_task = to_do.querySelectorAll('div');
    const flex_btn_clear = document.querySelector('.flex-btn-clear');
    const flex_input_btn = document.querySelector('.flex-input-btn');

    if (div_task.length === 0) {
        if (flex_btn_clear) {
            flex_btn_clear.style.display = 'none';
        }

        if (flex_input_btn) {
            flex_input_btn.style.marginBottom = '0px';
        }

    } else {
        if (flex_btn_clear) {
            flex_btn_clear.style.display = 'flex';
        }

        if (flex_input_btn) {
            flex_input_btn.style.marginBottom = '50px';
        }
    }
}

verify_div_ul();

function mobile() {
    return window.innerWidth <= 768;
}

function set_max_length() {
    const input = document.querySelector('.input-to-do');

    if (mobile()) {
        input.setAttribute('maxlength', '25');
    } else {
        input.setAttribute('maxlength', '50');
    }
}

window.addEventListener('load', set_max_length);

window.addEventListener('resize', set_max_length);

btn_add_to_do.addEventListener('click', function () {
    if (!input_to_do.value) return;
    create_task(input_to_do.value);

    window.location.reload();
});

input_to_do.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
        if (!input_to_do.value) return;
        create_task(input_to_do.value);

        window.location.reload();
    }
});

document.addEventListener('click', function (e) {
    const el = e.target;

    if (el.classList.contains('img-delete')) {
        el.parentElement.parentElement.parentElement.remove();

        window.location.reload();
        save_task();
    }

    if (el.classList.contains('btn-clear')) {

        window.location.reload();
        clear_task();
        save_task();
    }
});

