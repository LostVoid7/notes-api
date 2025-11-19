import pool from '../config/db.js';


// Get all notes
export const getAllNotes = async (req, res) => {
    const userId = req.user.userId;

    const results = await pool.query(
        `SELECT title, content FROM notes
        WHERE user_id = $1`, [userId]
    )
    res.json(results.rows);
}

// Create a note
export const createNote = async (req, res) => {
    const note = {
        id: Date.now().toString(),
        title: req.body.title,
        body: req.body.content
    };
    const userId = req.user.userId;

    if (!note.title || !note.body) {
        res.status(401).json({message: "Title and content required"});
    }

    try {
        const result = await pool.query(
            `INSERT INTO notes (user_id, title, content)
            VALUES ($1, $2, $3)
            RETURNING *`, 
            [userId, note.title, note.body]
        )

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating note' });
    }
}

// Get a single note
export const getNote = async (req, res) => {
  try {
    const userId = req.user.userId;
    const noteId = req.params.id;

    const result = await pool.query(
      'SELECT * FROM notes WHERE id=$1 AND user_id=$2',
      [noteId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ msg: 'Note not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Update a note
export const updateNote = async (req, res) => {
  try {
    const userId = req.user.userId;
    const noteId = req.params.id;
    const { title, content } = req.body;

    const result = await pool.query(
      'UPDATE notes SET title=$1, content=$2, updated_at=NOW() WHERE id=$3 AND user_id=$4 RETURNING *',
      [title, content, noteId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ msg: 'Note not found or not authorized' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};


// Delete a note
export const deleteNote = async (req, res) => {
  try {
    const userId = req.user.userId;
    const noteId = req.params.id;

    const result = await pool.query(
      'DELETE FROM notes WHERE id=$1 AND user_id=$2 RETURNING *',
      [noteId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ msg: 'Note not found or not authorized' });
    }

    res.status(200).json({ msg: 'Note deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};


