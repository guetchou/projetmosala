const express = require('express');
const app = express();
const demoMode = require('./middleware/demoMode');
const adminDemo = require('./routes/adminDemo');
// ... autres imports ...

app.use(express.json());
app.use(demoMode); // Appliquer à toutes les routes API
app.use('/admin/demo', adminDemo); // Monter les routes adminDemo
// ... autres routes ...

module.exports = app; 