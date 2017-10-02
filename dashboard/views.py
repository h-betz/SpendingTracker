from django.shortcuts import render
from django.contrib.auth.decorators import login_required
import json
from .helper import jsonToDict
from .models import Category, Expense

# Create your views here.
@login_required
def dashboard(request):
    return render(request,'dashboard/dashboard.html')

def api(request):
    if request.method == 'POST':
        data = request.body.decode("utf-8")
        json_data = json.loads(data)
        json_data = jsonToDict(json_data)
        print(json_data)
        category_name = json_data['category']
        command = json_data['command']
        if command == 'Add Category':
            category, created = Category.objects.get_or_create(name=category_name)
            category.save()
        elif command == 'Add Expense':
            category = Category.objects.get(name=category_name)
            expense = Expense.objects.create(description=json_data['description'],
                amount=json_data['amount'], date=json_data['date'], category=category, user=request.user)
            
        return render(request, 'dashboard/dashboard.html')