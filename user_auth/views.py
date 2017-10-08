from django.shortcuts import render
#from user_auth.forms import UserForm, UserProfileInfoForm
from user_auth.forms import UserForm
from user_auth.serializers import UserSerializer
from rest_framework import generics
from user_auth.forms import LoginForm
from django.views.generic import View, TemplateView
from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect, HttpResponse
from django.contrib.auth import authenticate, login, logout

# Create your views here.
class IndexView(TemplateView):
    template_name = 'user_auth/index.html'

class AboutView(TemplateView):
    template_name = 'about.html'


# Forces user to be logged-in in order to log out
@login_required
def user_logout(request):
    logout(request)
    return HttpResponseRedirect(reverse('index'))

def sign_up(request):
    registered = False

    if request.method == 'POST':
        user_form = UserForm(data=request.POST)

        if user_form.is_valid():
            user = user_form.save()
            user.set_password(user.password)
            user.save()

            # Registration was a success
            registered = True
        else:
            print(user_form.errors)
    else:
        user_form = UserForm()
    
    return render(request,'user_auth/signup.html',
                            {'user_form':user_form,
                             'registered':registered})

def user_login(request):

    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(username=username, password=password)

        if user:
            if user.is_active:
                login(request,user)
                return HttpResponseRedirect(reverse('index'))
                #return HttpResponseRedirect(reverse('dashboard'))
            else:
                return HttpResponse("ACCOUNT NOT ACTIVE")
        else:
            print("Someone tried to login and failed")
            print("Username: {} and password {}".format(username,password))
            return HttpResponse("Invalid login details supplied!")
    else:
        return render(request,'user_auth/login.html',{})
        #return render(request,'dashboard/dashboard.html',{})
