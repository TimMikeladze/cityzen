/* Store class */
var Store = function () {
  'use strict'


  /* Private */

  var _viewCallbacks = []


  /* Public */

  var Store = function () {}

  Store.prototype.registerView = function (callback) {
  	_viewCallbacks.push(callback)
  }

  Store.prototype.updateViews = function () {
  	_viewCallbacks.forEach(callback => callback())
  }

  return Store
}()
