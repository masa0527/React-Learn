var Reader = (function () {
    function Reader(name) {
        this.name = name;
    }
    Reader.prototype.onNewBook = function () {
        console.log(this.name + " : I will go to buy the book to bookstore");
    };
    return Reader;
}());
var Publisher = (function () {
    function Publisher(name) {
        this.name = name;
        this.listeners = [];
    }
    Publisher.prototype.on = function (state, reader) {
        var listener = this.getListener(state);
        if (listener && listener.readers) {
            listener.readers.push(reader);
        }
        else {
            this.listeners.push({
                state: state,
                readers: [reader]
            });
        }
    };
    Publisher.prototype.off = function (state, reader) {
        var listener = this.getListener(state);
        listener && listener.readers.splice(listener.readers.indexOf(reader), 1);
    };
    Publisher.prototype.notify = function (state) {
        var listener = this.getListener(state);
        listener && listener.readers.forEach(function (reader) { return reader.onNewBook(); });
    };
    Publisher.prototype.getListener = function (state) {
        return this.listeners.find(function (listener) { return listener.state === state; });
    };
    return Publisher;
}());
(function () {
    var oreilly = new Publisher('oreilly');
    var john = new Reader('john');
    var paul = new Reader('paul');
    var hoso = new Reader('hoso');
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
