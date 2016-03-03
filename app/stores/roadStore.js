var RoadStore = function () {
  'use strict'


  /* Private */

  var lastRoad = function () {
    return store.roads[store.roads.length - 1]
  }


  /* Public */

  var store = {
    roads: []
  }

  Dispatcher.register(Actions.mouseDown, function add(event) {
    store.roads.push(new Road(new Point(event.x, event.y)))
    View.render()
  })

  Dispatcher.register(Actions.mouseMove, function update(event) {
    if (CursorStore.isDragging) {
      lastRoad().updateEnd(new Point(event.x, event.y))
    }
    View.render()
  })

  Dispatcher.register(Actions.ctrlKeyDown, function startRotation() {
    if (CursorStore.isDragging) {
      lastRoad().startRotation()
    }
  })

  Dispatcher.register(Actions.keyUp, function stopRotation() {
    if (lastRoad()) {
      lastRoad().stopRotation()
    }
  })

  return store
}()
