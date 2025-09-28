document.getElementById('applyBtn').addEventListener('click', ()=>{
    const fixed2D = document.getElementById('fixed2D').value.padStart(2,'0');
    const fixed3D = document.getElementById('fixed3D').value.padStart(3,'0');
    const startTime = document.getElementById('startTime').value;
    const stopTime = document.getElementById('stopTime').value;
    const scrollSpeed = parseInt(document.getElementById('speedSlider').value) * 50;

    // Send settings to index.html if in iframe or postMessage; for local demo, just alert
    const settings = { fixed2D, fixed3D, startTime, stopTime, scrollSpeed };
    alert('Settings Applied: '+JSON.stringify(settings));

    // For local testing, you can open index.html in same window and call:
    window.opener && window.opener.postMessage(settings, '*');
});
