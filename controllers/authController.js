// You can implement user registration logic here if needed

// Example of protecting a route
const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  };
  
  module.exports = {
    ensureAuthenticated,
  };
  
  