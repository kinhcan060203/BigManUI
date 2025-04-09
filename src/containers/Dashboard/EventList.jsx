import { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import "./scss/EventList.scss";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import InfoIcon from "@mui/icons-material/Info";
import InfoTooltip from "./InfoTooltip";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

function EventList({ rows, setReviewImage, setOpenDetail }) {
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [vehicleInfo, setVehicleInfo] = useState({});

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [hoverId, setHoverID] = useState(false);

  const handleMouseEnter = (data) => {
    setHoverID(data.id);
    console.log("Hovered!"); // Call your function here
    setVehicleInfo(data);
  };

  const handleMouseLeave = () => {
    setHoverID(-1);
  };
  useEffect(() => {}, []);

  // Handler for row hover
  const handleRowClick = (e) => {
    setReviewImage({
      target: "https://via.placeholder.com/400x200",
      full: "https://via.placeholder.com/800x400",
    });
  };
  const handleInfoClick = (row) => {
    setOpenDetail({ open: true, row: row });
  };

  return (
    <>
      <Box sx={{ height: "100%" }}>
        <Paper sx={{ border: "1px solid #ccc", padding: 1 }}>
          <TableContainer
            component={Paper}
            sx={{
              overflowX: "auto",
              overflowY: "auto",
              maxHeight: 720,
            }}
          >
            <Table stickyHeader aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center"></StyledTableCell>
                  <StyledTableCell align="center">
                    Target Vehicle
                  </StyledTableCell>
                  <StyledTableCell align="center">Plate</StyledTableCell>
                  <StyledTableCell align="center">
                    License Plate
                  </StyledTableCell>
                  <StyledTableCell align="center">Occur Time</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {hoverId === row.id ? (
                          <InfoTooltip vehicleInfo={vehicleInfo}>
                            <InfoIcon
                              onMouseEnter={() => handleMouseEnter(row)}
                              onMouseLeave={handleMouseLeave}
                              onClick={() => handleInfoClick(row)}
                              sx={{
                                cursor: "pointer",
                                color: "black",
                                transition: "color 0.3s",
                              }}
                            />
                          </InfoTooltip>
                        ) : (
                          <InfoIcon
                            onMouseEnter={() => handleMouseEnter(row)}
                            onMouseLeave={handleMouseLeave}
                            sx={{
                              cursor: "pointer",
                              color: "gray",
                              transition: "color 0.3s",
                            }}
                          />
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <div
                          style={{
                            width: "100px",
                            height: "80px",
                            backgroundImage: `url(${row.full_image})`,
                            backgroundSize: "contain",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            borderRadius: "4px",
                            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                          }}
                        ></div>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {/* <Box
                                                    component="img"
                                                    sx={{
                                                        height: 80,
                                                        width: 80,
                                                    }}
                                                    alt="The house from the offer."
                                                    src={row.plate_image}
                                                /> */}
                        <div
                          style={{
                            width: "80px",
                            height: "80px",
                            backgroundImage: `url(${row.plate_image})`,
                            backgroundSize: "contain",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            borderRadius: "4px",
                            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                          }}
                        ></div>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <p>{row.lpr}</p>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.start_time.slice(0, 10)}
                        <br />
                        {row.start_time.slice(11, 19)}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </>
  );
}

export default EventList;
