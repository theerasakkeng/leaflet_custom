var Stadia_AlidadeSmoothDark = L.tileLayer(
  "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
  {
    maxZoom: 20,
    attribution:
      '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
  }
);

var streets = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
});

var map = L.map("map", {
  center: [13.736717, 100.523186],
  zoom: 9,
});

const addBaseMap = () => {
  let streetelement = document.getElementById("streetmap");
  let smoothelement = document.getElementById("smoothdark");
  if (smoothelement.checked == true) {
    map.removeLayer(streets);
    Stadia_AlidadeSmoothDark.addTo(map);
  } else if (streetelement.checked == true) {
    map.removeLayer(Stadia_AlidadeSmoothDark);
    streets.addTo(map);
  }
};

const closeOptionSide = () => {
  document.querySelector(".option-side").style.display = "none";
  document.getElementById("map").removeEventListener("click", closeOptionSide);
};

const onOpenOption = () => {
  document.querySelector(".option-side").style.display = "block";
  document.getElementById("map").addEventListener("click", closeOptionSide);
};

const goToCurentPosition = () => {
  var markerEl;
  navigator.geolocation.getCurrentPosition(async (position) => {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    markerEl = await new L.marker([lat, long]).addTo(map);
    await map.flyTo([lat, long], 15);
  });
};

addBaseMap();
