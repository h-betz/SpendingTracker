from django import forms
from django.contrib.auth.models import User
from user_auth.models import SpendingTrackerUser, UserProfileInfo

class SpendingTrackerUserForm(forms.ModelForm):
    password = forms.CharField(max_length=128,widget=forms.PasswordInput)
    class Meta():
        model = SpendingTrackerUser
        fields = '__all__'

class LoginForm(forms.Form):
    email = forms.EmailField(max_length=128,required=True)
    password = forms.CharField(max_length=128,widget=forms.PasswordInput,required=True)

class UserForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)

    class Meta():
        model = User
        fields = ('username','email','password')


class UserProfileInfoForm(forms.ModelForm):
    class Meta():
        model = UserProfileInfo
        fields = ('portfolio_site',)
