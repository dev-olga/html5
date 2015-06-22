Bars = function(){

    var self = this;
    var settings = {
        canvasId: "bars",
        color: "#337ab7",
        data: [],
        dataSize: 12,
        barWidth: 20,
        gap: 1,
        height: 250
    };
    var data = [];
    var canvas;

    this.init = function(options){
        $.extend(settings, options);

        for(var i=0; i<settings.dataSize-settings.data; i++ ){
            data.push(0);
        }
        for(var i=0; i<settings.data.length; i++ ){
            data.push(settings.data[i]);
        }

        canvas = $("#" + settings.canvasId)[0];
        canvas.width = settings.dataSize * (settings.barWidth + settings.gap);
        canvas.height = settings.height;
    };

    this.draw = function(){
        clear();
        var max = Math.max.apply(null, data);
        var unitHeight = max>0 ? Math.floor(canvas.height/max) : 0;

        var ctx = canvas.getContext("2d");
        var x = 0;
        for(var i=0; i< settings.dataSize; i++){
            var value = Math.max(data[i], 0);
            var barHeight = value * unitHeight + 1;

            ctx.fillStyle = settings.color;
            ctx.fillRect(x, canvas.height - barHeight, settings.barWidth, barHeight);
            ctx.fillStyle = "#FFF";
            ctx.textBaseline = "top";
            if(value > 0) {
                ctx.fillText(value, x, canvas.height - barHeight);
            }
            x += settings.barWidth;
            ctx.fillRect(x, canvas.width - 1, settings.gap, 1);
            x += settings.gap;
        }
    };

    this.pushItem = function(item){
        data.splice(0, 1);
        data.push(item);
        self.draw();
    };

    var clear = function(){
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

};
