// Budget Module
var budgetController = (function() {
    //Income FUnction constructor
    var Income = function (id, description, value) {

        this.description = description;
        this.value = value;
    };

    var Expense = function (expenseType, expenseValue) {
        this.expenseType = expenseType,
        this.expenseValue = expenseValue
    };
    return {
        incomeConstructor: Income,
        expenseConstructor: Expense
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
                type: document.querySelector(DOMstrings.inputType).value,
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
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function (event) {

            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    }

    var ctrlAddItem = function () {
        //1. get the input items 
        var input = UIctrl.getInput();
        // if(DOM.inputType == 'inc'){
        //     var check1 = budgetCtrl.incomeConstructor;
        //     var income1 
        // }
        // if(DOM.inputType == 'exp'){
        //     var check2 = budgetCtrl.expenseConstructor;
        // }
        
        
        //2.add item to budgetController
        

        //3.add item to UIController

        //4.calculate budget

        //5.display the budget on the UI
    };
    return {
        init: function () {
            console.log("App started");
            setEventListener();
        }
    }

   

})(budgetController, UIController);

controller.init();