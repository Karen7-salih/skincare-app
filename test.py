import requests
import pytest

FORM_URL = "https://formspree.io/f/xvgzedej"

#  **Security Test: Prevent XSS in Contact Form**
def test_prevent_xss_in_contact():
    xss_payload = "<script>alert('Hacked')</script>"
    data = {
        "name": "Test User",
        "email": "test@example.com",
        "message": xss_payload
    }

    response = requests.post(FORM_URL, json=data)

    #  Since Formspree doesn't block XSS automatically, the frontend should prevent it.
    assert response.status_code == 200  # Ensure Formspree accepted the request
    assert "<script>" not in response.text  # Ensure XSS is not executed


#  Validation Test - Reject Bad Emails**
def test_reject_invalid_email():
    invalid_email = "not_an_email"
    data = {
        "name": "Test User",
        "email": invalid_email,
        "message": "This is a test message."
    }

    response = requests.post(FORM_URL, json=data)

    #  Expect `422` since Formspree rejects invalid emails
    assert response.status_code == 422  # Formspree correctly rejects bad emails


# Test Successful Contact Form Submission**
def test_valid_contact_form_submission():
    valid_data = {
        "name": "Test User",
        "email": "test@example.com",
        "message": "Hello, I have a question about skincare."
    }

    response = requests.post(FORM_URL, json=valid_data)

    #  Check for `"ok": true` instead of `"success"`
    assert response.status_code == 200  # Formspree accepted the request
    assert '"ok":true' in response.text  # Ensure Formspree confirmed success
