import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import csurf from 'csurf';
import swaggerUi from 'swagger-ui-express';
import mainRatelimiter from './middlewares/ratelimit.middleware.js';
import rateSlowDown from './middlewares/slowdown.middleware.js';
import repositoryRoutes from './routes/repository.route.js';
import swaggerDocs from './config/swagger.config.js';
import corsOptions from './config/cors.config.js';
import adminRoutes from './routes/admin.route.js';
import compressionConfig from './config/compression.config.js';


const app = express();
const port = 4000;

// Cors con configuracion
app.use(cors(corsOptions));
// Middleware de compresión
app.use(compression(compressionConfig));

// Configuración de Swagger - Adicional opcional
app.use('/admin/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas
app.get('/', rateSlowDown, (req, res) => { 
  res.status(200).send('Main ADMIN');
});
app.use('/admin', mainRatelimiter, repositoryRoutes);

app.use('/admin', adminRoutes);

app.listen(port, () => {
  console.log(`Service Admin node listening on port ${port}`);
});
