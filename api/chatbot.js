// api/chatbot.js

module.exports = async (req, res) => {
  try {
    return res.status(200).json({ message: "Backend is working" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
