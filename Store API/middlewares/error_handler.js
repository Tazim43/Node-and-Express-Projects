const errorHandler = async (err, req, res, next) => {
   console.log(err);
   return res
      .status(500)
      .json({ msg: `Something went wrong. Please try again` });
};

module.exports = errorHandler;
