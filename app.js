// Budget Module
var budgetController = (function() {
    //Income FUnction constructor
    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    //Expense FUnction constructor
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    //Storing all instances of the constructors and their totals
    var data = {
        allItems: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        }
        
    }; 

    return {
        addNewItem: function(type, des, val){
            var newItem, ID;
              
            // Create new ID
            if(data.allItems[type].length > 0 ){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else{
                ID = 0;
            }
            
            // Create new item based on "inc" or "exp"
            if(type == 'inc'){
                newItem = new Income(ID, des, val);
            }
            else if (type == 'exp') {
                newItem = new Income(ID, des, val);
            }
            
            // Push 
            data.allItems[type].push(newItem);

            // Returnnew Item
            return newItem;
        },

        testing: function(){
            console.log(data);
        }
    }
    


})();
 


// UI Module
var UIController = (function() {
    //1. get the input items
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    }

     
    return {
        getInput: function(){
            return {
                type: document.querySelector(DOMstrings.inputType).value, // it will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            }
        },

        getDOMstrings: function(){
            return DOMstrings;
        } 
    }
})();


// Global Controller Module
var controller = (function(budgetCtrl, UIctrl) {

    var setEventListener = function() {
        var DOM = UIctrl.getDOMstrings();
        //Btn click
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        //key press
        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    }

    var ctrlAddItem = function () {
        var input, newItem;
        //1. get the input items 
        input = UIctrl.getInput();
        
        //2.add item to budgetController
        newItem = budgetCtrl.addNewItem(input.type, input.description, input.value);

        //3.add item to UIController

        //4.calculate budget

        //5.display the budget on the UI
    };
    return {
        // Iitialization Function
        init: function () {
            console.log("App started");
            setEventListener();
        }
    }

   

})(budgetController, UIController);

controller.init();