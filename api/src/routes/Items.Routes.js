import { Router } from 'express'
import { setDatabaseConnection } from '../middleware/setDatabase.js'
import { createItem, getItems, deleteItem, updateItem, getItem } from '../controllers/Items.Controllers.js'

export const ItemsMongoDB = Router()

ItemsMongoDB.post('/createItem', setDatabaseConnection, createItem)

ItemsMongoDB.get('/getItem/:company/:id', setDatabaseConnection, getItem)

ItemsMongoDB.get('/getItems/:company', setDatabaseConnection, getItems)

ItemsMongoDB.patch('/updateItem', setDatabaseConnection, updateItem)

ItemsMongoDB.delete('/deleteItem/:company/:id', setDatabaseConnection, deleteItem)
