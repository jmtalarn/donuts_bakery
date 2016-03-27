Number.prototype.format = function(n, x, unit) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\,' : '$') + ')';
    var concatunit = "";
    if (unit != null){ concatunit = " "+unit; }
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&.')+concatunit;
}
