(function (angular) {
    "use strict";
    
    angular.module('HandBattle').service('GameService', GameService);
    
    var gameStates = {
        NOTSTARTED: 0,
        STARTED: 1,
        PAUSED: 2,
        RESULTED: 3  
    };
    var INTERVAL_DELAY = 50;
    var RESULT_VISIBLE_DURATION = 2000;
    
    function GameService(gameConfig, $interval, $timeout, Dispatcher){
        var service = this;
        var runner;
        var resultTimeout;
        
        function setState(value) {
            service.game.state = value;
        }
        
        function initGestures(full){
            if (full) { 
                service.game.gestures = {
                    player1: service.game.game.options[0],
                    player2: service.game.game.options[0]              
                };
            }
            service.game.result = 0;
        }
        
        function initScore(){
            service.game.score = {
                player1: 0,
                player2: 0              
            };
        }        
        
        function start(){
            if (service.game.state === gameStates.NOTSTARTED) {
                initScore();
            }
            startRunner();
            setState(gameStates.STARTED);
        }
        
        function stop() {
            stopRunner();
            initGestures();
            setState(gameStates.NOTSTARTED);
        }
        
        function pause() {
            stopRunner();
            initGestures();
            setState(gameStates.PAUSED);
        }
        
        function toggle() {
            if (service.game.state === gameStates.RESULTED) {
                start();
            } else {
                stopRunner();
                service.game.result = resultGame();
                setState(gameStates.RESULTED);
                resultTimeout = $timeout(function() {
                    start();
                }, RESULT_VISIBLE_DURATION);
            }
        }

        function select(gesture) {
            if (service.game.state === gameStates.STARTED) {
                service.game.gestures.player1 = gesture;
            }
        }        
        
        function randomGesture(){
            var options = service.game.game.options;
            
            function getRandomInt(max) {
                return Math.floor(Math.random() * max);
            }
            return options[getRandomInt(options.length)];
        }
        
        function resultGame(){
            var gestures = service.game.gestures;
            var superiority = service.game.game.superiority;
            
            if (gestures.player1 === gestures.player2) {
                return 0;
            }
            if (superiority[gestures.player1] && superiority[gestures.player1].indexOf(gestures.player2) !== -1) {
                service.game.score.player1++;
                return -1;
            }
            if (superiority[gestures.player2] && superiority[gestures.player2].indexOf(gestures.player1) !== -1) {
                service.game.score.player2++;
                return 1;
            }            
        }
        
        function startRunner() {
            stopRunner();         
            runner = $interval(function(){
                service.game.gestures.player2 = randomGesture();
                if (service.game.mode === gameConfig.computer_mode) {
                    service.game.gestures.player1 = randomGesture();
                }
            }, INTERVAL_DELAY);
        }
        
        function stopRunner() {
            if (angular.isDefined(resultTimeout)) {
                $timeout.cancel(resultTimeout);
                resultTimeout = undefined;
            }
            if (angular.isDefined(runner)) {
                $interval.cancel(runner);
                runner = undefined;
            }
        }        

        function init(){
            service.game = {
                game: gameConfig.games[0],
                mode: gameConfig.modes[0],
                state: gameStates.NOTSTARTED,
                states: gameStates
            };
            initScore();
            initGestures(true);

            // set listener
            Dispatcher.subscribe("GAME_CHANGED", stop);

            // methods
            service.stop = stop;
            service.start = start;
            service.pause = pause;
            service.toggle = toggle;
            service.select = select;
        }
        
        init();
    };

    GameService.$inject = ['gameConfig','$interval','$timeout','Dispatcher'];
    
})(window.angular);
