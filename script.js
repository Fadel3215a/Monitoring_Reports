// script.js

function getLocation() {
    if (!navigator.geolocation) {
        alert("Geolocation is not supported by this browser.");
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

    // send GPS to server (relative path, no CORS issue)
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
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}
