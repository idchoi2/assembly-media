angular.module('assemblyKioskApp', [])
    .controller('MainCtrl', ['$scope', '$sce', '$timeout', function($scope, $sce, $timeout) {

        "use strict";

        /**
         * 초기화
         */
        $scope.init = function() {
            $scope.isQLoad = false;
            $scope.isALoad = false;
            $scope.curPage = 1;
            $scope.curStep = 1;
            //$scope.stepSts = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
            $scope.stepSts = [null, null, null, null, null, null, null, null, null, null];
            $scope.answer = false;
            $scope.isFinished = false;
            $scope.isCompleted1 = false;
            $scope.isCompleted2 = false;
            $scope.isCompleted3 = false;
            $scope.isLoading = false;
            $scope.isClick = false;
            $scope.isConfirm = false;
            $scope.resultNo = 0;
        };

        /**
         * 답변 설정
         * @param answer
         * @constructor
         */
        $scope.SetAnswer = function(answer) {
            $scope.answer = answer;
            $timeout(function() {
                $scope.GoNext();
            }, 200);
        };

        /**
         * 페이지 이동
         * @param paggNo
         * @param interval
         * @constructor
         */
        $scope.GoPage = function(paggNo, interval) {
            $timeout(function() {
                $scope.curPage = paggNo;

                if(paggNo === 2) {
                    $scope.GoStep($scope.curStep - 1);
                }
            }, interval);
        };

        /**
         * 단계 이동
         * @param stepNo
         * @constructor
         */
        $scope.GoStep = function(stepNo) {

            if(stepNo <= $scope.stepSts.length) {
                $timeout(function() {

                    // 질문 Out
                    $scope.isQLoad = false;

                    $timeout(function() {

                        // 답변 Out
                        $scope.isALoad = false;

                        $timeout(function() {

                            // 재설정
                            if(stepNo > 0) {
                                if ($scope.answer === "yes") {
                                    $scope.stepSts[stepNo - 1] = 1;
                                } else {
                                    $scope.stepSts[stepNo - 1] = 0;
                                }
                            }

                            $scope.answer = false;
                            $scope.curStep = stepNo + 1;
                            $scope.isClick = false;

                            if(stepNo < $scope.stepSts.length) {
                                // 질문 In
                                $scope.isQLoad = true;

                                $timeout(function() {

                                    // 답변 In
                                    $scope.isALoad = true;

                                }, 300);
                            }

                        }, 300);
                    }, 300);
                }, 300);
            }


            if(stepNo >= $scope.stepSts.length) {
                $scope.GoFinish();
            }
        };

        /**
         * 다음 버튼
         * @constructor
         */
        $scope.GoNext = function() {
            $scope.isClick = true;
            $scope.GoStep($scope.curStep);
            //$scope.GoRandom();
        };


        $scope.GoRandom = function() {
            var fre = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            var i;
            for(i = 0; i < 1000; i ++) {

                $scope.stepSts[0] = Math.round(Math.random() * 1);
                $scope.stepSts[1] = Math.round(Math.random() * 1);
                $scope.stepSts[2] = Math.round(Math.random() * 1);
                $scope.stepSts[3] = Math.round(Math.random() * 1);
                $scope.stepSts[4] = Math.round(Math.random() * 1);
                $scope.stepSts[5] = Math.round(Math.random() * 1);
                $scope.stepSts[6] = Math.round(Math.random() * 1);
                $scope.stepSts[7] = Math.round(Math.random() * 1);
                $scope.stepSts[8] = Math.round(Math.random() * 1);
                $scope.stepSts[9] = Math.round(Math.random() * 1);
                $scope.stepSts[10] = Math.round(Math.random() * 1);


                $scope.GoAnalyze();
                fre[$scope.resultNo - 1]++;
            }
        };

        /**
         * 분석 하기
         * @constructor
         */
        $scope.GoAnalyze = function() {

            // 2가지 이상 결과
            /*
            if($scope.stepSts[0] !== 1 || $scope.stepSts[1] !== 1) {
                $scope.stepSts[0] = 0;
            }
            $scope.stepSts.splice(1, 1);

            if($scope.stepSts[2] !== 1 || $scope.stepSts[3] !== 1) {
                $scope.stepSts[2] = 0;
            }
            $scope.stepSts.splice(2, 1);

            if($scope.stepSts[4] !== 1 || $scope.stepSts[5] !== 1) {
                $scope.stepSts[4] = 0;
            }
            $scope.stepSts.splice(4, 1);

            if($scope.stepSts[6] !== 1 || $scope.stepSts[7] !== 1) {
                $scope.stepSts[6] = 0;
            }
            $scope.stepSts.splice(6, 1);
            */



            if($scope.stepSts.equals(result1Cmpr) === true) {
                $scope.resultNo = 1;
            } else if($scope.stepSts.equals(result2Cmpr) === true) {
                $scope.resultNo = 2;
            } else if($scope.stepSts.equals(result3Cmpr) === true) {
                $scope.resultNo = 3;
            } else if($scope.stepSts.equals(result4Cmpr) === true) {
                $scope.resultNo = 4;
            } else if($scope.stepSts.equals(result5Cmpr) === true) {
                $scope.resultNo = 5;
            } else if($scope.stepSts.equals(result6Cmpr) === true) {
                $scope.resultNo = 6;
            } else if($scope.stepSts.equals(result7Cmpr) === true) {
                $scope.resultNo = 7;
            } else if($scope.stepSts.equals(result8Cmpr) === true) {
                $scope.resultNo = 8;
            } else if($scope.stepSts.equals(result9Cmpr) === true) {
                $scope.resultNo = 9;
            } else {

                var dif1 = 0, dif2 = 0, dif3 = 0, dif4 = 0, dif5 = 0, dif6 = 0, dif7 = 0, dif8 = 0, dif9 = 0;




                angular.forEach($scope.stepSts, function(value, key) {
                    dif1 += (value === 1 && result1[key] === 1) ? 5 : (value === 1 && result1[key] === -1) ? -100 : 0;
                    dif2 += (value === 1 && result2[key] === 1) ? 5 : (value === 1 && result2[key] === -1) ? -100 : 0;
                    dif3 += (value === 1 && result3[key] === 1) ? 5 : (value === 1 && result3[key] === -1) ? -100 : 0;
                    dif4 += (value === 1 && result4[key] === 1) ? 5 : (value === 1 && result4[key] === -1) ? -100 : 0;
                    dif5 += (value === 1 && result5[key] === 1) ? 5 : (value === 1 && result5[key] === -1) ? -100 : 0;
                    dif6 += (value === 1 && result6[key] === 1) ? 5 : (value === 1 && result6[key] === -1) ? -100 : 0;
                    dif7 += (value === 1 && result7[key] === 1) ? 5 : (value === 1 && result7[key] === -1) ? -100 : 0;
                    dif8 += (value === 1 && result8[key] === 1) ? 5 : (value === 1 && result8[key] === -1) ? -100 : 0;
                    dif9 += (value === 1 && result9[key] === 1) ? 5 : (value === 1 && result9[key] === -1) ? -100 : 0;


                    /*
                    dif1 += parseInt(Math.abs(value - result1[key]));
                    dif2 += parseInt(Math.abs(value - result2[key]));
                    dif3 += parseInt(Math.abs(value - result3[key]));
                    dif4 += parseInt(Math.abs(value - result4[key]));
                    dif5 += parseInt(Math.abs(value - result5[key]));
                    dif6 += parseInt(Math.abs(value - result6[key]));
                    dif7 += parseInt(Math.abs(value - result7[key]));
                    dif8 += parseInt(Math.abs(value - result8[key]));
                    dif9 += parseInt(Math.abs(value - result9[key]));
                    */

                });



                var candt = [];


                var minV = Math.max((dif1), (dif2), (dif3), (dif4), (dif5), (dif6), (dif7), (dif8), (dif9));

                if(minV === (dif1)) {
                    candt.push(1);
                }
                if(minV === (dif2)) {
                    candt.push(2);
                }
                if(minV === (dif3)) {
                    candt.push(3);
                }
                if(minV === (dif4)) {
                    candt.push(4);
                }
                if(minV === (dif5)) {
                    candt.push(5);
                }
                if(minV === (dif6)) {
                    candt.push(6);
                }
                if(minV === (dif7)) {
                    candt.push(7);
                }
                if(minV === (dif8)) {
                    candt.push(8);
                }
                if(minV === (dif9)) {
                    candt.push(9);
                }

                $scope.resultNo = candt[Math.floor((Math.random() * candt.length) + 1) - 1];
            };
        };

        /**
         * 마무리
         * @constructor
         */
        $scope.GoFinish = function() {

            $timeout(function() {

                // 분석중
                $scope.isLoading = true;
                $scope.GoAnalyze();
                $scope.curStep = 9999;

                $timeout(function() {


                    $scope.isLoading = false;
                    $scope.isFinished = true;
                    //$scope.stepSts[$scope.stepSts.length - 1] = 1;

                    $timeout(function() {
                        $scope.isCompleted1 = true;

                        $timeout(function() {
                            $scope.isCompleted2 = true;

                            $timeout(function() {
                                $scope.isCompleted3 = true;
                            }, 1000);
                        }, 1000);
                    }, 1000);

                }, 3000);
            }, 3000);
        };

        $scope.ConfirmGoHome = function() {
            $timeout(function() {
                $scope.isConfirm = true;
            }, 1000);
        };

        /**
         * 홈버튼
         * @constructor
         */
        $scope.GoHome = function(isSkip) {
            if(isSkip || confirm("첫화면으로 이동할까요?")) {
                $scope.GoPage(1);
                $scope.init();
            }
        };
    }]);