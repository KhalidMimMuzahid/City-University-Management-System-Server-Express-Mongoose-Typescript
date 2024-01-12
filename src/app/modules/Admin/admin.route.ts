import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { adminValidations } from './admin.validation';
import { adminControllers } from './admin.controller';

const router = express.Router();

router.get('/', adminControllers.getAllAdmins);

router.get('/:_id', adminControllers.getSingleAdmin);

router.patch(
  '/:_id',
  validateRequest(adminValidations.updateAdminValidationSchema),
  adminControllers.updateAdmin,
);

router.delete('/:_id', adminControllers.deleteAdmin);

export const AdminRoutes = router;
