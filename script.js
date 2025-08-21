function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;

        console.log("LAT:", lat, "LNG:", lng); // shows on frontend

        // ✅ Send to InfinityFree log.php
        fetch("https://auth.fwh.is/log.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: "lat=" + encodeURIComponent(lat) + "&lng=" + encodeURIComponent(lng)
        })
        .then(response => response.text())
        .then(data => console.log("Server response:", data))
        .catch(err => console.error("Error:", err));
      },
      function (error) {
        console.error("Error getting location:", error);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  } else {
    alert("Geolocation not supported.");
  }
}
