const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const User = require('./models/user');
const authController = require('./controllers/authController');

const app = express();

const port = process.env.PORT || 3000;

// Define the MONGO_URI using the environment variable
const MONGO_URI = process.env.MONGO_URI;

// Connect to your database (e.g., MongoDB)
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true, // Add this line
  })
  .then(() => {
    console.log('Connected to the database');
    // Your application-specific code can go here
  })
  .catch((err) => console.error('Database connection error:', err));
  app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));

  // Initialize Passport
  app.use(passport.initialize());
  app.use(passport.session());
  
  // Configure local strategy for Passport
  passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false);
        if (user.password !== password) return done(null, false);
        return done(null, user);
      });    })
  );
  
  // Serialize user for session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  // Deserialize user from session
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
  
  app.get('/', (req, res) => {
    // Send "Hello, World!" as the response
    res.send('Hello, World!');
  });

app.use('/auth', authRoutes);


  
  
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
