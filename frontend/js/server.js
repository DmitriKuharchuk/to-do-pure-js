const express = require('express');
const path = require('path');

const app = express();
const root = path.resolve(__dirname, '..'); // /var/www/frontend

// Отдаём статику по предсказуемым путям
app.use('/js',  express.static(path.join(root, 'js')));
app.use('/css', express.static(path.join(root, 'css')));
app.use('/img', express.static(path.join(root, 'img')));

// Корневая страница
app.get('/', (req, res) => {
    res.sendFile(path.join(root, 'index.html'), (err) => {
        if (err) {
            console.error('sendFile error:', err);
            res.status(500).send('Error loading index.html');
        }
    });
});

// SPA-фоллбэк (не обязателен, но удобно)
app.get('*', (req, res) => {
    res.sendFile(path.join(root, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Frontend running at http://localhost:${PORT}`);
    console.log(`Static root: ${root}`);
});
