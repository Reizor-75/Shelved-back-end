import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, profilesCtrl.index)
router.get('/show', checkAuth, profilesCtrl.show)
router.put('/update', checkAuth, profilesCtrl.update)
router.put('/readlist/:bookId', checkAuth, profilesCtrl.deleteBookReadList)
router.put('/wishlist/:bookId', checkAuth, profilesCtrl.deleteBookWishList)
router.put('/:id/add-photo', checkAuth, profilesCtrl.addPhoto)

export { router }
