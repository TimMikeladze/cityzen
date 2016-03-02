/* Road class */
var Road = function () {
  'use strict'


  /* Private */

  var _isRotating = false
  var _rotationBaseAngle
  var _rotationStart


  /* Public */

  var Road = function (start) {
    if (start.x === undefined || start.y === undefined) {
      throw new SyntaxError('new Road requires a first argument of type object with properties x and y')
    }
    this.start = start
    this.rotation = 0
    this.updateEnd(start)
  }

  Road.prototype.contains = function (point) {
    if (point.x === undefined || point.y === undefined) {
      return undefined
    }
    var intersections = 0
    this.vertices.forEach((vertex, i) => {
      var vertexNext = this.vertices[(i + 1) % this.vertices.length]
      var vertexA = (vertex.y < vertexNext.y) ? vertex : vertexNext
      var vertexB = (vertex.y < vertexNext.y) ? vertexNext : vertex
      point.y += (point.y === vertexA.y || point.y === vertexB.y) ? 0.00001 : 0
      if (point.y >= vertexA.y && point.y <= vertexB.y && point.x <= Math.max(vertexA.x, vertexB.x)) {
        if (point.x < Math.min(vertexA.x, vertexB.x)) {
          intersections++
        } else {
          var slopeOfRay = (point.y - vertexA.y) / (point.x - vertexA.x)
          var slopeOfEdge = (vertexB.y - vertexA.y) / (vertexB.x - vertexA.x)
          if (slopeOfRay >= slopeOfEdge) {
            intersections++
          }
        }
      }
    })
    var isPointInside = (intersections % 2 === 1)
    return isPointInside
  }

  Road.prototype.findRenderDimensions = function () {
    var c = this.start.to(this.end)
    var d = this.end.x - this.start.x
    var gamma = Math.acos(d / c)
    var orientation = Math.sign(this.end.y - this.start.y)
    var delta = gamma - this.rotation * orientation
    var renderDimensions = {
      x: c * Math.cos(delta),
      y: c * Math.sin(delta) * orientation
    }
    return renderDimensions
  }

  Road.prototype.findRenderStart = function () {
    var a = new Point(0,0).to(this.start)
    var alpha = Math.PI / 2 - this.rotation / 2
    var b = 2 * a * Math.cos(alpha)
    var beta = Math.PI - alpha - Math.acos(this.start.x / a)
    var renderStart = {
      x: this.start.x + b * Math.cos(beta),
      y: this.start.y - b * Math.sin(beta)
    }
    return renderStart
  }

  Road.prototype.findVertices = function () {
    var a = this.end.x - this.start.x
    var b = this.end.y - this.start.y
    var c = this.start.to(this.end)
    var alpha = Math.acos(a / c)
    var beta = alpha - this.rotation
    var d = c * Math.cos(beta)
    var x = d * Math.cos(this.rotation)
    var y = d * Math.sin(this.rotation)
    var vertices = [
      this.start, new Point(this.start.x + x, this.start.y + y),
      this.end, new Point(this.end.x - x, this.end.y - y)
    ]
    return vertices
  }

  Road.prototype.startRotation = function () {
    _rotationBaseAngle = this.rotation
    _rotationStart = this.end
    _isRotating = true
  }

  Road.prototype.stopRotation = function () {
    _isRotating = false
  }

  Road.prototype.updateEnd = function (point) {
    if (point.x === undefined || point.y === undefined) {
      throw new SyntaxError('updateEnd requires a first argument of type object with properties x and y')
    }

    // Set the endpoint
    this.end = point

    // Set the rotation, relative to the point where rotation started
    if (_isRotating) {
      var startToRoadEnd = _rotationStart.to(this.end)
      var roadStartToStart = this.start.to(_rotationStart)
      var roadStartToRoadEnd = this.start.to(this.end)
      var deltaAngle =
        Math.acos(
          (roadStartToRoadEnd * roadStartToRoadEnd +
           roadStartToStart * roadStartToStart -
           startToRoadEnd * startToRoadEnd) /
          (2 * roadStartToRoadEnd * roadStartToStart)
        )
      var direction = Math.sign(
        (_rotationStart.x - this.start.x) * (this.end.y - this.start.y) -
        (_rotationStart.y - this.start.y) * (this.end.x - this.start.x)
      )
      this.rotation = _rotationBaseAngle + deltaAngle * direction
    }

    // Recalculate the vertices
    this.vertices = this.findVertices()

    // Recalculate the rendering data
    this.render = {
      start: this.findRenderStart(),
      dimensions: this.findRenderDimensions()
    }
  }

  return Road
}()
