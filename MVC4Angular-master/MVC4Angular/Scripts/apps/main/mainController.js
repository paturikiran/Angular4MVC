/// <reference path="main.js" />
/// <reference path="../../angular.js" />
'use strict';

mainApp.controller('mainController', function mainController($scope, $log, noteService, $idle, $keepalive, $modal,$window) {
    noteService.connect();

    $scope.notes = [];

    $scope.$on('noteAdded', function (event, note) {
        $scope.notes.push(note);
        $scope.$apply();
    });

    $scope.addNote = function (note) {
        noteService.addNote(note);
        $scope.note = '';
    };

    $scope.started = false;

    function closeModals() {
        if ($scope.warning) {
            $scope.warning.close();
            $scope.warning = null;
        }

        if ($scope.timedout) {
            $scope.timedout.close();
            $scope.timedout = null;
            $window.location.href = '/home/LogOut';
        }
    }

    $scope.$on('$idleStart', function () {
        closeModals();

        $scope.warning = $modal.open({
            templateUrl: 'warning-dialog.html',
            windowClass: 'modal-danger'
        });
    });

    $scope.$on('$idleEnd', function () {
        closeModals();
    });

    $scope.$on('$idleTimeout', function () {
        closeModals();
        $scope.timedout = $modal.open({
            templateUrl: 'timedout-dialog.html',
            windowClass: 'modal-danger'
        });
    });

    $scope.start = function () {
        closeModals();
        $idle.watch();
        $scope.started = true;
    };

    $scope.stop = function () {
        closeModals();
        $idle.unwatch();
        $scope.started = false;

    };
});



