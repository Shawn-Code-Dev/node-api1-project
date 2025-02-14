const express = require('express')
const User = require('./users/model')

const server = express()

server.use(express.json())

// try {} catch (err) {}

// GET '/api/users' - returns an array of users
server.get('/api/users', async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({
      message: "The users information could not be retrieved"
    })
  }
})

// GET '/api/users/:id' - returns the user object with the specified ID
server.get('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) {
      res.status(404).json({ message: "The user with the specified ID does not exist" })
    } else {
      res.status(200).json(user)
    }
  } catch (err) {
    res.status(500).json({message: "The user information could not be retrieved"})
  }
})

// POST '/api/users' - creates a user using the information sent inside the request body
server.post('/api/users', async (req, res) => {
  try {
    const { name, bio } = req.body
    if (!name || !bio) {
      res.status(400).json({ message: "Please provide name and bio for the user" })
    } else {
      const newUser = await User.insert({ name, bio })
      res.status(201).json(newUser)
    }
  } catch (err) {
    res.status(500).json({ message: "There was an error while saving the user to the database" })
  }
})

// PUT '/api/users/:id' - updates the user with the specified id using data from the request body, then returns the modified user
server.put('/api/users/:id', async (req, res) => {
  try {
    const { name, bio } = req.body
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) {
      res.status(404).json({ message: "The user with the specified ID does not exist" })
    } else if (!name || !bio) {
      res.status(400).json({ message: "Please provide name and bio for the user" })
    } else {
      const updatedUser = await User.update(id, { name, bio })
      res.json(updatedUser)
    }
  } catch (err) {
    res.status(500).json({ message: "The user information could not be modified" })
  }
})

// DELETE '/api/users/:id' - removes the user with the specified id and returns the deleted user
server.delete('/api/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.remove(req.params.id)
    if (!deletedUser) {
      res.status(404).json({ message: "The user with the specified ID does not exist" })
    } else {
      res.json(deletedUser)
    }
  } catch (err) {
    res.status(500).json({ message: "The user could not be removed" })
  }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}