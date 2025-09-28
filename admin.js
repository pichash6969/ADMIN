document.getElementById("applySettings").addEventListener("click",()=>{
  const fixed2D = document.getElementById("fixed2D").value;
  const fixed3D = document.getElementById("fixed3D").value;
  const startTime = document.getElementById("startTime").value+":00";
  const stopTime = document.getElementById("stopTime").value+":00";
  const scrollSpeed = document.getElementById("scrollSpeed").value;

  // Send settings to index.html (assuming same window.opener)
  if(window.opener){
    window.opener.postMessage({fixed2D,fixed3D,startTime,stopTime,scrollSpeed},"*");
  }
  alert("Settings applied to Lottery Display!");
});
