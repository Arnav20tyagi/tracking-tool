document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("trackingForm");
  const scriptOutput = document.getElementById("scriptOutput");

  // Generate Unique ID
  function generateUniqueId() {
    return "track_" + Math.random().toString(36).substr(2, 9);
  }

  // Generate JS Script with tracking logic
  async function generateScript(url, className, uniqueId) {
    // Dynamically get backend base URL
    const backendBase = window.location.origin;
    return `
<!-- Add this in your website's <head> -->
<script>
(function() {
  const scriptId = "${uniqueId}";
  const targetClass = "${className}";
  const siteUrl = "${url}";
  const backendBase = "${backendBase}";

  // Fetch user IP/location dynamically in the browser
  function getUserLocation() {
    return fetch("https://ipapi.co/json/")
      .then(response => response.json())
      .then(data => ({
        ip: data.ip,
        city: data.city || "Unknown",
        region: data.region || "Unknown",
        country: data.country_name || "Unknown"
      }))
      .catch(() => ({
        ip: "Unknown",
        city: "Unknown",
        region: "Unknown",
        country: "Unknown"
      }));
  }

  // On script load, send user data
  getUserLocation().then(location => {
    fetch(backendBase + '/api/track-load', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        scriptId: scriptId,
        url: siteUrl,
        ip: location.ip,
        city: location.city,
        region: location.region,
        country: location.country
      })
    });

    window.addEventListener('load', function() {
      const elements = document.getElementsByClassName(targetClass);
      if (elements.length > 0) {
        elements[0].addEventListener('click', function() {
          getUserLocation().then(location2 => {
            fetch(backendBase + '/api/trackClick', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                scriptId: scriptId,
                ip: location2.ip,
                city: location2.city,
                region: location2.region,
                country: location2.country
              })
            });
          });
        });
      }
    });
  });
})();
<\/script>`;
  }

  // Handle Form Submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const url = document.getElementById("websiteUrl").value.trim();
    const className = document.getElementById("className").value.trim();
    const uniqueId = generateUniqueId();

    const script = await generateScript(url, className, uniqueId);
    scriptOutput.textContent = script;

    alert("Script Generated! Copy and paste into your website's <head>");
  });
});