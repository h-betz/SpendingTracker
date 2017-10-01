
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
    amountTd.appendChild(document.createTextNode(formObj.get('amount')));
    dateTd.appendChild(document.createTextNode(formObj.get('date')));
    
    tr.appendChild(deleteButtonTd);
    tr.appendChild(descriptionTd);
    tr.appendChild(amountTd);
    tr.appendChild(dateTd);

    postExpense(formObj);
    
    table.appendChild(tr);

    return false;
}

$.ajaxSetup({ 
    beforeSend: function(xhr, settings) {
        function getCookie(name) {
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = jQuery.trim(cookies[i]);
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
        if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
            // Only send the token to relative URLs i.e. locally.
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
        }
    } 
});

function postCategoryName(categoryName) {
    var csrftoken = Cookies.get('csrftoken');
    var data = {
        command: 'Add Category',
        category: categoryName,
        csrfmiddlewaretoken: csrftoken,
    };
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8000/dashboard/api/",
        data: data,
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
    var data = new Map(expenseDetails);
    data = {
        command: 'Add Expense',
        category: categoryName,
        csrfmiddlewaretoken: csrftoken,
    };

    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8000/dashboard/api/",
        data: data,
        success: function(data){
            console.log("success");
        },
        failure: function(data){
            console.log("failure");
            console.log(data);
        },
    });
}