import axios from 'axios';

export const fetchSellerStats = async (sellerId) => {
  const res = await axios.get(`http://localhost:5000/api/stats/${sellerId}`);
  return res.data;
};
