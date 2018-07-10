import express from 'express';
import data from '../src/testData';

const router = express.Router();

router.get('/events', (req, res) => {
    res.json({ events : data.events.reduce((obj, event) => {
        obj[event.id] = event;
        return obj;
    }, {})
    });
});

export default router;