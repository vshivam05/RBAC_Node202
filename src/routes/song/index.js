import express from 'express';
import { Song } from '../../models/index.js';
import { canUserDownloadSong, canUserLikeSong } from '../../../middleware/authorize.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const songs = await Song.find({});
    res.status(200).json({
        data: {
            songs
        }
    })
})

router.post('/like', canUserLikeSong, async (req, res) => {
    res.status(201).json({
        data: 'Song Liked'
    })
})

router.get('/download', canUserDownloadSong, async (req, res) => {
    try {

        res.status(200).json({
            data: 'blob'
        })
    } catch (e) {
        res.status(500).json({ error: 'Failed to download song' });
    }
})


export default router;