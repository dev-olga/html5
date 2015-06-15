bindingCommands = function(app){
    $("#start-search").click(function(){
        if(app.isRunning){
            $(this).val("Start");
            app.stop();
        }
        else {
            $(this).val("Stop");
            app.start();
        }
    });

    var numbersListTable;
    $("#show-found").click(function(){
        app.getFoundNumbers(function(list){
            var out = [];
            for(var i=0; i<list.length; i++){
                out.push([list[i]]);
            }
            if(numbersListTable){
                numbersListTable.destroy();
            }
            numbersListTable = $('#numbers-list').DataTable( {
                "data": out,
                "columns": [
                    { "title": "Numbers" }
                ]
            } );
        });
    })

    $("#show-image").click(function(){
        app.getFoundNumbers(function(list){
            var size = Math.ceil(Math.sqrt(list.length));

            var c = $("#canvas")[0];
            var scale = 5;
            c.width = c.height = size * scale;

            var ctx = c.getContext("2d");
            ctx.scale(scale,scale);

            // Clear
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(0, 0, size, size);

            // Draw
            for(var i=0; i<size; i++){
                for(var j=0; j<size; j++){
                    if(list.indexOf(i*size+j+1) > -1){
                        ctx.fillStyle = "#000000";
                    }
                    else{
                        ctx.fillStyle = "#FFFFFF";
                    }
                    ctx.fillRect(j, i, 1, 1);
                }
            }

            $(c).show();
        });
    });
}

bindingStatistic = function(statistic){
    var statistic = statistic;

    $("#checkedCount").text(statistic.lastChecked);
    $("#primesCount").text(statistic.primes);
    $("#ranTimes").text(statistic.ranTimes);
    $("#totalTime").text(statistic.totalTime);
    $("#maxTime").text(statistic.maxTime);
    $("#minTime").text(statistic.minTime);

    statistic.addPropertyChangedEvent("lastChecked", function(){
        $("#checkedCount").text(statistic.lastChecked);
    });
    statistic.addPropertyChangedEvent("primes", function(){
        $("#primesCount").text(statistic.primes);
    });
    statistic.addPropertyChangedEvent("ranTimes", function(){
        $("#ranTimes").text(statistic.ranTimes);
    });
    statistic.addPropertyChangedEvent("totalTime", function(){
        $("#totalTime").text(statistic.totalTime);
    });
    statistic.addPropertyChangedEvent("maxTime", function(){
        $("#maxTime").text(statistic.maxTime);
    });
    statistic.addPropertyChangedEvent("minTime", function(){
        $("#minTime").text(statistic.minTime);
    });
}

//bindingStatistic = function(statistic){
//    var statistic = statistic;
//    var bindStatisticProperty = function(name){
//        var val = statistic[name];
//        switch (name){
//            case "lastChecked":
//                $("#checkedCount").text(val);
//                break;
//            case "primes":
//                $("#primesCount").text(val);
//                break;
//            case "ranTimes":
//                $("#ranTimes").text(val + " times");
//                break;
//            case "totalTime":
//                $("#totalTime").text(val);
//                break;
//            case "maxTime":
//                $("#maxTime").text(val);
//                break;
//            case "minTime":
//                $("#minTime").text(val);
//                break;
//        }
//    }
//
//    var bind = function(){
//        var names = Object.getOwnPropertyNames(statistic);
//        for(index in names){
//            bindStatisticProperty(names[index]);
//        }
//    }
//
//    bind();
//
//    var observer = function(changes){
//        changes.forEach(function(change, i) {
//            if(change.type != 'update'){
//                return;
//            }
//            bindStatisticProperty(change.name);
//        });
//    }
//
//    Object.observe(statistic, observer);
//}