import feedbackModel from '../models/feedbackModel.js';
import axios from 'axios';

const HUGGINGFACE_API_TOKEN = process.env.HUGGINGFACE_API_TOKEN;
const API_URL = process.env.HUGGINGFACE_API_URL


export const analyzeFeedback = async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: "Text required" });
  }

  try {
    const response = await axios.post(
      API_URL,
      {
        inputs: text,
        parameters: { return_all_scores: true }
      },
      {
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_TOKEN}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      }
    );

    // Handle model loading delays
    if (response.data.error?.includes("loading")) {
      await new Promise(resolve => setTimeout(resolve, 10000));
      return analyzeFeedback(req, res);
    }

    // Corrected sentiment extraction
    const labels = response.data[0];
    const sortedLabels = labels.sort((a, b) => b.score - a.score);
    const sentiment = sortedLabels[0].label;

    // Save to DB
    const newFeedback = new feedbackModel({ text, sentiment });
    await newFeedback.save();

    res.json({ success: true, message: "Thank you for your feedback!" });
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    res.status(500).json({
      error: "Hugging Face API failed",
      details: error.response?.data?.error || error.message,
    });
  }
};





// Get all feedbacks
export const getAllFeedback = async (req, res) => {


  try {
    const feedbacks = await feedbackModel.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      adminName: req.admin.name,
      feedbacks,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
