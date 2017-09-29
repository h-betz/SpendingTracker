from django.shortcuts import render
from .models import Category

# Create your views here.
def dashboard(request):
    return render(request,'dashboard/dashboard.html')

def api(request):
    if request.method == 'POST':
        category_name = request.POST.get('category')
        category, created = Category.objects.get_or_create(name=category_name)
        print(created)
        category.save()
            
        return render(request, 'dashboard/dashboard.html')