from django.shortcuts import render
import json
from .models import Category, Expense

# Create your views here.
def dashboard(request):
    return render(request,'dashboard/dashboard.html')

def api(request):
    if request.method == 'POST':
        json_data = json.loads(request.body.decode('utf-8'))
        print(json_data)
        json_data = json_data['data']
        #command = request.POST.get('command')
        print(json_data)
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