const getSortItem = (sort) => {
  if (sort === "Cheapest") {
    return { price: 1 };
  }
  if (sort === "Recommended") {
    return { rating: -1 };
  }
};

module.exports = { getSortItem };
