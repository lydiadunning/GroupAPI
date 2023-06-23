# GroupAPI

## _An API for dividing people into differently sized groups_

## Table of contents

- [Routes](#routes)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)


## Routes
  **/team** returns a full list of team members
  **/groups/{ size of group }** returns groupings of team memebers into the specified group size.
  **/roundrobin** returns sequences of users.
  **/new** adds a team member, provide a teamMember parameter in the request body.
  **/combine** adds an array of team members, send an array, teamMembers, in the request body. 
  **/delete/{ team member name }** removes a team member from the list of team members.

## My process

### Built with

- Node JS
- Express

### What I learned

Arguments sent via routes can contain a '-', but the parameter name cannot.

### Continued development

This is an extremely simple API, with no persistant back end. In the best case, it would probably use a database to accommodate several projects at once. It could hide the full list of projects, and allow users to join a group if they have a link.
This could be wildly complicated, taking people's schedules, preferences, and locations or timezones into account.

In its current state, it would benefit from more randomization in the round-robin function, routes or body parameters for differentiating various approaches to handling uneven group sizes, and the option to group into a specified number of groups.

