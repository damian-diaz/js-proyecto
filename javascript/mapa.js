let map = L.map('map').setView([-34.5428,-58.7171], 6);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
   maxZoom: 19,
   attribution: '© OpenStreetMap'
}).addTo(map);

document.getElementById('lugar').addEventListener('change',function(e){
   let coords = e.target.value.split(",");
   map.flyTo(coords,13);
})
