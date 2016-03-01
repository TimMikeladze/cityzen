/* Road class */
var Road = function () {
  'use strict'


  /* Private */

  var _isRotating = false
  var _rotationStart
  var _rotationStartX
  var _rotationStartY

  var _distance = function (startX, startY, endX, endY) {
    var diffX = Math.abs(startX - endX)
    var diffY = Math.abs(startY - endY)
    var distance = Math.sqrt(diffX * diffX + diffY * diffY)
    return distance
  }


  /* Public */

  var Road = function (startX, startY) {
    this.startX = startX
    this.startY = startY
    this.endX = startX
    this.endY = startY
    this.rotation = 0
  }

  Road.prototype.contains = function (x, y) {
    var intersections = 0
    var vertices = this.vertices()
    vertices.forEach((vertex, i) => {
      var vertexNext = vertices[(i + 1) % vertices.length]
      var vertexA = (vertex.y < vertexNext.y) ? vertex : vertexNext
      var vertexB = (vertex.y < vertexNext.y) ? vertexNext : vertex
      y += (y === vertexA.y || y === vertexB.y) ? 0.00001 : 0
      if (y >= vertexA.y && y <= vertexB.y && x <= Math.max(vertexA.x, vertexB.x)) {
        if (x < Math.min(vertexA.x, vertexB.x)) {
          intersections++
        } else {
          var slopePoint = (y - vertexA.y) / (x - vertexA.x)
          var slopeVertex = (vertexB.y - vertexA.y) / (vertexB.x - vertexA.x)
          if (slopePoint >= slopeVertex) {
            intersections++
          }
        }
      }
    })
    var isPointInside = (intersections % 2 === 1)
    return isPointInside
  }

  Road.prototype.diagonal = function () {
    var diagonal = _distance(this.startX, this.startY, this.endX, this.endY)
    return diagonal
  }

  Road.prototype.render = function (context, event, isDragging) {
    if (this.invalid) {
      this.invalid = false
      var a = _distance(0, 0, this.startX, this.startY)
      var alpha = Math.PI / 2 - this.rotation / 2
      var b = 2 * a * Math.cos(alpha)
      var beta = Math.PI - alpha - Math.acos(this.startX / a)
      this.renderStartX = this.startX + b * Math.cos(beta)
      this.renderStartY = this.startY - b * Math.sin(beta)
      var c = this.diagonal()
      var d = this.endX - this.startX
      var gamma = Math.acos(d / c)
      var orientation = Math.sign(this.endY - this.startY)
      var delta = gamma - this.rotation * orientation
      this.renderWidth = c * Math.cos(delta)
      this.renderHeight = c * Math.sin(delta) * orientation
    }
    context.rotate(this.rotation)
    context.fillStyle = (this.contains(event.x, event.y) || isDragging) ? 'rgba(20,200,80,0.5)' : 'rgba(100,100,100,0.5)'
    context.fillRect(
      this.renderStartX, this.renderStartY,
      this.renderWidth, this.renderHeight
    )
    context.rotate(-this.rotation)
  }

  Road.prototype.startRotation = function () {
    _rotationStart = this.rotation
    _rotationStartX = this.endX
    _rotationStartY = this.endY
    _isRotating = true
  }

  Road.prototype.stopRotation = function () {
    _isRotating = false
  }

  Road.prototype.updateEndpoint = function (x, y) {
    this.endX = x
    this.endY = y
    if (_isRotating) {
      var rotationStartToRoadEnd = _distance(_rotationStartX, _rotationStartY, this.endX, this.endY)
      var roadStartToRotationStart = _distance(this.startX, this.startY, _rotationStartX, _rotationStartY)
      var roadStartToRoadEnd = _distance(this.startX, this.startY, this.endX, this.endY)
      var rotationDelta =
        Math.acos(
          (roadStartToRoadEnd * roadStartToRoadEnd +
           roadStartToRotationStart * roadStartToRotationStart -
           rotationStartToRoadEnd * rotationStartToRoadEnd) /
          (2 * roadStartToRoadEnd * roadStartToRotationStart)
        )
      var orientation = Math.sign(
        (_rotationStartX - this.startX) * (this.endY - this.startY) -
        (_rotationStartY - this.startY) * (this.endX - this.startX)
      )
      this.rotation = _rotationStart + rotationDelta * orientation
    }
    this.invalid = true
  }

  Road.prototype.vertices = function () {
    var a = this.endX - this.startX
    var b = this.endY - this.startY
    var c = this.diagonal()
    var alpha = Math.acos(a / c)
    var beta = alpha - this.rotation
    var d = c * Math.cos(beta)
    var x = d * Math.cos(this.rotation)
    var y = d * Math.sin(this.rotation)
    var vertices = [
      { x: this.startX, y: this.startY },
      { x: this.startX + x, y: this.startY + y },
      { x: this.endX, y: this.endY },
      { x: this.endX - x, y: this.endY - y }
    ]
    return vertices
  }

  return Road
}()