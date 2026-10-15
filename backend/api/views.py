
from django.utils import timezone
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(["GET"])
def health_check(request):
    return Response({
        "status": "ok",
        "service": "ai-realtime-avatar-api",
        "timestamp": timezone.now().isoformat(),
    })
