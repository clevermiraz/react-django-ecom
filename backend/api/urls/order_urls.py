from django.urls import path
from api.views import order_views as views


urlpatterns = [
    path('', views.getOrders, name='orders'),
    path('add/', views.addOrderItems, name='orders-add'),
    path('myorders/', views.getMyOrders, name='myorders'),

    path('<str:pk>/', views.getOrderId, name='user-order'),
    path('<str:pk>/pay/', views.updateOrderToPaid, name='pay'),
]
