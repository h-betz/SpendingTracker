
//Appends category to the list of categories
function appendToCategoryList() {
    var categoryName = document.getElementById('category-input').value;
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
    resetActiveCategory();
    var header = document.getElementById('dash-head');
    var a = document.getElementById(text);
    a.className += " active";
    header.innerText = text;    
}

function resetActiveCategory() {
    $('#category-list').find('a').each(function(){
        $(this).attr('class', 'list-group-item list-group-item-action');
    });
}

// Clears expense table
function resetTable() {
    $("#expense-table-body tr").remove(); 
}

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

    postExpense(formObj);
    
    table.appendChild(tr);

    updateTotal(formObj.get('amount'));

    return false;
}

function setup() {
    $(function () {
        $.ajaxSetup({
            headers: { "X-CSRFToken": Cookies.get('csrftoken') }
        });
    });
}


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

function getCategories() {
    // TODO get categories of this user
}


function getExpenses(categoryName) {
    // TODO get expense data of this user based on category
}

function addPastExpenseOption() {
    var a_year = document.createElement("a");
    a_year.setAttribute('class', 'list-group-item list-group-item-action');
    a_year.setAttribute('data-toggle', 'collapse');
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    a_year.setAttribute('href', year)    
    a_year.appendChild(document.createTextNode(year));
    //TODO populate collapsable menu
}

function populatePastExpensesList() {
    // TODO add a list item for each year the category has been around
}


function addTotal() {
    var total_text = document.getElementById('total');
    var amounts = document.getElementsByClassName('amount');
    var total = 0;
    for (i = 0; i < amounts.length; i++) {
        total += +amounts[i].innerText;
    }
    total_text.innerText = total;
}

function updateTotal(amount) {
    var total_text = document.getElementById('total');
    var total = +total_text.innerText;
    console.log(amount);
    total += +amount;
    total_text.innerText = total;
}

function mapToJson(map) {
    var stuff = JSON.stringify([...map]);
    return stuff;
}