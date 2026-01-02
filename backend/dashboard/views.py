from django.shortcuts import render
from rest_framework.views import APIView
from products.models import Product
from rest_framework.response import Response
from products.serializers import ProductReadSerializer, ProductWriteSerializer
from rest_framework import status
from rest_framework.permissions import IsAdminUser


class ProductManagement(APIView):
    permission_classes = [IsAdminUser]

    def get_object(self, product_id):
        try:
            return Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            raise Http404

    def get(self, request):
        products = Product.objects.all()
        serialiser = ProductReadSerializer(products, many=True)

        return Response(serialiser.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = ProductWriteSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(
                {"messsage": "Product created successfully"},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        product = Product.objects.get("product_id")
        serializer = ProductWriteSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request):
        product = self.get_object(request.data.get("product_id"))
        
        serializer = ProductWriteSerializer(product , data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors ,status=status.HTTP_400_BAD_REQUEST) 
    
    def delete(self ,request):
        prodduct = self.get_object(request.data.get("product_id"))
        prodduct.delete()
        return Response({"message":"Deleted successfullly" , status=status.HTTP_204_NO_CONTENT})