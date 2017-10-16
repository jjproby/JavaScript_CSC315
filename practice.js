function inRange(min, max, n) {
  return(n >= min && n <= max);
}

function inRect(x1, x2, y1, y2, xnum, ynum) {
  if (x1 < x2) {
    x = inRange(x1, x2 ,xnum);
  }
  else {
    x = inRange(x2, x1, xnum);
  }
  if (y1 < y2) {
    y = inRange(y1, y2, ynum);
  }
  else {
    y = inRange(y2, y1, ynum);
  }
  return(x == true && y == true);
}


function helloThere() {
  document.getElementById('out').innerHTML="Hello there, how are you?"
  console.log("Hello there how are you?");
}
