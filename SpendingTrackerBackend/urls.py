"""SpendingTrackerBackend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.conf.urls import include
from user_auth import views
import dashboard

urlpatterns = [
    url(r'^$',views.IndexView.as_view(),name="index"),
    url(r'^user_auth/',include('user_auth.urls')),
    url(r'^dashboard/',include('dashboard.urls')),
    url(r'^admin/', admin.site.urls),
    url(r'^about/',views.AboutView.as_view(),name='about'),
    url(r'^sign_up/',views.sign_up,name="sign_up"),
    url(r'^logout/$',views.user_logout,name='logout'),
    url(r'^login/',views.user_login,name='user_login')
]