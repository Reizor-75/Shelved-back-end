import { Router } from 'express'
import { decodeUserFromToken, checkAuth, checkAuthor } from '../middleware/auth.js'
import * as booksCtrl from '../controllers/books.js'

const router = Router()

/*---------- Public Routes ----------*/
router.get('/', booksCtrl.index)
router.get('/:bookId', booksCtrl.show)
router.post('/search', booksCtrl.search)
router.post('/create', booksCtrl.create)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/:bookId/review', checkAuth, booksCtrl.createReview)
router.put('/:bookId/readlist', checkAuth, booksCtrl.addReadList)
router.put('/:bookId/wishlist', checkAuth, booksCtrl.addWishList)
router.put('/:bookId/update', checkAuthor, booksCtrl.update)
router.put('/:bookId/:reviewId', checkAuth, booksCtrl.updateReview)
router.delete('/:bookId/:reviewId', checkAuth, booksCtrl.deleteReview)

export { router }
