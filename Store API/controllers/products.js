const Product = require("../models/product");

const getAllProductStatic = async (req, res, next) => {
   try {
      const products = await Product.find({ price: { $gt: 30 } })
         .select("")
         .sort("-name");
      res.status(200).json({ total: products.length, products });
   } catch (err) {
      next(err);
   }
};

const getAllProduct = async (req, res, next) => {
   try {
      const {
         name,
         rating,
         company,
         featured,
         price,
         sort,
         select,
         limit,
         skip,
         filter,
      } = req.query;
      const queryObject = {};

      if (featured) queryObject.featured = featured == true ? true : false;
      if (name) queryObject.name = { $regex: name, $options: "i" };
      if (company) queryObject.company = company;
      if (rating) queryObject.rating = Number(rating);
      if (price) queryObject.price = price;
      // sorting the result
      let sortString = "name";
      if (sort) {
         const sortList = sort.split(",").join(" ");
         sortString = sortList;
      }
      // selecting some specific fields
      let selectString = "";
      if (select) {
         const selectList = select.split(",").join(" ");
         selectString = selectList;
      }
      // pagination funcationality
      let limitNumber;
      if (limit) limitNumber = Number(limit);
      let skipNumber;
      if (skip) skipNumber = Number(skip);
      // Numeric filters
      if (filter) {
         const operatorMap = {
            ">": "$gt",
            "<": "$lt",
            ">=": "$gte",
            "<=": "$lte",
            "=": "$eq",
         };
         const regEx = /\b(<|>|<=|>=|=)\b/g;
         let filteredText = filter.replace(
            regEx,
            (match) => `-${operatorMap[match]}-`
         );
         const options = ["price", "rating"];
         filteredText = filteredText.split(",").forEach((item) => {
            const [field, operator, value] = item.split("-");
            if (options.includes(field)) {
               queryObject[field] = { [operator]: Number(value) };
            }
         });
         console.log(filteredText);
      }
      const products = await Product.find(queryObject)
         .select(selectString)
         .sort(sortString)
         .limit(limitNumber)
         .skip(skipNumber);
      res.status(200).json({ total: products.length, products });
   } catch (err) {
      next(err);
   }
};

module.exports = {
   getAllProductStatic,
   getAllProduct,
};
