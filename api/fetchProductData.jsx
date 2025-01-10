import axios from "axios";

// API de OpenFoodFacts
const openFoodFactsAPI = async (barcode) => {
  const OPENFOODFACTS_API_URL = "https://world.openfoodfacts.org/api/v0";
  const url = `${OPENFOODFACTS_API_URL}/product/${barcode}.json`;
  try {
    const response = await axios.get(url);
    return response.data.status === 1 ? response.data.product : null;
  } catch (error) {
    console.error(`Error al consultar OpenFoodFacts: ${error.message}`);
    return null;
  }
};

// API de Edamam
const edamamAPI = async (barcode) => {
  const EDAMAM_APP_ID = "3d49b0d7";
  const EDAMAM_APP_KEY = "637b812831d48004d71f00b94b713d28";
  const EDAMAM_API_URL = "https://api.edamam.com/api/food-database/v2/parser";

  const url = `${EDAMAM_API_URL}?upc=${barcode}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}`;
  try {
    const response = await axios.get(url);
    return response.data.parsed?.[0]?.food || null;
  } catch (error) {
    console.error(`Error al consultar Edamam: ${error.message}`);
    return null;
  }
};

// API de USDA
const usdaAPI = async (barcode) => {
  const USDA_API_KEY = "xizClJ3rTd4424gMM9wf9xFTPtA8BiJzXb7Sfomf";
  const USDA_API_URL = "https://api.nal.usda.gov/fdc/v1/foods/search";

  const url = `${USDA_API_URL}?query=${barcode}&api_key=${USDA_API_KEY}`;
  try {
    const response = await axios.get(url);
    return response.data.foods?.[0] || null;
  } catch (error) {
    console.error(`Error al consultar USDA: ${error.message}`);
    return null;
  }
};

// Priorizar consultas
const fetchProductData = async (barcode) => {
  let productData = await openFoodFactsAPI(barcode);
  if (!productData) {
    console.log("Producto no encontrado en OpenFoodFacts, buscando en Edamam...");
    productData = await edamamAPI(barcode);
  }
  if (!productData) {
    console.log("Producto no encontrado en Edamam, buscando en USDA...");
    productData = await usdaAPI(barcode);
  }
  if (!productData) {
    console.log("Producto no encontrado en ninguna API.");
  }
  return productData;
};

export default fetchProductData;
