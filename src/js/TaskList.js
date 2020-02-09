/* eslint-disable import/prefer-default-export */
export default class TaskList {
  constructor() {
    this.list = new Set();
  }

  add(obj) {
    if (!this.list.has(obj)) {
      this.list.add(obj);
    } else {
      // eslint-disable-next-line no-throw-literal
      throw (`Задача ${obj} уже существует!`);
    }
  }

  delete(obj) {
    if (this.list.has(obj)) {
      this.list.delete(obj);
    }
  }

  toArray() {
    return Array.from(this.list);
  }
}
