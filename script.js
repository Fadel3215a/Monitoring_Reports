// script.js

window.onload = function() {
    getLocation();
};

function getLocation() {
    if (!navigator.geolocation) {
        console.log("Geolocation is not supported by this browser.");
        return;
    }

    navigator.geolocation.getCurrentPosition(showPosition, showError, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
    });
}

function showPosition(position) {
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;

    console.log("Latitude: " + lat + ", Longitude: " + lng);

    // Send GPS to backend immediately
    fetch("log.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `lat=${lat}&lng=${lng}`
    })
    .then(response => response.text())
    .then(data => {
        console.log("Server response: " + data);
    })
    .catch(error => {
        console.error("Error sending location:", error);
    });
}

function showError(error) {
    console.log("Geolocation error:", error);
}
