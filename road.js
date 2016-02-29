
var _distance = function (startX, startY, endX, endY) {
  var diffX = Math.abs(startX - endX)
  var diffY = Math.abs(startY - endY)
  var distance = Math.sqrt(diffX * diffX + diffY * diffY)
  return distance
}

/* Road class */

var Road = function () {

  var _isRotating = false
  var _rotationStart
  var _rotationStartX
  var _rotationStartY

  var Road = function (startX, startY) {
    this.endX = startX
    this.endY = startY
    this.rotation = 0
    this.startX = startX
    this.startY = startY
  }

  Road.prototype.contains = function (x, y) {
    //TODO Alex
    return false
  }

  Road.prototype.render = function (context) {
    if (this.invalid) {

      // Anchor
      var a = _distance(0, 0, this.startX, this.startY)
      var alpha = Math.PI / 2 - this.rotation / 2
      var b = 2 * a * Math.cos(alpha)
      var beta = Math.PI - alpha - Math.acos(this.startX / a)
      this.renderStartX = this.startX + b * Math.cos(beta)
      this.renderStartY = this.startY - b * Math.sin(beta)

      // Dimensions
      var c = _distance(this.startX, this.startY, this.endX, this.endY)
      var d = this.endX - this.startX
      var gamma = Math.acos(d / c)
      var orientation = Math.sign(this.endY - this.startY)
      var delta = gamma - this.rotation * orientation
      this.renderWidth = c * Math.cos(delta)
      this.renderHeight = c * Math.sin(delta) * orientation

      this.invalid = false
    }

    context.rotate(this.rotation)
    context.fillStyle = this.contains(event.x, event.y) ? 'rgba(20,200,80,0.5)' : 'rgba(100,100,100,0.5)'
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

  Road.prototype.updateEndpoint = function (event) {
    this.endX = event.x
    this.endY = event.y
    this.updateRotation()
    this.invalid = true
  }

  Road.prototype.updateRotation = function () {
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
  }

  return Road
}() 