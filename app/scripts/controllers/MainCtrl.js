(function (angular) {
    "use strict";
    
    angular.module('HandBattle').controller('MainCtrl', MainCtrl);
   
    function MainCtrl($location, $i18next, GameService, gameConfig, Dispatcher){
        var vm = this;
        
        // init properties
        vm.config = gameConfig;
        vm.menuVisible = false;
        vm.settingsVisible = false;
        vm.selectedLanguage = $i18next.options.lng;
        
        vm.gameConfig = GameService.game;
        
        vm.toggleMenu = function(param){
            if (param !== undefined) {
                vm.menuVisible = param;
            } else {
                vm.menuVisible = !vm.menuVisible;
            }
        };
        
        vm.toggleMenuAndNavigate = function(url) {
            $location.url(url);
            vm.menuVisible = false;
        };
        
        vm.toggleSettings = function(){
            vm.settingsVisible = !vm.settingsVisible;
        };
        
        vm.switchLanguage = function(lang){
            $i18next.options.lng = lang;
            vm.selectedLanguage = $i18next.options.lng;
            vm.menuVisible = false;
        };
        
        vm.switchMode = function(mode){
            GameService.game.mode = mode;
            Dispatcher.dispatch("GAME_CHANGED");
            vm.menuVisible = false;
        };
        
        vm.switchGame = function(game){
            GameService.game.game = game;
            Dispatcher.dispatch("GAME_CHANGED");
            vm.menuVisible = false;
        };
    };
    
    MainCtrl.$inject = ['$location', '$i18next', 'GameService', 'gameConfig', 'Dispatcher'];
    
})(window.angular);
