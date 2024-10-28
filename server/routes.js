// routes.js
const express = require('express');
const { Board, Recruit } = require('./models'); 
const bcrypt = require('bcryptjs'); 

const router = express.Router();


router.post('/signup', async (req, res) => {
    const { username, password, role } = req.body;

    try {
        
        let existingUser;
        if (role === 'Board') {
            existingUser = await Board.findOne({ username });
        } else {
            existingUser = await Recruit.findOne({ username });
        }

        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        
        let newUser;
        if (role === 'Board') {
            newUser = new Board({ username, password: hashedPassword });
        } else {
            newUser = new Recruit({ username, password: hashedPassword });
        }

        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/login/board', async (req, res) => {
    const { username, password } = req.body;

    try {
        
        const boardMember = await Board.findOne({ username });

        if (!boardMember) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        
        const isPasswordMatch = await bcrypt.compare(password, boardMember.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        res.status(200).json({ message: 'Board member logged in successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/login/recruit', async (req, res) => {
    const { username, password } = req.body;

    try {
        
        const recruit = await Recruit.findOne({ username });

        if (!recruit) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        
        const isPasswordMatch = await bcrypt.compare(password, recruit.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Send a success response
        res.status(200).json({ message: 'Recruit logged in successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
