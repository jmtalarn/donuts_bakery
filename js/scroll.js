var scroll = function(div, position, total) {
    var div = document.getElementById(div);
    div.scrollLeft = div.scrollWidth * position / total;

    var mark = document.getElementsByClassName("mark");
    for (var i = 0; i <= 2; i++) {
        var active = i == position ? "active" : "";
        mark[i].className = "mark pos" + i + " " + active;
    }


}
