import axios from "axios";

const BASE_URL = "https://world.openfoodfacts.org/api/v0";

export const fetchProductByBarcode = async (barcode) => {
  try {
    const response = await axios.get(`${BASE_URL}/product/${barcode}.json`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};