(function ($) {
    "use strict";


    try {
        Object.defineProperties($, {

            // greatest common divisor
            GCD: {
                value: function () {
                    var
                        iterator,
                        primeFactor = 2,
                        product = 1,
                        i = 0,
                        amount = 0,
                        remains = [],

                        everyoneAreMultipleOf = function (remains, factor) {
                            var
                                i = 0;

                            while(i < remains.length) {
                                if (!remains[i++].multipleOf(factor)) {
                                    return false;
                                }
                            }

                            return true;
                        },

                        callback = function (r) {
                            primeFactor = iterator.primeFactor();
                            if(everyoneAreMultipleOf(r, primeFactor)) {
                                product *= primeFactor;
                            }
                        },

                        euclidesAlgorithm = function (a, b) {
                            var
                                rest = b;

                            while(rest !== 0) {
                               rest = a % b;
                               a = b;
                               b = rest;
                            }

                            return a;
                        };

                    remains = Array.from(arguments);
                    remains = remains.uniq();
                    if(remains.length == 1) {
                        return remains[0];
                    }

                    // properties

                    // se todos os números forem múltiplos entre si, o MDC será menor deles
                    if(remains.areMultiples()) {
                        return remains.min();
                    }

                    // o algorítmo de Euclides é mais eficiente para calcular o MDC entre apenas dois números
                    if(remains.length == 2) {
                        return euclidesAlgorithm(remains[0], remains[1]);
                    }

                    // dois números primos não são múltiplos entre si
                    i = 0;
                    while(true) {
                        if((remains[i]).isPrime()) {amount++;}
                        if(amount >= 2) {return 1;}
                        if(i == remains.length -1) {break;}
                        i++;
                    }

                    iterator = Math.PrimeFactorsDecomposition.Proxy
                        .new(remains);
                    iterator.decompose(callback);

                    return product;
                }
            },

            // least common multiple
            LCM: {
                value: function () {
                    var
                        iterator,
                        primeFactor = 2,
                        remains = [],
                        product = 1,

                        callback = function () {
                            primeFactor = iterator.primeFactor();
                            product *= primeFactor;
                        },

                        for2Factors = function (numbers) {
                            var
                                product = 1,

                                callback = function (v) {
                                    product *= v;
                                };

                            numbers.forEach(callback);

                            return product/Math.GCD.apply(null, numbers);
                        };

                    remains = Array.from(arguments);
                    remains = remains.uniq();
                    if(remains.length == 1) {
                        return remains[0];
                    }

                    if(remains.areMultiples()) {
                        return remains.max();
                    }

                    if(remains.length == 2) {
                        return for2Factors(remains);
                    }

                    iterator = Math.PrimeFactorsDecomposition.Proxy
                        .new(remains);
                    iterator.decompose(callback);

                    return product;
                }
            }

        });

    } catch(e) {}

})(Math);
