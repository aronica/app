angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Questions) {
    if(Questions.list){
        $scope.questions = Questions.list;
        return;
    }
    Questions.list = [];
    var promise = Questions.all(); // 同步调用，获得承诺接口
    promise.then(function(data) {  // 调用承诺API获取数据 .resolve
       var tmp = [];
       for(var i = 0;i<data.length;i++){
          tmp.push(data[i]);
          tmp = tmp.concat(data[i].items);
       }
       $scope.questions = tmp;
       Questions.list = tmp;
    }, function(data) {  // 处理错误 .reject
       $scope.questions = [{id:"1",title:"No Data Found"}];
       Questions.list = tmp;
    });
})

.controller('QuestionDetailCtrl',function($scope,$stateParams,Questions){
    if(!Questions.dataSource){
        Questions.dataSource = {};
    }
    if(Questions.dataSource[$stateParams.qid]){
        $scope.question = Questions.dataSource[$stateParams.qid];
        return;
    }
    var promise = Questions.get($stateParams.qid);
    promise.then(function(data){
        $scope.question = {content:data};
        Questions.dataSource[$stateParams.qid] = {content:data};
    },function(error){
        var defaultData = {content:"No data found!"};
        Questions.dataSource[$stateParams.qid] = defaultData;
        $scope.question = defaultData;
    });
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
});
