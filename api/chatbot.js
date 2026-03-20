module.exports = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Only POST allowed" });
    }

    const data = req.body;

    return res.status(200).json({
      message: "Data received",
      received: data
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
