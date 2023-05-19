// range-update.js
function updateRange() {
    const value = document.getElementById("cpu-clock").value;
    document.getElementById("cpu-clock-range").max = value;
  }
  
  function updateValue() {
    const rangeValue = document.getElementById("cpu-clock-range").value;
    document.getElementById("cpu-clock").value = rangeValue;
  }
  