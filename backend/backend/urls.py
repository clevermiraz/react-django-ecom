from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('api/', include('api.urls')),
    path('api/products/', include('api.urls.product_urls')),
    path('api/users/', include('api.urls.user_urls')),
    path('api/orders/', include('api.urls.order_urls')),

]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
