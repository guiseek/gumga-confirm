(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function () {

  Confirm.$inject = ['$interpolate', '$uibModal'];

  function Confirm($interpolate, $uibModal) {

    return {
      restrict: 'A',
      priority: 1,
      terminal: true,
      scope: false,
      link: function link($scope, $element, $attrs) {

        var confirmationMessage = $interpolate($attrs.gumgaConfirm)($scope);
        var _size = $attrs.size || 'md';
        var _icon = $attrs.icon || 'glyphicon glyphicon-question-sign';
        var dismissButton = $attrs.dismissButton ? $interpolate($attrs.dismissButton)($scope) : 'Retornar';
        var confirmButton = $attrs.confirmButton ? $interpolate($attrs.confirmButton)($scope) : 'Confirmar';
        var confirmButtonClass = $attrs.confirmButtonClass ? $interpolate($attrs.confirmButtonClass)($scope) : 'btn btn-primary';
        var dismissButtonClass = $attrs.dismissButtonClass ? $interpolate($attrs.dismissButtonClass)($scope) : 'btn btn-default';
        var whatToDoWhenClicked = $attrs.ngClick;
        var whatToDoWhenDismiss = $attrs.dismiss;

        $element.bind('click', function (event) {

          var controllerAs = 'ctrl';

          var resolve = {
            size: function size() {
              return _size;
            },
            icon: function icon() {
              return _icon;
            },
            confirmMessage: function confirmMessage() {
              return confirmationMessage;
            },
            dismissBtn: function dismissBtn() {
              return dismissButton;
            },
            confirmBtn: function confirmBtn() {
              return confirmButton;
            },
            dismissClass: function dismissClass() {
              return dismissButtonClass;
            },
            confirmClass: function confirmClass() {
              return confirmButtonClass;
            }
          };

          controller.$inject = ['$scope', '$uibModalInstance', 'confirmMessage', 'dismissBtn', 'confirmBtn', 'dismissClass', 'confirmClass'];

          function controller($scope, $uibModalInstance, confirmMessage, dismissBtn, confirmBtn, dismissClass, confirmClass) {
            var ctrl = this;

            ctrl.size = _size;
            ctrl.icon = _icon;
            ctrl.message = confirmMessage;
            ctrl.dismissButton = dismissBtn;
            ctrl.confirmButton = confirmBtn;
            ctrl.dismissButtonClass = dismissClass;
            ctrl.confirmButtonClass = confirmClass;
            ctrl.close = function (boolean) {
              return boolean ? $uibModalInstance.close() : $uibModalInstance.dismiss();
            };
          }

          var template = '\n          <div class="gumga-confirm modal-body">\n            <h3>\n              <i class="{{ ::ctrl.icon }}"></i>\n              {{ ::ctrl.message }}\n            </h3>\n          </div>\n          <div class="modal-footer">\n            <button type="button" class="{{ ::ctrl.dismissButtonClass }}" ng-click="ctrl.close(false)">{{ ::ctrl.dismissButton }}</button>\n            <button type="button" class="{{ ::ctrl.confirmButtonClass }}" ng-click="ctrl.close(true)"> {{ ::ctrl.confirmButton }}</button>\n          </div>';

          $uibModal.open({ controller: controller, template: template, size: _size, controllerAs: controllerAs, resolve: resolve, backdrop: 'static' }).result.then(function (value) {
            return $scope.$eval(whatToDoWhenClicked);
          }, function (reject) {
            return $scope.$eval(whatToDoWhenDismiss);
          });
        });
      }
    };
  }

  angular.module('gumga.confirm', ['ui.bootstrap']).directive('gumgaConfirm', Confirm);
})();

},{}]},{},[1]);
