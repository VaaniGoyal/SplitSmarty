const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/crud-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  });

// Item model
const Item = require('./models/Item');

// Create item
app.post('/api/items', (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    description: req.body.description
  });

  newItem.save()
    .then((item) => {
      res.json(item);
    })
    .catch((error) => {
      console.error('Failed to create item', error);
      res.status(500).json({ error: 'Failed to create item' });
    });
});

// Get all items
app.get('/api/items', (req, res) => {
  Item.find()
    .then((items) => {
      res.json(items);
    })
    .catch((error) => {
      console.error('Failed to fetch items', error);
      res.status(500).json({ error: 'Failed to fetch items' });
    });
});

// Get single item
app.get('/api/items/:id', (req, res) => {
  Item.findById(req.params.id)
    .then((item) => {
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.json(item);
    })
    .catch((error) => {
      console.error('Failed to fetch item', error);
      res.status(500).json({ error: 'Failed to fetch item' });
    });
});

// Update item
app.put('/api/items/:id', (req, res) => {
  Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((item) => {
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.json(item);
    })
    .catch((error) => {
      console.error('Failed to update item', error);
      res.status(500).json({ error: 'Failed to update item' });
    });
});

// Delete item
app.delete('/api/items/:id', (req, res) => {
  Item.findByIdAndDelete(req.params.id)
    .then(() => {
      res.json({ message: 'Item deleted' });
    })
    .catch((error) => {
      console.error('Failed to delete item', error);
      res.status(500).json({ error: 'Failed to delete item' });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
