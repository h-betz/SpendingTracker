from django.shortcuts import render
from .models import Category

# Create your views here.
def dashboard(request):
    return render(request,'dashboard/dashboard.html')

def api(request):
    if request.method == 'POST':
        command = request.POST.get('command')
        if command == 'Add Category':
            print('here1')
            category_name = request.POST.get('category')
            category, created = Category.objects.get_or_create(name=category_name)
            category.save()
        elif command == 'Add Expense':
            print('here2')
            category_name = request.POST.get('category')
            expense_details = request.POST.get('expense')
            
        return render(request, 'dashboard/dashboard.html')