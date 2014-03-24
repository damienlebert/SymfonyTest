var chatApp = angular.module('chatApp', []);


chatApp.controller('ChatCtrl', function($scope, $timeout) {


    $scope.users = [{"login": "dlebert",
            "nom": "Lebert",
            "prenom": "Damien"},
        {"login": "pvassoile",
            "nom": "Vassoile",
            "prenom": "Pierre"}];

    $scope.conversations = [];

    $scope.addConversation = function(user) {
        conversation = {'id': 1, 'user': user, 'messages': [], 'currentMessage': '', 'hidden': false};
        $scope.conversations.push(conversation);
    };
    $scope.removeConversation = function(conversation) {
        var index = $scope.conversations.indexOf(conversation);
        $scope.conversations.splice(index, 1);
    };

    $scope.toggleConversation = function(conversation) {
        var index = $scope.conversations.indexOf(conversation);
        $scope.conversations[index].hidden = $scope.conversations[index].hidden === false ? true : false;
    };

    $scope.sendMessage = function(conversation) {
        var index = $scope.conversations.indexOf(conversation);
        if ($scope.conversations[index].currentMessage == '')
            return;
        var message = {'content': $scope.conversations[index].currentMessage, 'date': new Date()} ;
        $scope.conversations[index].messages.push(message);
        $scope.conversations[index].currentMessage = ''
    }
    
    //Messages DateTime in chat
    moment.lang('fr');
    $scope.timeAgoMessage = function(date){
        return moment(date).fromNow();
    }
    var fireDigestEverySecond = function () {
        $timeout(function () {fireDigestEverySecond()}, 1000);
    };
    fireDigestEverySecond();
    
    
    
    
});