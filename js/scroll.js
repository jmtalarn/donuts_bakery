var scroll = function(div, position, total) {
    var div = document.getElementById(div);
    div.scrollLeft = div.scrollWidth * position / total;

    var mark = document.getElementsByClassName("mark");
    for (var i = 0; i <= 2; i++) {
        var active = i == position ? "active" : "";
        mark[i].className = "mark pos" + i + " " + active;
    }

}

var reloadDonut= function(div,donutsbox,box){
  var div = document.getElementById(div);
  while (div.firstChild) {
      div.removeChild(myDonuts.firstChild);
  }
  donutsbox[box].bake(div);
}
