import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as booksCtrl from '../controllers/books.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, booksCtrl.index)
router.post('/create', checkAuth, booksCtrl.create)
router.get('/:bookId', checkAuth, booksCtrl.show)
router.put('/:bookId/update', checkAuth, booksCtrl.update)

export { router }
