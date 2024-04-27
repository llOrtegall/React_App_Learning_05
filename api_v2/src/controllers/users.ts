import { RegisterServices } from '../services/users.services'
import { validateUser } from '../schemas/user.schema'
import { Request, Response } from 'express'

export const createUser = async (req: Request, res: Response) => {
  const result = validateUser(req.body)

  if (!result.success) {
    return res.status(400).json(result.error)
  }

  RegisterServices(result.data)
    .then(result => { console.log(result)})
    .catch(error => { console.log(error)})
}








/*
// import { getUsersService } from '../services/users'
// import jwt from 'jsonwebtoken'

// const JWT_SECRET = process.env.JWT_SECRET

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await getUsersService()
    return res.status(200).json(users)
  } catch (error) {
    return res.status(500).json(error)
  }
}


export const UserByToken = async (req, res) => {
  const bearerHeader = req.headers.authorization

  if (!bearerHeader) {
    return res.status(401).json({ message: 'No Token Provided' })
  }

  const bearer = bearerHeader.split(' ')
  const token = bearer[1]

  try {
    const result = jwt.verify(token, JWT_SECRET)
    return res.status(200).json(result)
  } catch (error) {
    return res.status(401).json({ message: error.message })
  }
}

export const Login = async (req, res) => {
  try {
    const result = await LoginService(req.body)
    const token = jwt.sign(result, JWT_SECRET, { expiresIn: '2h' })
    return res.status(200).json({ auth: true, token })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}
*/
