const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable for development
}));

// Performance middleware
app.use(compression());

// Logging middleware
app.use(morgan('combined'));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1y', // Cache static files for 1 year
  etag: false
}));

// Body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.render('index', { 
    title: 'Arty Hospitality - Managinnovation',
    page: 'home'
  });
});

app.get('/about', (req, res) => {
  res.render('about', { 
    title: 'About Us',
    page: 'about'
  });
});

app.get('/features', (req, res) => {
  res.render('features', { 
    title: 'Product Features',
    page: 'features'
  });
});

app.get('/contact', (req, res) => {
  res.render('contact', { 
    title: 'Contact Us',
    page: 'contact'
  });
});

// Handle contact form submission
app.post('/contact', (req, res) => {
  const { name, email, company, message } = req.body;
  
  // In a real application, you would save this to a database or send an email
  console.log('Contact form submission:', { name, email, company, message });
  
  res.render('contact', { 
    title: 'Contact Us',
    page: 'contact',
    success: 'Thank you for your inquiry! We will get back to you soon.'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', { 
    title: '404 - Page Not Found',
    page: '404'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500', { 
    title: '500 - Server Error',
    page: '500'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
