export default class Task {
  constructor(name) {
    this.name = name;
    this.pinned = false;
  }

  pin() {
    this.pinned = true;
  }

  unpin() {
    this.pinned = false;
  }

  switch() {
    this.pinned = !this.pinned;
  }
}
