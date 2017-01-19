import express from 'express';
import { isAuthenticated } from '../../services/authentication';
import Template from './template.model';
import * as ctrl from './template.controller';

const router = new express.Router();

/**
 * @api {get} /pages       Get all pages
 * @apiName listPages
 * @apiGroup Pages
 * @apiPermission public
 * @apiSuccess {Object[]} roles List of pages.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/', ctrl.listTemplates);
router.get('/:name', ctrl.getTemplateByResource);
router.post('/', isAuthenticated, ctrl.createTemplate);

export default router;
