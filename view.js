window.onload = function () {
  'use strict'


  var viewport = document.getElementById('viewport')
  var context = viewport.getContext('2d')

  var render = function () {
    viewport.width = viewport.width
    renderCursor()
    renderRoads()
  }

  var renderCursor = function () {
    var cursorPosition = CursorStore.cursor.position
    var isCursorDragging = CursorStore.cursor.isDragging
    context.fillStyle = isCursorDragging ? 'rgba(20,200,80,0.5)' : 'rgba(0,80,250,0.3)'
    context.arc(cursorPosition.x, cursorPosition.y, 10, 0, 2 * Math.PI)
    context.fill()
  }

  var renderRoads = function () {    
    var isCursorDragging = CursorStore.cursor.isDragging
    RoadStore.roads.forEach(road => {
      var isCursorHovering = road.contains(CursorStore.cursor.position)
      context.rotate(road.rotation)
      context.fillStyle =
        (isCursorDragging || isCursorHovering) ? 'rgba(20,200,80,0.5)' : 'rgba(100,100,100,0.5)'
      context.fillRect(road.render.start.x, road.render.start.y,
        road.render.dimensions.x, road.render.dimensions.y)
      context.rotate(-road.rotation)
    })
  }

  var resizeViewport = function () {
    viewport.height = window.innerHeight
    viewport.width = window.innerWidth
  }


  /* Main execution */

  Dispatcher.addViewportListeners()
  CursorStore.registerView(render)
  RoadStore.registerView(render)

  window.addEventListener('resize', event => resizeViewport())
  resizeViewport()
}
