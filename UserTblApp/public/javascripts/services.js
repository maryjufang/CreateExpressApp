angular.module('UsersService', []).service('userService', function () {
     var users = [
        { id: 1, title: 'Mr.', fName: 'Hege', lName: 'Pege', sex: 'Male', age: '37', passw: '123' },
        { id: 2, title: 'Dr.', fName: 'Kim', lName: 'Pim', sex: 'Male', age: '45', passw: '123' },
        { id: 3, title: 'Mr.', fName: 'Sal', lName: 'Smith', sex: 'Male', age: '29', passw: '123' },
        { id: 4, title: 'Dr.', fName: 'Jack', lName: 'Jones', sex: 'Male', age: '23', passw: '123' },
        { id: 5, title: 'Mr.', fName: 'John', lName: 'Doe', sex: 'Male', age: '28', passw: '123' },
        { id: 6, title: 'Mr.', fName: 'Peter', lName: 'Pan', sex: 'Male', age: '27', passw: '123' },
        { id: 7, title: 'Dr.', fName: 'Lily', lName: 'Jenny', sex: 'Female', age: '33', passw: '123' },
        { id: 8, title: 'Ms.', fName: 'Summer', lName: 'White', sex: 'Female', age: '24', passw: '123' },
        { id: 9, title: 'Mr.', fName: 'Sam', lName: 'Winters', sex: 'Male', age: '27', passw: '123' },
        { id: 10, title: 'Dr.', fName: 'Jon', lName: 'Snow', sex: 'Male', age: '21', passw: '123' },
        { id: 11, title: 'Mr.', fName: 'Rob', lName: 'Page', sex: 'Male', age: '32', passw: '123' },
        { id: 12, title: 'Mrs.', fName: 'Sansa', lName: 'Li', sex: 'Male', age: '27', passw: '123' },
        { id: 13, title: 'Mr.', fName: 'Ken', lName: 'Cheung', sex: 'Male', age: '32', passw: '123' },
        { id: 14, title: 'Mrs.', fName: 'Arya', lName: 'Stark', sex: 'Female', age: '10', passw: '123' }
    ];

    this.getUsersLength = function () {
        return users.length;
    };

    this.getUserById = function (id) {
        if (id >= 1 && id <= (users.length + 1)) {
            return {
                id: users[id - 1].id,
                title: users[id - 1].title,
                fName: users[id - 1].fName,
                lName: users[id - 1].lName,
                sex: users[id - 1].sex,
                age: users[id - 1].age,
                passw: users[id - 1].passw1
            };
        }
        return null;
    };

    this.editUserById = function (id, u) {
        if (id >= 1 && id <= (users.length + 1)) {
            users[id - 1].title = u.title;
            users[id - 1].fName = u.fName;
            users[id - 1].lName = u.lName;
            users[id - 1].sex = u.sex;
            users[id - 1].age = u.age;
            users[id - 1].passw = u.passw1;
        }
    };

    this.createNewUser = function (u) {
        users.push(u);
    };

    this.deleteUserById = function (id) {
        var i, index = -1;

        for (i = 0; i < users.length; i++) {
            if (users[i].id === id) {
                index = i; break;
            }
        }

        if (index !== -1) {
            users.splice(index, 1);

            for (i = index; i < users.length; i++) {
                users[i].id--;
            }
        }
    };
});


//angular.module('UsersService', []).factory('userService', function () {
//    var fac = {};

//    fac.users = [
//        { id: 1, title: 'Mr.', fName: 'Hege', lName: 'Pege', sex: 'Male', age: '37', passw: '123' },
//        { id: 2, title: 'Dr.', fName: 'Kim', lName: 'Pim', sex: 'Male', age: '45', passw: '123' },
//        { id: 3, title: 'Mr.', fName: 'Sal', lName: 'Smith', sex: 'Male', age: '29', passw: '123' },
//        { id: 4, title: 'Dr.', fName: 'Jack', lName: 'Jones', sex: 'Male', age: '23', passw: '123' },
//        { id: 5, title: 'Mr.', fName: 'John', lName: 'Doe', sex: 'Male', age: '28', passw: '123' },
//        { id: 6, title: 'Mr.', fName: 'Peter', lName: 'Pan', sex: 'Male', age: '27', passw: '123' },
//        { id: 7, title: 'Dr.', fName: 'Lily', lName: 'Jenny', sex: 'Female', age: '33', passw: '123' },
//        { id: 8, title: 'Ms.', fName: 'Summer', lName: 'White', sex: 'Female', age: '24', passw: '123' },
//        { id: 9, title: 'Mr.', fName: 'Sam', lName: 'Winters', sex: 'Male', age: '27', passw: '123' },
//        { id: 10, title: 'Dr.', fName: 'Jon', lName: 'Snow', sex: 'Male', age: '21', passw: '123' },
//        { id: 11, title: 'Mr.', fName: 'Rob', lName: 'Page', sex: 'Male', age: '32', passw: '123' },
//        { id: 12, title: 'Mrs.', fName: 'Sansa', lName: 'Li', sex: 'Male', age: '27', passw: '123' },
//        { id: 13, title: 'Mr.', fName: 'Ken', lName: 'Cheung', sex: 'Male', age: '32', passw: '123' },
//        { id: 14, title: 'Mrs.', fName: 'Arya', lName: 'Stark', sex: 'Female', age: '10', passw: '123' }
//    ];

//    fac.getUsersLength = function () {
//        return fac.users.length;
//    };

//    fac.getUserById = function (id) {
//        if (id >= 1 && id <= (fac.users.length + 1)) {
//            return {
//                id: fac.users[id - 1].id,
//                title: fac.users[id - 1].title,
//                fName: fac.users[id - 1].fName,
//                lName: fac.users[id - 1].lName,
//                sex: fac.users[id - 1].sex,
//                age: fac.users[id - 1].age,
//                passw: fac.users[id - 1].passw1
//            };
//        }
//        return null;
//    };

//    fac.editUserById = function (id, u) {
//        if (id >= 1 && id <= (fac.users.length + 1)) {
//            fac.users[id - 1].title = u.title;
//            fac.users[id - 1].fName = u.fName;
//            fac.users[id - 1].lName = u.lName;
//            fac.users[id - 1].sex = u.sex;
//            fac.users[id - 1].age = u.age;
//            fac.users[id - 1].passw = u.passw1;
//        }
//    };

//    fac.createNewUser = function (u) {
//        fac.users.push(u);
//    };

//    fac.deleteUserById = function (id) {
//        var i, index = -1;

//        for (i = 0; i < fac.users.length; i++) {
//            if (fac.users[i].id === id) {
//                index = i; break;
//            }
//        }

//        if (index !== -1) {
//            fac.users.splice(index, 1);

//            for (i = index; i < fac.users.length; i++) {
//                fac.users[i].id--;
//            }
//        }
//    };

//    return fac;
//});
