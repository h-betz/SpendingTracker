from django.shortcuts import render
import json
from .helper import jsonToDict
from .models import Category, Expense

# Create your views here.
def dashboard(request):
    return render(request,'dashboard/dashboard.html')

def api(request):
    print(request.body)
    if request.method == 'POST':
        data = request.body.decode("utf-8")
        json_data = json.loads(data)
        json_data = jsonToDict(json_data)
        category_name = json_data['category']
        command = json_data['command']
        if command == 'Add Category':
            category, created = Category.objects.get_or_create(name=category_name)
            category.save()
        elif command == 'Add Expense':
            category = Category.objects.get(name=category_name)
            expense = Expense.objects.create(description=json_data['description'],
                amount=json_data['amount'], date=json_data['date'], category=category)
            
        return render(request, 'dashboard/dashboard.html')