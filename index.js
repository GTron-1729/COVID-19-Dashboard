function updateMap() {
  // fetch API return a promise
  fetch("/data.json")
    .then((response) => response.json())
    .then((rsp) => {
      //console.log(rsp.data); // rsp is our json and rsp.data is our array

      rsp.data.forEach((element) => {
        latitude = element.latitude;
        longitude = element.longitude;

        // now mark them on the map

        cases = element.infected;
        if (cases > 256) {
          color = "rgb(250,0,0)";
        } else {
          color = `rgb(${cases}, 0, 0)`;
        }

        let popup = new mapboxgl.Popup().setText(`${element.name}`);
        let marker = new mapboxgl.Marker({
          draggable: false,
          color: color,
        }).setLngLat([longitude, latitude]);

        const elem = marker.getElement();

        elem.addEventListener("mouseenter", () => popup.addTo(map));
        elem.addEventListener("mouseleave", () => popup.remove());

        marker.setPopup(popup);
        marker.addTo(map);
      });
    });
}
//let interval = 10000;
//setInterval(updateMap, interval);
updateMap();
