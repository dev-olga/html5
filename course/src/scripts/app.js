app = function(){
    var service;
    var worker;
    var timer;
    var startTime;

    var statistic = new Statistic();

    this.isRunning = false;

    this.init = function(){
        if(!service){
            service = new primeNumbersService();
            service.init();
        }
        bindingStatistic(statistic);
        bindingCommands(this);
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

        if(!worker) {
            checkNext();
        }
    }
    
    this.getFoundNumbers = function(callback){
        readAll(callback);
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