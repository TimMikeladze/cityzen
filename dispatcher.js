var Dispatcher = function () {
  'use strict'


  /* Private */

  var _actionCallbacks = {}


  /* Static initialization */

  window.addEventListener('keydown', event => {
    if (event.ctrlKey) {
      _actionCallbacks[Actions.ctrlKeyDown].forEach(callback => callback(event))
    }
  })

  window.addEventListener('keyup', event => {
    _actionCallbacks[Actions.keyUp].forEach(callback => callback(event))
  })


  return {

    addViewportListeners: function () {
      var _viewport = document.getElementById('viewport')
      _viewport.addEventListener('mousedown', event => {
        _actionCallbacks[Actions.mouseDown].forEach(callback => callback(event))
      })
      _viewport.addEventListener('mousemove', event => {
        _actionCallbacks[Actions.mouseMove].forEach(callback => callback(event))
      })
      _viewport.addEventListener('mouseup', event => {
        _actionCallbacks[Actions.mouseUp].forEach(callback => callback(event))
      })
    },

    register: function (action, callback) {
      if (!_actionCallbacks[action]) {
        _actionCallbacks[action] = []
      }
      _actionCallbacks[action].push(callback)
    }
  }
}()
