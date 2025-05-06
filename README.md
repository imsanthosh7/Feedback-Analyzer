# 🧠 AI Feedback Analyzer (MERN Stack + Hugging Face API)

This is a full-stack MERN application that collects user feedback, analyzes its sentiment using Hugging Face's free AI model (`distilbert-base-uncased-finetuned-sst-2-english`), and alerts the admin if too many negative feedbacks are received.

## 🚀 Live Preview
[Optional: Add deployed link here]

---

## ✨ Features

- 🔍 AI-based Sentiment Analysis (Positive or Negative)
- 📩 Submit and save feedback
- 📊 Admin dashboard to monitor feedback stats
- 🚨 Automatic email alert to admin if 50+ negative feedbacks
- 🔐 Secure API communication

---

## 🛠️ Tech Stack

### Frontend:
- ReactJS
- Axios
- TailwindCSS

### Backend:
- Node.js + Express
- MongoDB + Mongoose
- Nodemailer (for email alerts)
- Hugging Face Inference API

---

## 🧪 API Example

```js
// HuggingFace Sentiment Request
const response = await axios.post(
  'https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english',
  { inputs: "The product is great!" },
  {
    headers: {
      Authorization: `Bearer YOUR_HUGGINGFACE_API_TOKEN`
    }
  }
);
```

## Response
```[
  [
    {
      "label": "POSITIVE",
      "score": 0.9998
    },
    {
      "label": "NEGATIVE",
      "score": 0.0001
    }
  ]
]
```
📦 Project Structure
```
/client       --> ReactJS frontend
/admin        --> ReactJS frontend
/server       --> Node.js backend with Express
  └─ controllers   --> authController / feedbackController
  └─ middleware   --> authMiddleware
  └─ models   --> Mongoose schemas
  └─ routes   --> Feedback & admin routes
```
🧑‍💻 Local Setup
### 1. Clone the repo
```
git clone https://github.com/imsanthosh7/Feedback-Analyzer.git
```
### 2. Backend Setup
```
cd server
npm install

# Create .env file
touch .env
```
### .env example:
```
PORT=5000
MONGO_URI=your_mongodb_connection
HUGGINGFACE_API_KEY=your_huggingface_api_key
ADMIN_EMAIL=your_email@gmail.com
ADMIN_PASS=your_gmail_app_password
```
### 3. Frontend Setup

```
cd ../client
npm install
npm run dev
```
