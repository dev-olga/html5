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