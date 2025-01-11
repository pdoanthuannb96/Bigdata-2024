import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api'; // Thay bằng URL backend của bạn

export const fetchYearlyData = async (province) => {
  const endpoint = province === 'all' ? `/yearly/all` : `/yearly/${province}`;
  const response = await axios.get(`${API_BASE_URL}${endpoint}`);
  return response.data;
};

export const fetchMonthlyData = async (province, year) => {
  const endpoint = province === 'all' ? `/monthly/${year}/all` : `/monthly/${year}/${province}`;
  const response = await axios.get(`${API_BASE_URL}${endpoint}`);
  return response.data;
};
