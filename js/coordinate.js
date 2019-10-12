'use strict';

(function () {
  window.Coordinate = function (x, y) {
    this.x = x;
    this.y = y;
  };

  window.Coordinate.prototype.setX = function (x) {
    this.x = x;
  };

  window.Coordinate.prototype.setY = function (y) {
    this.x = y;
  };

  window.Coordinate.prototype.sub = function (cordinate) {
    this.x = this.x - cordinate.x;
    this.y = this.y - cordinate.y;
  };
})();
