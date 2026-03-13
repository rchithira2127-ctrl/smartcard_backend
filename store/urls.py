from django.urls import path
from .views import ProductListCreateView, ProductDetailView , CartListCreateView , OrderListCreateView
from .views import RegisterView 
from .views import LoginView
urlpatterns = [
    path('api/products/', ProductListCreateView.as_view()),
    path('api/products/<int:pk>/', ProductDetailView.as_view()),
    path('api/cart/', CartListCreateView.as_view()),
     path('register/', RegisterView.as_view()),
    path('api/orders/', OrderListCreateView.as_view()),
    path('api/login/', LoginView.as_view()),
]