from django.urls import path
from .views import ProductListView, ProductDetailAPIView, CartView


urlpatterns = [
    path("products/", ProductListView.as_view(), name="product_list"),
    path("products/<int:pk>", ProductDetailAPIView.as_view(), name="product_by_id"),
    path("cart/", CartView.as_view(), name="cart-detail"),
]
