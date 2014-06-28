test('can create a dreamscape with layer', function () {
    var scape = new Dream.Scape("dream", {
        height: 400,
        width: 400
    });

    var layer = new Dream.Layer();

    expect(5);
    ok(layer, "Somethings should be created");
    ok(layer._canvas, "Canvas should be created");
    ok(layer._canvasContext, "Canvas should be created");

    scape.addLayer(layer);

    equal(layer._canvas.height, 400, "Height should be equal");
    equal(layer._canvas.width, 400, "Width should be equal");

});