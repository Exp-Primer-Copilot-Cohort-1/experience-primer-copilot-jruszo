function skillsMember() {
    return {
        name: 'skillsMember',
        templateUrl: 'app/components/members/skillsMember.html',
        restrict: 'E',
        scope: {
            member: '='
        },
        controller: function ($scope, $element, $attrs) {
            $scope.skills = $scope.member.skills;
        }
    };
}