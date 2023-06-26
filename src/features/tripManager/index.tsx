import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Theme, Tooltip, Typography, createStyles, makeStyles } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css"
import { DeleteOutline, EditOutlined, KeyboardArrowDownOutlined, KeyboardArrowUpOutlined, SearchOutlined } from "@material-ui/icons";
import carCompanyApi from "api/carCompanyApi";
import { CommonResponse2, CommonResponse4 } from "models";
import EmployeeApi from "api/employeeApi";
import { IoIosAdd } from "react-icons/io";
import AddTripForm from "./components/AddTripForm";
import { TripResponse } from "models/carCompany/trip/trip";
import TripApi from "api/tripApi";
import EditTripForm from "./components/EditTripForm";
import moment from "moment";
import { Col, Row } from "react-bootstrap";
import provinceApi from "api/provinceApi";
import 'bootstrap/dist/css/bootstrap.min.css';
import TripDataCollap from "./components/TripDataCollap";

interface Column {
    id: 'tripId' | 'tripCode' | 'startPoint' | 'endPoint' | 'startDate' | 'carNumber' | 'carType' | 'driver' | 'description' | 'feature';
    label: string;
    minWidth?: number;
    align?: 'right' | 'center';
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: 'tripId', label: 'Id chuyến' },
    { id: 'tripCode', label: 'Mã chuyến', minWidth: 150 },
    { id: 'startPoint', label: 'Điểm đi', minWidth: 300 },
    { id: 'endPoint', label: 'Điểm đến', minWidth: 300 },
    { id: 'startDate', label: 'Ngày đi', minWidth: 170 },
    { id: 'carNumber', label: 'Mã số xe', minWidth: 170 },
    { id: 'carType', label: 'Loại xe', minWidth: 200 },
    { id: 'driver', label: 'Nhân viên lái xe', minWidth: 170 },
    {
        id: 'description',
        label: 'Ghi chú',
        minWidth: 200,
    },
    {
        id: 'feature',
        label: 'Chức năng',
        minWidth: 170,
        align: 'center'
    },
];

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
        container: {
            maxHeight: 440,
        },
    }),
);

export default function TripManager() {
    const accountId = localStorage.getItem('accountId');

    const classes = useStyles();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [startPoint, setStartPoint] = React.useState<CommonResponse4 | null>(null);
    const [endPoint, setEndPoint] = React.useState<CommonResponse4 | null>(null);
    const [listProvinceSP, setListProvinceSP] = React.useState<CommonResponse4[]>([]);
    const [listProvinceEP, setListProvinceEP] = React.useState<CommonResponse4[]>([]);
    const getDatatProvince = async (key = '', isFirst = true) => {
        const listProvince = await provinceApi.getListProvince(key);
        if (listProvince && listProvince.data && listProvince.data.length > 0 && isFirst) {
            listProvince.data.unshift({ key: "", value: "-- Tất cả --", group: "" })
            setListProvinceEP(listProvince.data);
            setEndPoint(listProvince.data[0]);
        }
        else {
            listProvince.data.unshift({ key: "", value: "-- Tất cả --", group: "" })
            setListProvinceEP(listProvince.data);
        }
    }

    const getDatatProvinceSP = async (key = '', isFirst = true) => {
        const listProvinceSP = await provinceApi.getListProvince(key);
        if (listProvinceSP && listProvinceSP.data && listProvinceSP.data.length > 0 && isFirst) {
            listProvinceSP.data.unshift({ key: "", value: "-- Tất cả --", group: "" })
            setListProvinceSP(listProvinceSP.data)
            setStartPoint(listProvinceSP.data[0])
        }
        else {
            listProvinceSP.data.unshift({ key: "", value: "-- Tất cả --", group: "" })
            setListProvinceSP(listProvinceSP.data)
        }
    }

    useEffect(() => {
        getDatatProvince()
        getDatatProvinceSP()
        handleSearch()
    }, [])

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [selectedDate, setSelectedDate] = React.useState<string | null>(null);

    const handleDateChange = (date: string) => {
        setSelectedDate(date);
        console.log(selectedDate)
    };

    const [listCarNumber, setListCarNumber] = useState<CommonResponse2[]>([]);
    const [carNumber, setCarNumber] = useState<string>("");
    const [listCarType, setListCarType] = useState<CommonResponse2[]>([]);
    const [carType, setCarType] = useState<string>("");
    const [listDriver, setListDriver] = useState<CommonResponse2[]>([]);
    const [driver, setDriver] = useState<string>("");
    const [listTrip, setListTrip] = useState<TripResponse[]>([]);

    useEffect(() => {
        async function fetchData() {
            const carNumbers = await carCompanyApi.getListCarNumber({ keyword: null, accountId: accountId });
            const carTypes = await carCompanyApi.getListCarType({ keyword: null, accountId: accountId });
            const drivers = await EmployeeApi.getListDriver(accountId);
            const trips = await TripApi.getListTrip({
                accountId: accountId,
                carNumber: carNumber,
                carType: carType,
                driver: driver,
                endPoint: endPoint !== null ? endPoint.key : "",
                startPoint: startPoint !== null ? startPoint.key : "",
                startDate: selectedDate !== null ? selectedDate : null,
            })
            setListCarNumber(carNumbers.data);
            setListCarType(carTypes.data);
            setListDriver(drivers.data);
            setListTrip(trips.data);
        }
        fetchData();
    }, [accountId])


    const [openAddTripForm, setOpenAddTripForm] = React.useState(false);

    const handleClickOpenAddTripForm = () => {
        setOpenAddTripForm(true);
    };

    const handleCloseAddTripForm = () => {
        setOpenAddTripForm(false);
    };

    const [openEditTripForm, setOpenEditTripForm] = React.useState(false);
    const [tripIdChose, setTripIdChose] = React.useState("");

    const handleClickOpenEditTripForm = (tripId: string) => {
        setOpenEditTripForm(true);
        setTripIdChose(tripId);
    };

    const handleCloseEditTripForm = () => {
        setOpenEditTripForm(false);
    };

    const [openCollapTable, setOpenCollapTable] = React.useState(false);
    const [expandedRows, setExpandedRows] = useState<Array<boolean>>([]);

    const handleSearch = () => {
        async function fetchData() {
            const route = await TripApi.getListTrip({
                accountId: accountId,
                carNumber: carNumber,
                carType: carType,
                driver: driver,
                endPoint: endPoint !== null ? endPoint.key : "",
                startPoint: startPoint !== null ? startPoint.key : "",
                startDate: selectedDate !== null ? selectedDate : null,
            });

            setListTrip(route.data);
        }
        fetchData();
    }

    const renderExpandedRow = (row: any) => {
        // Render nội dung của hàng được mở rộng
        return (
            <TripDataCollap row={row} columns={columns}></TripDataCollap>
        );
    };

    return (
        <Box>
            <Box className={styles.pageHeader}>
                <Typography variant="h6">
                    QUẢN LÝ CHUYẾN XE
                </Typography>
                <Box>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={styles.btnAdd}
                        startIcon={<IoIosAdd />}
                        onClick={handleClickOpenAddTripForm}
                    >
                        Thêm chuyến
                    </Button>
                </Box>
            </Box>
            <Box className={styles.contentHeader}>
                <Box className={styles.filterContainer} justifyContent="center">
                    <Container className="pt-3">
                        <Row>
                            <Col md={6}>
                                <Row className="mb-3">
                                    <Col md={4} className="d-flex align-items-center justify-content-end">
                                        <label className={styles.customLabel}>Điểm đi</label>
                                    </Col>
                                    <Col md={8}>
                                        <Autocomplete
                                            //classes={classes}
                                            id="start-point"
                                            options={listProvinceSP}
                                            groupBy={(option) => option.group}
                                            getOptionLabel={(option) => option.value}
                                            value={startPoint}
                                            style={{ width: 300 }}
                                            onChange={(event, value) => setStartPoint(value)}
                                            className={styles.inputField}
                                            size="small"
                                            renderInput={(params) =>
                                                <TextField
                                                    {...params}
                                                    variant="outlined"
                                                    onChange={async (e) => { await getDatatProvinceSP(e.target.value, false) }}
                                                />}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Row>
                                    <Col md={4} className="d-flex align-items-center justify-content-end">
                                        <label className={styles.customLabel}>Điểm đến</label>
                                    </Col>
                                    <Col md={8}>
                                        <Autocomplete
                                            //classes={classes}
                                            id="end-point"
                                            options={listProvinceEP}
                                            groupBy={(option) => option.group}
                                            getOptionLabel={(option) => option.value}
                                            value={endPoint}
                                            style={{ width: 300 }}
                                            onChange={(event, value) => { setEndPoint(value) }}
                                            className={styles.inputField}
                                            size="small"
                                            renderInput={(params) =>
                                                <TextField
                                                    {...params}
                                                    variant="outlined"
                                                    onChange={async (e) => { await getDatatProvince(e.target.value, false) }}
                                                />}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Row>
                                    <Col md={4} className="d-flex align-items-center justify-content-end">
                                        <label className={styles.customLabel}>Ngày đi</label>
                                    </Col>
                                    <Col md={8}>
                                        <input
                                            type="Date"
                                            className={styles.inputDateCustom}
                                            onChange={(e) => handleDateChange(e.target.value)}
                                            value={selectedDate ?? ''}
                                            min={moment().format('YYYY-MM-DD')}
                                        >
                                        </input>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Row>
                                    <Col md={4} className="d-flex align-items-center justify-content-end">
                                        <label className={styles.customLabel}>Mã số xe</label>
                                    </Col>
                                    <Col md={8}>
                                        <Autocomplete
                                            id="combo-box-car-number"
                                            options={listCarNumber}
                                            getOptionLabel={(option) => option.value}
                                            className={styles.inputField}
                                            style={{ width: 300 }}
                                            size="small"
                                            onChange={(event, value) => setCarNumber(value == null ? "" : value.key)}
                                            renderInput={(params) => <TextField {...params} variant="outlined" />
                                            }
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Row>
                                    <Col md={4} className="d-flex align-items-center justify-content-end">
                                        <label className={styles.customLabel}>Loại xe</label>
                                    </Col>
                                    <Col md={8}>
                                        <Autocomplete
                                            id="combo-box-car-type"
                                            options={listCarType}
                                            getOptionLabel={(option) => option.value}
                                            className={styles.inputField}
                                            style={{ width: 300 }}
                                            size="small"
                                            onChange={(event, value) => setCarType(value == null ? "" : value.key)}
                                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Row>
                                    <Col md={4} className="d-flex align-items-center justify-content-end">
                                        <label className={styles.customLabel}>Nhân viên lái xe</label>
                                    </Col>
                                    <Col md={8}>
                                        <Autocomplete
                                            id="combo-box-car-type"
                                            options={listDriver}
                                            getOptionLabel={(option) => option.value}
                                            className={styles.inputField}
                                            style={{ width: 300 }}
                                            size="small"
                                            onChange={(event, value) => setDriver(value == null ? "" : value.key)}
                                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </Box>
                <div className="row">
                    <div className="col-md-12 d-flex justify-content-center mb-3">
                        <button
                            className={`btn btn-primary ${styles.customBtn}`} onClick={handleSearch}>
                            <i className={`fas fa-search mr-2 ${styles.customIcon}`}></i>
                            Tìm kiếm
                        </button>
                    </div>
                </div>
            </Box>

            <Paper className={classes.root}>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell className={styles.tableHeader}></TableCell>
                                <TableCell className={styles.tableHeader}>STT</TableCell>
                                {columns.map((column) => (
                                    <TableCell
                                        className={column.id === "tripId" ? styles.hiddenItem : styles.tableHeader}
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listTrip.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                const rowNumber = page * rowsPerPage + index + 1;
                                const isRowExpanded = expandedRows[index];
                                return (
                                    <React.Fragment key={row.tripId}>
                                        <TableRow hover role="checkbox" tabIndex={-1}>
                                            <TableCell className={`${row.isHaveEmptySeat === true ? styles.haveEmpty : styles.noHaveEmpty}`}>
                                                <IconButton
                                                    aria-label="expand row"
                                                    size="small"
                                                    onClick={() => {
                                                        const expanded = [...expandedRows];
                                                        expanded[index] = !expanded[index];
                                                        setExpandedRows(expanded);
                                                    }}
                                                >
                                                    {isRowExpanded ? <KeyboardArrowUpOutlined /> : <KeyboardArrowDownOutlined />}
                                                </IconButton>
                                            </TableCell>
                                            <Tooltip title={<span className={styles.tooltipCustom}>Còn trống {row.seatEmpty}/{row.seatQuantity}</span>} arrow placement="top">
                                                <TableCell className={`${row.isHaveEmptySeat === true ? styles.haveEmpty : styles.noHaveEmpty} ${styles.tableData} ${styles.stt} text-center`}>{rowNumber}</TableCell>
                                            </Tooltip>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                if (column.id === 'feature') {
                                                    return (
                                                        <Tooltip title={<span className={styles.tooltipCustom}>Còn trống {row.seatEmpty}/{row.seatQuantity}</span>} arrow placement="top">
                                                            <TableCell className={`${row.isHaveEmptySeat === true ? styles.haveEmpty : styles.noHaveEmpty}`} key={column.id} align={column.align}>
                                                                {/* <IconButton
                                                                aria-label="edit"
                                                                onClick={() => handleClickOpenEditTripForm(row.tripId)}
                                                            >
                                                                <EditOutlined />
                                                            </IconButton> */}
                                                                <IconButton aria-label="delete">
                                                                    <DeleteOutline />
                                                                </IconButton>
                                                            </TableCell>
                                                        </Tooltip>
                                                    );
                                                } else if (column.id === 'startDate') {
                                                    return (
                                                        <Tooltip title={<span className={styles.tooltipCustom}>Còn trống {row.seatEmpty}/{row.seatQuantity}</span>} arrow placement="top">
                                                            <TableCell
                                                                key={column.id}
                                                                align={column.align}
                                                                className={`${row.isHaveEmptySeat === true ? styles.haveEmpty : styles.noHaveEmpty} ${styles.tableData}`}
                                                            >
                                                                {moment(row.startDate).format('DD-MM-yyyy')}
                                                            </TableCell>
                                                        </Tooltip>
                                                    );
                                                }
                                                return (
                                                    <Tooltip title={<span className={styles.tooltipCustom}>Còn trống {row.seatEmpty}/{row.seatQuantity}</span>} arrow placement="top">
                                                        <TableCell
                                                            key={column.id}
                                                            align={column.align}
                                                            className={`${row.isHaveEmptySeat === true ? styles.haveEmpty : styles.noHaveEmpty} ${column.id === "tripId" ? styles.hiddenItem : styles.tableData}`}
                                                        >
                                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                                        </TableCell>
                                                    </Tooltip>
                                                );
                                            })}
                                        </TableRow>
                                        {isRowExpanded && renderExpandedRow(row)}
                                    </React.Fragment>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={listTrip.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            <Dialog
                open={openAddTripForm}
                onClose={handleCloseAddTripForm}
                aria-labelledby="form-dialog-title"
                fullWidth={true}
                maxWidth="md">
                <DialogTitle id="form-dialog-title">Thêm chuyến</DialogTitle>
                <DialogContent>
                    <AddTripForm />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddTripForm} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openEditTripForm}
                onClose={handleCloseEditTripForm}
                aria-labelledby="form-dialog-title"
                fullWidth={true}
                maxWidth="md">
                <DialogTitle id="form-dialog-title">Chỉnh sửa thông tin chuyến xe</DialogTitle>
                <DialogContent>
                    <EditTripForm tripId={tripIdChose} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditTripForm} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}