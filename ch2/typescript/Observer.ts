interface Observer {
  onNewBook(): void;
}

interface Observable {
  on(reader: Observer): void;

  off(reader: Observer): void;

  notify(): void;
}

class Reader implements Observer {
  constructor(private name: string) {
  }

  public onNewBook() {
    console.log(`${this.name} :  I will go to buy the book to bookstore`);
  }
}

class Publisher implements Observable {
  private readers: Observer[];

  constructor(public name: string) {
    this.readers = [];
  }

  public on(reader: Reader) {
    this.readers.push(reader);
  }

  public off(reader: Reader) {
    this.readers.splice(this.readers.indexOf(reader), 1);
  }

  public notify() {
    this.readers.forEach((reader: Reader) => reader.onNewBook());
  }

}

(function () {
  const oreilly = new Publisher('oreilly');

  const john = new Reader('john');
  const paul = new Reader('paul');
  oreilly.on(john);
  oreilly.on(paul);

  oreilly.notify();
}());
