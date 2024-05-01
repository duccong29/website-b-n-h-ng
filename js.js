var app = angular.module('myapp', ['ngRoute']);
app.config(function($routeProvider){
    $routeProvider
    .when('/Trangchu', {
        templateUrl: 'Trangchu.html'
    })
    .when('/Giohang', {
        templateUrl: 'Giohang.html',
        controller: 'cartCtrl'
    })
    .when('/Dangky', {
        templateUrl: 'Dangky.html'
    })
    .when('/Dangnhap', {
        templateUrl: 'Dangnhap.html'  
    })
    .when('/Quenmatkhau', {
        templateUrl: 'Quenmatkhau.html'
    })
    .when('/Danhmuc', {
        templateUrl: 'Danhmuc.html'
    })
    .when('/dienthoai', {
        templateUrl: 'dienthoai.html'
    })
    .when('/Chitietsanpham/:id', {
        templateUrl: 'Chitietsanpham.html',
        controller: 'ChitietsanphamCtrl'
    })
    // .when('/detail/:id',{
    //     templateUrl: 'detail.html',
    //     controller: 'detailCtrl'
    // })
    .otherwise({
        redirectTo: '/Trangchu'
    });
});

// app.controller("DSDTctrl", function ($scope, $routeParams){
//     $scope.title = "Chủng loại";    
//     $scope.id = $routeParams.id; 
// });
// app.controller("HDBctrl", function ($scope, $routeParams){
//     $scope.title = "Hàng đặc biệt";    
//     $scope.id = $routeParams.id; 
// });
// app.controller("NCCctrl", function ($scope, $routeParams){
//     $scope.title = "Nhà cung cấp";    
//     $scope.id = $routeParams.id; 
// });

app.run(function($rootScope){
    $rootScope.$on("$routeChangeStart", function(){
        $rootScope.loading = true;
    });
    $rootScope.$on("$routeChangeSuccess", function(){
        $rootScope.loading = false;
    });
    $rootScope.$on("$routeChangeError", function(){
        $rootScope.loading = false;
        alert('lỗi không tải được template');
    });
})



app.controller('MyController', function ($scope, $http) {
    $scope.giohang=[];
    $scope.dsSP = [];//danh mục
    $scope.dsSP1 = [];//trang chủ
    $scope.dsSP2 = [];//trang chủ
    $scope.dsSP3 = [];//trang chủ
    $scope.dsSP4 = [];//dt
    $scope.showBuyButton = false;
    //liên kết json
    $http.get('data.json').then(function (res) {
    $scope.dsSP = res.data[0].concat(res.data[1],res.data[2],res.data[3]); 
    $scope.dsSP1 = res.data[4]; 
    $scope.dsSP2 = res.data[5]; 
    $scope.dsSP3 = res.data[0].concat(res.data[4],res.data[2],res.data[1], res.data[5]); 
    $scope.dsSP4 = res.data[6]; 
    // chuyển trang
    $scope.start = ($scope.page -1)*$scope.limit;
    $scope.totalPage = Math.ceil($scope.dsSP.length/$scope.limit);
    $scope.numberOfPage = Array.from(Array($scope.totalPage).keys());

    
    $scope.shouldShowLoadMore = function() {
        return $scope.limit < $scope.dsSP.length;
    };

    $scope.shouldShowLoadLess = function() {
        return $scope.limit > 6;
    };

    //tìm kiếm
    $scope.filter=function(timkiem){

    }
  });

    $scope.cot = '';
    $scope.kieu = '';

    $scope.order = function (cot, kieu) {
        $scope.cot = cot;
        $scope.kieu = kieu;
    };
    $scope.xoa = function(index){
        $scope.giohang.splice(index,1);
    }
    $scope.xoahet = function(){
        $scope.giohang=[];
    }

    
    $scope.page = 1;
    $scope.limit = 12;
   
    $scope.changePage = function (newPage) {
    $scope.page = newPage;
    $scope.start = ($scope.page - 1) * $scope.limit;
};

});
app.controller('sanphamCtrl', function ($scope) {
    // viet nut mua de them sp vao gio hang
    $scope.mua = function(sp){
        // TH1 da co sp roi thi tang so luong
        var chuaCo = true;
        for(const item of $scope.$parent.giohang){
            if(item.id == sp.id){
                item.soluong++;
                chuaCo = false;
                break;
            }
        }
        //TH2 : chua co sp thi them vao gio hang 
        if( chuaCo ){
            sp.soluong = 1;
            $scope.$parent.giohang.push(sp);
        }
        console.log($scope.$parent.giohang);  
    }
})
app.controller('cartCtrl', function ($scope) { 
    $scope.tinhTongTien = function(){
        var tong = 0;
        for (const i of $scope.$parent.giohang) {
            
            var giaSauGiamGia = i.gia * (1 - i.giamgia);
            tong += giaSauGiamGia * i.soluong;
        }
        return tong;
    };
})

app.controller('ChitietsanphamCtrl', function ($scope,$routeParams) {
    var id = $routeParams.id;
    $scope.sanpham = {

    };
    for(const item of $scope.$parent.dsSP){
        if(item.id == id){
            $scope.sanpham = item;
            break;
        }
    }
})