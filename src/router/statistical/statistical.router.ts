import express from 'express';
import { checkAuthor } from '../../middleware';
import { statisticalController } from './index';

const router = express.Router();

router.get('/:id/growth',checkAuthor(['Authorization','Supplier']), statisticalController.getStatisticalGrowth);
router.get('/:id',checkAuthor(['Authorization','Supplier']), statisticalController.getStatistical);


export default router;