const router = require('express').Router();
const controller = require('../controllers/order.controller');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

router.use(protect, authorize('admin', 'gestionnaire'));

router.post('/generate-low-stock', controller.generateLowStockOrder);

router.route('/')
  .get(controller.list)
  .post(controller.create);

router.get('/:id/pdf', controller.downloadPdf);
router.get('/:id', controller.getById);
router.patch('/:id/status', controller.updateStatus);

module.exports = router;
