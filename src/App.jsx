import { useState, useRef } from "react";
import { Container, TextField, Button, MenuItem, Typography, Box, TableContainer, Paper } from "@mui/material";
import QuotationTable from "./QuotationTable";

const products = [
  { code: "p001", name: "Product A", price: 100 },
  { code: "p002", name: "Product B", price: 200 },
  { code: "p003", name: "Product C", price: 150 },
  { code: "p004", name: "Product D", price: 250 },
];

function App() {
  const itemRef = useRef();
  const qtyRef = useRef();
  const discountRef = useRef();

  const [ppu, setPpu] = useState(products[0].price);
  const [dataItems, setDataItems] = useState([]);

  const addItem = () => {
    const item = products.find((v) => itemRef.current.value === v.code);
    const newItem = {
      item: item.name,
      ppu: parseFloat(item.price),
      qty: parseInt(qtyRef.current.value),
      discount: parseFloat(discountRef.current.value) || 0,
    };

    // Merge if same item name and same price
    const existingIndex = dataItems.findIndex(
      (it) => it.item === newItem.item && it.ppu === newItem.ppu
    );

    if (existingIndex !== -1) {
      const updatedItems = [...dataItems];
      updatedItems[existingIndex].qty += newItem.qty;
      updatedItems[existingIndex].discount += newItem.discount;
      setDataItems(updatedItems);
    } else {
      setDataItems([...dataItems, newItem]);
    }
  };

  const clearItems = () => setDataItems([]);

  const handleProductChange = (e) => {
    const selected = products.find((p) => p.code === e.target.value);
    setPpu(selected.price);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5">Quotation</Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          select
          label="Item"
          inputRef={itemRef}
          defaultValue={products[0].code}
          onChange={handleProductChange}
        >
          {products.map((product) => (
            <MenuItem key={product.code} value={product.code}>
              {product.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField label="Price Per Unit" value={ppu} InputProps={{ readOnly: true }} />
        <TextField label="Quantity" type="number" inputRef={qtyRef} defaultValue={1} />
        <TextField label="Discount" type="number" inputRef={discountRef} defaultValue={0} />
        <Button variant="contained" onClick={addItem}>Add</Button>
        <Button variant="outlined" color="error" onClick={clearItems}>Clear</Button>
      </Box>

      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <QuotationTable data={dataItems} setData={setDataItems} />
      </TableContainer>
    </Container>
  );
}

export default App;
