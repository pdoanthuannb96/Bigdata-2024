import React, { useState, useEffect } from "react";
import { fetchYearlyData } from "../services/weatherService";
import SelectProvince from "../components/SelectProvince";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Text,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from "recharts";

const YearlyPage = () => {
  const [province, setProvince] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      if (province) {
        const yearlyData = await fetchYearlyData(province); // Gọi API lấy dữ liệu theo năm
        const years = yearlyData.map((data) => data.YEAR); // Lấy danh sách các năm từ dữ liệu
  
        const formattedData = years.map((year) => {
          const yearData = yearlyData.find((data) => data.YEAR === year);
          return yearData
            ? {
                year,
                temperature: yearData.T2M || 0,
                humidity: yearData.RH2M || 0,
                windSpeed: yearData.WS10M || 0,
                windDirection: yearData.WD10M || 0,
                radiation: yearData.ALLSKY_SFC_SW_DWN || 0,
                pressure: yearData.PS || 0,
                uvIndex: yearData.ALLSKY_SFC_UV_INDEX || 0,
                rainfall: yearData.PRECTOTCORR || 0,
              }
            : {
                year,
                temperature: 0,
                humidity: 0,
                windSpeed: 0,
                windDirection: 0,
                radiation: 0,
                pressure: 0,
                uvIndex: 0,
                rainfall: 0,
              };
        });
  
        setData(formattedData); // Cập nhật state với dữ liệu đã định dạng
      }
    };
  
    getData();
  }, [province]);

  return (
    <div className="px-28 text-black">
      <div className="flex gap-5">
        <SelectProvince onChange={setProvince} province={province} />
      </div>

      {data.length > 0 && (
        <>
          <div className="mt-16 space-y-12">
            {" "}
            <ResponsiveContainer
              width="100%"
              height={300}
              margin={{ top: 10, bottom: 10 }}
            >
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis
                  label={{
                    value: "Nhiệt độ (°C)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="temperature"
                  stroke="#FF5733" // Màu đỏ cam cho nhiệt độ
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="text-center mt-2">
              <Text strong style={{ fontSize: "18px" }}>
                Nhiệt độ (°C)
              </Text>
            </div>
            {/* Humidity Area Chart */}
            <ResponsiveContainer
              width="100%"
              height={300}
              margin={{ top: 10, bottom: 10 }}
            >
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis
                  label={{
                    value: "Độ ẩm (%)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="humidity"
                  stroke="#00BFFF" // Màu xanh lam cho độ ẩm
                  fill="#00BFFF"
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="text-center mt-2">
              <Text strong style={{ fontSize: "18px" }}>
                Độ ẩm (%)
              </Text>
            </div>
            {/* Wind Speed Line Chart */}
            <ResponsiveContainer
              width="100%"
              height={300}
              margin={{ top: 10, bottom: 10 }}
            >
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis
                  label={{
                    value: "Tốc độ gió (m/s)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="windSpeed"
                  stroke="#FF7F50" // Màu cam cho tốc độ gió
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="text-center mt-2">
              <Text strong style={{ fontSize: "18px" }}>
                Tốc độ gió (m/s)
              </Text>
            </div>

            {/* Wind Direction Line Chart */} 
            <ResponsiveContainer width="100%" height={300} margin={{ top: 10, bottom: 10 }}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis label={{ value: 'Hướng gió (°)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="windDirection"
                  stroke="#4CAF50" // Màu xanh lá cho hướng gió
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="text-center mt-2">
              <Text strong style={{ fontSize: '18px' }}>
                Hướng gió (°)
              </Text>
            </div>
            
            {/* Rainfall Bar Chart */}
            <ResponsiveContainer
              width="100%"
              height={300}
              margin={{ top: 10, bottom: 10 }}
            >
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis
                  label={{
                    value: "Lượng mưa (mm)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip />
                <Legend />
                <Bar dataKey="rainfall" fill="#FF9F00" />
              </BarChart>
            </ResponsiveContainer>
            <div className="text-center mt-2">
              <Text strong style={{ fontSize: "18px" }}>
                Lượng mưa (mm)
              </Text>
            </div>
            {/* Pressure Line Chart */}
            <ResponsiveContainer
              width="100%"
              height={300}
              margin={{ top: 10, bottom: 10 }}
            >
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis
                  label={{
                    value: "Áp suất không khí (hPa)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="pressure"
                  stroke="#607D8B" // Màu xanh xám cho áp suất
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="text-center mt-2">
              <Text strong style={{ fontSize: "18px" }}>
                Áp suất không khí (hPa)
              </Text>
            </div>
            {/* UV Index Bar Chart */}
            <ResponsiveContainer
              width="100%"
              height={300}
              margin={{ top: 10, bottom: 10 }}
            >
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis
                  label={{
                    value: "Chỉ số UV",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip />
                <Legend />
                <Bar dataKey="uvIndex" fill="#9C27B0" />
              </BarChart>
            </ResponsiveContainer>
            <div className="text-center mt-2">
              <Text strong style={{ fontSize: "18px" }}>
                Chỉ số UV
              </Text>
            </div>
            {/* Radiation Line Chart */}
            <ResponsiveContainer
              width="100%"
              height={300}
              margin={{ top: 10, bottom: 10 }}
            >
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis
                  label={{
                    value: "Bức xạ sóng ngắn (W/m²)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="radiation"
                  stroke="#FF9800" // Màu vàng cam cho bức xạ
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="text-center mt-2">
              <Text strong style={{ fontSize: "18px" }}>
                Bức xạ sóng ngắn (W/m²)
              </Text>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default YearlyPage;
