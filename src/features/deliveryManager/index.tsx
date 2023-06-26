import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, IconButton, Paper, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from "@material-ui/core";
import { DeleteOutline, EditOutlined, SearchOutlined } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import { IoIosAdd } from "react-icons/io";
import styles from "./styles.module.css"
import { useEffect, useState } from "react";
import { CommonResponse2 } from "models";
import CommonApi from "api/commonApi";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { provinceAction, selectProvinceList } from "features/common/province/provinceSlice";
import React from "react";
import AddDeliveryForm from "./components/addDelivery";
import { DeliveryResponse } from "models/carCompany/delivery/delivery";
import DeliveryApi, { updateStatusDelivery } from "api/deliveryApi";

interface Column {
    id: 'deliveryId' | 'deliveryCode' | 'tripInfo' | 'sender' | 'receiver' | 'phoneNumber' | 'email' | 'address' | 'isShipAtHome' | 'cost' | 'status' | 'feature';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: 'deliveryId', label: 'Id đơn vận chuyển' },
    { id: 'deliveryCode', label: 'Mã đơn vận chuyển', minWidth: 170 },
    { id: 'tripInfo', label: 'Thông tin chuyến', minWidth: 300 },
    { id: 'sender', label: 'Người gửi', minWidth: 150 },
    { id: 'receiver', label: 'Người nhận', minWidth: 150 },
    {
        id: 'phoneNumber',
        label: 'Số điện thoại',
        minWidth: 120,
    },
    {
        id: 'email',
        label: 'Email',
        minWidth: 100,
    },
    { id: 'address', label: 'Địa chỉ', minWidth: 170 },
    { id: 'isShipAtHome', label: 'Nhận hàng tại nhà', minWidth: 200 },
    { id: 'cost', label: 'Phí vận chuyển', minWidth: 150 },
    { id: 'status', label: 'Trạng thái', minWidth: 100 },
    { id: 'feature', label: 'Chức năng', minWidth: 170 },
];

export default function DeliveryManager() {
    const accountId = localStorage.getItem('accountId');

    const [listRoute, setListRoute] = useState<CommonResponse2[]>([]);
    const [listDelivery, setListDelivery] = useState<DeliveryResponse[]>([]);
    const [route, setRoute] = useState<string | null>(null);
    const provinceList = useAppSelector(selectProvinceList);
    const [name, setName] = React.useState<string>("");
    const [phoneNumber, setPhoneNumber] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [status, setStatus] = React.useState<string>("InProgress");

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

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

    const options = provinceList.map((option) => {
        const groupBy = option.provinceName;

        return {
            groupBy: groupBy,
            ...option,
        };
    });

    const [openAddDeliveryForm, setOpenAddDeliveryForm] = React.useState(false);

    const handleClickOpenAddDeliveryForm = () => {
        setOpenAddDeliveryForm(true);
    };

    const handleCloseAddDeliveryForm = () => {
        setOpenAddDeliveryForm(false);
    };

    const handleSearch = () => {
        async function fetchData() {
            const deliveries = await DeliveryApi.getListDelivery({
                routeId: route,
                receiver: name,
                phoneNumber: phoneNumber,
                email: email,
                status: status
            });

            setListDelivery(deliveries.data);
        }
        fetchData();
    }

    const handleUpdateStatus = (deliveryId: string) => {
        updateStatusDelivery({
            deliveryId: deliveryId
        })
    }

    return (
        <Box>
            <Box className={styles.pageHeader}>
                <Typography variant="h6">
                    QUẢN LÝ GIAO HÀNG
                </Typography>
                <Box>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={styles.btnAdd}
                        startIcon={<IoIosAdd />}
                        onClick={handleClickOpenAddDeliveryForm}
                    >
                        Thêm đơn hàng
                    </Button>
                </Box>
            </Box>
            <Box className={styles.contentHeader}>
                <Grid container className={styles.filterContainer} justifyContent="flex-start">
                    <Grid item sm={5} className={styles.filterItem} container alignItems="center" justifyContent="space-between">
                        <Typography className={styles.labelFilter}>Tuyến xe:</Typography>
                        <Autocomplete
                            id="combo-box-route"
                            options={listRoute}
                            getOptionLabel={(option) => option.value}
                            className={styles.filterInput}
                            style={{ width: 300 }}
                            size="small"
                            onChange={(event, value) => setRoute(value == null ? "" : value.key)}
                            renderInput={(params) => <TextField {...params} variant="outlined" />
                            }
                        />
                    </Grid>
                    <Grid item sm={5} className={styles.filterItem} container alignItems="center" justifyContent="space-between">
                        <Typography className={styles.labelFilter}>Tên người nhận</Typography>
                        <TextField
                            required
                            size="small"
                            style={{ width: 300 }}
                            id="name"
                            variant="outlined"
                            onChange={(e) => setName(e.target.value)} />
                    </Grid>
                    <Grid item sm={5} className={styles.filterItem} container alignItems="center" justifyContent="space-between">
                        <Typography className={styles.labelFilter}>Số điện thoại</Typography>
                        <TextField
                            required
                            size="small"
                            style={{ width: 300 }}
                            id="phoneNumber"
                            variant="outlined"
                            onChange={(e) => setPhoneNumber(e.target.value)} />
                    </Grid>
                    <Grid item sm={5} className={styles.filterItem} container alignItems="center" justifyContent="space-between">
                        <Typography className={styles.labelFilter}>Email</Typography>
                        <TextField
                            required
                            size="small"
                            style={{ width: 300 }}
                            id="email"
                            variant="outlined"
                            onChange={(e) => setEmail(e.target.value)} />
                    </Grid>
                    <Grid item sm={5} className={styles.filterItem} container alignItems="center" justifyContent="space-between">
                        <Typography className={styles.labelFilter}>Trạng thái:</Typography>
                        <RadioGroup
                            aria-label="status"
                            name="status"
                            value={status}
                            className={styles.radioStatus}
                            onChange={(e) => setStatus(e.target.value)}>
                            <FormControlLabel value="InProgress" control={<Radio />} label="Đang vận chuyển" />
                            <FormControlLabel value="Done" control={<Radio />} label="Đã nhận" />
                        </RadioGroup>
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
            <Paper>
                <TableContainer>
                    <Table stickyHeader aria-label="table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        className={column.id === "deliveryId" ? styles.hiddenItem : styles.tableHeader}
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
                            {listDelivery.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.deliveryId}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            if (column.id === 'isShipAtHome') {
                                                if (row.isShipAtHome === true)
                                                    return (
                                                        <TableCell
                                                            key={column.id}
                                                            align={column.align}>
                                                            <Checkbox
                                                                defaultChecked
                                                                disabled
                                                                color="primary"
                                                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                            />
                                                        </TableCell>
                                                    );
                                                else
                                                    return (
                                                        <TableCell
                                                            key={column.id}
                                                            align={column.align}>
                                                            <Checkbox
                                                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                            />
                                                        </TableCell>
                                                    );
                                            }
                                            else if (column.id === 'cost')
                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}>
                                                        {column.format && typeof value === 'number' ? column.format(value) : value.toLocaleString()} VNĐ
                                                    </TableCell>
                                                );
                                            else if (column.id === 'feature')
                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}>
                                                        <Button
                                                            aria-label="receive"
                                                            onClick={() => handleUpdateStatus(row.deliveryId)}>
                                                            Nhận hàng
                                                        </Button>
                                                    </TableCell>
                                                );
                                            return (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    className={column.id === "deliveryId" ? styles.hiddenItem : ""}>
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
                    count={listDelivery.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>


            <Dialog
                open={openAddDeliveryForm}
                onClose={handleCloseAddDeliveryForm}
                aria-labelledby="form-dialog-title"
                fullWidth={true}
                maxWidth="md">
                <DialogTitle id="form-dialog-title">Thêm đơn vận chuyển</DialogTitle>
                <DialogContent>
                    <AddDeliveryForm />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddDeliveryForm} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}