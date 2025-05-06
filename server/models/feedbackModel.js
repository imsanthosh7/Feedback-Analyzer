import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    text: { type: String, required: true },
    sentiment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const feedbackModel = mongoose.model.feedback || mongoose.model('feedback', feedbackSchema);

export default feedbackModel;
