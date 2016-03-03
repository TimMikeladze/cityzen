var View = function () {
  'use strict'
  

  var View = {}

  window.onload = function () {
    View.port = document.getElementById('viewport')
    var context = View.port.getContext('2d')

    var renderCursor = function () {
      var cursorPosition = CursorStore.position
      var isCursorDragging = CursorStore.isDragging
      context.fillStyle = isCursorDragging ? 'rgba(20,200,80,0.5)' : 'rgba(0,80,250,0.3)'
      context.arc(cursorPosition.x, cursorPosition.y, 10, 0, 2 * Math.PI)
      context.fill()
    }

    var renderRoads = function () {    
      RoadStore.roads.forEach((road, i) => {
        var isCursorDragging = (i === RoadStore.roads.length - 1) && CursorStore.isDragging
        var isCursorHovering = road.contains(CursorStore.position)
        context.rotate(road.rotation)
        context.fillStyle = (isCursorDragging || isCursorHovering) ? 'rgba(20,200,80,0.5)' : 'rgba(100,100,100,0.5)'
        context.fillRect(road.render.start.x, road.render.start.y, road.render.dimensions.x, road.render.dimensions.y)
        context.rotate(-road.rotation)
      })
    }

    View.render = function () {
      View.port.width = View.port.width   // this clears the canvas quickly
      renderCursor()
      renderRoads()
    }

    View.resize = function () {
      View.port.height = window.innerHeight
      View.port.width = window.innerWidth
    }

    window.addEventListener('resize', event => {
      View.resize()
      View.render()
    })

    View.resize()
    Dispatcher.addViewportListeners()
  }

  return View
}()
