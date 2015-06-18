Map = function(){

    this.settings = {
        data: [],
        scale: 1,
        canvasId: "map-canvas"
    };

    this.init = function(options){
        $.extend(this.settings, options);
    }

    this.draw = function(){
        var c = $("#" + this.settings.canvasId)[0];
        var list = this.settings.data;
        var scale = this.settings.scale;

        var size = Math.ceil(Math.sqrt(list.length));
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
    };

}
