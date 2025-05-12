exports.submitContactForm = (req, res) => {
  const { name, email, message } = req.body;
  console.log("Contact form Submitted", { name, email, message });

  res.status(200).json({ message: "Form received successfully " });
};
