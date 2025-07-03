from django.urls import path
from .views import detect_image  # Import your function

urlpatterns = [
    path('detect/', detect_image, name='detect_image'),  # The endpoint
]
