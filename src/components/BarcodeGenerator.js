import React, { useState } from "react";
import Barcode from "react-barcode";
import { TextField, Button, Box, Typography, List, ListItem } from "@mui/material";

const BarcodeGenerator = () => {
  const [products, setProducts] = useState([]);
  const [productCount, setProductCount] = useState(1); // Default N to 1
  const [startId, setStartId] = useState("");
  const [price, setPrice] = useState("");

  const handleGenerateBarcodes = () => {
    if (startId.trim() && price.trim() && productCount > 0) {
      const newProducts = Array.from({ length: productCount }, (_, index) => ({
        id: `${startId}-${index + 1}`, // Unique ID for each product
        price,
        code: `${startId}-${index + 1} - ${price}`, // Barcode content
      }));
      setProducts(newProducts);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
        gap: 2,
      }}
    >
      <Typography variant="h4">Generate N Barcodes</Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%", maxWidth: "400px" }}>
        <TextField
          label="Starting Product ID (Prefix)"
          variant="outlined"
          fullWidth
          value={startId}
          onChange={(e) => setStartId(e.target.value)}
        />
        <TextField
          label="Price"
          variant="outlined"
          fullWidth
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <TextField
          label="Number of Barcodes (N)"
          variant="outlined"
          type="number"
          fullWidth
          value={productCount}
          onChange={(e) => setProductCount(Number(e.target.value))}
        />
        <Button variant="contained" color="primary" onClick={handleGenerateBarcodes}>
          Generate Barcodes
        </Button>
      </Box>

      {products.length > 0 && (
        <Box
          sx={{
            marginTop: 3,
            width: "100%",
            maxWidth: "600px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: 2,
            overflowY: "auto",
            maxHeight: "400px",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Generated Barcodes
          </Typography>
          <List>
            {products.map((product, index) => (
              <ListItem
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  borderBottom: "1px solid #ddd",
                  padding: 2,
                }}
              >
                <Barcode value={product.code} />
                <Typography>{product.code}</Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default BarcodeGenerator;
