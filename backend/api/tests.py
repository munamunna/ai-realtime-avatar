
from rest_framework import status
from rest_framework.test import APITestCase


class HealthCheckTests(APITestCase):

    def test_health_endpoint_returns_success(self):
        response = self.client.get("/api/health/")

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

    def test_health_endpoint_returns_expected_data(self):
        response = self.client.get("/api/health/")

        self.assertEqual(response.data["status"], "ok")
        self.assertEqual(
            response.data["service"],
            "ai-realtime-avatar-api",
        )
        self.assertIn("timestamp", response.data)
