nodeChat = angular.module 'nodeChat',['ui.router']
  .config ($stateProvider,$urlRouterProvider,$locationProvider)->
    $urlRouterProvider.otherwise '/'
    # $locationProvider.html5Mode true
    $stateProvider
      .state
          name:'page1'
          url: '/page1'
          templateUrl: '../templates/page1.html'
      .state
          name:'page2'
          url: '/page2'
          templateUrl: '../templates/page2.html'


