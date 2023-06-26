import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Theme, Typography, createStyles, makeStyles } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect } from "react";
import styles from "./styles.module.css"
import { DeleteOutline, EditOutlined, SearchOutlined } from "@material-ui/icons";
import { RouteResponse } from "models/carCompany/route/route";
import RouteApi from "api/routeApi";
import { IoIosAdd } from "react-icons/io";
import AddRouteForm from "./components/addRouteForm";
import EditRouteForm from "./components/editRouteForm";
import { toast } from "react-toastify";
import { CommonResponse4 } from "models";
import provinceApi from "api/provinceApi";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from "react-bootstrap";

interface Column {
    id: 'routeId' | 'routeCode' | 'startPoint' | 'endPoint' | 'distance' | 'description' | 'feature';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: 'routeId', label: 'Id tuyến' },
    { id: 'routeCode', label: 'Mã tuyến', minWidth: 170 },
    { id: 'startPoint', label: 'Điểm đi', minWidth: 100 },
    { id: 'endPoint', label: 'Điểm đến', minWidth: 100 },
    { id: 'distance', label: 'Khoảng cách', minWidth: 100 },
    {
        id: 'description',
        label: 'Ghi chú',
        minWidth: 200,
    },
    {
        id: 'feature',
        label: 'Chức năng',
        minWidth: 170,
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

export default function RouteManager() {
    const accountId = localStorage.getItem('accountId');

    const classes = useStyles();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [routeList, setRouteList] = React.useState<RouteResponse[]>([]);
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
        else{
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
        else{
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

    const handleSearch = () => {
        async function fetchData() {
            const route = await RouteApi.getListRoute({
                accountId: accountId,
                startPoint: startPoint !== null ? startPoint.key : "",
                endPoint: endPoint !== null ? endPoint.key : "",
            });

            setRouteList(route.data);
        }
        fetchData();
    }

    const [openAddRouteForm, setOpenAddRouteForm] = React.useState(false);

    const handleClickOpenAddRouteForm = () => {
        setOpenAddRouteForm(true);
    };

    const handleCloseAddRouteForm = () => {
        setOpenAddRouteForm(false);
    };

    const [openEditRouteForm, setOpenEditRouteForm] = React.useState(false);
    const [routeIdChose, setRouteIdChose] = React.useState("");

    const handleClickOpenEditRouteForm = (routeId: string) => {
        setOpenEditRouteForm(true);
        setRouteIdChose(routeId);
    };

    const handleCloseEditRouteForm = () => {
        setOpenEditRouteForm(false);
    };

    const handleDeleteRoute = async (routeId: string) => {
        const response = await RouteApi.removeRoute(routeId);

        if (response.data === true) {
            // Toast success
            toast.success('Xóa tuyến xe thành công !', {
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
                    QUẢN LÝ TUYẾN XE
                </Typography>
                <Box>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={styles.btnAdd}
                        startIcon={<IoIosAdd />}
                        onClick={handleClickOpenAddRouteForm}
                    >
                        Thêm tuyến
                    </Button>
                </Box>
            </Box>
            <Box className={styles.contentHeader}>
                <Box className={styles.filterContainer} justifyContent="center">
                    <Container className="pt-3">
                        <Row>
                            <Col md={5}>
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
                            <Col md={5} className="mb-3">
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
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell className={styles.tableHeader}>STT</TableCell>
                                {columns.map((column) => (
                                    <TableCell
                                        className={column.id === "routeId" ? styles.hiddenItem : styles.tableHeader}
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
                            {routeList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                const rowNumber = page * rowsPerPage + index + 1;
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.routeId}>
                                        <TableCell className={`${styles.tableData} ${styles.stt} text-center`}>{rowNumber}</TableCell> {/* Hiển thị số thứ tự */}
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            if (column.id === 'distance')
                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}>
                                                        {column.format && typeof value === 'number' ? column.format(value) + ' Km' : value + ' Km'}
                                                    </TableCell>
                                                );
                                            else if (column.id === 'feature')
                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}>
                                                        <IconButton
                                                            aria-label="edit"
                                                            onClick={() => handleClickOpenEditRouteForm(row.routeId)}>
                                                            <EditOutlined />
                                                        </IconButton>
                                                        <IconButton
                                                            aria-label="delete"
                                                            onClick={() => handleDeleteRoute(row.routeId)}>
                                                            <DeleteOutline />
                                                        </IconButton>
                                                    </TableCell>
                                                );
                                            return (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    className={column.id === "routeId" ? styles.hiddenItem : styles.tableData}>
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
                    count={routeList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            <Dialog
                open={openAddRouteForm}
                onClose={handleCloseAddRouteForm}
                aria-labelledby="form-dialog-title"
                fullWidth={true}
                maxWidth="md">
                <DialogTitle id="form-dialog-title">Thêm tuyến</DialogTitle>
                <DialogContent>
                    <AddRouteForm />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddRouteForm} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openEditRouteForm}
                onClose={handleCloseEditRouteForm}
                aria-labelledby="form-dialog-title"
                fullWidth={true}
                maxWidth="md">
                <DialogTitle id="form-dialog-title">Thông tin tuyến</DialogTitle>
                <DialogContent>
                    <EditRouteForm routeId={routeIdChose} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditRouteForm} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}