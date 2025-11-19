import express from 'express';
import { getAllNotes, createNote, getNote, updateNote, deleteNote } from '../controllers/noteController.js'
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', createNote);
router.get('/', getAllNotes);
router.get('/:id', getNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;

