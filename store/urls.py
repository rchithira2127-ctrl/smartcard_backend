from django.urls import path
from .views import ProductListCreateView, ProductDetailView , CartListCreateView

urlpatterns = [
    path('products/', ProductListCreateView.as_view()),
    path('products/<int:pk>/', ProductDetailView.as_view()),
    path('cart/', CartListCreateView.as_view()),
]
