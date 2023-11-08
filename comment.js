// Create web server

const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

// Get all comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// Get one comment
router.get('/:id', getComment, (req, res) => {
    res.json(res.comment);
});

// Create one comment
router.post('/', async (req, res) => {
    const comment = new Comment({
        comment: req.body.comment,
        user: req.body.user,
        post: req.body.post
    });
    try {
        const newComment = await comment.save();
        res.status(201).json(newComment);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}
);

// Update one comment
