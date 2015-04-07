statisticBinding = function(statistic){
    var statistic = statistic;
    var bindStatisticProperty = function(name){
        var val = statistic[name];
        switch (name){
            case "lastChecked":
                $("#checkedCount").text(val);
                break;
            case "primes":
                $("#primesCount").text(val);
                break;
            case "ranTimes":
                $("#ranTimes").text(val + " times");
                break;
            case "totalTime":
                $("#totalTime").text(val);
                break;
            case "maxTime":
                $("#maxTime").text(val);
                break;
            case "minTime":
                $("#minTime").text(val);
                break;
        }
    }

    var bind = function(){
        var names = Object.getOwnPropertyNames(statistic);
        for(index in names){
            bindStatisticProperty(names[index]);
        }
    }

    bind();

    var observer = function(changes){
        changes.forEach(function(change, i) {
            if(change.type != 'update'){
                return;
            }
            bindStatisticProperty(change.name);
        });
    }

    Object.observe(statistic, observer);
}