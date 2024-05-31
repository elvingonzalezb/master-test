import express from 'express';
import { getPopularRepositories } from '../services/repository.service.js';

/**
 * @swagger
 * tags:
 *   name: Repositories
 *   description: API for repositories
 */

/**
 * @swagger
 * /admin/repositories:
 *   get:
 *     summary: Get the 10 most popular repositories of user "google"
 *     tags: [Repositories]
 *     responses:
 *       200:
 *         description: A list of repositories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   full_name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   url:
 *                     type: string
 *                   stars:
 *                     type: integer
 *                   avatar:
 *                     type: string
 */
const router = express.Router();

router.get('/repositories', getPopularRepositories);

export default router;
