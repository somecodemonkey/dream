test('can create an object', function() {
    expect(1);

    var object = new Dream.Rect();

    ok(object, "Object is defined.");
});

test('can create an object with options', function() {
    expect(5);

    var options = {
        height: 300,
        width: 400,
        left: 10,
        top: 30
    };

    var object = new Dream.Rect(options);

    ok(object, "Object is defined.");
    equal(object.height, 300, "Object has correct height.");
    equal(object.width, 400, "Object has correct width.");
    equal(object.left, 10, "Object has correct height.");
    equal(object.top, 30, "Object has correct width.");
});
