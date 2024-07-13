require("dotenv").config();
const config = require("./config.json");
const mongoose = require("mongoose");
mongoose.connect(config.connectionString);
const express = require("express");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");
const User = require("./models/user.model");
const Note = require("./models/note.model");

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", async (req, res) => {
  res.json({ data: "hello" });
});

// All my Applications APIs

// Create account
app.post("/create-account", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName) {
    return res
      .status(400)
      .json({ error: true, message: "Please enter full name." });
  }

  if (!email) {
    return res
      .status(400)
      .json({ error: true, message: "Please enter email." });
  }

  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Please enter password." });
  }

  const isUser = await User.findOne({
    email: email,
  });

  if (isUser) {
    return res.json({ error: true, message: "Email already exists." });
  }

  const user = new User({
    fullName,
    email,
    password,
  });

  await user.save();

  const accessTocken = jwt.sign({ user }, process.env.ACCESS_TOKEN, {
    expiresIn: "36000m",
  });

  return res.json({
    error: false,
    user,
    accessTocken,
    message: "Account created successfully",
  });
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Please enter email." });
  }

  if (!password) {
    return res.status(400).json({ message: "Please enter password." });
  }

  const userInfo = await User.findOne({ email: email });

  if (!userInfo) {
    return res.status(400).json({ message: "user not found." });
  }

  if (userInfo.email == email && userInfo.password == password) {
    const user = { user: userInfo };
    const accessTocken = jwt.sign(user, process.env.ACCESS_TOKEN, {
      expiresIn: "36000m",
    });

    return res.json({
      error: false,
      message: "Logged in successfully",
      email,
      accessTocken,
    });
  } else {
    return res
      .status(400)
      .json({ error: true, message: "Invalid Credentials" });
  }
});

// Get User
app.get("/get-user",authenticateToken, async (req, res) => {
    const { user } = req.user;
    const isUser = await User.findOne({_id:user._id});

    if(!isUser){
        return res.status(401).json({ message: "User not found." });
    }

    return res.json({ 
        user: { fullName:isUser.fullName, email:isUser.email, "_id":isUser._id, cratedOn:isUser.createdOn},
        messages:""
    });



});

// Add Notes
app.post("/add-note", authenticateToken, async (req, res) => {
  const { title, content, tags } = req.body;

  const { user } = req.user;

  if (!title) {
    return res
      .status(400)
      .json({ error: true, message: "Please enter title." });
  }

  if (!content) {
    return res
      .status(400)
      .json({ error: true, message: "Please enter content." });
  }

  try {
    // Save the note to the database
    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: user._id,
    });

    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note added successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal server error." });
  }
});

// Edit note
app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { title, content, tags, isPinned } = req.body;
  const { user } = req.user;

  if (!title && !content && !tags) {
    return res
      .status(400)
      .json({ error: true, message: " No Changes Provided " });
  }

  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found." });
    }

    if (title) {
      note.title = title;
    }

    if (content) {
      note.content = content;
    }

    if (tags) {
      note.tags = tags;
    }

    if (isPinned) {
      note.isPinned = isPinned;
    }

    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note updated successfully",
    });
  } catch (e) {
    return res
      .status(500)
      .json({ error: true, message: "Internal server error." });
  }
});

// Get-all-notes
app.get("/get-all-notes/", authenticateToken, async (req, res) => {
  const { user } = req.user;

  try {
    const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });

    return res.json({
      error: false,
      notes,
      message: "Notes retrieved successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: true, message: "Internal server error." });
  }
});


// delete notes
app.delete('/delete-note/:noteId', authenticateToken, async (req, res)=>{
    const noteId = req.params.noteId;
    const { user } = req.user;

    try {
        const note = await Note.findOne({_id: noteId, userId: user._id});
        if(!note) {
            return res.status(404).json({error: true, message: 'Note not found'});
        }

        await Note.deleteOne({_id: noteId, userId: user._id});

        return res.json({error: false, message: 'Note deleted successfully'});

    } catch (err){
        console.log(err);
        return res.status(500).json({error: true, message: 'Internal server error',});
    }

});

// update isPinned Value
app.put('/update-note-pinned/:noteId', authenticateToken, async (req, res)=>{
    const noteId = req.params.noteId;
  const { isPinned } = req.body;
  const { user } = req.user;



  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found." });
    }

    
      note.isPinned = isPinned;
    

    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note updated successfully",
    });
  } catch (e) {
    return res
      .status(500)
      .json({ error: true, message: "Internal server error." });
  }

});


app.listen(8000);

module.exports = app;

