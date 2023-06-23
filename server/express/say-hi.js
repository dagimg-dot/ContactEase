const say_hi = (req, res) => {
  const { name } = req.body.input;
  return res.status(200).json({
    message: "hello " + name,
  });
};

module.exports = say_hi;
