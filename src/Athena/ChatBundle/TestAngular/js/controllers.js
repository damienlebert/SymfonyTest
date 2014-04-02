var chatApp = angular.module('chatApp', []);


chatApp.controller('ChatCtrl', function($scope, $timeout) {

    $scope.conversations = [];
    $scope.creationMode = false;
    $scope.users = [{"login": "dlebert",
            "nom": "Lebert",
            "prenom": "Damien"},
        {"login": "pvassoile",
            "nom": "Vassoile",
            "prenom": "Pierre"},
        {"login": "mbrun",
            "nom": "Brun",
            "prenom": "Marc"},
        {"login": "trichy",
            "nom": "Richy",
            "prenom": "Thibault"}];



    membres = [$scope.users[1]]
    conversation = {'id': 1, 'users': membres, 'messages': []};
    $scope.conversations.push(conversation);
    membres = [$scope.users[2]]
    conversation = {'id': 2, 'users': membres, 'messages': []};
    $scope.conversations.push(conversation);
    membres = [$scope.users[3]]
    conversation = {'id': 3, 'users': membres, 'messages': []};
    $scope.conversations.push(conversation);
    membres = [$scope.users[1], $scope.users[2]]
    conversation = {'id': 4, 'users': membres, 'messages': []};
    $scope.conversations.push(conversation);
    $scope.id = 5;

    //Gestion de l'affichage des membres d'une conversation
    $scope.showMembers = function showMembers(conversation) {
        if (conversation.users.length == 1) {
            users = conversation.users[0].prenom + " " + conversation.users[0].nom;
        } else {
            names = [];
            conversation.users.forEach(function(user) {
                names.push(user.prenom);
            });
            users = names.join(', ');
        }
        return users;
    };

    // Menu en mode creation de conversation
    $scope.searchText = '';
    $scope.tags = [];
    var iconUserNotAdded = "icon-user-not-added";
    var iconUserAdded = "icon-user-added";

    $scope.getUserIconClass = function(user) {
        var index = $scope.tags.indexOf(user);
        var classIcon = '';
        if (index == -1)
            classIcon = iconUserNotAdded;
        else
            classIcon = iconUserAdded;
        return classIcon;
    }

    $scope.toggleUserTag = function(user) {
        var index = $scope.tags.indexOf(user);
        if (index != -1)
            $scope.tags.splice(index, 1);
        else
            $scope.tags.push(user);
        $scope.searchText = '';
    };

    $scope.addChatBoxFromUserList = function(user) {
        $scope.tags = [];
        $scope.searchText = '';
        $scope.creationMode = false;
        // On vérifie si la conversation éxiste déjà
        conversation = $scope.conversations.filter(function(conversation) {
            if (conversation.users.length == 1 && conversation.users[0] == user)
                return true;
            else
                return false;
        });
        // Si elle éxiste on créer une chatbox pour cette conversation
        if (conversation.length == 1) {
            $scope.addChatBox(conversation[0]);
            return;
        }
        // Sinon on créer la conversation
        membres = [user];
        conversation = {'id': $scope.id++, 'users': membres, 'messages': []};
        $scope.conversations.push(conversation);
        // Et on créer la chatbox correspondante
        $scope.addChatBox(conversation);
    }

    //Gestions des chatboxes à afficher
    $scope.chatBoxes = [];

    //Affiche la chatbox correspondant à la conversation passée en paramètre
    $scope.addChatBox = function(conversation) {
        //On vérifie que le chatbox n'est pas déjà présente pour cette conversation
        var chatBoxExistante = $scope.chatBoxes.filter(function(chatbox) {
            return chatbox.conversation === conversation;
        });
        //Si elle existe on la déroule (si elle est minifié, et on la focus
        if (chatBoxExistante.length > 0) {
            var index = $scope.chatBoxes.indexOf(chatBoxExistante[0]);
            $scope.chatBoxes[index].minified = false;
            setChatboxFocus(chatBoxExistante[0]);
            return;
        }
        // Sinon Création de la chatbox    
        var chatBox = {'conversation': conversation, 'minified': false, currentMessage: ''}
        $scope.chatBoxes.push(chatBox);
        setChatboxFocus(chatBox);
    };
    //On supprime la chatbox
    $scope.removeChatBox = function(chatBox) {
        //On vérifie quela chatbox éxiste
        var index = $scope.chatBoxes.indexOf(chatBox);
        if (index == -1)
            return;
        //Supression de la chatbox
        $scope.chatBoxes.splice(index, 1);
    };
    //Minimise ou étend la chatbox suivant son état actuel
    $scope.toggleChatBox = function(chatBox) {
        //On vérifie que la chatbox éxiste
        var index = $scope.chatBoxes.indexOf(chatBox);
        if (index == -1)
            return;
        //On set l'attribut minified a true ou flase suivant l'état précédent
        $scope.chatBoxes[index].minified = $scope.chatBoxes[index].minified === false ? true : false;
        if (!$scope.chatBoxes[index].minified)
            setChatboxFocus($scope.chatBoxes[index]);
    };

    var setChatboxFocus = function(chatbox) {
        $scope.changeFocus = $scope.changeFocus === false ? true : false;
        $scope.focusValue = chatbox.conversation.id;
    };
    /**
     * 
     * @param chatBox
     * @returns {undefined}
     */
    $scope.sendMessage = function(chatBox) {
        if (chatBox.currentMessage == '' || chatBox.currentMessage == null)
            return;
        var message = {'content': chatBox.currentMessage, 'date': new Date()};
        var index = $scope.conversations.indexOf(chatBox.conversation);
        $scope.conversations[index].messages.push(message);

        index = $scope.chatBoxes.indexOf(chatBox);
        if (index == -1)
            return;
        $scope.chatBoxes[index].currentMessage = ''
    };

    //Messages DateTime in chat
    moment.lang('fr', {
        relativeTime: {
            future: "",
            past: "%s",
            s: "Maintenant",
            m: "Il y a 1 minute",
            mm: "Il y a %d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        }
    });
    $scope.timeAgoMessage = function(date) {
        console.log(date);
        if (moment().diff(moment(date), 'minutes') < 30)
            return moment(date).fromNow();
        else if ((moment().diff(moment(date), 'weeks') < 1))
            return moment(date).format('ddd HH:mm');
        return moment(date).format('D MMMM HH:mm');
    };

    var fireDigestEverySecond = function() {
        $timeout(function() {
            fireDigestEverySecond()
        }, 60000);
    };
    fireDigestEverySecond();

});

/**
 * Set focus on the convesation box when you click on the corresponding conversation in the conversation tab.
 */
chatApp.directive('setFocusTo', function($timeout) {
    return {
        restrict: 'A',
        link: function($scope, $element, attrs) {
            $scope.$watch('changeFocus', function(currentValue, previousValue) {
                if (attrs.elementId === attrs.focusValue) {
                    //On utilise $evalAsync pour attendre que la conversation apparaisse avant de focus le champ
                    //$scope.$evalAsync(function() {
                    $timeout(function() {
                        $element[0].focus();
                    });
                }
            })
        }
    }
});

chatApp.directive('tagManager', function($timeout) {
    return {
        restrict: 'E',
        scope: {
            tags: '=ngModel',
            creationMode: '=bindingCreationMode',
            searchText: '=searchText',
            addChatBoxFromUserList: '$addChatBoxFromUserList'
        },
        replace: true,
        template: '<div class="tagManager">' +
                '<div><span class="tag" ng-class="tag.cssClass" style="text-align:inline; margin-right:3px;" ng-repeat="tag in tags">{{ tag.prenom }} {{ tag.nom }} <a ng-click="removeTag(tag)" alt="Remove tag">&times;</a></span></div>' +
                '<div class="input-group margin-bottom-sm">' +
                '<input id="searchText" class="input-conversation form-control input-sm type="text" placeholder="Enter , separated tags" style="vertical-align: baseline;"' +
                'ng-focus="creationMode=true" ng-model="searchText" ' +
                'value="<span class=\'tag\' style=\'text-align:inline; margin-right:3px;\' ng-repeat=\'tag in tags\'>{{ tag.prenom }} {{ tag.nom }} <a ng-click=\'removeTag(tag)\' alt=\'Remove tag\'>&times;</a></span>" />' +
                '<span class="input-group-addon"><span class="glyphicon glyphicon-remove" ng-click="creationModeOff()"></span></span>' +
                '</div>',
        link: function(scope, element, attrs) {

            scope.creationModeOff = function()
            {
                scope.tags = [];
                scope.searchText = '';
                scope.creationMode = false;
            }

            // Remove a tag
            scope.removeTag = function(tag) {
                scope.tags = scope.tags.filter(function(currentTag) {
                    return currentTag != tag;
                });
            };

            // Registering event on backspace, enter or lost focus
            element.find('input')
                    .on("keydown", function(e) {
                        var nbrTag = scope.tags.length;
                        // On backspace load the previous tag into tagField input
                        if (e.keyCode == 8) {
                            scope.$apply(function() {

                                if (scope.searchText != '' || nbrTag == 0)
                                    return;
                                if (scope.tags[nbrTag - 1].cssClass == null || scope.tags[nbrTag - 1].cssClass == '') {
                                    scope.tags[nbrTag - 1].cssClass = 'remove-tag-validation';
                                    return;
                                }
                                scope.tags.pop();
                            });
                        } else {
                            scope.tags[nbrTag - 1].cssClass = '';
                        }
                    })
                    .on('blur', function() {
                        $timeout(function() {
                            if (scope.searchText != '' || scope.tags.length > 0)
                                return;
                            scope.creationModeOff();
                        })
                    })
        }
    }
});
