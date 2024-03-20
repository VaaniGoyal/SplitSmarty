/* eslint-disable no-unused-vars */
const express = require('express');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

const db = require('./models')
// db.sequelize.sync({ force: true })
//   .then(() => {
//     console.log("Synced db");
//   })
//   .catch(err => {
//     console.log("Failed to sync db")
//   })

// import routes from controllers
const userController = require('./controllers/user.controller.js')
const authRoutes = require('./routes/requireAuth');

// routes
app.post('/signup', userController.signup)
app.post('/login', userController.login)
app.get('/logout', userController.logout)

app.use('/auth', authRoutes);

require('./routes/user.routes')(app);
require('./routes/splitgroup.routes')(app);
require('./routes/split.routes')(app);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}\n\n`);
});
