from django.urls import path
from api.views import order_views as views


urlpatterns = [
    path('add/', views.addOrderItems, name='orders-add'),
    path('<str:pk>/', views.getOrderId, name='user-order'),
    path('<str:pk>/pay/', views.updateOrderToPaid, name='pay'),
]
