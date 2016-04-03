(function (angular) {
    "use strict";
    
    angular.module('HandBattle', ['ngTouch','ngAnimate','jm.i18next','ngSanitize','ui.router','HandBattle.Config','missing.manual'])
    
    .config(['$i18nextProvider', 'gameConfig', '$stateProvider', '$urlRouterProvider', '$locationProvider', config])
    
    .run(['$rootScope', run]);
    
    function config($i18nextProvider, gameConfig, $stateProvider, $urlRouterProvider, $locationProvider){
        $i18nextProvider.options = {
            lng: gameConfig.languages[0],
            useCookie: false,
            useLocalStorage: false,
            fallbackLng: 'dev',
            resGetPath: './locales/__lng__/__ns__.json',
            defaultLoadingValue: '' // ng-i18next option, *NOT* directly supported by i18next            
        };  
        
        // disable hash in routes
        $locationProvider.html5Mode(true);
        
        // set routes
        $urlRouterProvider.otherwise("/");
        //
        // Now set up the states
        $stateProvider
            .state('home', {
                url: "/",
                templateUrl: "views/home.html"
            })
            .state('game', {
                url: "/game",
                templateUrl: "views/game.html"
            })
            .state('help', {
                url: "/help",
                templateUrl: "views/help.html"
            });       
    }
    
    function run($rootScope) {
        $rootScope.loaded = true;
    }
    
})(window.angular);

