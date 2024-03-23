import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, profilesCtrl.index)
router.get('/:userId', checkAuth, profilesCtrl.show)
router.put('/:userId/update', checkAuth, profilesCtrl.update)
router.put('/:userId/following', checkAuth, profilesCtrl.addToFollowing)
router.put('/:bookId', checkAuth, profilesCtrl.deleteBookReadList)
router.put('/readlist/:bookId', checkAuth, profilesCtrl.deleteBookReadList)
router.put('/wishlist/:bookId', checkAuth, profilesCtrl.deleteBookWishList)
router.put('/wishlist/:bookId/updateList', checkAuth, profilesCtrl.moveBook)
router.put('/:id/add-photo', checkAuth, profilesCtrl.addPhoto)

export { router }
