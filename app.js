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
            if(type === 'inc'){
                newItem = new Income(ID, des, val);
            }
            else if (type === 'exp') {
                newItem = new Income(ID, des, val);
            }
            
            // Push it to our data structure
            data.allItems[type].push(newItem);

            // Return the new element created
            return newItem;
        },

        calculateBudget: function(type, value) {
            if(type == 'inc'){
                totals[type] = totals[type] + value;
            }
            else if(type =='exp'){
                totals[type] = totals[type] + value;                
            }
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
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    }

     
    return {
        // Get the input values when the user clicks the add btn
        getInput: function(){
            return {
                type: document.querySelector(DOMstrings.inputType).value, // it will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            }
        },

        // To add new Items to DOM
        addNewItemToDOM: function(obj, type) {
            var html, newHtml, element;
            // var income = document.querySelector('.item__description').innerHTML = budgetCtrl.addNewItem().newItem.description;
           
           
            // 1. Create an HTMLstring with placeholder text
            if(type === 'inc'){
                element = DOMstrings.incomeContainer;
                html = ' <div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete">   <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }else if(type === 'exp'){
                element = DOMstrings.expensesContainer;
                html = ' <div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // 2. Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);
            
            // 3. Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml)
            
        },
        //then clear input fields
        clearFields: function () {
            var fields, fieldsArray;
            fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue);

            fieldsArray = Array.prototype.slice.call(fields);

            fieldsArray.forEach(function(current, index, array) {
                current.value = "";   
            });

            fieldsArray[0].focus();
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
        var input, newItem, totalBudget;
        //1. get the inputs value from DOM 
        input = UIctrl.getInput();
        
        //2.add item to budgetController
        newItem = budgetCtrl.addNewItem(input.type, input.description, input.value);
        budgetCtrl.testing();
        
        //3.add item to UIController
        UIController.addNewItemToDOM(newItem, input.type);

        // 4. Clearing input fields
        UIController.clearFields();


        //5.calculate budget
        totalBudget = budgetCtrl.calculateBudget(input.type, input.value);
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