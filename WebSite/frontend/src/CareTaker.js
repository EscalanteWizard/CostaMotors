class CareTaker {
    constructor() {
      this.mementos = [];
      this.currentIndex = -1;
    }
  
    addMemento(memento) {
      this.mementos = this.mementos.slice(0, this.currentIndex + 1);
      this.mementos.push(memento);
      this.currentIndex++;
    }
  
    undo() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        return this.mementos[this.currentIndex].getState();
      }
      return null;
    }
  
    redo() {
      if (this.currentIndex < this.mementos.length - 1) {
        this.currentIndex++;
        return this.mementos[this.currentIndex].getState();
      }
      return null;
    }
  }
  export default CareTaker;