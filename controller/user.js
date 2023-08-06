import fs from 'fs';

const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'))
const users=data.users

//create
export const createUser = (req, res) => {
    (users).push(req.body)
    res.json(req.body).sendStatus(201)
}
// getAll
export const getAllUsers = (req, res) => {
    // console.log(req.params)
    res.json(users)
}
//get
export const getUser = (req, res) => {
    const id = req.params.id;
    res.json((users).find((curr) => curr.id == id))
}
//replace
export const replaceUser = (req, res) => {
    const id = +req.params.id;
    const idx = (users).findIndex((curr) => curr.id == id)
    users.splice(idx, 1, { ...users[idx], ...req.body })
    res.json(req.body)
}
//update
export const updateUser = (req, res) => {
    const id = +req.params.id;
    const obj = req.body;
    const idx = (users).findIndex((curr) => curr.id == id)
    users.splice(idx, 1, { ...obj, id: id })
    res.json(req.body)
}
//delete
export const deleteUser = (req, res) => {
    const id = req.params.id;
    // console.log(id)
    // console.log(users)
    const idx = (users).findIndex((curr) => curr.id == id);
    const oldObj = users[idx];
    (users).splice(idx, 1)
    res.json(oldObj)
}