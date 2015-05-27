primeNumbersService = function(){

    var self =this;
    var db;
    var TABLE_NAMES = {
        PrimeNumbers: "primeNumbers"
    }

    this.init = function(){
        indexedDB = indexedDB || mozIndexedDB || webkitIndexedDB || msIndexedDB;

        if(!indexedDB)
        {
            console.log("Your Browser does not support IndexedDB");
        }
        //var request = indexedDB.open("numbersDB", 1.1);
        var request = indexedDB.open("numbersDB");

        request.onerror = function(event){
            if(self.onError){
                self.onError();
            }
        }

        request.onupgradeneeded   = function(event){
            db = event.target.result;
            var objectStore = db.createObjectStore(TABLE_NAMES.PrimeNumbers);
        };

        request.onsuccess  = function(event){
            db = event.target.result;

            if(self.onInit){
                self.onInit();
            }
        }
    }

    this.onInit = function(){}
    this.onError = function(){}

    this.add = function(value){
        if(db){
            var transaction = db.transaction([TABLE_NAMES.PrimeNumbers], "readwrite");
            var objectStore = transaction.objectStore(TABLE_NAMES.PrimeNumbers);
            objectStore.add(value, value);
        }
    }

    this.getCursor = function () {
        if(db){
            var transaction = db.transaction([TABLE_NAMES.PrimeNumbers], "readonly");
            var objectStore = transaction.objectStore(TABLE_NAMES.PrimeNumbers);
            var cursor = objectStore.openCursor();
            return cursor;
        }
    }
};
