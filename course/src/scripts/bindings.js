Bindings = function(){
    var map = new Map();
    map.init();

    this.bindingNavigation = function(app) {
        $("#navigation a").click(function (e) {
            window.location.hash = e.target.hash;
        });

        var numbersListTable;
        $('#navigation a[href="#list"]').on("shown.bs.tab", function (e) {
            app.getFoundNumbers(function(list){
                var out = [];
                for(var i=0; i<list.length; i++){
                    out.push([list[i]]);
                }
                if(numbersListTable){
                    numbersListTable.destroy();
                }
                numbersListTable = $("#numbers-list").DataTable( {
                    "data": out,
                    "columns": [
                        { "title": "Numbers" }
                    ]
                } );
            });
        });

        $('#navigation a[href="#map"]').on('shown.bs.tab', function (e) {
            app.getFoundNumbers(function(list){
                map.settings.data = list;
                map.draw();
            });
        });

        if (location.hash !== '') {
            $('#navigation a[href="' + location.hash + '"]').tab('show');
        }
    };

    this.bindingCommands = function(app){
        var toggleSearchSel =$("#toggle-search");
        toggleSearchSel.click(function(){
            if(app.isRunning){
                $(this).val("Start");
                $(this).removeClass("btn-danger");
                $(this).addClass("btn-primary");
                app.stop();
            }
            else {
                $(this).val("Stop");
                $(this).removeClass("btn-primary");
                $(this).addClass("btn-danger");
                app.start();
            }
        });

        $("#clear-data").click(function(){
            if(app.isRunning){
                toggleSearchSel.trigger('click');
            }
            app.clear();
            $("#info-dialog").modal();
        });

        $( "#scale-value" ).text(1);
        $("#scale-slider").slider({
            value: 1,
            min: 1,
            max: 10,
            step: 1,
            slide: function( event, ui ) {
                $( "#scale-value" ).text(ui.value);
                map.settings.scale = ui.value;
                map.draw();
            }
        });
    };

    this.bindingStatistic = function(statistic){
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
    };

    this.bindBars = function(bars){
        bars.init({
            canvasId: "bars-canvas"
        })
    }
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