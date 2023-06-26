import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Theme, Typography, createStyles, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import styles from "./styles.module.css"
import { DeleteOutline, EditOutlined } from "@material-ui/icons";
import { CommonResponse3 } from "models";
import EmployeeApi from "api/employeeApi";
import { EmployeeResponse } from "models/carCompany/employee/employee";
import EditEmployeeForm from "./components/editEmployee";
import { IoIosAdd } from "react-icons/io";
import AddEmployeeForm from "./components/addEmployee";
import { toast } from "react-toastify";
import { Col, Row } from "react-bootstrap";
import Select from 'react-select';

interface Column {
    id: 'employeeId' | 'employeeCode' | 'employeeName' | 'position' | 'phoneNumber' | 'email' | 'description' | 'feature';
    label: string;
    minWidth?: number;
    align?: 'right' | 'center' | 'left';
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: 'employeeId', label: 'Id nhân viên' },
    { id: 'employeeCode', label: 'Mã nhân viên', minWidth: 170, align: 'center' },
    { id: 'employeeName', label: 'Họ và tên', minWidth: 100, align: 'left' },
    { id: 'position', label: 'Vị trí', minWidth: 100, align: 'left'},
    { id: 'phoneNumber', label: 'Số điện thoại', minWidth: 100, align: 'left' },
    { id: 'email', label: 'Email', minWidth: 100, align: 'left' },
    {
        id: 'description',
        label: 'Ghi chú',
        minWidth: 200,
        align: 'left'
    },
    {
        id: 'feature',
        label: 'Chức năng',
        align: 'center',
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

export default function EmployeeManager() {
    const accountId = localStorage.getItem('accountId');

    const classes = useStyles();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [listPosition, setListPosition] = React.useState<CommonResponse3[]>([]);
    const [position, setPosition] = React.useState<CommonResponse3 | null>(null);
    const [listEmployeeCode, setListEmployeeCode] = React.useState<CommonResponse3[]>([]);
    const [employeeCode, setEmployeeCode] = React.useState<CommonResponse3 | null>(null);
    const [listEmployeeName, setListEmployeeName] = React.useState<CommonResponse3[]>([]);
    const [employeeName, setEmployeeName] = React.useState<CommonResponse3 | null>(null);
    const [listEmployee, setListEmployee] = React.useState<EmployeeResponse[]>([]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        async function fetchData() {
            const positions = await EmployeeApi.getListPosition();
            const employeeCodes = await EmployeeApi.getListEmployeeCode(accountId);
            const employeeNames = await EmployeeApi.getListEmployeeName(accountId);
            const employees = await EmployeeApi.getListEmployee({
                accountId: accountId,
                employeeCode: employeeCode !== null ? Number(employeeCode) : null,
                employeeName: employeeName !== null ? employeeName.value : null,
                positionCode: position !== null ? position.value : null
            });
            setListPosition(positions.data.map((item) => ({
                label: item.value,
                value: item.key,
            })));
            setListEmployeeCode(employeeCodes.data.map((item) => ({
                label: item.value,
                value: item.key,
            })));
            setListEmployeeName(employeeNames.data.map((item) => ({
                label: item.value,
                value: item.key,
            })));
            setListEmployee(employees.data);
        }
        fetchData();
    }, [accountId])

    const handleSearch = () => {
        async function fetchData() {
            const employees = await EmployeeApi.getListEmployee({
                accountId: accountId,
                employeeCode: employeeCode != null ? Number(employeeCode) : null,
                employeeName: employeeName !== null ? employeeName.value : "",
                positionCode: position !== null ? position.value : null
            });

            setListEmployee(employees.data);
        }
        fetchData();
    }

    const [openEditEmployeeForm, setOpenEditEmployeeForm] = React.useState(false);
    const [employeeIdChose, setEmployeeIdChose] = React.useState("");

    const handleClickOpenEditEmployeeForm = (employeeId: string) => {
        setEmployeeIdChose(employeeId);
        setOpenEditEmployeeForm(true);
    };

    const handleCloseEditEmployeForm = () => {
        setOpenEditEmployeeForm(false);
    };

    const [openAddEmployeeForm, setOpenAddEmployeeForm] = React.useState(false);

    const handleClickOpenAddEmployeeForm = () => {
        setOpenAddEmployeeForm(true);
    };

    const handleCloseAddEmployeForm = () => {
        setOpenAddEmployeeForm(false);
    };

    const handleDeleteEmployee = async (employeeId: string) => {
        const response = await EmployeeApi.removeEmployee(employeeId);

        if (response.data === true) {
            // Toast success
            toast.success('Xóa nhân viên thành công !', {
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
                    QUẢN LÝ NHÂN VIÊN
                </Typography>
                <Box>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={styles.btnAdd}
                        startIcon={<IoIosAdd />}
                        onClick={handleClickOpenAddEmployeeForm}
                    >
                        Thêm nhân viên
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
                                        <label className={styles.customLabel}>Mã nhân viên</label>
                                    </Col>
                                    <Col md={8}>
                                        <Select
                                            options={listEmployeeCode}
                                            onChange={(options) => setEmployeeCode(options)}
                                            className={styles.customDropdown}
                                            theme={(theme) => ({
                                                ...theme,
                                                borderRadius: 0,
                                            })}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Row>
                                    <Col md={4} className="d-flex align-items-center justify-content-end">
                                        <label className={styles.customLabel}>Họ và tên</label>
                                    </Col>
                                    <Col md={8}>
                                        <Select
                                            options={listEmployeeName}
                                            onChange={(options) => setEmployeeName(options)}
                                            className={styles.customDropdown}
                                            theme={(theme) => ({
                                                ...theme,
                                                borderRadius: 0,
                                            })}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={6}>
                                <Row className="mb-3">
                                    <Col md={4} className="d-flex align-items-center justify-content-end">
                                        <label className={styles.customLabel}>Vị trí</label>
                                    </Col>
                                    <Col md={8}>
                                        <Select
                                            options={listPosition}
                                            onChange={(options) => setPosition(options)}
                                            className={styles.customDropdown}
                                            theme={(theme) => ({
                                                ...theme,
                                                borderRadius: 0,
                                            })}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <div className="row">
                            <div className="col-md-12 d-flex justify-content-center mb-3">
                                <button
                                    className={`btn btn-primary ${styles.customBtn}`} onClick={handleSearch}>
                                    <i className={`fas fa-search mr-2 ${styles.customIcon}`}></i>
                                    Tra cứu
                                </button>
                            </div>
                        </div>
                    </Container>
                </Box>
            </Box>

            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell className={styles.tableHeader}>STT</TableCell>
                                {columns.map((column) => (
                                    <TableCell
                                        className={column.id === "employeeId" ? styles.hiddenItem : styles.tableHeader}
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
                            {listEmployee.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                const rowNumber = page * rowsPerPage + index + 1;
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.employeeId}>
                                        <TableCell className={`${styles.tableData} ${styles.stt} text-center`}>{rowNumber}</TableCell>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            if (column.id === 'feature')
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        <IconButton
                                                            aria-label="edit"
                                                            onClick={() => handleClickOpenEditEmployeeForm(row.employeeId)}>
                                                            <EditOutlined />
                                                        </IconButton>
                                                        <IconButton
                                                            aria-label="delete"
                                                            onClick={() => handleDeleteEmployee(row.employeeId)}>
                                                            <DeleteOutline />
                                                        </IconButton>
                                                    </TableCell>
                                                );
                                            return (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    className={column.id === "employeeId" ? styles.hiddenItem : styles.tableData}>
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
                    count={listEmployee.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <Dialog
                open={openAddEmployeeForm}
                onClose={handleCloseAddEmployeForm}
                aria-labelledby="form-dialog-title"
                fullWidth={true}
                maxWidth="md">
                <DialogTitle id="form-dialog-title">Thêm nhân viên</DialogTitle>
                <DialogContent>
                    <AddEmployeeForm />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddEmployeForm} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openEditEmployeeForm}
                onClose={handleCloseEditEmployeForm}
                aria-labelledby="form-dialog-title"
                fullWidth={true}
                maxWidth="md">
                <DialogTitle id="form-dialog-title">Thông tin nhân viên</DialogTitle>
                <DialogContent>
                    <EditEmployeeForm employeeId={employeeIdChose} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditEmployeForm} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}