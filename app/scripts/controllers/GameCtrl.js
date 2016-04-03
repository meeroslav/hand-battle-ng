(function (angular) {
    "use strict";
    
    angular.module('HandBattle').controller('GameCtrl', GameCtrl);
    
    function GameCtrl(GameService){
        var vm = this;
        
        vm.game = GameService.game;
        vm.selectedGesture = 0;
        
        vm.stop = function(){
            GameService.stop();
        };
        vm.start = function(){
            GameService.start();
        };
        vm.pause = function(){
            GameService.pause();
        };
        vm.toggle = function(){
            GameService.toggle();
        };
        vm.select = function(gesture, index) {
            if (GameService.game.state === GameService.game.states.STARTED) {
                vm.selectedGesture = index;

                GameService.select(gesture);
            }
        };
    };
    
    GameCtrl.$inject = ['GameService'];
    
})(window.angular);