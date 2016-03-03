/* Point class */
var Point = function () {
  'use strict'


  /* Public */
  
	var Point = function (x, y) {
	  this.x = x
	  this.y = y
	}

  Point.prototype.to = function (point) {
    if (point.x === undefined || point.y === undefined) {
      return undefined
    }
    var diffX = Math.abs(this.x - point.x)
    var diffY = Math.abs(this.y - point.y)
    var distance = Math.sqrt(diffX * diffX + diffY * diffY)
    return distance
  }

  return Point
}()
