// Checks if user is logged in, if not redirects them to the login page
module.exports = function(req, res, next) {
  if (req.user) {
    return next();
  }
  return res.redirect("/login");
};
