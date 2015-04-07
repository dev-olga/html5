app = function(){
    var service;
    var worker;
    var timer;
    var startTime;

    var statistic = new Statistic();
    new statisticBinding(statistic);

    this.isRunning = false;

    this.stop = function(){
        this.isRunning = false;
        resetWorker();

        var executionTime = Math.round(((new Date()) - startTime)/1000);
        if(statistic.maxTime < executionTime){
            statistic.maxTime = executionTime;
        }
        if(statistic.minTime == 0 || statistic.minTime > executionTime){
            statistic.minTime = executionTime;
        }
        startTime = undefined;
        clearInterval(timer);
    }

    this.start = function(){
        this.isRunning = true;
        statistic.ranTimes += 1;
        startTime = new Date();
        timer = setInterval(function(){statistic.totalTime += 1;}, 1000);

        if(!worker) {
            if(!service){
                service = new primeNumbersService();
                service.onInit = function() {
                    checkNext();
                }
                service.init();
            }
            else {
                checkNext();
            }
        }
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
                if (!event.data.error && event.data.isPrime) {
                    service.add(number);
                    if(statistic.primes === undefined){
                        statistic.primes = 0;
                    }
                    statistic.primes += 1;
                }

                resetWorker();
                statistic.lastChecked = number;
                checkNext();
            };
        }
    }

    var createWorker = function(){
        return new Worker("scripts/checkNumber.js");
    }

}