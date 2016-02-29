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
    _roads.forEach(road => road.render(_viewportContext))
  }

  var _renderAnchor = function (event) {    
    _viewportContext.fillStyle = _isDragging ? 'rgba(20,200,80,0.5)' : 'rgba(0,80,250,0.3)'
    _viewportContext.arc(event.x, event.y, 10, 0, 2 * Math.PI)
    _viewportContext.fill()
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
      _lastRoad().updateEndpoint(event)
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
    _lastRoad().stopRotation()
  })

  window.addEventListener('resize', event => {
    _resizeViewport()
  })
}