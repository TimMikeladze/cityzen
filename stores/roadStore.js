/* Store: roads */
var RoadStore = function () {
  'use strict'


  /* Private */

  var _lastRoad = function () {
    return RoadStore.roads[RoadStore.roads.length - 1]
  }


  /* Public */

  var RoadStore = Object.assign(new Store(), {
    roads: {},

    add: function (start) {
      RoadStore.roads.push(new Road(start))
      this.updateViews()
    },
    startRotation: function () {
      if (CursorStore.isDragging) {
        _lastRoad().startRotation()
      }
    },
    stopRotation: function () {
      if (_lastRoad()) {
        _lastRoad().stopRotation()
      }
    },
    update: function (end) {
      if (CursorStore.isDragging) {
        _lastRoad().updateEnd(event)
      }
      this.updateViews()
    }
  })


  /* Static initialization */

  Dispatcher.register(Actions.mouseDown, RoadStore.add)
  Dispatcher.register(Actions.mouseMove, RoadStore.update)
  Dispatcher.register(Actions.ctrlKeyDown, RoadStore.startRotation)
  Dispatcher.register(Actions.keyUp, function () {
    RoadStore.stopRotation()
  })

  return RoadStore
}()
