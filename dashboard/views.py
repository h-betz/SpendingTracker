from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.views.generic import View, TemplateView, ListView, DetailView
from django.contrib.auth.mixins import LoginRequiredMixin
import json
from django.core import serializers
from .helper import jsonToDict
from .models import Category, Expense

# Create your views here.
class DashboardView(LoginRequiredMixin, TemplateView):
    template_name = 'dashboard/dashboard.html'
    redirect_field_name = 'user_uath/login.html'

def api(request):
    if request.method == 'POST':
        data = request.body.decode("utf-8")
        json_data = json.loads(data)
        json_data = jsonToDict(json_data)
        command = json_data['command']
        if command == 'Add Category':
            category_name = json_data['category']
            category, created = Category.objects.get_or_create(name=category_name, users=request.user)
            category.save()
        elif command == 'Add Expense':
            category_name = json_data['category']
            category = Category.objects.get(name=category_name)
            expense = Expense.objects.create(description=json_data['description'],
                amount=json_data['amount'], date=json_data['date'], category=category, user=request.user)
        elif command == 'Get Categories':
            categories = Category.objects.filter(users=request.user)
            categories = serializers.serialize('json', categories)
            return HttpResponse(categories, content_type='application/json')
        elif command == 'Get Expenses':
            category_name = json_data['category']
            expenses = Expense.objects.filter(user=request.user,category__name=category_name)
            expenses = serializers.serialize('json', expenses)
            return HttpResponse(expenses, content_type='application/json')
            
        return render(request, 'dashboard/dashboard.html')