//statisticService = function(){
//
//    this.KEYS = {
//        STATE: "state",
//        LAST_CHECKED: "lastChecked",
//        PRIMES: "primes",
//        RAN_TIMES: "ranTimes",
//        TOTAL_TIME: "totalTime",
//        MAX_TIME: "maxTime",
//        MIN_TIME: "minTime"
//    }
//
//    var statistic = {
//        state: "Stopped",
//        lastChecked: 0,
//        primes: 0,
//        ranTimes: 0,
//        totalTime: 0,
//        maxTime: 0,
//        minTime: 0
//    }
//
//    this.update = function(key, value){
//        localStorage[key] = value;
//        statistic[key] = value;
//
//    }
//
//    this.get = function(key){
//        return statistic[key];
//    }
//
//    this.init = function(observer){
//        if(observer) {
//            Object.observe(statistic, observer);
//        }
//        load();
//    }
//
//    var load = function(){
//        this.KEYS.forEach(function(key, i){
//            statistic[key] = localStorage[key];
//        });
//    }
//
//    load();
//};

//Statistic = function(){
//    var _state;
//    var _lastChecked;
//    var _primes;
//    var _ranTimes;
//    var _totalTime;
//    var _maxTime;
//    var _minTime;
//
//    this.state = "";
//    this.lastChecked = 0;
//    this.primes = 0;
//    this.ranTimes = 0;
//    this.totalTime = 0;
//    this.maxTime = 0;
//    this.minTime = 0;
//
//    var self = this;
//    for(key in this){
//        (function(key) {
//            self.__defineGetter__(key, function () {
//                if(localStorage[key]) {
//                    return JSON.parse(localStorage[key]);
//                }
//                else{
//                    return undefined;
//                }
//            });
//
//            self.__defineSetter__(key, function (val) {
//                localStorage[key] = JSON.stringify(val);
//                self["_" + key] = val;
//            });
//        })(key);
//
//    };
//
//}

Statistic = function(){
    var self = this;
    var props = ['lastChecked', 'primes', 'ranTimes', 'totalTime', 'maxTime', 'minTime'];
    for(index in props){
        (function(key) {
            Object.defineProperty(self, key, {
                get: function () {
                    if(localStorage[key]) {
                        return JSON.parse(localStorage[key]);
                    }
                    else{
                        return 0;
                    }
                },
                set: function (val) {
                    var oldVal = self[key];
                    localStorage[key] = JSON.stringify(val);
                    Object.getNotifier(this).notify({
                        type: 'update',
                        name: key,
                        oldValue: oldVal
                    });
                }
            });
        })(props[index]);
    }
}