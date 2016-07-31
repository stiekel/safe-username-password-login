angular
  .module('app', ['ngResource'])
  .controller('LoginController', ['$scope', '$resource', LoginController]);

function LoginController($scope, $resource) {
  $scope.username = 'Sid';
  $scope.password = "chensd.com";

  $scope.check = function(){
    $scope.errorMessage = '';
    if(!this.username) {
      $scope.errorMessage = 'username required';
      return true;
    }

    if(!this.password) {
      $scope.errorMessage = 'password required';
      return true;
    }

    return false;
  };

  function encryptPwd(username, password) {
    return md5(
      username + md5 (
        md5(md5(md5(password))) + md5(username)
      )
    );
  }

  $scope.login = function(){
    if($scope.check()) {
      return;
    }
    $scope.successMessage = '';
    $scope.errorMessage = '';
    $scope.status = 'loading';

    $resource('/user/login')
    .save({
      username: $scope.username,
      password: encryptPwd($scope.username, $scope.password)
    }, function(res){
      $scope.status = 'done';
      $scope.successMessage = 'login successful!';
    }, function(reason){
      $scope.status = 'done';
      $scope.errorMessage = reason.data || 'failed';
    });
  };
  $scope.registry = function(){
    if($scope.check()) {
      return;
    }
    $scope.successMessage = '';
    $scope.errorMessage = '';
    $scope.status = 'loading';

    $resource('/user/registry')
    .save({
      username: $scope.username,
      password: encryptPwd($scope.username, $scope.password)
    }, function(res){
      $scope.status = 'done';
      $scope.successMessage = 'registry successful!';
    }, function(reason){
      $scope.status = 'done';
      console.log('reason:', reason);
      $scope.errorMessage = reason.data || 'failed';
    });
  };
}
