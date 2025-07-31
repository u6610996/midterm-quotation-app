import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Typography,
  TableFooter,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function QuotationTable({ data, setData }) {
  const handleDelete = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const totalAmount = data.reduce(
    (sum, item) => sum + item.ppu * item.qty - item.discount,
    0
  );
  const totalDiscount = data.reduce((sum, item) => sum + item.discount, 0);

  if (!data || data.length === 0) {
    return <Typography sx={{ p: 2 }}>🛒 No items</Typography>;
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          <TableCell align="center">Qty</TableCell>
          <TableCell align="center">Item</TableCell>
          <TableCell align="center">Price/Unit</TableCell>
          <TableCell align="center">Discount</TableCell>
          <TableCell align="center">Amount</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {data.map((row, idx) => (
          <TableRow key={idx}>
            <TableCell align="center">
              <IconButton color="error" onClick={() => handleDelete(idx)}>
                <DeleteIcon />
              </IconButton>
            </TableCell>
            <TableCell align="center">{row.qty}</TableCell>
            <TableCell align="center">{row.item}</TableCell>
            <TableCell align="center">{row.ppu}</TableCell>
            <TableCell align="center">{row.discount}</TableCell>
            <TableCell align="center">
              {row.qty * row.ppu - row.discount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell colSpan={4} align="right">
            <strong>Total Discount:</strong>
          </TableCell>
          <TableCell colSpan={2} align="left">
            {totalDiscount}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={4} align="right">
            <strong>Total Amount:</strong>
          </TableCell>
          <TableCell colSpan={2} align="left">
            {totalAmount}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export default QuotationTable;