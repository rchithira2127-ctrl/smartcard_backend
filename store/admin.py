from django.contrib import admin

# Register your models here.
from .models import Cart
admin.site.register(Cart)
from .models import Order
admin.site.register(Order)