const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000; // يمكنك تغيير الرقم حسب الحاجة
const API_KEY = '53e383713d181b9794d447795a74ae9b'; // ضع مفتاح API الخاص بك هنا
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// إعداد مجلد public لتقديم الملفات الثابتة
app.use(express.static(path.join(__dirname, 'public')));

// إعداد نقطة نهاية API لاستدعاء OpenWeatherMap API
app.get('/api/weather', async (req, res) => {
    const city = req.query.city; // قراءة اسم المدينة من الطلب
    if (!city) {
        return res.status(400).send({ error: 'City is required' });
    }

    try {
        const response = await axios.get(BASE_URL, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric', // للحصول على درجة الحرارة بالدرجة المئوية
            },
        });
        res.send(response.data); // إرسال البيانات إلى الواجهة الأمامية
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch weather data' });
    }
});

// تشغيل السيرفر
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
