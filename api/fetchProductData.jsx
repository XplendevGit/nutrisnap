import axios from "axios";

const openFoodFactsAPI = async (barcode) => {
  const url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;
  try {
    const response = await axios.get(url);
    return response.data.status === 1 ? response.data.product : null;
  } catch (error) {
    console.error(`Error en OpenFoodFacts: ${error.message}`);
    return null;
  }
};

const edamamAPI = async (barcode) => {
  const EDAMAM_APP_ID = "3d49b0d7";
  const EDAMAM_APP_KEY = "637b812831d48004d71f00b94b713d28";
  const url = `https://api.edamam.com/api/food-database/v2/parser?upc=${barcode}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}`;
  try {
    const response = await axios.get(url);
    return response.data.parsed?.[0]?.food || null;
  } catch (error) {
    console.error(`Error en Edamam: ${error.message}`);
    return null;
  }
};

const usdaAPI = async (barcode) => {
  const USDA_API_KEY = "xizClJ3rTd4424gMM9wf9xFTPtA8BiJzXb7Sfomf";
  const url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${barcode}&api_key=${USDA_API_KEY}`;
  try {
    const response = await axios.get(url);
    return response.data.foods?.[0] || null;
  } catch (error) {
    console.error(`Error en USDA: ${error.message}`);
    return null;
  }
};

const fetchProductData = async (barcode) => {
  const productData =
    (await openFoodFactsAPI(barcode)) ||
    (await edamamAPI(barcode)) ||
    (await usdaAPI(barcode));

  return productData || null;
};

export default fetchProductData;
