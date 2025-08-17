
# 🤖 AI Meeting Summarizer - TranScriptor

An intelligent web application that uses the Google Gemini API to instantly summarize long meeting transcripts into concise, easy-to-read formats. Users can paste a transcript, choose the desired output (like key takeaways, minutes of the meeting, or an email draft), and share the result via email.

-----

## ✨ Features

  * **AI-Powered Summarization:** Leverages the power of Google's Gemini 1.5 Flash model to provide accurate and context-aware summaries.
  * **Multiple Summary Formats:** Users can choose from several predefined prompt options to get the perfect output:
      * **Key Takeaways:** A concise, bullet-point summary.
      * **Detailed Summary:** A more comprehensive overview of the discussion.
      * **Minutes of Meeting (MoM):** A formally structured document with attendees, agenda, and action items.
      * **Email Draft:** A ready-to-send follow-up email for attendees.
  * **Editable Output:** The generated summary can be edited directly in the browser before sharing.
  * **Share via Email:** A simple "Share" button creates a `mailto:` link, opening the user's default email client with the summary pre-filled.
  * **Responsive Design:** A clean, modern, and responsive two-column layout built with Tailwind CSS that works seamlessly on both desktop and mobile devices.

-----

## 🛠️ Tech Stack

This project is a full-stack application built with the MERN stack in mind, but with a focus on modern, serverless-friendly deployment.

| Part      | Technology                                                                                                  |
| :-------- | :---------------------------------------------------------------------------------------------------------- |
| **Frontend** | [React](https://reactjs.org/), [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/), [Axios](https://axios-http.com/), [Heroicons](https://heroicons.com/) |
| **Backend** | [Node.js](https://nodejs.org/), [Express](https://expressjs.com/), [Google Gemini API](https://ai.google.dev/docs/gemini_api_overview)                               |
| **Deployment**| Frontend on [Vercel](https://vercel.com/), Backend on [Render](https://render.com/)                               |

-----

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

  * **Node.js** (v18.x or later)
  * **npm** (comes with Node.js)
  * A **Google Gemini API Key**. You can get one from [Google AI Studio](https://aistudio.google.com/).

### Installation & Setup

1.  **Clone the repository:**

    ```sh
    git clone https://github.com/your-username/meeting-summarizer.git
    cd meeting-summarizer
    ```

2.  **Set up the Backend:**

      * Navigate to the backend directory:
        ```sh
        cd backend
        ```
      * Install the dependencies:
        ```sh
        npm install
        ```
      * Create a `.env` file in the `backend` directory and add your Gemini API key:
        ```
        GEMINI_API_KEY="YOUR_GEMINI_API_KEY_HERE"
        ```
      * Start the backend server:
        ```sh
        node server.js
        ```

    The server will be running on `http://localhost:5000`.

3.  **Set up the Frontend:**

      * Open a **new terminal window** and navigate to the frontend directory:
        ```sh
        cd frontend
        ```
      * Install the dependencies:
        ```sh
        npm install
        ```
      * Start the frontend development server:
        ```sh
        npm run dev
        ```

    The application will be running on `http://localhost:5173` (or another port if 5173 is busy).

-----

## ☁️ Deployment

This application is designed for easy deployment on modern cloud platforms.

  * The **React frontend** is hosted on **Vercel**. It's configured to automatically build and deploy upon every push to the `main` branch. The root directory is set to `frontend`.
  * The **Node.js backend** is hosted on **Render** as a Web Service. The environment variables (like `GEMINI_API_KEY`) are configured directly in the Render dashboard. The root directory is set to `backend`.

The live frontend application is configured to make API calls to the live backend URL provided by Render.

-----

## 📄 How to Use

1.  Open the live URL of the application.
2.  Paste the meeting transcript into the left-hand text area.
3.  Select the desired summary type from the buttons (e.g., "Key Takeaways", "Email Draft").
4.  Click the **"Summarize"** button.
5.  The generated summary will appear in the right-hand text area.
6.  You can edit the summary directly.
7.  Click the **Copy** icon to copy the text or the **Share** icon to open your default email client with the summary ready to send.
