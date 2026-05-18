import express from 'express';
import * as leadController from '../controllers/leadController';
import { protect } from '../middleware/auth';

const router = express.Router();

// All routes are protected
router.use(protect);

router
  .route('/')
  .get(leadController.getLeads)
  .post(leadController.createLead);

router
  .route('/:id')
  .get(leadController.getLeadById)
  .put(leadController.updateLead)
  .delete(leadController.deleteLead);

export default router;
