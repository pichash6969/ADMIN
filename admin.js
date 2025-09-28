document.getElementById('applyBtn').addEventListener('click', function(){
    const fixed2D = document.getElementById('fixed2DInput').value || '00';
    const fixed3D = document.getElementById('fixed3DInput').value || '000';
    const startTime = document.getElementById('startTimeInput').value || '00:00:00';
    const stopTime = document.getElementById('stopTimeInput').value || '23:59:59';
    const speed = document.getElementById('speedSlider').value || 20;

    localStorage.setItem('fixed2D', fixed2D);
    localStorage.setItem('fixed3D', fixed3D);
    localStorage.setItem('startTime', startTime);
    localStorage.setItem('stopTime', stopTime);
    localStorage.setItem('scrollSpeed', speed);

    alert('Settings Applied!');
});
