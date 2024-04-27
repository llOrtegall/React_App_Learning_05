import { RegisterServices } from '../services/users.services'
import { validateUser } from '../schemas/user.schema'
import { Request, Response } from 'express'
import { MySQLError } from '../types/Mysql'

export const createUser = async (req: Request, res: Response) => {
  // TODO: recibe los datos del usuario y los valida con zod
  const validUser = validateUser(req.body)

  // TODO: si la validación falla, responde con un error 400 y el error del schema
  if (!validUser.success) {
    return res.status(400).json(validUser.error)
  }

  // TODO: llama al servicio de registro de usuarios y responde con el resultado de type ResultSetHeader (mysql2)
  try {
    const result = await RegisterServices(validUser.data)
    if (result.affectedRows > 0) {
      return res.status(201).json({ message: 'Usuario creado correctamente' })
    }
  } catch (error) {
    const err = error as MySQLError
    console.error(err) // Log all errors
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'El usuario ya se encuentra registrado' })
    }
    if (err.code === 'ECONNREFUSED') {
      return res.status(500).json({ message: 'Error de conexión con la base de datos' })
    }
    return res.status(500).json({ message: 'Error interno del servidor' })
  }
}