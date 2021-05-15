ymaps.ready(init);

$.getScript('mapsOfObjects-test-\offices.json')
    .done(function (script, textStatus) {
        let map = JSON.parse(country); //json is declared in the js file
        console.log(country[0]);
        drawMap(map);
    })
    .fail(function (jqxhr, settings, exception) {
        console.log("error loading map: " + exception);
    });

function init() {
    let map = new ymaps.Map('mapID', {
        center: [55.753220, 37.622513],
        zoom: 10,
        controls: []
    });
}