const express = require('express');
const app = express();
const demoMode = require('./middleware/demoMode');
const adminDemo = require('./routes/adminDemo');
const adminsRoutes = require('./routes/admins');

app.use(express.json());
app.use(demoMode); // Appliquer à toutes les routes API
app.use('/admin/demo', adminDemo); // Monter les routes adminDemo
app.use('/api/admins', adminsRoutes); // Monter les routes administrateurs

module.exports = app; 