// creating map
var map = L.map('map').setView([0, -45], 3);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
const colors = ['red', 'yellow', 'green']
fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson').then(res => res.json()).then(data => {
    //making markers 
    for (let x of data.features) {
        let mag = x.properties.mag;
        let place = x.properties.place;
        let lon = x.geometry.coordinates[0];
        let lat = x.geometry.coordinates[1];
        let depth = x.geometry.coordinates[2];
        let date = new Date(x.properties.time).toLocaleString()

        var circle = L.circle([lat, lon], {
            color: 'black',
            weight: 1,
            fillColor:
                depth < 10 ? 'green' :
                    depth < 30 ? 'lime' :
                        depth < 50 ? 'yellow' :
                            depth < 70 ? 'orange' :
                                depth < 90 ? 'darkorange' : 'red',
            fillOpacity: .75,
            radius: 25000 * x.properties.mag
        }).bindPopup(`<h3>${place}<br>${date}<br>Magnitude: ${mag}</h3>`).addTo(map);
    }
});

var legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML += `
            <div> 10-10</div>        
            <div> 10 - 30</div>        
            <div> 30 - 50 </div>        
            <div> 50 - 70 </div>        
            <div> 70 - 90 </div>        
            <div> 90+ </div>`;
    return div;
}

legend.addTo(map);


