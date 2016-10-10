/**
 * Created by Alexander on 20.06.2016.
 */
app.controller('StoreController', ['$scope', 'translationService', '$mdDialog', '$sce', function ($scope, translationService, $mdDialog, $sce) {
    //$scope.imageIndex = 0;
    $scope.currentNavItem = 'home';
    var currentProduct;

    $scope.readAsHTML = function(snippet) {
        return readTextAsHTML(snippet);
    }

    var readTextAsHTML = function(snippet) {
        return $sce.trustAsHtml(snippet);
    }

    $scope.goto = function(navItem) {
        $scope.currentNavItem = navItem;
    }

    $scope.currentImageChange = function (product, imageNumber) {
        console.log(imageNumber);
        product.currentImageIndex = imageNumber || 0;
    };

    $scope.showAdvanced = function (product, ev) {
        currentProduct = product;
        console.log(ev);
        $mdDialog.show({
                controller: DialogController,
                templateUrl: 'product_description_dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
    };

    function DialogController($scope, $mdDialog) {
        $scope.getCurrentProduct = function() {
            return currentProduct;
        };

        $scope.parseHTML = function(snippet) {
            return readTextAsHTML(snippet);
        };

        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
    };

    $scope.products = [{
        name: 'UPS Type A 500',
        description: "<ul><li>Стабилизатор</li><li>индикатор напряжения</li></ul>",
        voltage: "12V",
        capacity: "350W",
        maxCapacity: "500W",
        price: 2300,
        rarity: 7,
        color: '#CCC',
        faces: 14,
        currentImageIndex: 0,
        images: [
            "/img/ups-a-01.png",
            "/img/ups-a-02.png",
            "/img/ups-a-03.png"
        ]
    }, {
        name: 'UPS Type B 700',
        description: "<ul><li>Стабилизатор</li><li>Индикатор напряжения</li><li>Зарядка с функцией «Вампир» для использования различных источников енергии (солнечной, термопреобразователей, доп.аккумулятора для зарядки основного)</li> <li>Выход сигнала на включение внешнего генератора електроэнергии</li><li>Выход для подключения GSM сигнализации</li></ul>",
        voltage: "12V",
        capacity: "450W",
        maxCapacity: "700W",
        price: 3200,
        rarity: 6,
        color: '#EEE',
        faces: 12,
        currentImageIndex: 0,
        images: [
            "/img/ups-a-01.png",
            "/img/ups-a-02.png",
            "/img/ups-a-03.png"
        ]
    }, {
        name: 'UPS Type C 1000',
        description: "<ul><li>Стабилизатор</li><li>Индикатор напряжения</li><li>Солнечная зарядка с функцией PPM (поиска точки максимальной мощности) мощной солнечной батареи</li><li>Выход сигнала на включение внешнего генератора електроэнергии</li><li>Выход для подключения GSM сигнализации</li></ul>",
        voltage: "12V",
        capacity: "600W",
        maxCapacity: "1000W",
        price: 3600,
        rarity: 2,
        color: '#000',
        faces: 6,
        currentImageIndex: 0,
        images: [
            "/img/ups-a-01.png",
            "/img/ups-a-02.png",
            "/img/ups-a-03.png"
        ]
    }, {
        name: 'UPS Type D 1000',
        description: "<ul><il>Стабилизатор</il><li>Индикатор напряжения</li><li>Солнечная зарядка с функцией PPM (поиска точки максимальной мощности) мощной солнечной батареи</li><li>Выход сигнала на включение внешнего генератора електроэнергии</li><li>Выход для подключения GSM сигнализации</li></ul>",
        voltage: "24V",
        capacity: "700W",
        maxCapacity: "1000W",
        price: 3700,
        rarity: 2,
        color: '#000',
        faces: 6,
        currentImageIndex: 0,
        images: [
            "/img/ups-a-01.png",
            "/img/ups-a-02.png",
            "/img/ups-a-03.png"
        ]
    }];

    $scope.translate = function () {
        translationService.getTranslation($scope, $scope.selectedLanguage);
    };
    //Init
    $scope.selectedLanguage = 'ru';
    $scope.translate();
}]);

app.controller("ReviewController", ['$scope', function () {

    this.review = {};

    this.addReview = function (product) {
        this.review.createdOn = Date.now();
        product.reviews.push(this.review);
        this.review = {};
    };

}]);