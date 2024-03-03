/* eslint-disable no-unused-vars */
const express = require('express');
const { User, SplitGroup, GroupMember } = require('./models');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

// Route for creating a split group for a user
app.post('/api/splitGroups', async (req, res) => {
  try {
    // Parse request data
    const { user_id, group_name, description } = req.body;

    // Validate data (ensure group_name is provided, etc.)
    if (!group_name) {
      return res.status(400).json({ error: 'Group name is required.' });
    }

    // Create SplitGroup
    const splitGroup = await SplitGroup.create({ name: group_name, description });

    // Associate user with the group
    await GroupMember.create({ user_id, group_id: splitGroup.group_id });

    // Send success response
    res.status(201).json({ message: 'Split group created successfully.', data: splitGroup });
  } catch (error) {
    console.error('Error creating split group:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

/* // Item model
 * const Item = require('./models/Item');
 * 
 * // Create item
 * app.post('/api/items', (req, res) => {
 *   const newItem = new Item({
 *     name: req.body.name,
 *     description: req.body.description
 *   });
 * 
 *   newItem.save()
 *     .then((item) => {
 *       res.json(item);
 *     })
 *     .catch((error) => {
 *       console.error('Failed to create item', error);
 *       res.status(500).json({ error: 'Failed to create item' });
 *     });
 * });
 * 
 * // Get all items
 * app.get('/api/items', (req, res) => {
 *   Item.find()
 *     .then((items) => {
 *       res.json(items);
 *     })
 *     .catch((error) => {
 *       console.error('Failed to fetch items', error);
 *       res.status(500).json({ error: 'Failed to fetch items' });
 *     });
 * });
 * 
 * // Get single item
 * app.get('/api/items/:id', (req, res) => {
 *   Item.findById(req.params.id)
 *     .then((item) => {
 *       if (!item) {
 *         return res.status(404).json({ error: 'Item not found' });
 *       }
 *       res.json(item);
 *     })
 *     .catch((error) => {
 *       console.error('Failed to fetch item', error);
 *       res.status(500).json({ error: 'Failed to fetch item' });
 *     });
 * });
 * 
 * // Update item
 * app.put('/api/items/:id', (req, res) => {
 *   Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
 *     .then((item) => {
 *       if (!item) {
 *         return res.status(404).json({ error: 'Item not found' });
 *       }
 *       res.json(item);
 *     })
 *     .catch((error) => {
 *       console.error('Failed to update item', error);
 *       res.status(500).json({ error: 'Failed to update item' });
 *     });
 * });
 * 
 * // Delete item
 * app.delete('/api/items/:id', (req, res) => {
 *   Item.findByIdAndDelete(req.params.id)
 *     .then(() => {
 *       res.json({ message: 'Item deleted' });
 *     })
 *     .catch((error) => {
 *       console.error('Failed to delete item', error);
 *       res.status(500).json({ error: 'Failed to delete item' });
 *     });
 * });
 */

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
