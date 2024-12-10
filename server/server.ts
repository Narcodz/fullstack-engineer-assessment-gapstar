import express from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';

const app = express();
const PORT = 3001;
app.use(cors());

app.get('/api/items', (req, res) => {
    const dataFilePath = path.join(__dirname, '../server/data/data.json');

    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data file:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        try {
            const companies = JSON.parse(data);
            res.json(companies);
        } catch (parseError) {
            console.error('Error parsing data file:', parseError);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
