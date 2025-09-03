const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    // User exists and is admin — allow request
    next();
  } else {
    // Either not logged in or not admin
    res.status(403).json({ message: "Error adding products. Make sure you are logged in as admin." });
  }
};

export default authorizeAdmin;
