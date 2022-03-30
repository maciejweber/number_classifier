from django.contrib import admin
from django.urls import path, include, re_path
from django.conf.urls.static import static
from django.conf import settings
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('digits.api.urls')),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    re_path('.*', TemplateView.as_view(template_name='index.html'))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
