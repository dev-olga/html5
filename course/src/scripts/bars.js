Bars = function(options){

    var self = this;
    var settings = {
        canvasSelector: "#bars",
        color: "#337ab7",
        dataSize: 10,
        barWidth: 20,
        gap: 1,
        unitHeight: 5,
        height: 250,
        data: []
    };

    $.extend(settings, options);
    var data = [];
    for(var i=0; i<settings.dataSize-settings.data; i++ ){
        data.push(0);
    }
    for(var i=0; i<settings.data.length; i++ ){
        data.push(settings.data[i]);
    }

    var c = $(settings.canvasSelector)[0];
    c.width = settings.dataSize * (settings.barWidth + settings.gap);
    c.height = settings.height;

    var clear = function(){
        var ctx = c.getContext("2d");
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, c.width, c.height);
    };

    this.draw = function(){
        clear();
        var unitHeight = settings.unitHeight;
        var max = Math.max.apply(null, data);
        if(c.height < max * unitHeight){
            unitHeight = Math.floor(c.height/max);
        }
        var ctx = c.getContext("2d");
        var x = 0;
        for(var i=0; i< settings.dataSize; i++){
            var value = 0;
            if(i<data.length){
                value = data[i];
            }
            var barHeight = value * unitHeight + 1;

            ctx.fillStyle = settings.color;
            ctx.fillRect(x, c.height - barHeight, settings.barWidth, barHeight);
            ctx.fillStyle = "#FFF";
            ctx.textBaseline = "top";
            if(value > 0) {
                ctx.fillText(value, x, c.height - barHeight);
            }
            x += settings.barWidth;
            ctx.fillRect(x, c.width - 1, settings.gap, 1);
            x += settings.gap;
        }
    }

    this.pushItem = function(item){
        data.splice(0, 1);
        data.push(item);
        self.draw();
    }
}
