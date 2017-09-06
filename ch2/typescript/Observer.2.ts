interface Observer {
  onNewBook(): void;
}

interface Observable {
  on(state: string, reader: Observer): void;
  off(state: string, reader: Observer): void;
  notify(state: string): void;
}

type Listener = {
  state: string;
  readers: Observer[];
}

class Reader implements Observer {

  constructor(private name: string) { }

  public onNewBook() {
    console.log(`${this.name} : I will go to buy the book to bookstore`);
  }
}

class Publisher implements Observable {

  private listeners: Listener[];

  constructor(public name: string) {
    this.listeners = [];
  }

  public on(state: string, reader: Reader) {
    const listener = this.getListener(state);
    if (listener && listener.readers) {
      listener.readers.push(reader);
    } else {
      this.listeners.push({
        state,
        readers: [reader]
      });
    }
  }

  public off(state: string, reader: Reader) {
    const listener = this.getListener(state);
    listener && listener.readers.splice(listener.readers.indexOf(reader), 1);
  }

  public notify(state: string) {
    const listener = this.getListener(state);
    listener && listener.readers.forEach((reader: Reader) => reader.onNewBook());
  }

  private getListener(state: string): Listener {
    return this.listeners.find((listener) => listener.state === state);
  }
}

(function () {
  const oreilly = new Publisher('oreilly');

  const john = new Reader('john');
  const paul = new Reader('paul');
  const hoso = new Reader('hoso');
  oreilly.on('release', john);
  oreilly.on('release', paul);
  oreilly.on('sale', hoso);

  oreilly.notify('release');

  console.log('---------------------------');

  oreilly.off('release', john);
  oreilly.notify('release');

  console.log('---------------------------');
  oreilly.notify('sale');
}());
