test('can extend an object', function() {
    expect(1);
    var extend = {
        "daft punk": {
            "one": 1,
            "more": 2,
            "time": 3,
            "doin it": {
                "everybody": 1,
                "will": 22,
                "dancing": 33
            }
        }
    };

    var base = {};

    Dream.util.extend(base, extend);

    deepEqual(base, extend, "Two objects can be the same in value" );
});

test('can extend an a function', function() {
//    expect(6);
    var extend = {
        "up": 1,
        "all": 2,
        "night": 3
    };

    var empty = function () {return false;};

    Dream.util.extend(empty, extend);

    var discovery = new empty();

    ok(empty.prototype.up, "function extended" );
    ok(empty.prototype.all, "function extended" );
    ok(empty.prototype.night, "function extended" );

    ok(discovery.up, "function extended" );
    ok(discovery.all, "function extended" );
    ok(discovery.night, "function extended" );
});

test('can create a canvas element', function() {
    var canvas = Dream.util.createCanvasElement();
    expect(2);
    ok(canvas, "Somethings should be created");
    equal(canvas.tagName, "CANVAS", "Canvas element created.");
});

test('can create a class', function() {
    var klass = Dream.util.createClass();

    expect(2);
    ok(klass, "Somethings should be created");
    ok(typeof(klass) == "function", "Created a class");
});