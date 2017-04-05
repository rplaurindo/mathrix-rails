(function ($) {
    "use strict";

    try {
        Object.defineProperties($, {

            // talves seja interessante fazer uma rotina para o carregamento de uma da lib js, de forma que seja verificado previamente, varrendo-se a tag head, se o script já não se encontra carregado.

            // Para apenas dois números o Algorítmo de Euclides é mais rápido, que pode ser usado recursivamente
            // greatest common divisor
            gcd: {
                value: function () {
                    var
                        numbers = [],
                        commonFactors = [],
                        smallerFactorsHash = {},
                        count = 0,
                        i = 0,
                        smallerCommonProduct = 1;

                    for(i in arguments) {
                        if(arguments.hasOwnProperty(i)) {
                            numbers.push(parseFloat(arguments[i]));
                        }
                    }

                    numbers = numbers.asc();
                    numbers = numbers.uniq();
                    if(numbers.length == 1) {
                        return numbers[0];
                    }

                    // dois números primos nunca serão múltiplos entre si
                    i = 0;
                    while(true) {
                        if((numbers[i]).isPrime()) {count++;}
                        if(count >= 2) {return 1;}
                        if(i == numbers.length -1) {break;}
                        i++;
                    }

                    if(numbers.areMultiples()) {return numbers.min();}

                    numbers.map(function (v) {
                        numbers.push(v.primeFactors());
                    });

                    commonFactors = numbers.intersection();

                    if(commonFactors) {
                        numbers.map(function (a) {
                            commonFactors.map(function (v) {
                                if(!smallerFactorsHash[v]) {
                                    smallerFactorsHash[v] = a.count(v);
                                } else {
                                    if(a.count(v) < smallerFactorsHash[v]) {
                                        smallerFactorsHash[v] = a.count(v);
                                    }
                                }
                            });
                        });
                    } else {
                        return [];
                    }

                    for(i in smallerFactorsHash) {
                        if (smallerFactorsHash.hasOwnProperty(i)) {
                                smallerCommonProduct *= Math.pow(i, smallerFactorsHash[i]);
                        }
                    }

                    return smallerCommonProduct;
                }
            },

            // least common multiple
            lcm: {
                value: function () {
                    var
                        numbers = [],
                        commonFactors = [],
                        nonCommonfactors = [],
                        biggerFactorsHash = {},
                        i = 0,
                        biggerCommonProduct = 1,
                        noCommonFactors = 1;

                    for(i in arguments) {
                        if(arguments.hasOwnProperty(i)) {
                            numbers.push(parseFloat(arguments[i]));
                        }
                    }

                    numbers = numbers.asc();
                    numbers = numbers.uniq();
                    if(numbers.length == 1) {
                        return numbers[0];
                    }

                    if(numbers.areMultiples()) {return numbers.max();}

                    numbers.map(function (v) {
                        numbers.push(v.primeFactors());
                    });

                    commonFactors = numbers.intersection();

                    numbers.map(function (a) {
                        commonFactors.map(function (v) {
                            if(!biggerFactorsHash[v]) {
                                biggerFactorsHash[v] = a.count(v);
                            } else {
                                if(a.count(v) > biggerFactorsHash[v]) {
                                    biggerFactorsHash[v] = a.count(v);
                                }
                            }
                        });
                    });

                    for(i in biggerFactorsHash) {
                        if (biggerFactorsHash.hasOwnProperty(i)) {
                                biggerCommonProduct *= Math.pow(i, biggerFactorsHash[i]);
                        }
                    }

                    // JSON.parse("[" + string + "]");
                    nonCommonfactors = numbers.join().split(',').map(Number).uniq()
                    .difference(commonFactors);

                    nonCommonfactors.map(function (v) {
                        noCommonFactors *= v;
                    });

                    return biggerCommonProduct * noCommonFactors;
                }
            }

        });

    } catch(e) {}

})(Math);