import { AppBar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tabs, TextField, Theme, Typography, createStyles, makeStyles, useTheme } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import styles from "./styles.module.css"
import { SearchOutlined } from "@material-ui/icons";
import { provinceAction, selectProvinceList } from "features/common/province/provinceSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import React, { useEffect, useState } from "react";
import { CommonResponse2 } from "models";
import carCompanyApi from "api/carCompanyApi";
import TripApi from "api/tripApi";
import { TripResponse } from "models/carCompany/trip/trip";
import BookTicketForm from "./components/bookTicketForm";
import SwipeableViews from 'react-swipeable-views';
import BuyTicketForm from "./components/buyTicketForm";
import CommonApi from "api/commonApi";
import { TicketResponse } from "models/carCompany/ticket/ticket";
import TicketApi from "api/ticketApi";
import moment from "moment";


interface Column {
    id: 'tripId' | 'tripCode' | 'startPoint' | 'endPoint' | 'startDate' | 'carNumber' | 'carType' | 'driver' | 'description' | 'feature';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: 'tripId', label: 'Id chuyến' },
    { id: 'tripCode', label: 'Mã chuyến', minWidth: 100 },
    { id: 'startPoint', label: 'Điểm đi', minWidth: 200 },
    { id: 'endPoint', label: 'Điểm đến', minWidth: 200 },
    { id: 'startDate', label: 'Ngày đi', minWidth: 170 },
    { id: 'carNumber', label: 'Mã số xe', minWidth: 170 },
    { id: 'carType', label: 'Loại xe', minWidth: 170 },
    { id: 'driver', label: 'Nhân viên lái xe', minWidth: 170 },
    {
        id: 'description',
        label: 'Ghi chú',
        minWidth: 200,
    },
    {
        id: 'feature',
        label: 'Chức năng',
        minWidth: 200,
    },
];

interface Column2 {
    id: 'ticketId' | 'ticketCode' | 'name' | 'phoneNumber' | 'email' | 'price' | 'bookDate' | 'status' | 'feature';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns2: Column2[] = [
    { id: 'ticketId', label: 'Id vé' },
    { id: 'ticketCode', label: 'Mã vé', minWidth: 150 },
    { id: 'name', label: 'Tên người đặt', minWidth: 170 },
    { id: 'phoneNumber', label: 'Số điện thoại', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 100 },
    { id: 'price', label: 'Giá', minWidth: 100 },
    { id: 'bookDate', label: 'Ngày đặt', minWidth: 170 },
    { id: 'status', label: 'Trạng thái', minWidth: 100 },
    {
        id: 'feature',
        label: 'Chức năng',
        minWidth: 200,
    },
];


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        // root: {
        //     '& .MuiTextField-root': {
        //         margin: theme.spacing(1),
        //         width: '25ch',
        //     },
        // },
        root: {
            backgroundColor: theme.palette.background.paper,
            width: 500,
        },

        container: {
            maxHeight: 440,
        },
    }),
);

function a11yProps(index: any) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

export default function TicketManager() {
    const accountId = localStorage.getItem('accountId');

    const classes = useStyles();
    const theme = useTheme();

    const provinceList = useAppSelector(selectProvinceList);
    const [startPoint, setStartPoint] = React.useState<string>("");
    const [endPoint, setEndPoint] = React.useState<string>("");
    const [phoneNumber, setPhoneNumber] = React.useState<string | null>(null);
    const [listRoute, setListRoute] = useState<CommonResponse2[]>([]);
    const [route, setRoute] = useState<string>("");

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const options = provinceList.map((option) => {
        const groupBy = option.provinceName;

        return {
            groupBy: groupBy,
            ...option,
        };
    });


    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(
            provinceAction.fetchProvinceList({
            })
        );
    }, [dispatch])

    useEffect(() => {
        async function fetchData() {
            const routes = await CommonApi.getListRoute(accountId);
            setListRoute(routes.data);
        }
        fetchData();
    }, [accountId])

    const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    const [listCarType, setListCarType] = useState<CommonResponse2[]>([]);
    const [carType, setCarType] = useState<string>("");
    const [listTrip, setListTrip] = useState<TripResponse[]>([]);
    const [listTicket, setListTicket] = useState<TicketResponse[]>([]);

    const [openBookTicketForm, setOpenBookTicketForm] = React.useState(false);
    const [tripIdChose, setTripIdChose] = React.useState("");

    const handleClickOpenBookTicketForm = (tripId: string) => {
        setOpenBookTicketForm(true);
        setTripIdChose(tripId);
    };

    const handleCloseBookTicketForm = () => {
        setOpenBookTicketForm(false);
    };

    const [openBuyTicketForm, setOpenBuyTicketForm] = React.useState(false);

    const handleClickOpeBuyTicketForm = (tripId: string) => {
        setOpenBuyTicketForm(true);
        setTripIdChose(tripId);
    };

    const handleCloseBuyTicketForm = () => {
        setOpenBuyTicketForm(false);
    };

    useEffect(() => {
        async function fetchData() {
            const carTypes = await carCompanyApi.getListCarType({ keyword: null, accountId: accountId });
            const trips = await TripApi.getListTrip({
                accountId: accountId,
                carNumber: "",
                carType: carType,
                driver: "",
                endPoint: endPoint,
                startPoint: startPoint,
                startDate: selectedDate !== null ? selectedDate.toISOString().split('T')[0] : null,
            })
            setListCarType(carTypes.data);
            setListTrip(trips.data);
        }
        fetchData();
    }, [accountId])

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    const handleSearch = () => {
        async function fetchData() {
            const route = await TripApi.getListTrip({
                accountId: accountId,
                carNumber: "",
                carType: carType,
                driver: "",
                endPoint: endPoint,
                startPoint: startPoint,
                startDate: selectedDate !== null ? selectedDate.toISOString().split('T')[0] : null,
            });

            setListTrip(route.data);
        }
        fetchData();
    }

    const handleSearch2 = () => {
        async function fetchData() {
            const tickets = await TicketApi.getListTicket(phoneNumber)

            setListTicket(tickets.data);
        }
        fetchData();
    }

    return (
        <Box>
            <Typography variant="h6">
                QUẢN LÝ VÉ
            </Typography>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Đặt vé/Mua vé" {...a11yProps(0)} />
                    <Tab label="Nhận vé" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
                className={styles.tabConatiner}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <Box className={styles.contentHeader}>
                        <Grid container className={styles.filterContainer}>
                            <Grid className={styles.leftFilterContainer}>
                                <Grid item className={styles.filterItem} container alignItems="center" justifyContent="space-between">
                                    <Typography className={styles.labelFilter}>Điểm đi</Typography>
                                    <Autocomplete
                                        id="start-point"
                                        options={options.sort((a, b) => -b.provinceCode.localeCompare(a.provinceCode))}
                                        groupBy={(option) => option.groupBy}
                                        style={{ width: 300 }}
                                        size="small"
                                        getOptionLabel={(option) => option.districtName}
                                        onChange={(event, value) => setStartPoint(value == null ? "" : value.districtCode)}
                                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                                    />
                                </Grid>
                                <Grid item className={styles.filterItem} container alignItems="center" justifyContent="space-between">
                                    <Typography className={styles.labelFilter}>Ngày đi</Typography>
                                    <TextField
                                        id="date"
                                        type="date"
                                        variant="outlined"
                                        size="small"
                                        style={{ width: 300 }}
                                        onChange={(e) => handleDateChange(new Date(e.target.value))}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid className={styles.rightFilterContainer}>
                                <Grid item className={styles.filterItem} container alignItems="center" justifyContent="space-between">
                                    <Typography className={styles.labelFilter}>Điểm đến</Typography>
                                    <Autocomplete
                                        id="end-point"
                                        style={{ width: 300 }}
                                        size="small"
                                        options={options.sort((a, b) => -b.provinceCode.localeCompare(a.provinceCode))}
                                        groupBy={(option) => option.groupBy}
                                        getOptionLabel={(option) => option.districtName}
                                        onChange={(event, value) => setEndPoint(value == null ? "" : value.districtCode)}
                                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                                    />
                                </Grid>
                                <Grid item className={styles.filterItem} container alignItems="center" justifyContent="space-between">
                                    <Typography className={styles.labelFilter}>Loại xe</Typography>
                                    <Autocomplete
                                        id="combo-box-car-type"
                                        options={listCarType}
                                        getOptionLabel={(option) => option.value}
                                        style={{ width: 300 }}
                                        size="small"
                                        onChange={(event, value) => setCarType(value == null ? "" : value.key)}
                                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Box className={styles.btnFilterContainer}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                className={styles.btnFilter}
                                startIcon={<SearchOutlined />}
                                onClick={handleSearch}
                            >
                                Tìm kiếm
                            </Button>
                        </Box>
                    </Box>
                    <Paper className={styles.tableContainer}>
                        <TableContainer className={classes.container}>
                            <Table stickyHeader aria-label="sticky table" size="small">
                                <TableHead>
                                    <TableRow>
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
                                    {listTrip.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.tripId}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    if (column.id === 'feature')
                                                        return (
                                                            <TableCell key={column.id} align={column.align}>
                                                                <Button
                                                                    variant="contained"
                                                                    color="primary"
                                                                    size="small"
                                                                    className={styles.btnBase}
                                                                    onClick={() => handleClickOpenBookTicketForm(row.tripId)}
                                                                >
                                                                    Đặt vé
                                                                </Button>
                                                                <Button
                                                                    variant="contained"
                                                                    color="primary"
                                                                    size="small"
                                                                    className={styles.btnBase}
                                                                    onClick={() => handleClickOpeBuyTicketForm(row.tripId)}
                                                                >
                                                                    Mua vé
                                                                </Button>
                                                            </TableCell>
                                                        );
                                                    else if (column.id === 'startDate')
                                                        return (
                                                            <TableCell
                                                                key={column.id}
                                                                align={column.align}
                                                                className={styles.tableData}>
                                                                {moment(row.startDate).format('DD-MM-yyyy HH:mm')}
                                                            </TableCell>
                                                        );
                                                    return (
                                                        <TableCell
                                                            key={column.id}
                                                            align={column.align}
                                                            className={column.id === "tripId" ? styles.hiddenItem : ""}>
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
                            count={listTrip.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <Box className={styles.contentHeader}>
                        <Grid container justifyContent="center">
                            <Grid item sm={5} className={styles.filterItem} container alignItems="center" justifyContent="center">
                                <Typography className={styles.labelFilter}>Số điện thoại</Typography>
                                <TextField
                                    required
                                    size="small"
                                    id="PhoneNumer"
                                    variant="outlined"
                                    onChange={(e) => setPhoneNumber(e.target.value)} />
                            </Grid>
                        </Grid>
                        <Box className={styles.btnFilterContainer}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                className={styles.btnFilter}
                                startIcon={<SearchOutlined />}
                                onClick={handleSearch2}
                            >
                                Tìm kiếm
                            </Button>
                        </Box>
                    </Box>
                    <Paper className={styles.tableContainer}>
                        <TableContainer className={classes.container}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns2.map((column) => (
                                            <TableCell
                                                className={column.id === "ticketId" ? styles.hiddenItem : styles.tableHeader}
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
                                    {listTicket.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.ticketId}>
                                                {columns2.map((column) => {
                                                    const value = row[column.id];
                                                    if (column.id === 'feature')
                                                        return (
                                                            <TableCell key={column.id} align={column.align}>
                                                                <Button
                                                                    variant="contained"
                                                                    color="primary"
                                                                    size="small"
                                                                    className={styles.btnBase}
                                                                    onClick={() => handleClickOpenBookTicketForm(row.ticketId)}
                                                                >
                                                                    Nhận vé
                                                                </Button>
                                                                <Button
                                                                    variant="contained"
                                                                    color="primary"
                                                                    size="small"
                                                                    className={styles.btnBase}
                                                                >
                                                                    Hủy vé
                                                                </Button>
                                                            </TableCell>
                                                        );
                                                        else if (column.id === 'bookDate')
                                                        return (
                                                            <TableCell
                                                                key={column.id}
                                                                align={column.align}
                                                                className={styles.tableData}>
                                                                {moment(row.bookDate).format('DD-MM-yyyy')}
                                                            </TableCell>
                                                        );
                                                    return (
                                                        <TableCell
                                                            key={column.id}
                                                            align={column.align}
                                                            className={column.id === "ticketId" ? styles.hiddenItem : ""}>
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
                            count={listTicket.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </TabPanel>
            </SwipeableViews>

            <Dialog
                open={openBookTicketForm}
                onClose={handleCloseBookTicketForm}
                aria-labelledby="form-dialog-title"
                fullWidth={true}
                maxWidth="md">
                <DialogTitle id="form-dialog-title">Đặt vé</DialogTitle>
                <DialogContent>
                    <BookTicketForm tripId={tripIdChose} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseBookTicketForm} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openBuyTicketForm}
                onClose={handleCloseBuyTicketForm}
                aria-labelledby="form-dialog-title"
                fullWidth={true}
                maxWidth="md">
                <DialogTitle id="form-dialog-title">Mua vé</DialogTitle>
                <DialogContent>
                    <BuyTicketForm tripId={tripIdChose} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseBuyTicketForm} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}