from rest_framework.pagination import PageNumberPagination

class ProductPagination(PageNumberPagination):
    page_size = 6              # products per page
    page_size_query_param = "page_size"
    max_page_size = 50