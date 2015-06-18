importScripts('prime-numbers-service.js')
function check(number){
    var service = new PrimeNumbersService();
    var msg = {
        error: false,
        isPrime: true
    }
    service.onInit = function() {
        var cursor =service.getCursor();
        cursor.onsuccess = function(e) {
            var res = e.target.result;
            if(res) {
                if(!(number % res.value == 0)) {
                    res.continue();
                }
                else {
                    msg.isPrime = false;
                    postMessage(msg);
                }
            }
            else{
                postMessage(msg)
            }
        }
        cursor.onerror = function(e) {
            msg.error = true;
            postMessage(msg)
        }
    }
    service.onError = function() {
        msg.error = true;
        postMessage(msg)
    }
    service.init();
}

addEventListener("message", function (message) {
    check(message.data.number);
}, false);


