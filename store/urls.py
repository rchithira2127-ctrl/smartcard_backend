from django.urls import path
from .views import ProductListCreateView, ProductDetailView , CartListCreateView
from .views import RegisterView 
from .views import LoginView
urlpatterns = [
    path('products/', ProductListCreateView.as_view()),
    path('products/<int:pk>/', ProductDetailView.as_view()),
    path('cart/', CartListCreateView.as_view()),
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
]
