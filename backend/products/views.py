from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Product
from .serializers import ProductReadSerializer, ProductWriteSerializer
from rest_framework import status
from django.db.models import Q
from .pagination import ProductPagination


class ProductListView(APIView):
    def get(self, request):
        search = request.query_params.get("search")
        product_type = request.query_params.get("type")

        queryset = Product.objects.filter(is_active=True)
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) | Q(author__icontains=search)
            )
        if product_type:
            queryset = queryset.filter(type=product_type)

        paginator = ProductPagination()
        paginated_queryset = paginator.paginate_queryset(queryset, request)

        serializer = ProductReadSerializer(paginated_queryset, many=True)
        return paginator.get_paginated_response(serializer.data)

    def post(self, request):
        serialiser = ProductWriteSerializer(data=request.data)
        if serialiser.is_valid():
            serialiser.save()
            return Response(serialiser.data, status=status.HTTP_201_CREATED)
        return Response(serialiser.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductDetailAPIView(APIView):
    def get(self, request, pk):
        products = Product.objects.get(id=pk)
        serializer = ProductReadSerializer(products)
        return Response(serializer.data, status=status.HTTP_200_OK)


from rest_framework.permissions import IsAuthenticated
from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer


class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            cart, _ = Cart.objects.get_or_create(user=request.user)
            serializer = CartSerializer(cart)
            return Response(serializer.data)
        except Exception:
            return Response({"detail": "Something went wrong"}, status=500)

    def post(self, request):
        product_id = request.data.get("product_id")

        cart, _ = Cart.objects.get_or_create(user=request.user)

        try:
            product = Product.objects.get(id=product_id)

        except Product.DoesNotExist:
            return Response(
                {"detail": "Product not found"}, status=status.HTTP_404_NOT_FOUND
            )
        item_exists = CartItem.objects.filter(cart=cart, product=product).exists()
        if item_exists:
            return Response(
                {"message": "item aldredy in cart"}, status=status.HTTP_400_BAD_REQUEST
            )

        CartItem.objects.create(cart=cart, product=product, quantity=1)
        return Response(
            {"message": "Item added to cart successfully"},
            status=status.HTTP_201_CREATED,
        )

    def delete(self, request, itme_id):
        # product_id = request.data.get("product_id")

        item = CartItem.objects.filter(id=itme_id, crt__user=request.user).first()

        if not item:
            return Response(
                {"detail": "Item not found or not authorized"},
                status=status.HTTP_404_NOT_FOUND,
            )

        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
