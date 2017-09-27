
//Appends category to the list of categories
function appendToCategoryList() {
    var categoryName = document.getElementById('category-input').value;
    var div = document.getElementById("category-list");
    var li = document.createElement("li");
    var a = document.createElement("a");
    //var div = document.createElement("div");
    a.appendChild(document.createTextNode(categoryName))
    a.onclick = function() {activeCategory(a.text)};
    a.setAttribute('class', 'list-group-item list-group-item-action');
    a.setAttribute('id', a.text);
    //div.appendChild(a);
    //div.setAttribute('class', 'categoryItem');
    // li.appendChild(a);
    // li.setAttribute('class', 'list-group-item list-group-item-action');
    // li.setAttribute('id', a.text);
    div.appendChild(a);
    document.getElementById('category-input').value = '';
    return false;
}

// Gets the selected category
function activeCategory(text) {
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

function addExpense() {

    var formObj = {};
    var inputs = $('#expenseForm').serializeArray();
    $.each(inputs, function (i, input) {
        formObj[input.name] = input.value;
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
    descriptionTd.appendChild(document.createTextNode(formObj['description']));
    amountTd.appendChild(document.createTextNode(formObj['amount']));
    dateTd.appendChild(document.createTextNode(formObj['date']));
    
    tr.appendChild(deleteButtonTd);
    tr.appendChild(descriptionTd);
    tr.appendChild(amountTd);
    tr.appendChild(dateTd);
    
    table.appendChild(tr);

    return false;
}