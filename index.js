import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import dbConnection from './helpers/dbconnect.js';

import { authRoutes, userRoutes, songRoutes } from './src/routes/index.js';
import authenticate from './middleware/authenticate.js';

try {
	await dbConnection;
	const app = express();
	const port = process.env.PORT;

	app.use(cors())
	app.use(express.json());
	app.use('/api/auth', authRoutes);
	app.use(authenticate);
	app.use('/api/user', userRoutes)
	app.use('/api/song', songRoutes)

	app.get('/', (req, res) => {
		res.send('Hello World!')
	})

	app.listen(port, () => {
		console.log(`app listening on port ${port}`)
	})
} catch (err) {
	console.log(err)
}