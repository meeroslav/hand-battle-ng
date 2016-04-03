(function (angular) {
    "use strict";
    
    angular.module('HandBattle').controller('HelpCtrl', HelpCtrl);
   
    function HelpCtrl(gameConfig){
        var vm = this;

        vm.games = gameConfig.games;        
    };
    
    HelpCtrl.$inject = ['gameConfig'];
    
})(window.angular);