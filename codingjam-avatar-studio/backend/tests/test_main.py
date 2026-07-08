from fastapi.testclient import TestClient
import pytest
import os
import sys

# Ensure backend directory is in path so we can import main
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from main import app, construct_gemini_prompt, compress_image

client = TestClient(app)

# Unit test 1: construct_gemini_prompt
def test_construct_gemini_prompt_valid():
    prompt = construct_gemini_prompt("pixar")
    assert "Pixar" in prompt

def test_construct_gemini_prompt_invalid():
    with pytest.raises(ValueError):
        construct_gemini_prompt("unknown")

# Unit test 2: compress_image (dummy test)
def test_compress_image():
    assert compress_image(b"fakebytes") == b"fakebytes"

# Integration test: Generation Flow
def test_generation_flow_happy_path():
    # Set mock environment variable
    os.environ["TEST_MODE"] = "1"
    
    response = client.post("/api/generate", json={
        "styleId": "pixar",
        "imageBase64": "data:image/png;base64,fakeimage"
    })
    
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "avatarBase64" in data
    assert data["avatarBase64"] == "data:image/png;base64,mocked_base64_string"

def test_generation_flow_invalid_style():
    response = client.post("/api/generate", json={
        "styleId": "invalid",
        "imageBase64": "data:image/png;base64,fakeimage"
    })
    
    assert response.status_code == 400
