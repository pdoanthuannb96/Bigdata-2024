import mongoose from "mongoose";

const YearlyWeatherSchema = new mongoose.Schema({
  province_name: {
    type: String,
    required: true,
    index: true, // Đánh index cho field này
  },
  YEAR: {
    type: Number,
    required: true,
  },
  T2M: Number, // Nhiệt độ trung bình (°C)
  RH2M: Number, // Độ ẩm tương đối (%)
  WS10M: Number, // Tốc độ gió (m/s)
  WD10M: Number, // Hướng gió (°)
  ALLSKY_SFC_SW_DWN: Number, // Bức xạ sóng ngắn (W/m²)
  PS: Number, // Áp suất không khí (kPa)
  ALLSKY_SFC_UV_INDEX: Number, // Chỉ số UV
  PRECTOTCORR: Number, // Lượng mưa (mm)
}, {
  timestamps: true, // Tự động thêm createdAt và updatedAt
  collection: 'YearlyWeatherData', // Đặt tên collection cụ thể
});

export default mongoose.model('YearlyWeatherData', YearlyWeatherSchema);
