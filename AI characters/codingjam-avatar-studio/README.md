# AI Avatar Studio 🎨✨

Welcome to **AI Avatar Studio**! This is a web application that takes a photo of a face and magically transforms it into different styles (like Pixar, Anime, Cyberpunk, or Watercolor) using the power of Google's Gemini AI.

This guide will walk you through the simple, step-by-step process of getting this project up and running on your own computer.

---

## 🛠️ What You Need Before You Start

1. **Python**: The programming language that powers our backend. (Make sure you have Python installed).
2. **`uv` Package Manager**: A blazing-fast tool for managing Python projects. 
   - *How to install on Windows:* Open PowerShell and run: `powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"`
   - *How to install on Mac/Linux:* Open Terminal and run: `curl -LsSf https://astral.sh/uv/install.sh | sh`
3. **A Gemini API Key**: The "secret password" that gives our app permission to use Google's AI. 

---

## 🚀 Step-by-Step Setup Guide

### Step 1: Get Your Gemini API Key
**What you are doing:** Getting permission to use Google's AI.
**Why:** The app needs to talk to the Gemini AI model to generate the images.
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Sign in with your Google account and click **Create API Key**.
3. Copy the key (it will look like a long string of random letters and numbers). Keep it secret!

### Step 2: Set Up Your Secrets File
**What you are doing:** Saving your API key in a secure, hidden file.
**Why:** Storing it in a `.env` file ensures the key is loaded by the app securely and is never accidentally uploaded to the internet (thanks to `.gitignore`).

1. Open the `backend` folder in this project.
2. Create a new file named exactly `.env` (don't forget the dot at the beginning!).
3. Open the `.env` file and paste your key like this:
   ```text
   GEMINI_API_KEY=YOUR_API_KEY_GOES_HERE
   ```
   *(Replace `YOUR_API_KEY_GOES_HERE` with the actual key you copied in Step 1).*

### Step 3: Install the App's Requirements
**What you are doing:** Downloading the tools the app needs to run.
**Why:** The app relies on external code libraries like `FastAPI` (to run the web server) and `google-genai` (to talk to Google).

1. Open your computer's terminal (or PowerShell).
2. Navigate to the `backend` folder of this project:
   ```bash
   cd path/to/codingjam-avatar-studio/backend
   ```
3. Run the following command to sync and install everything instantly:
   ```bash
   uv sync
   ```
**Expected Outcome:** You will see a list of packages downloading and installing. It will create a local environment for your app.

### Step 4: Start the Server
**What you are doing:** Turning the app on.
**Why:** The backend server needs to be running to serve the website to your browser and handle the AI generation requests.

1. While still in the `backend` folder in your terminal, run:
   ```bash
   uv run uvicorn main:app --reload
   ```
**Expected Outcome:** Your terminal will show a message saying `Uvicorn running on http://127.0.0.1:8000`. The `--reload` part means the server will automatically update if you ever change the code!

### Step 5: Open the App and Enjoy!
**What you are doing:** Using the web application.
**Why:** Because it's time to generate some avatars!

1. Open your favorite web browser (Chrome, Edge, Safari, etc.).
2. Go to this exact address: 👉 **[http://localhost:8000/app/](http://localhost:8000/app/)**
3. Upload a photo, pick a style, and watch the magic happen!

---

## 🏗️ How It Works (Under the Hood)
- **Frontend (What you see):** Built with pure HTML, CSS, and JavaScript. It lives in the `frontend` folder and gives you a sleek, glassmorphic UI to interact with.
- **Backend (The brain):** Built with Python and FastAPI. It receives your photo, packages it up with a specific prompt (e.g., "Transform into a Pixar character"), and sends it to the `gemini-3.1-flash-image` model.
- **The AI:** Google's Gemini takes the photo and prompt, generates a brand new styled image, and sends it back to your screen!
