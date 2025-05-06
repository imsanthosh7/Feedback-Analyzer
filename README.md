# 🧠 AI Feedback Analyzer (MERN + Hugging Face)

A full-stack MERN application that allows users to submit feedback and receive real-time sentiment analysis (Positive or Negative) using Hugging Face's transformer model. Built with a clean and modern UI using **ShadCN UI** and **TailwindCSS**.

---

## 🚀 Live Preview  
🌐 [Add deployed link here]

---

## ✨ Features

- 🤖 AI-powered sentiment detection
- 📝 Modern feedback form with real-time classification
- 📋 Display all submitted feedback
- 💅 Responsive UI using **ShadCN UI** components
- 🔐 Secure API communication using environment variables

---

## 🧑‍💻 Tech Stack

### Frontend:
- React (Vite)
- TailwindCSS
- ShadCN UI
- Axios

### Backend:
- Node.js + Express.js
- MongoDB + Mongoose
- Hugging Face Inference API

---

## 🧠 AI Integration

Using Hugging Face’s `distilbert-base-uncased-finetuned-sst-2-english` to analyze feedback.

```js
// Hugging Face API Example
const response = await axios.post(
  'https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english',
  { inputs: "The product is amazing!" },
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
/client         → React frontend (Vite + ShadCN UI)
/admin         → React frontend (Vite + ShadCN UI)
/server         → Node.js backend (Express + MongoDB)
  ├─ controllers → Logic for handling feedback
  ├─ models      → Mongoose schemas
  ├─ routes      → API endpoints
  ├─ .env        → Environment variables

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
```
### 3. Frontend Setup

```
cd ../client
npm install
npm run dev
```
### 📸 Screenshots
User Page
![App Screenshot](https://github.com/user-attachments/assets/826607fe-cade-4b83-8878-dfb4e05f1381)

Adimn Dashboard 
![App Screenshot](https://github.com/user-attachments/assets/91f0730a-f442-4df7-bf37-83f28c59f423)
