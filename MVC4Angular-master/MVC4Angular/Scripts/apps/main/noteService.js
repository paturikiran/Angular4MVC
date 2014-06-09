/// <reference path="../../angular.js" />
/// <reference path="../../jquery-1.8.2.js" />
/// <reference path="../../jquery.signalR-1.0.0.js" />
/// <reference path="main.js" />
'use strict';
mainApp.factory('noteService', ['$', '$rootScope', '$window', function ($, $rootScope, $window) {
    var proxy;
    var connection;
    return {
        connect: function () {
            connection = $.hubConnection();
            proxy = connection.createHubProxy('sessionHub');
            connection.start().then(function() {
                console.log(proxy.connection.id);
                $.get('/home/SaveConnectionId?conn=' + proxy.connection.id);
            });
            proxy.on('noteAdded', function (note) {
                $rootScope.$broadcast('noteAdded', note);
            });

            proxy.on('sessionExpired', function (args) {
                $rootScope.$broadcast('logout');
                console.log(args);
                $window.location.href = '/home/LogOut';
            });
        },
        isConnecting: function () {
            return connection.state === 0;
        },
        isConnected: function () {
            return connection.state === 1;
        },
        connectionState: function () {
            return connection.state;
        },
        addNote: function (note) {
            proxy.invoke('addNote', note);
        },
    }
}]);





