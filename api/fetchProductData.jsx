import axios from 'axios';
import { OPENFOODFACTS_API_URL, EDAMAM_APP_ID, EDAMAM_APP_KEY, EDAMAM_API_URL, USDA_API_KEY, USDA_API_URL } from '@env';

/**
 * Función para consultar la API de OpenFoodFacts.
 * @param {string} barcode - Código de barras del producto.
 * @returns {Object|null} - Retorna el objeto del producto si se encuentra, de lo contrario, retorna null.
 */
const openFoodFactsAPI = async (barcode) => {
  const url = `${OPENFOODFACTS_API_URL}/product/${barcode}.json`;
  try {
    const response = await axios.get(url);
    return response.data.status === 1 ? response.data.product : null;
  } catch (error) {
    console.error(`Error al consultar OpenFoodFacts: ${error.message}`);
    return null;
  }
};

/**
 * Función para consultar la API de Edamam.
 * @param {string} barcode - Código de barras del producto.
 * @returns {Object|null} - Retorna el objeto del producto si se encuentra, de lo contrario, retorna null.
 */
const edamamAPI = async (barcode) => {
  const url = `${EDAMAM_API_URL}?upc=${barcode}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}`;
  try {
    const response = await axios.get(url);
    return response.data.parsed?.[0]?.food || null;
  } catch (error) {
    console.error(`Error al consultar Edamam: ${error.message}`);
    return null;
  }
};

/**
 * Función para consultar la API de USDA.
 * @param {string} barcode - Código de barras del producto.
 * @returns {Object|null} - Retorna el objeto del producto si se encuentra, de lo contrario, retorna null.
 */
const usdaAPI = async (barcode) => {
  const url = `${USDA_API_URL}?query=${barcode}&api_key=${USDA_API_KEY}`;
  try {
    const response = await axios.get(url);
    return response.data.foods?.[0] || null;
  } catch (error) {
    console.error(`Error al consultar USDA: ${error.message}`);
    return null;
  }
};

/**
 * Función para buscar el producto en las APIs disponibles en orden de prioridad.
 * 1. OpenFoodFacts
 * 2. Edamam
 * 3. USDA
 * @param {string} barcode - Código de barras del producto.
 * @returns {Object|null} - Retorna el objeto del producto encontrado en la primera API disponible, de lo contrario, retorna null.
 */
const fetchProductData = async (barcode) => {
  let productData = await openFoodFactsAPI(barcode);
  if (!productData) {
    console.log('Producto no encontrado en OpenFoodFacts, buscando en Edamam...');
    productData = await edamamAPI(barcode);
  }
  if (!productData) {
    console.log('Producto no encontrado en Edamam, buscando en USDA...');
    productData = await usdaAPI(barcode);
  }
  if (!productData) {
    console.log('Producto no encontrado en ninguna API.');
  }
  return productData;
};

export default fetchProductData;
