/* eslint-disable no-plusplus */
import Task from './Task';
import TaskList from './TaskList';

const taskList = new TaskList();

taskList.add(new Task('Задача 1'));
taskList.add(new Task('Задача 2, сложная'));
taskList.add(new Task('Задача 3, самая сложная'));

let TaskFilter = '';

function RenderSection(params) {
  const {
    id, pinnedMode, sectionHeader, emptyInfo,
  } = params;
  const AutoAddChild = (node, typ) => {
    const newElement = document.createElement(typ);
    node.appendChild(newElement);
    return newElement;
  };
  const sect = document.getElementById(id);
  while (sect.firstChild) { sect.removeChild(sect.firstChild); }
  const textH2 = AutoAddChild(sect, 'h2');
  textH2.innerText = sectionHeader;
  const sectTab = AutoAddChild(sect, 'table');
  const sectBody = AutoAddChild(sectTab, 'tbody');
  let k = 0;
  taskList.toArray().forEach((el) => {
    if (pinnedMode === el.pinned && (TaskFilter === '' || el.pinned || el.name.search(TaskFilter) !== -1)) {
      const task = AutoAddChild(sectBody, 'tr');
      const taskTD = AutoAddChild(task, 'td');
      taskTD.classList.add('taskname');
      taskTD.innerText = el.name;
      const taskTD2 = AutoAddChild(task, 'td');
      taskTD2.classList.add('tasktype');
      taskTD2.innerHTML = `<input id="${el.name}_control" type = "checkbox">`;
      const checkbox = document.getElementById(`${el.name}_control`);
      if (pinnedMode) {
        checkbox.checked = true;
        el.pin();
      }
      checkbox.addEventListener('change', () => {
        el.switch();
        // eslint-disable-next-line no-use-before-define
        RenderSections();
      });
      k++;
    }
  });
  if (k === 0) {
    const task = AutoAddChild(sectBody, 'tr');
    const taskTD = AutoAddChild(task, 'td');
    taskTD.innerText = emptyInfo;
  }
}

function RenderSections() {
  RenderSection({
    id: 'pinnedTasks',
    pinnedMode: true,
    sectionHeader: 'Pinned Tasks',
    emptyInfo: 'No pinned tasks',
  });
  RenderSection({
    id: 'allTasks',
    pinnedMode: false,
    sectionHeader: 'All Tasks',
    emptyInfo: 'No tasks',
  });
}

// фильтрация
document.getElementById('enterform').addEventListener('input', (event) => {
  const text = event.target.value;
  TaskFilter = text;
  RenderSections();
});

// Ввод
document.getElementById('enterform').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const text = event.target.value;
    if (text) {
      taskList.add(new Task(text));
      TaskFilter = '';
      RenderSections();
      // eslint-disable-next-line no-param-reassign
      event.target.value = '';
    }
  }
});

/*
* Старт приложения
*/
document.addEventListener('DOMContentLoaded', () => {
  RenderSections();
  // eslint-disable-next-line no-console
  console.log('Game started!');
});
