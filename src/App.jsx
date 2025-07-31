import { useState, useRef, useEffect } from "react";
import {
  Container, TextField, Button, MenuItem, Typography,
  Box, TableContainer, Paper
} from "@mui/material";
import QuotationTable from "./QuotationTable";

const products = [
  { code: "p001", name: "Product A", price: 100 },
  { code: "p002", name: "Product B", price: 200 },
  { code: "p003", name: "Product C", price: 150 },
  { code: "p004", name: "Product D", price: 250 }
];

function App() {
  const itemRef = useRef();
  const qtyRef = useRef();
  const discountRef = useRef();
  const ppuRef = useRef();

  const [ppu, setPpu] = useState(products[0].price);
  const [dataItems, setDataItems] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + "data/prefill.json")
      .then((res) => res.json())
      .then((data) => setDataItems(data))
      .catch((err) => console.error("Failed to load prefill:", err));
  }, []);

  const addItem = () => {
    const item = products.find((v) => itemRef.current.value === v.code);
    const newItem = {
      item: item.name,
      ppu: parseFloat(ppuRef.current.value),
      qty: parseInt(qtyRef.current.value),
      discount: parseFloat(discountRef.current.value) || 0
    };

    const existingIndex = dataItems.findIndex(
      (it) => it.item === newItem.item && it.ppu === newItem.ppu
    );

    if (existingIndex !== -1) {
      const updated = [...dataItems];
      updated[existingIndex].qty += newItem.qty;
      setDataItems(updated);
    } else {
      setDataItems((prev) => [...prev, newItem]);
    }
  };

  const clearItems = () => setDataItems([]);

  return (
    <Container sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom align="center">
          Quotation Generator
        </Typography>
        <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
          <TextField
            select
            label="Item"
            inputRef={itemRef}
            defaultValue={products[0].code}
            onChange={(e) => {
              const selected = products.find((p) => p.code === e.target.value);
              setPpu(selected.price);
            }}
            sx={{ flex: 1 }}
          >
            {products.map((p) => (
              <MenuItem key={p.code} value={p.code}>
                {p.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Price Per Unit"
            type="number"
            inputRef={ppuRef}
            value={ppu}
            onChange={(e) => setPpu(e.target.value)}
            sx={{ flex: 1 }}
          />
          <TextField
            label="Quantity"
            type="number"
            inputRef={qtyRef}
            defaultValue={1}
            sx={{ flex: 1 }}
          />
          <TextField
            label="Discount"
            type="number"
            inputRef={discountRef}
            defaultValue={0}
            sx={{ flex: 1 }}
          />
        </Box>
        <Box display="flex" gap={2} mb={2}>
          <Button fullWidth variant="contained" onClick={addItem}>
            ADD
          </Button>
          <Button
            fullWidth
            variant="outlined"
            color="error"
            onClick={clearItems}
          >
            CLEAR
          </Button>
        </Box>
        <QuotationTable data={dataItems} setData={setDataItems} />
      </Paper>
    </Container>
  );
}

export default App;
