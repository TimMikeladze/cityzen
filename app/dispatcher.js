var Dispatcher = function () {
  'use strict'


  var callbacks = {}

  window.addEventListener('keydown', event => {
    if (event.ctrlKey) {
      callbacks[Actions.ctrlKeyDown].forEach(callback => callback(event))
    }
  })

  window.addEventListener('keyup', event => {
    callbacks[Actions.keyUp].forEach(callback => callback(event))
  })


  return {

    addViewportListeners: function () {
      View.port.addEventListener('mousedown', event => callbacks[Actions.mouseDown].forEach(callback => callback(event)))
      View.port.addEventListener('mousemove', event => callbacks[Actions.mouseMove].forEach(callback => callback(event)))
      View.port.addEventListener('mouseup', event => callbacks[Actions.mouseUp].forEach(callback => callback(event)))
    },

    register: function (action, callback) {
      if (!callbacks[action]) {
        callbacks[action] = []
      }
      callbacks[action].push(callback)
    }
  }

}()
