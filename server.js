import express from 'express';
import housesRoutes from './routes/houses.routes.js';
import teachersRoutes from './routes/teachers.routes.js';
import studentsRoutes from './routes/students.routes.js';
import coursesRoutes from './routes/courses.routes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(express.json());

// Hvis der ikke sendes en body, så brug et tomt objekt
app.use((req, res, next) => {
  if (!req.body) req.body = {};
  next();
});

app.use('/houses', housesRoutes);
app.use('/teachers', teachersRoutes);
app.use('/students', studentsRoutes);
app.use('/courses', coursesRoutes);

// Ukendt route
app.use((req, res) => {
  res.status(404).json({ error: 'Route findes ikke' });
});

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Hogwarts API kører på http://localhost:${port}`));
