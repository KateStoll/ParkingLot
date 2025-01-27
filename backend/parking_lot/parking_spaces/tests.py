import json

from django.test import TestCase, Client
from django.contrib.auth import get_user_model

from .models import ParkingSpace

User = get_user_model()


class ParkingPaceEndpointTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.superuser = User.objects.create_superuser(
            "admin", "admin@example.com", "admin"
        )
        pass

    def setUp(self):
        self.client = Client()
        response = self.client.post(
            "/api/auth/token/login/", {"username": "admin", "password": "admin"}
        )
        self.auth_token = json.loads(response.content.decode("utf-8"))["auth_token"]
        self.assertEqual(response.status_code, 200)
        # setUp: Run once for every test method to set up clean data.

    def test_create_parking_space(self):
        response = self.client.post(
            "/api/v1/parking-spaces",
            {"taken": True},
            content_type="application/json",
            **{"HTTP_AUTHORIZATION": f"Token {self.auth_token}"},
        )
        self.assertEqual(response.status_code, 201)
        content = json.loads(response.content.decode("utf-8"))
        parsed = {k: content[k] for k in ["id", "taken"]}
        self.assertEqual(parsed, {"id": 1, "taken": True})
        self.assertEqual(ParkingSpace.objects.count(), 1)

    def test_read_parking_space(self):
        parking_space = ParkingSpace.objects.create(taken=True)
        response = self.client.get(
            f"/api/v1/parking-spaces/{parking_space.id}",
            content_type="application/json",
            **{"HTTP_AUTHORIZATION": f"Token {self.auth_token}"},
        )
        self.assertEqual(response.status_code, 200)
        content = json.loads(response.content.decode("utf-8"))
        parsed = {k: content[k] for k in ["id", "taken"]}
        self.assertEqual(parsed, {"id": 1, "taken": True})

    def test_update_parking_space(self):
        parking_space = ParkingSpace.objects.create(taken=True)
        response = self.client.patch(
            f"/api/v1/parking-spaces/{parking_space.id}",
            {"taken": False},
            content_type="application/json",
            **{"HTTP_AUTHORIZATION": f"Token {self.auth_token}"},
        )
        self.assertEqual(response.status_code, 200)
        content = json.loads(response.content.decode("utf-8"))
        parsed = {k: content[k] for k in ["id", "taken"]}
        self.assertEqual(parsed, {"id": 1, "taken": False})

    def test_delete_parking_space(self):
        parking_space = ParkingSpace.objects.create(taken=True)
        response = self.client.delete(
            f"/api/v1/parking-spaces/{parking_space.id}",
            content_type="application/json",
            **{"HTTP_AUTHORIZATION": f"Token {self.auth_token}"},
        )
        self.assertEqual(response.status_code, 204)
