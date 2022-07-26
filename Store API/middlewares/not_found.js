const notFound = (err, req, res, next) => {
   res.staus(404).json({ msg: "Request not found!" });
};

module.exports = notFound;
