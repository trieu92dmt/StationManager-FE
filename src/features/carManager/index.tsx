import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Theme, Typography, createStyles, makeStyles } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css"
import { DeleteOutline, EditOutlined, SearchOutlined } from "@material-ui/icons";
import { IoIosAdd } from 'react-icons/io';
import { CommonResponse2 } from "models";
import carCompanyApi from "api/carCompanyApi";
import { CarResponse, SeatLayout } from "models/carCompany/car/car";
import SeatLayoutForm from "./components/addCarTypeForm";
import AddCarForm from "./components/addCarForm";
import { toast } from "react-toastify";
import EditCarForm from "./components/editCarForm";
import moment from "moment";

interface Column {
    id: 'carId' | 'carNumber' | 'carType' | 'seatQuantity' | 'description' | 'createTime' | 'feature';
    label: string;
    minWidth?: number;
    align?: 'right' | 'center';
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: 'carId', label: 'Id xe' },
    { id: 'carNumber', label: 'Mã số xe', minWidth: 170 },
    { id: 'carType', label: 'Loại xe', minWidth: 100 },
    {
        id: 'seatQuantity',
        label: 'Số chỗ ngồi',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'description',
        label: 'Ghi chú',
        minWidth: 200,
    },
    {
        id: 'createTime',
        label: 'Ngày thêm',
        minWidth: 170,
        align: 'center',
    },
    {
        id: 'feature',
        label: 'Chức năng',
        minWidth: 100,
        align: 'center',
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

export default function CarManager() {

    const classes = useStyles();

    const accountId = localStorage.getItem('accountId');

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [openAddCarForm, setOpenAddCarForm] = React.useState(false);

    const handleClickOpenAddCarForm = () => {
        setOpenAddCarForm(true);
    };

    const handleCloseAddCarForm = () => {
        setOpenAddCarForm(false);
    };

    const [openEditCarForm, setOpenEditCarForm] = React.useState(false);
    const [carIdChose, setCarIdChose] = React.useState("");

    const handleClickOpenEditCarForm = (carId: string) => {
        setCarIdChose(carId);
        setOpenEditCarForm(true);
    };

    const handleCloseEditCarForm = () => {
        setOpenEditCarForm(false);
    };

    const [listCarNumber, setListCarNumber] = useState<CommonResponse2[]>([]);
    const [carNumber, setCarNumber] = useState<string>("");
    const [listCarType, setListCarType] = useState<CommonResponse2[]>([]);
    const [carType, setCarType] = useState<string>("");
    const [listCar, setListCar] = useState<CarResponse[]>([]);

    const initialLayout: SeatLayout = {
        columns: 2,
        rows: 2,
        levels: 2,
        seats: [
        ]
    };


    useEffect(() => {
        async function fetchData() {
            const carNumbers = await carCompanyApi.getListCarNumber({ keyword: null, accountId: accountId });
            const carTypes = await carCompanyApi.getListCarType({ keyword: null, accountId: accountId });
            const cars = await carCompanyApi.getListCar({
                accountId: accountId,
                carNumber: carNumber === "" ? null : carNumber,
                carTypeCode: carType === "" ? null : carType,
            });
            setListCarNumber(carNumbers.data);
            setListCarType(carTypes.data);
            setListCar(cars.data)
        }
        fetchData();
    }, [accountId])

    const handleSearch = () => {
        async function fetchData() {
            const cars = await carCompanyApi.getListCar({
                accountId: accountId,
                carNumber: carNumber === "" ? null : carNumber,
                carTypeCode: carType === "" ? null : carType,
            });

            setListCar(cars.data);
        }
        fetchData();
    }

    const handleDeleteCar = async (carId: string) => {
        const response = await carCompanyApi.removeCar(carId);

        if (response.data === true) {
            // Toast success
            toast.success('Xóa xe thành công !', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1500,
            });
            setTimeout(function () {
                window.location.reload();
            }, 1500); // Chờ 3 giây trước khi reload
        }
        else {
            toast.error('Đã có lỗi xảy ra !', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
        }
    }

    return (
        <Box>
            <Box className={styles.pageHeader}>
                <Typography variant="h6">
                    QUẢN LÝ XE
                </Typography>
                <Box>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={styles.btnAdd}
                        startIcon={<IoIosAdd />}
                        onClick={handleClickOpen}
                    >
                        Thêm loại xe
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={styles.btnAdd}
                        startIcon={<IoIosAdd />}
                        onClick={handleClickOpenAddCarForm}
                    >
                        Thêm xe
                    </Button>
                </Box>
            </Box>
            <Box className={styles.contentHeader}>
                <Grid container className={styles.filterContainer} justifyContent="center">
                    <Grid item sm={5} container alignItems="center" justifyContent="center">
                        <Typography className={styles.labelFilter}>Mã số xe</Typography>
                        <Autocomplete
                            id="combo-box-car-number"
                            options={listCarNumber}
                            getOptionLabel={(option) => option.value}
                            style={{ width: 400 }}
                            size="small"
                            className={styles.inputField}
                            onChange={(event, value) => setCarNumber(value == null ? "" : value.key)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                />
                            )}
                        />
                    </Grid>
                    <Grid item sm={5} container alignItems="center" justifyContent="center">
                        <Typography className={styles.labelFilter}>Loại xe</Typography>
                        <Autocomplete
                            id="combo-box-car-type"
                            options={listCarType}
                            getOptionLabel={(option) => option.value}
                            style={{ width: 400 }}
                            size="small"
                            className={styles.inputField}
                            onChange={(event, value) => setCarType(value == null ? "" : value.key)}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </Grid>
                </Grid>
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
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell className={styles.tableHeader}>STT</TableCell>
                                {columns.map((column) => (
                                    <TableCell
                                        className={column.id === "carId" ? styles.hiddenItem : styles.tableHeader}
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
                            {listCar.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                const rowNumber = page * rowsPerPage + index + 1;
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.carId} className={styles.row}>
                                        <TableCell className={`${styles.tableData} ${styles.stt} text-center`}>{rowNumber}</TableCell> {/* Hiển thị số thứ tự */}
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            if (column.id === 'feature') {
                                                return (
                                                    <TableCell className={styles.tableData} key={column.id} align={column.align}>
                                                        <IconButton
                                                            aria-label="edit"
                                                            className={styles.actionBtn}
                                                            onClick={() => handleClickOpenEditCarForm(row.carId)}>
                                                            <EditOutlined className={styles.actionIcon} />
                                                        </IconButton>
                                                        <IconButton
                                                            aria-label="delete"
                                                            className={styles.actionBtn}
                                                            onClick={() => handleDeleteCar(row.carId)}>
                                                            <DeleteOutline className={styles.actionIcon} />
                                                        </IconButton>
                                                    </TableCell>
                                                );
                                            } else if (column.id === 'createTime') {
                                                return (
                                                    <TableCell className={styles.tableData} key={column.id} align={column.align}>
                                                        {moment(row.createTime).format('DD-MM-yyyy HH:mm')}
                                                    </TableCell>
                                                );
                                            }
                                            return (
                                                <TableCell
                                                    className={column.id === 'carId' ? styles.hiddenItem : styles.tableData}
                                                    key={column.id}
                                                    align={column.align}
                                                >
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={listCar.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                fullWidth={true}
                maxWidth="md">
                <DialogTitle id="form-dialog-title">Thêm mới loại xe</DialogTitle>
                <DialogContent>
                    <SeatLayoutForm layout={initialLayout} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openAddCarForm}
                onClose={handleCloseAddCarForm}
                aria-labelledby="form-dialog-title"
                fullWidth={true}
                maxWidth="md">
                <DialogTitle id="form-dialog-title">Thêm mới xe</DialogTitle>
                <DialogContent className={styles.dialogContent}>
                    <AddCarForm />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddCarForm} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openEditCarForm}
                onClose={handleCloseEditCarForm}
                aria-labelledby="form-dialog-title"
                fullWidth={true}
                maxWidth="md"
            >
                <DialogTitle id="form-dialog-title">Chi tiết xe</DialogTitle>
                <DialogContent>
                    <EditCarForm carId={carIdChose} onSave={function (value: string): void {
                        throw new Error("Function not implemented.");
                    }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditCarForm} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}