test('can create an empty dreamscape', function() {
    expect(1);

    throws(
        function () {
            var scape = new Dream.Scape();
        },
        "Should throw and invalid config error"
    );

});

test('can create a dreamscape with options', function() {
    var scape = new Dream.Scape("dream", {
        height: 200,
        width: 200
    });

    expect(4);
    ok(scape, "Somethings should be created");
    ok(typeof(scape) == "object", "Created a class");
    equal(scape.height, 200, "Height should be equal");
    equal(scape.width, 200, "Width should be equal");
});

test('can create a css styled dreamscape', function() {
    var scape = new Dream.Scape("dream-styled");
    expect(4);
    ok(scape, "Somethings should be created");
    ok(typeof(scape) == "object", "Created a class");
    equal(scape.height, 300, "Height should be equal");
    equal(scape.width, 300, "Width should be equal");
});

test('can create a css styled dreamscape in container', function() {
    var scape = new Dream.Scape("dream-style-in-container");
    expect(4);
    ok(scape, "Somethings should be created");
    ok(typeof(scape) == "object", "Created a class");
    equal(scape.height, 400, "Height should be equal");
    equal(scape.width, 400, "Width should be equal");
});

// TODO Scrollable container test