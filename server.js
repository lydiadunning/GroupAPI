const express = require('express')
const app = express()

const port = 8080

// Team Randomizer - stores a list of team members. Pairs team members into groups of the specified sizes

const teamMembers = {allTeamMembers: []}

app.use(express.static('public'))
app.use(require("body-parser").json());


/**
 *  serves an html file describing how to interact with this API
 */ 
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

/** 
 * @returns all contents of the teamMembers object
 */ 
app.get('/team', (req, res) => {
  res.json(teamMembers)
})

/**
 * @param {integer} groupsize included in the route
 * @returns {json} array of team members divided into groups with the specified number of members
 */
app.get('/groups/:groupsize(\\d+)', (req, res) => {
  const team = [...teamMembers.allTeamMembers].sort((a, b) => Math.random() > .5 ? 1 : -1)
  const groups = []
  while (team.length > req.params.groupsize) {
    const newGroup = []
    for (let i = 0; i < req.params.groupsize; i++) {
      newGroup.push(team.pop())
    }
    groups.push(newGroup)
  }
  groups.push(team)
  res.json(groups)
})

/**
 * @returns {json} a json object containing arrays of unique sequences of team members.
 */
app.get('/roundrobin', (req, res) => { 
  const sequences = {}
  for(let i = 0; i < teamMembers.allTeamMembers.length; i++) {
    sequences[i] = [
      ...teamMembers.allTeamMembers.slice(i), 
      ...teamMembers.allTeamMembers.slice(0, i)
    ]
  }
  res.json(sequences)
})

/**
 * @param {string} teamMember sent in the request body, a new team member to add
 */
app.post('/new', (req, res) => {
  teamMembers.allTeamMembers.push(req.body.teamMember)
  res.json(req.body)
})

app.post('/combine', (req, res) => {
  teamMembers.allTeamMembers.push(...req.body.teamMembers)
  res.json(req.body)
})

/**
 * @param {array} teamMember sent in the request body, an array of team members to add
 */
app.put('/change', (req, res) => {
  console.log(req.body.toChange, req.body.newName)
  const {newName, toChange} = req.body
  const index = teamMembers.allTeamMembers.indexOf(toChange) 
  if (index >= 0) {
    teamMembers.allTeamMembers[index] = newName
    res.send(`${toChange} changed to ${newName}`)
  } else {
    res.send(`${toChange} not found in the team member list.`)
  }
})

/**
 * @param {string} teamMember included in the route, sent with a dash in place of any spaces
 * /delete ignores case
 */
app.delete('/delete/:teamMember', (req, res) => { //:teamMember-name
  const name = req.params['teamMember'].toLowerCase().replace('-', ' ')
  const teamMemberName = teamMembers.allTeamMembers.filter(teamMember => {
    teamMember.toLowerCase() === name
  })
  if (teamMemberName){
    teamMembers.allTeamMembers.splice(teamMembers.allTeamMembers.indexOf(teamMemberName), 1)
    res.send(`${name} removed from the team member list`)
  } else {
    res.send(`${name} is not in the team member list`)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
