/// <reference path="../../angular.js" />
'use strict';

var mainApp = angular.module('mainApp', ['ui.bootstrap','ngIdle']);
mainApp.value('$', $);

mainApp.config(['$keepaliveProvider', '$idleProvider', function ($keepaliveProvider, $idleProvider) {
    $idleProvider.idleDuration(10);
    $idleProvider.warningDuration(10);
    $keepaliveProvider.interval(5);
    
}]);
// assume myApp was defined according to the "Configure" example above
mainApp.run(['$idle', function ($idle) {
    $idle.watch();
}]);

