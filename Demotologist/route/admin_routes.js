const router = require('express').Router()
const admin = require('../controller/admin_controller')

// 
router.post('/booking',admin.newBooking)
router.get('/search/:id',admin.searchBooking)
router.put('/update/:id',admin.updateBooking)
router.delete('/delete/:id',admin.deleteBooking)
router.get('/latest',admin.latestSchedule)

module.exports = router