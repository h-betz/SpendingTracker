const month_map = new Map();
month_map.set(0, "January");
month_map.set(1, "February");
month_map.set(2, "March");
month_map.set(3, "April");
month_map.set(4, "May");
month_map.set(5, "June");
month_map.set(6, "July");
month_map.set(7, "August");
month_map.set(8, "September");
month_map.set(9, "October");
month_map.set(10, "November");
month_map.set(11, "December");

//Populates the category list with the given categories
function populateCategoryList(categories) {
    for (var i = 0; i < categories.length; i++) {
        var category = categories[i];
        appendToCategoryList(category.fields.name);
    }
}

//Function called when user adds a new category
function addCategory() {
    var categoryName = document.getElementById('category-input').value;
    appendToCategoryList(categoryName);
}

//Appends category to the list of categories
function appendToCategoryList(categoryName) {
    var div = document.getElementById("category-list");
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.appendChild(document.createTextNode(categoryName))
    a.onclick = function() {activeCategory(a.text)};
    a.setAttribute('class', 'list-group-item list-group-item-action');
    a.setAttribute('id', a.text);
    div.appendChild(a);
    document.getElementById('category-input').value = '';    
    postCategoryName(categoryName);
    return false;
}

// Gets the selected category
function activeCategory(text) {
    resetTable();
    resetPastYears();
    addPastExpenseOption(text);    
    resetActiveCategory();
    getExpenses(text);
    addTotal();    
    var header = document.getElementById('dash-head');
    var a = document.getElementById(text);
    a.className += " active";
    header.innerText = text;    
}

//Resets the active category to be inactive
function resetActiveCategory() {
    $('#category-list').find('a').each(function(){
        $(this).attr('class', 'list-group-item list-group-item-action');
    });
}

// Clears expense table
function resetTable() {
    $("#expense-table-body tr").remove(); 
}

//Clears out the Past expenses list
function resetPastYears() {
    $("#accordion").empty(); 
}

// Creates a table row for an expense
function createExpenseRow(formObj) {
    var tr = document.createElement('tr');
    tr.setAttribute('scope', 'row');

    /** 
     * Create table cells
     */
    var deleteButtonTd = document.createElement('td');
    var descriptionTd = document.createElement('td');
    var amountTd = document.createElement('td');
    var dateTd = document.createElement('td');

    /**
     * Format delete button
     */
    var deleteButton = document.createElement('button');
    deleteButton.appendChild(document.createTextNode('Delete'));
    deleteButton.onclick = function() { deleteExpense(this.parentElement.parentElement) };
    deleteButtonTd.appendChild(deleteButton);

    /**
     * Format expense info
     */
    descriptionTd.appendChild(document.createTextNode(formObj.get('description')));
    descriptionTd.setAttribute("class", "description");
    amountTd.appendChild(document.createTextNode(formObj.get('amount')));
    amountTd.setAttribute("class", "amount");
    dateTd.appendChild(document.createTextNode(formObj.get('date')));
    dateTd.setAttribute("class", "date");

    tr.appendChild(deleteButtonTd);
    tr.appendChild(descriptionTd);
    tr.appendChild(amountTd);
    tr.appendChild(dateTd);

    return tr;
}

function populateExpenseList(expenses) {
    var data = new Map();
    var table = document.getElementById('expense-table-body');
    var total = 0;
    //TODO populate the expense table
    for (var i = 0; i < expenses.length; i++) {
        var values = expenses[i].fields;
        data.set('description', values.description);
        data.set('amount', values.amount);
        total += +values.amount;
        data.set('date', values.date);
        var tr = createExpenseRow(data);
        table.appendChild(tr);
    }
    setTotal(total);
}

//Adds the user input from the expense form
function addExpense() {
    var formObj = new Map();
    var inputs = $('#expenseForm').serializeArray();
    $.each(inputs, function (i, input) {
        formObj.set(input.name, input.value);
        input.value = '';
    });

    document.getElementById('expenseForm').reset();
    
    var categoryName = document.getElementById('dash-head').innerText;
    var table = document.getElementById('expense-table-body');
    var tr = createExpenseRow(formObj);
    
    postExpense(formObj);
    
    table.appendChild(tr);

    updateTotal(formObj.get('amount'));

    return false;
}

// Deletes the selected expense row
function deleteExpense(parentElement) {
    var amount = 0;
    $(parentElement).find('td.amount').each(function() {
        amount = +$(this).text() * -1;
    });
    var expenseDetails = new Map();
    $(parentElement).find('td').each(function() {
        if ($(this).attr('class') != null) {
            expenseDetails.set($(this).attr('class'), $(this).text());
        }
    });
    console.log(expenseDetails);
    deleteExpensePOST(expenseDetails, parentElement.rowIndex - 1, amount);
    //table.deleteRow(parentElement.rowIndex - 1);
    //updateTotal(amount);
}

//Sends the user input to the server to add a new category
function postCategoryName(categoryName) {
    var csrftoken = Cookies.get('csrftoken');
    var data = new Map();    
    data.set('command', 'Add Category');    
    data.set('category', categoryName);
    data = mapToJson(data);
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8000/dashboard/api/",
        data: data,
        datatype: 'json',
        success: function(data){
            console.log("success");
        },
        failure: function(data){
            console.log("failure");
            console.log(data);
        },
    });
}

//Sends the user input to the server to add a new expense
function postExpense(expenseDetails) {
    var categoryName = document.getElementById('dash-head').innerText;
    var csrftoken = Cookies.get('csrftoken');
    expenseDetails.set('command', 'Add Expense');
    expenseDetails.set('category', categoryName);
    data = mapToJson(expenseDetails);
    
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8000/dashboard/api/",
        data: data,
        datatype: 'json',
        success: function(data){
            console.log("success");
        },
        failure: function(data){
            console.log("failure");
        },
    });
}

//Retrieves the categories associated with this user
function getCategories() {
    var data = new Map();
    data.set('command', 'Get Categories');
    data = mapToJson(data);
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8000/dashboard/api/",
        data: data,
        datatype: 'json',
        success: function(data){
            console.log("success");
            populateCategoryList(data);
        },
        failure: function(data){
            console.log("failure");
        },
    });
}

//Get the user's expenses for this category
function getExpenses(categoryName) {
    var data = new Map();
    data.set('command', 'Get Expenses');
    data.set('category', categoryName);
    data = mapToJson(data);
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8000/dashboard/api/",
        data: data,
        datatype: 'json',
        success: function(data){
            console.log("success");
            populateExpenseList(data);
        },
        failure: function(data){
            console.log("failure");
        },
    });
}

function deleteExpensePOST(expenseDetails, row, amount) {
    var data = new Map();
    var categoryName = document.getElementById('dash-head').innerText;
    expenseDetails.set('command', 'Delete Expense');
    expenseDetails.set('category', categoryName);
    data = mapToJson(expenseDetails);
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8000/dashboard/api/",
        data: data,
        datatype: 'json',
        success: function(data){
            console.log("success");
            removeTableRow(row);
            updateTotal(amount);
        },
        failure: function(data){
            console.log("failure");
        },
    });
}

// Deletes the row from the table
function removeTableRow(row) {
    var table = document.getElementById('expense-table-body');
    table.deleteRow(row);
}

//Populates the past expenses list
function addPastExpenseOption(categoryName) {
    //Instantiate some variables
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var id_tag = categoryName + year;
    var collapse_tag = "collapse" + year;

    //Create our containing div elements
    var parent = document.getElementById("accordion");
    var outer_div = document.createElement("div");
    outer_div.setAttribute("class", "panel panel-default");
    var panel_heading = document.createElement("div");
    var content_div = document.createElement("div");
    content_div.setAttribute('id', collapse_tag);
    content_div.setAttribute('class', "panel-collapse collapse in");

    var pastYears = document.getElementById(id_tag);
    if (pastYears == null) {
        //Create our content tag
        var a_year = document.createElement("a");
        a_year.setAttribute('id', id_tag);
        a_year.setAttribute('class', 'list-group-item list-group-item-action');
        a_year.setAttribute('data-toggle', 'collapse');
        a_year.setAttribute('data-parent', "#accordion");
        a_year.setAttribute('href', '#' + collapse_tag)    ;
        a_year.appendChild(document.createTextNode(year));

        //Start building our structure
        panel_heading.appendChild(a_year);
        outer_div.appendChild(panel_heading);
        content_div = populateMonths(content_div, categoryName, year, month);
        outer_div.appendChild(content_div);
        parent.appendChild(outer_div);
    } else {
        //Add a new month
        content_div = populateMonths(content_div, categoryName, year, month);
        outer_div.appendChild(content_div);
        parent.appendChild(outer_div);
    }

    
}

// Adds months to the sub list of the past year cateogry item
function populateMonths(content_div, categoryName, year, month) {
    var month_tag = categoryName + '_' +  year + '_' + month;
    var past_month = document.getElementById(month_tag);
    if (past_month == null) {
        // New month record for this year
        var a = document.createElement("a");
        a.setAttribute("id", month_tag);
        a.setAttribute('class', 'list-group-item list-group-item-action');
        a.onclick = function() {getMonthExpenses(a.getAttribute('id'))};
        a.appendChild(document.createTextNode(month_map.get(month)));
        content_div.appendChild(a);
        return content_div;
    } else {
        // Month already has a record
        return content_div;
    }
}

function createCollapsableMenu() {

}

function populatePastExpensesList() {
    // TODO add a list item for each year the category has been around
}

// Get the expenses for this month
function getMonthExpenses(tag) {
    var data = tag.split('_');
    var category = data[0];
    var year = data[1];
    var month = data[2];
}

// Sums the total expenses of the selected category
function addTotal() {
    var total_text = document.getElementById('total');
    var amounts = document.getElementsByClassName('amount');
    var total = 0;
    for (i = 0; i < amounts.length; i++) {
        total += +amounts[i].innerText;
    }
    total_text.innerText = total;
}

// Updates the total expenses
function updateTotal(amount) {
    var total_text = document.getElementById('total');
    var total = +total_text.innerText;
    total += +amount;
    setTotal(total);
}

// Sets the total value text
function setTotal(amount) {
    var total_text = document.getElementById('total');
    total_text.innerText = amount;
}

// Turns a map into a JSON object
function mapToJson(map) {
    var stuff = JSON.stringify([...map]);
    return stuff;
}