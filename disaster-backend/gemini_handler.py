# gemini_handler.py
import httpx
import os
import traceback
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")
URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={API_KEY}"

async def get_gemini_response(user_query: str) -> str:
    headers = {
        "Content-Type": "application/json"
    }
    data = {
        "contents": [
            {
                "parts": [{"text": user_query}]
            }
        ]
    }

    timeout = httpx.Timeout(15.0)  # ⏱️ Increase timeout to 15 seconds

    async with httpx.AsyncClient(timeout=timeout) as client:
        try:
            response = await client.post(URL, json=data, headers=headers)
            print("📡 Gemini Status Code:", response.status_code)
            print("📦 Gemini Raw Response:", response.text)

            response.raise_for_status()
            result = response.json()

            candidates = result.get("candidates", [])
            if not candidates:
                return "Gemini AI did not return any response candidates."

            content = candidates[0].get("content", {})
            parts = content.get("parts", [])
            if not parts:
                return "Gemini AI returned an empty response."

            return parts[0].get("text", "No response text provided.")

        except httpx.ReadTimeout:
            print("❌ Request timed out.")
            return "Request to Gemini API timed out. Please try again."

        except httpx.HTTPStatusError as http_err:
            print("❌ HTTP Error:", http_err.response.text)
            return f"Gemini API Error: {http_err.response.status_code} - {http_err.response.text}"

        except Exception as e:
            print("❌ Unexpected Exception:")
            traceback.print_exc()
            return f"Unexpected Error: {str(e)}"
