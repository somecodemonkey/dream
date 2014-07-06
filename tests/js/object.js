test('can create an object', function() {
    expect(1);

    var object = new Dream.Object();

    ok(object, "Object is defined.");
});

test('can create an object with options', function() {
    expect(3);

    var options = {
        height: 300,
        width: 400
    };

    var object = new Dream.Object(options);

    ok(object, "Object is defined.");
    equal(object.height, 300, "Object has correct height.");
    equal(object.width, 400, "Object has correct width.");
});
