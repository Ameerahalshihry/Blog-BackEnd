import express, {Application} from 'express'
import userRoutes from './routes/user.route'
import postRoutes from './routes/post.route'

import { connectDB } from './config/db';

const app:Application = express()
const port = 3007

app.use(express.json());

connectDB()

app.use('/users', userRoutes)
app.use('/posts', postRoutes)

app.listen(port,()=>console.log(`express started on port ${port}`));

