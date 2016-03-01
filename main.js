window.onload = function () {
  'use strict' 


  /* Private */

  var _isDragging = false
  var _roads = []
  var _viewport = document.getElementById('viewport')
  var _viewportContext = _viewport.getContext('2d')

  var _clearViewport = function () {
    _viewport.width = _viewport.width
  }

  var _lastRoad = function () {
    return _roads[_roads.length - 1]
  }

  var _render = function (event) {
    _clearViewport()
    _renderAnchor(event)
    _roads.forEach((road, i) => {
      var isDraggingRoad = (_isDragging && road === _lastRoad())
      road.render(_viewportContext, event, isDraggingRoad)
    })
    _renderButtons()
  }

  var _renderAnchor = function (event) {
    _viewportContext.fillStyle = _isDragging ? 'rgba(20,200,80,0.5)' : 'rgba(0,80,250,0.3)'
    _viewportContext.arc(event.x, event.y, 10, 0, 2 * Math.PI)
    _viewportContext.fill()
  }

  var _renderButtons = function () {    
    var start = 20
    var width = 100
    var height = 34
    var margin = 8
    var buttons = [
      { label: 'PAN', textOffset: 37, buttonOffset: 0, fill: 'rgba(172,223,227,0.7)' },
      { label: 'SELECT', textOffset: 26, buttonOffset: 0, fill: 'rgba(172,223,227,0.7)' },
      { label: 'ROAD', textOffset: 32, buttonOffset: 13, fill: 'rgba(132,168,171,0.7)' }
    ]
    buttons.forEach((button, i) => {
      var startY = start + button.buttonOffset + (height + margin) * i
      _viewportContext.beginPath()
      _viewportContext.rect(start, startY, width, height)
      _viewportContext.lineWidth = 1
      _viewportContext.strokeStyle = 'rgba(50,100,150,0.7)'
      _viewportContext.stroke()
      _viewportContext.fillStyle = button.fill
      _viewportContext.fill()
      _viewportContext.font = 'bold 12px sans-serif'
      _viewportContext.fillStyle = 'rgba(50,100,150,1)'
      _viewportContext.fillText(button.label, start+button.textOffset, startY + 21)
    })
  }

  var _resizeViewport = function () {
    _viewport.height = window.innerHeight
    _viewport.width = window.innerWidth
  }


  /* Initialization */

  _resizeViewport()


  /* Event bindings */

  _viewport.addEventListener('mousedown', event => {
    _roads.push(new Road(event.x, event.y))
    _isDragging = true
    _render(event)
  })

  _viewport.addEventListener('mousemove', event => {
    if (_isDragging) {
      _lastRoad().updateEndpoint(event.x, event.y)
    }
    _render(event)
  })

  _viewport.addEventListener('mouseup', event => {
    _isDragging = false
  })

  window.addEventListener('keydown', event => {
    if (_isDragging && event.ctrlKey) {
      _lastRoad().startRotation()
    }
  })

  window.addEventListener('keyup', event => {
    if (_lastRoad()) {
      _lastRoad().stopRotation()
    }    
  })

  window.addEventListener('resize', event => {
    _resizeViewport()
  })
}