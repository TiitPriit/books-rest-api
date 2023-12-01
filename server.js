import express from 'express';
import {router} from './router/bookRoutes.js';

const PORT = 3000;
const app = express();

app.use(express.json());
app.use("/v1/books",router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});