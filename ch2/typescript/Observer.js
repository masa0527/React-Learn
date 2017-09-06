var Reader = (function () {
    function Reader(name) {
        this.name = name;
    }
    Reader.prototype.onNewBook = function () {
        console.log(this.name + " :  I will go to buy the book to bookstore");
    };
    return Reader;
}());
var Publisher = (function () {
    function Publisher(name) {
        this.name = name;
        this.readers = [];
    }
    Publisher.prototype.on = function (reader) {
        this.readers.push(reader);
    };
    Publisher.prototype.off = function (reader) {
        this.readers.splice(this.readers.indexOf(reader), 1);
    };
    Publisher.prototype.notify = function () {
        this.readers.forEach(function (reader) { return reader.onNewBook(); });
    };
    return Publisher;
}());
(function () {
    var oreilly = new Publisher('oreilly');
    var john = new Reader('john');
    var paul = new Reader('paul');
    oreilly.on(john);
    oreilly.on(paul);
    oreilly.notify();
}());
