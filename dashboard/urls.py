from django.conf.urls import url
from dashboard import views

urlpatterns = [
    #url(r'^$',views.dashboard,name='dashboard'),
    url(r'^$',views.DashboardView.as_view(),name='dashboard'),
    url(r'^api/$',views.api,name='api'),
]