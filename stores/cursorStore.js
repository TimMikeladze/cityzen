/* Store: cursor */
var CursorStore = function () {
  'use strict'


  /* Public */

  var CursorStore = Object.assign(new Store(), {
    isDragging: false,
    position: new Point(0,0),

    move: function (point) {
      if (point.x === undefined || point.y === undefined) {
        throw new SyntaxError('move requires a first argument of type object with properties x and y')
      }
      this.position = point
      this.updateViews()
    },
    startDragging: function () {
      this.isDragging = true
      this.updateViews()
    },
    stopDragging: function () {
      this.isDragging = false
      this.updateViews()
    }
  })


  /* Static initialization */

  Dispatcher.register(Actions.mouseDown, CursorStore.startDragging)
  Dispatcher.register(Actions.mouseMove, CursorStore.move)
  Dispatcher.register(Actions.mouseUp, CursorStore.stopDragging)

  return CursorStore

}()