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
                    onPropertyChanged(key);
                }
            });
        })(props[index]);
    }

    var onPropertyChanged = function(propName){
        var events = propertyChangedEvents[propName];
        for(index in events){
            events[index]();
        }
    }

    var propertyChangedEvents = [];
    
    this.addPropertyChangedEvent = function(propName, f){
        if(props.indexOf(propName) < 0){
            return;
        }
        if(!propertyChangedEvents[propName]){
            propertyChangedEvents[propName] = [];
        }
        propertyChangedEvents[propName].push(f);
    }

    this.removePropertyChangedEvent = function(propName, f){
        if(props.indexOf(propName) < 0){
            return;
        }
        if(propertyChangedEvents[propName]){
            var index = propertyChangedEvents[propName].indexOf(f);
            if(index > -1){
                propertyChangedEvents[propName].splice(index, 1);
            }
        }
    }

    this.reset = function(){
        for(index in props) {
            this[props[index]] = 0;
        }
    }
}