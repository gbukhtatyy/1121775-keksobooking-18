'use strict';

(function () {
  window.Coordinate = function (x, y) {
    this.x = x;
    this.y = y;
  };

  window.Coordinate.prototype.sub = function (cordinate) {
    this.x = this.x - cordinate.x;
    this.y = this.y - cordinate.y;
  };

  window.Coordinate.prototype.fill = function (x, y) {
    this.x = x;
    this.y = y;
  };
})();
