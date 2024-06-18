// Step - Register service worker
if (navigator.serviceWorker) {
  // Check for browser support
  window.addEventListener("load", () => {
    // After browser loads
    navigator.serviceWorker
      .register("/sw.js") // Register
      .then((reg) => {})
      .catch((err) => console.log(`Here is the error: ${err}`));
  });
}
