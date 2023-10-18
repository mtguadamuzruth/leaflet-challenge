// creating map
var map = L.map('map').setView([37.3, -114.62], 5);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
const colors = ['red', 'yellow', 'green']
fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson').then(res => res.json()).then(data => {
    //making markers 
    for (let x of data.features) {
        console.log(x.geometry.coordinates)
        var circle = L.circle([x.geometry.coordinates[1], x.geometry.coordinates[0]], {
            color: colors[Math.floor(Math.log(x.geometry.coordinates[2]))],
            fillColor: colors[Math.floor(Math.log(x.geometry.coordinates[2]))],
            fillOpacity: .5,
            radius: 5000 * x.properties.mag
        }).addTo(map);
    }
    var legend = L.control({ position: 'bottomright' });

    legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend'),
            mag = [0, 10, 100],
            labels = [];

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < mag.length; i++) {
            div.innerHTML +=
                '<i style="background:' + colors[Math.floor(Math.log(mag[i]))] + '"></i> ' +
                mag[i] + (mag[i + 1] ? '&ndash;' + mag[i + 1] + '<br>' : '+');
        }
        return div;
    };

    legend.addTo(map);
})

