app = function(){
    var service;
    var worker;
    var timer;
    var barsTimer;
    var startTime;

    var statistic = new Statistic();
    var bars = new Bars();

    this.isRunning = false;

    this.init = function(){
        var self = this;
        var errors = checkRequirements();
        if(errors.length > 0) {
            if (this.onBrowserError) {
                this.onBrowserError(errors);
            }
            return;
        }
        if(!service){
            service = new PrimeNumbersService();
            service.onInit = function(){
                bindingCommands(self);
                bindingNavigation(self);
            };
            service.init();
        }

        bindingStatistic(statistic);
        bars.draw();
    }

    this.stop = function(){
        this.isRunning = false;
        try{
            resetWorker();
            clearInterval(timer);
        }
        catch (ex){
            alert(ex);
        }

        var executionTime = Math.round(((new Date()) - startTime)/1000);
        if(statistic.maxTime < executionTime){
            statistic.maxTime = executionTime;
        }
        if(statistic.minTime == 0 || statistic.minTime > executionTime){
            statistic.minTime = executionTime;
        }
        startTime = undefined;

    }

    this.start = function(){
        this.isRunning = true;
        statistic.ranTimes += 1;
        startTime = new Date();
        timer = setInterval(function(){statistic.totalTime += 1;}, 1000);
        startBarsUpdate();

        if(!worker) {
            checkNext();
        }
    }

    this.getFoundNumbers = function(callback){
        readAll(callback);
    }

    this.clear = function(){
        service.clear();
        statistic.reset();
    }

    var startBarsUpdate = function(){
        if(barsTimer){
            return;
        }
        var primesCount = statistic.primes;
        barsTimer = setInterval(function(){
            var primes = statistic.primes;
            bars.pushItem(primes - primesCount);
            primesCount = primes;

        }, 5000);
    }

    var checkRequirements = function(){
        var errors = [];
        var indexedDBSupported = !!(indexedDB || mozIndexedDB || webkitIndexedDB || msIndexedDB);
        if(!indexedDBSupported){
            errors.push("IndexedDB")
        }
        var canvas2DSupported = !!window.CanvasRenderingContext2D;
        if(!canvas2DSupported){
            errors.push("Canvas 2D graphics")
        }
        var workerSupport = typeof(Worker) !== "undefined";
        if(!workerSupport){
            errors.push("Background worker");
        }
        return errors;
    }

    var resetWorker = function(){
        if(worker) {
            worker.terminate();
            worker = undefined;
        }
    }

    var checkNext = function(){
        worker = createWorker();
        if (worker) {
            var number = statistic.lastChecked;
            if(number){
                number = number + 1;
            }
            else{
                number = 2;
            }
            worker.postMessage({
                number: number
            });
            worker.onmessage = function (event) {
                resetWorker();
                
                if (!event.data.error && event.data.isPrime) {
                    service.add(number);
                    if(statistic.primes === undefined){
                        statistic.primes = 0;
                    }
                    statistic.primes += 1;
                }
                statistic.lastChecked = number;
                checkNext();
            };
        }
    }

    var createWorker = function(){
        return new Worker("scripts/checkNumber.js");
    }
    
    var readAll = function(callback){
        var list = [];
        var cursor = service.getCursor();
        cursor.onsuccess = function(e) {
            var res = e.target.result;
            if(res) {
                list.push(res.value);
                res.continue();
            }
            else{
                callback(list)
            }
        }
        cursor.onerror = function(e) {
            callback(list);
        }
    }

}