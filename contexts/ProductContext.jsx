import React, { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productCode, setProductCode] = useState(null);

  return (
    <ProductContext.Provider value={{ productCode, setProductCode }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
