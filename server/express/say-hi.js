export default (req, res) => {
  const { name } = req.body.input;
  return res.status(200).json({
    message: "hello " + name,
  });
};
