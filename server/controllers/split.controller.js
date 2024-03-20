import { Split as _Split, SplitGroup } from '../models';
const Split = _Split;

// Add a new split to a group
async function addSplit(req, res) {
    try {
        const { description, amount } = req.body;
        const groupId = req.params.groupId;
        // Create the split with the provided group ID
        const newSplit = await Split.create({
            description: description,
            amount: amount,
            groupId: groupId
        });
        res.status(201).json(newSplit);
    } catch (error) {
        console.error("Error adding split:", error);
        res.status(500).json({ error: "Failed to add split to group." });
    }
}

// Delete a split from the group
async function deleteSplit(req, res) {
    try {
        const groupId = req.params.groupId;
        const splitId = req.params.splitId;
        // Find the split by ID and group ID
        const split = await Split.findOne({
            where: { id: splitId, groupId: groupId }
        });
        if (!split) {
            return res.status(404).json({ error: "Split not found in group." });
        }
        await split.destroy();
        res.status(204).end();
    } catch (error) {
        console.error("Error deleting split:", error);
        res.status(500).json({ error: "Failed to delete split." });
    }
}

// Pay a split if the member is included in it
async function paySplit(req, res) {
    try {
        const groupId = req.params.groupId;
        const splitId = req.params.splitId;
        // Find the split by ID and group ID
        const split = await Split.findOne({
            where: { id: splitId, groupId: groupId }
        });
        if (!split) {
            return res.status(404).json({ error: "Split not found in group." });
        }
        // Update split payment status here
        // Example: split.paid = true;
        await split.save();
        res.status(200).json({ message: "Split paid successfully." });
    } catch (error) {
        console.error("Error paying split:", error);
        res.status(500).json({ error: "Failed to pay split." });
    }
}

// get all splits in a group
async function getAllSplits(req, res, next) {
    try {
        const groupId = req.params.groupId;
        const groupSplits = await SplitGroup.Split.findAll({
            where: {
                group_id: groupId
            }
        }).then(
            data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occured while getting data. Please try again!"
                });
            });
        res.json(groupSplits);
    } catch (error) {
        next(error);
    }
}

// settle up expenses of a given user
async function settleUp(req, res, next) {
    const userId = req.params.userId;
    const groupId = req.params.groupId;

    // get all splits involving userId in that gropId
    let splits = [];
    
}

const spltController = {
    getAllSplits,
    addSplit,
    deleteSplit,
    paySplit,
    settleUp
};

export default spltController