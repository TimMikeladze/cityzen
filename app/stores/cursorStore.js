var CursorStore = function () {
  'use strict'


  var store = {
    isDragging: false,
    position: new Point(0,0)
  }
  
  Dispatcher.register(Actions.mouseMove, function move(event) {
    store.position = new Point (event.x, event.y)
    View.render()
  })

  Dispatcher.register(Actions.mouseDown, function startDragging() {
    store.isDragging = true
    View.render()
  })

  Dispatcher.register(Actions.mouseUp, function stopDragging() {
    store.isDragging = false
    View.render()
  })

  return store
}()