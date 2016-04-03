(function (angular) {
    "use strict";

    angular.module('missing.manual', []);    
    angular.module('missing.manual').service('Dispatcher', Dispatcher);

    function Dispatcher() {
        var dispatcher = this;
        var subscriptions = {};

        // dispatch data to listener function        
        dispatcher.dispatch = function(eventName) {
            if (!eventName || !subscriptions[eventName] || !subscriptions[eventName].length) {
                return;
            }
            // strip off eventName from args
            [].shift.apply(arguments);
            // run every listener method
            for (var i = 0; i < subscriptions[eventName].length; i++) {
                subscriptions[eventName][i].apply(this, arguments);
            }
        };

        // subscribe listeners        
        dispatcher.subscribe = function(eventName, func) {
            if (!eventName || !func) {
                return;
            }
            if (!subscriptions[eventName]) {
                subscriptions[eventName] = [];
            }
            subscriptions[eventName].push(func);
        };

        // unsubscribe listeners        
        dispatcher.unsubscribe = function(eventName, func) {
            if (!eventName) {
                return;
            }
            if (!func) {
                subscriptions[eventName] = null;
                return;
            }
            var index = subscriptions[eventName].indexOf(func);
            if (index !== -1) {
                subscriptions[eventName].splice(index, 1);
                if (!subscriptions[eventName].length) {
                    subscriptions[eventName] = null;
                }
            }
        };

    }
    
})(window.angular);