// Create a module for our services
//var tableApp = angular.module('tblApp', ['ngRoute', 'userService']);
var tableApp = angular.module('tblApp', ['ngRoute', 'UsersService']);

// Set up our mappings between URLs, templates, and controllers
function tblRouteConfig($routeProvider) {
    $routeProvider.
      when('/table/:pn', {
          controller: 'TableController',
          templateUrl: 'table.html'
      }).
      when('/edit/:id', {
          controller: 'EditController',
          templateUrl: 'edit.html'
      }).
      otherwise({
          redirectTo: '/table/1'
      });
}

// Set up our route
tableApp.config(tblRouteConfig);

tableApp.controller('EditController', function ($scope, $routeParams, userService) {
    //tableApp.controller('EditController', ['userService', function ($scope, $routeParams, userService) {
    /* user variables */
    $scope.id = $routeParams.id;
    $scope.title = '';
    $scope.fName = '';
    $scope.lName = '';
    $scope.sex = '';
    $scope.age = '';
    $scope.passw1 = '';
    $scope.passw2 = '';

    /* edit models */
    $scope.edit = true;
    $scope.error = false;
    $scope.incomplete = false;

    $scope.editUser = function () {
        if ($scope.id == 0) {
            $scope.edit = true;
            $scope.title = '';
            $scope.fName = '';
            $scope.lName = '';
            $scope.sex = '';
            $scope.age = '';
            $scope.passw1 = '';
            $scope.passw2 = '';
        } else {
            $scope.edit = false;

            var user = userService.getUserById($scope.id);
            $scope.title = user.title;
            $scope.fName = user.fName;
            $scope.lName = user.lName;
            $scope.sex = user.sex;
            $scope.age = user.age;
            $scope.passw1 = user.passw;
            $scope.passw2 = user.passw;
        }
    };
    $scope.editUser();

    $scope.$watch('title', function () { $scope.checkVariables(); });
    $scope.$watch('fName', function () { $scope.checkVariables(); });
    $scope.$watch('lName', function () { $scope.checkVariables(); });
    $scope.$watch('sex', function () { $scope.checkVariables(); });
    $scope.$watch('age', function () { $scope.checkVariables(); });
    $scope.$watch('passw1', function () { $scope.checkVariables(); });
    $scope.$watch('passw2', function () { $scope.checkVariables(); });

    $scope.checkVariables = function () {
        if ($scope.passw1 !== $scope.passw2) {
            $scope.error = true;
        } else {
            $scope.error = false;
        }
        $scope.incomplete = false;
        if (!$scope.title.length ||
                !$scope.fName.length || !$scope.lName.length ||
                !$scope.sex.length || !$scope.age.length ||
                !$scope.passw1.length || !$scope.passw2.length) {
            $scope.incomplete = true;
        }
    };

    $scope.saveChanges = function () {
        if ($scope.id == 0) { /* create */
            $scope.id = userService.getUsersLength() + 1;
            userService.createNewUser({
                id: $scope.id,
                title: $scope.title,
                fName: $scope.fName,
                lName: $scope.lName,
                sex: $scope.sex,
                age: $scope.age,
                passw: $scope.passw1
            });
        } else { /* edit */
            userService.editUserById($scope.id, {
                id: $scope.id,
                title: $scope.title,
                fName: $scope.fName,
                lName: $scope.lName,
                sex: $scope.sex,
                age: $scope.age,
                passw: $scope.passw1
            });
        }
        window.location.href = '#/table/0';
    };
});
tableApp.controller('TableController', function ($scope, $routeParams, $http, userService) {
    //tableApp.controller('TableController', ['userService', function ($scope, userService) {
    /* pagination */
    $scope.UsersPerPage = 5;
    $scope.numberOfPages = Math.ceil(userService.getUsersLength() / $scope.UsersPerPage);
    $scope.getPageNumber = function () {
        var p = $routeParams.pn;
        if (p <= 0 || p >= $scope.numberOfPages) {
            return $scope.numberOfPages;
        } else {
            return p;
        }
    };
    $scope.pageNumber = $scope.getPageNumber();
    $scope.pageNumArr = new Array($scope.numberOfPages);
    $scope.getPageNumArr = function () {
        $scope.pageNumArr = new Array($scope.numberOfPages);
        var i;
        for (i = 1; i <= $scope.numberOfPages; i++) {
            $scope.pageNumArr[i - 1] = { page: i };
        }
    };
    $scope.getPageNumArr();
    $scope.setPageNumber = function (pn) {
        if (pn <= 1) {
            $scope.pageNumber = 1;
        } else if (pn >= $scope.numberOfPages) {
            $scope.pageNumber = $scope.numberOfPages;
        } else {
            $scope.pageNumber = pn;
        }
    };
    $scope.subUsers = [];
    $scope.getSubUers = function () {
        console.log("geting subusers...");
        $http.get("http://localhost:3000/services/users").
            success(function (response) { $scope.subUsers = response; });
        console.log($scope.subUsers);
        //var i, j, sn, en, ul, user;
        //$scope.subUsers = [];
        //if ($scope.pageNumber <= 0 || $scope.pageNumber > $scope.numberOfPages) {
        //    return;
        //}
        //sn = ($scope.pageNumber - 1) * $scope.UsersPerPage;
        //ul = userService.getUsersLength();
        //if (sn <= 0) { sn = 0; }
        //en = $scope.pageNumber * $scope.UsersPerPage - 1;
        //if (en >= ul - 1) { en = ul - 1; }
        //for (j = 0, i = sn; i <= en; i++, j++) {
        //    user = userService.getUserById(i + 1);
        //    if (user != null) {
        //        $scope.subUsers.push(user);
        //    }
        //}
        //while ($scope.subUsers.length < $scope.UsersPerPage) {
        //    $scope.subUsers.push({
        //        id: 0,
        //        title: '',
        //        fName: '',
        //        lName: '',
        //        sex: '',
        //        age: '',
        //        passw: ''
        //    });
        //}
    };
    $scope.getSubUers();
    $scope.$watch('pageNumber', function () { $scope.getSubUers(); });
    $scope.$watch('numberOfPages', function () { $scope.getPageNumArr(); });

    /* sorting icons */
    $scope.showId = false;
    $scope.showTitle = false;
    $scope.showFName = false;
    $scope.showLName = false;
    $scope.showSex = false;
    $scope.showAge = false;

    $scope.showIcons = function (str) {
        $scope.showId = false;
        $scope.showTitle = false;
        $scope.showFName = false;
        $scope.showLName = false;
        $scope.showSex = false;
        $scope.showAge = false;
        switch (str) {
            case 'id': $scope.showId = true; break;
            case 'title': $scope.showTitle = true; break;
            case 'fName': $scope.showFName = true; break;
            case 'lName': $scope.showLName = true; break;
            case 'sex': $scope.showSex = true; break;
            case 'age': $scope.showAge = true; break;
        }
    };

    $scope.deleteUser = function (id) {
        userService.deleteUserById(id);
        $scope.numberOfPages = Math.ceil(userService.getUsersLength() / $scope.UsersPerPage);
        $scope.setPageNumber($scope.pageNumber);
        $scope.getSubUers();
    };
});

