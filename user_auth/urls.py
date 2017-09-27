from django.conf.urls import url
from user_auth import views

app_name = 'user_auth'

urlpatterns = [
    url(r'^$',views.index,name='index'),
    url(r'^signup/$',views.sign_up,name='sign_up'),
    url(r'^user_login/$',views.user_login,name='user_login'),
]