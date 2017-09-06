var Reader = (function () {
    function Reader(name) {
        this.name = name;
    }
    Reader.prototype.onNewBook = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        console.log(this.name + " : I will go to buy the " + params + " to bookstore");
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
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        var listener = this.getListener(state);
        listener && listener.readers.forEach(function (reader) { return reader.onNewBook(params); });
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
    oreilly.notify('release', 'JavaScript', 'TypeScript', 'Angular', 'React');
    console.log('---------------------------');
    oreilly.off('release', john);
    oreilly.notify('release', 'C#', 'Java');
    console.log('---------------------------');
    oreilly.notify('sale', 'Node.js');
}());
