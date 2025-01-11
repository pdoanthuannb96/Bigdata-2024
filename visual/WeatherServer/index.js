import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import MonthlyWeatherData from './models/MonthlyWeatherData.js';
import YearlyWeatherData from './models/YearlyWeatherData.js';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/monthly/:year/:province', async (req, res) => {
    try {
        let { province, year } = req.params;
        year = parseInt(year);

        if (!year) {
            return res.status(400).json({
                message: 'Invalid year'
            });
        }

        if (province === 'all') {
            // Lấy trung bình cả nước cho tất cả các tháng trong năm
            const allMonthlyData = await MonthlyWeatherData.aggregate([
                { $match: { YEAR: year } }, // Lọc theo năm
                {
                  $group: {
                    _id: { YEAR: "$YEAR", MONTH: "$MONTH" }, // Group theo năm và tháng
                    T2M: { $avg: "$T2M" },  // Tính trung bình T2M (nhiệt độ trung bình)
                    RH2M: { $avg: "$RH2M" },  // Tính trung bình RH2M (độ ẩm tương đối)
                    WS10M: { $avg: "$WS10M" },  // Tính trung bình WS10M (tốc độ gió tại 10m)
                    WD10M: { $avg: "$WD10M" },  // Tính trung bình WD10M (hướng gió tại 10m)
                    ALLSKY_SFC_SW_DWN: { $avg: "$ALLSKY_SFC_SW_DWN" },  // Tính trung bình bức xạ mặt trời
                    PS: { $avg: "$PS" },  // Tính trung bình áp suất khí quyển
                    ALLSKY_SFC_UV_INDEX: { $avg: "$ALLSKY_SFC_UV_INDEX" },  // Tính trung bình chỉ số UV
                    PRECTOTCORR: { $avg: "$PRECTOTCORR" }  // Tính trung bình lượng mưa
                  }
                },
                {
                  $project: {
                    _id: 0,  // Loại bỏ trường _id
                    YEAR: "$_id.YEAR",  // Lấy giá trị YEAR từ _id
                    MONTH: "$_id.MONTH",  // Lấy giá trị tháng từ _id
                    T2M: { $round: ["$T2M", 2] },  // Làm tròn kết quả trung bình đến 1 chữ số thập phân
                    RH2M: { $round: ["$RH2M", 2] },
                    WS10M: { $round: ["$WS10M", 2] },
                    WD10M: { $round: ["$WD10M", 2] },
                    ALLSKY_SFC_SW_DWN: { $round: ["$ALLSKY_SFC_SW_DWN", 2] },
                    PS: { $round: ["$PS", 2] },
                    ALLSKY_SFC_UV_INDEX: { $round: ["$ALLSKY_SFC_UV_INDEX", 2] },
                    PRECTOTCORR: { $round: ["$PRECTOTCORR", 2] }
                  }
                },
                { $sort: { "MONTH": 1 } }  // Sắp xếp theo tháng
              ]);              

            return res.status(200).json(allMonthlyData);
        } else {
            // Lấy dữ liệu theo tỉnh cho tất cả các tháng trong năm
            const monthlyData = await MonthlyWeatherData.find({ province_name: province, YEAR: year }).sort({ MONTH: 1 });

            return res.status(200).json(monthlyData);
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error retrieving data' });
    }
});

app.get('/api/yearly/:province', async (req, res) => {
    try {
        const { province } = req.params;

        if (province === 'all') {
            // Lấy dữ liệu cho tất cả các năm có trong collection
            const allYearlyData = await YearlyWeatherData.aggregate([
                {
                    $group: {
                        _id: { YEAR: "$YEAR" },  // Group dữ liệu theo năm
                        T2M: { $avg: "$T2M" },  // Tính trung bình T2M (nhiệt độ trung bình)
                        RH2M: { $avg: "$RH2M" },  // Tính trung bình RH2M (độ ẩm tương đối)
                        WS10M: { $avg: "$WS10M" },  // Tính trung bình WS10M (tốc độ gió tại 10m)
                        WD10M: { $avg: "$WD10M" },  // Tính trung bình WD10M (hướng gió tại 10m)
                        ALLSKY_SFC_SW_DWN: { $avg: "$ALLSKY_SFC_SW_DWN" },  // Tính trung bình bức xạ mặt trời
                        PS: { $avg: "$PS" },  // Tính trung bình áp suất khí quyển
                        ALLSKY_SFC_UV_INDEX: { $avg: "$ALLSKY_SFC_UV_INDEX" },  // Tính trung bình chỉ số UV
                        PRECTOTCORR: { $avg: "$PRECTOTCORR" }  // Tính trung bình lượng mưa
                    }
                },
                {
                    $project: {
                        _id: 0,  // Loại bỏ trường _id
                        YEAR: "$_id.YEAR",  // Lấy giá trị năm
                        T2M: { $round: ["$T2M", 2] },  // Làm tròn kết quả trung bình đến 1 chữ số thập phân
                        RH2M: { $round: ["$RH2M", 2] },
                        WS10M: { $round: ["$WS10M", 2] },
                        WD10M: { $round: ["$WD10M", 2] },
                        ALLSKY_SFC_SW_DWN: { $round: ["$ALLSKY_SFC_SW_DWN", 2] },
                        PS: { $round: ["$PS", 2] },
                        ALLSKY_SFC_UV_INDEX: { $round: ["$ALLSKY_SFC_UV_INDEX", 2] },
                        PRECTOTCORR: { $round: ["$PRECTOTCORR", 2] }
                    }
                },
                { $sort: { YEAR: 1 } }  // Sắp xếp theo thứ tự năm (từ cũ đến mới)
            ]);

            return res.status(200).json(allYearlyData);
        } else {
            // Lấy dữ liệu theo tỉnh cho tất cả các năm
            const yearlyData = await YearlyWeatherData.find({ province_name: province }).sort({ YEAR: 1 });

            return res.status(200).json(yearlyData);
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error retrieving data' });
    }
});

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to DB Successfully');
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(process.env.PORT, () => {
    console.log('Server is running in port: ' + process.env.PORT);
})