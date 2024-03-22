import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as booksCtrl from '../controllers/books.js'

const router = Router()

/*---------- Public Routes ----------*/
router.get('/', booksCtrl.index)
router.get('/:bookId', booksCtrl.show)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/create', checkAuth, booksCtrl.create)
router.put('/:bookId/update', checkAuth, booksCtrl.update)

export { router }
