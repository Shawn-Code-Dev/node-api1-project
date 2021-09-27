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


// PUT '/api/users/:id' - updates the user with the specified id using data from the request body, then returns the modified user


// DELETE '/api/users/:id' - removes the user with the specified id and returns the deleted user


module.exports = server; // EXPORT YOUR SERVER instead of {}