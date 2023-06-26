import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Theme, Typography, alpha, createStyles, styled, withStyles } from "@material-ui/core";
import styles from "./styles.module.css"
import { useEffect, useState } from "react";
import AdminApi from "api/adminApi";
import { CarCompanyResponse } from "models/admin/admin";
import React from "react";
import moment from "moment";
import { CommonResponse2 } from "models";
import CommonApi from "api/commonApi";
import { Col, Container, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import { toast } from "react-toastify";
import { baseURL } from "utils";

interface Column {
    id: 'stt' | 'carCompanyId' | 'carCompanyCode' | 'carCompanyName' | 'username' | 'email' | 'hotline' | 'phoneNumber' | 'officeAddress' | 'description' | 'createTime' | 'status' | 'feature';
    label: string;
    minWidth?: number;
    align?: 'right' | 'center';
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: 'stt', label: 'STT', align: 'center' },
    { id: 'carCompanyId', label: 'Id nhà xe' },
    { id: 'carCompanyCode', label: 'Mã nhà xe', minWidth: 150, align: 'center' },
    { id: 'carCompanyName', label: 'Tên nhà xe', minWidth: 170 },
    { id: 'username', label: 'Tên đăng nhập', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 170 },
    { id: 'hotline', label: 'Hotline', minWidth: 150, align: 'center' },
    { id: 'phoneNumber', label: 'Số điện thoại', minWidth: 150, align: 'center' },
    { id: 'officeAddress', label: 'Địa chỉ văn phòng', minWidth: 320 },
    { id: 'description', label: 'Mô tả', minWidth: 320 },
    { id: 'createTime', label: 'Ngày tạo', minWidth: 170, align: 'center' },
    { id: 'status', label: 'Trạng thái', minWidth: 150 },
    { id: 'feature', label: 'Chức năng', minWidth: 220, align: 'center', },
];

export default function AdminCarCompanyManager() {

    const [listCarCompany, setListCarCompany] = useState<CarCompanyResponse[]>([]);
    const [companyName, setCompanyName] = useState("");
    const [email, setEmail] = useState("");
    const [hotline, setHotline] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [status, setStatus] = useState<string | undefined>("");
    const [listCompanyName, setListCompanyName] = useState<CommonResponse2[]>([]);

    useEffect(() => {
        async function fetchData() {
            const listCarCompany = await AdminApi.getListDelivery({
                companyName: companyName,
                email: email,
                hotline: hotline,
                phoneNumber: phoneNumber,
                status: status !== undefined ? status : ""
            });
            const listCompanyName = await CommonApi.getListCarCompanyAdmin(null);

            setListCarCompany(listCarCompany.data)
            setListCompanyName(listCompanyName.data)
        }
        fetchData();
    }, [])

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const options = [
        { value: '', label: '-- Tất cả --' },
        { value: 'active', label: 'Đang sử dụng' },
        { value: 'inactive', label: 'Chờ duyệt' },
        { value: 'lock', label: 'Đã khóa' },
    ];

    const [selectedOption, setSelectedOption] = useState({ value: '', label: '-- Tất cả --' });

    const handleChange = (selectedOption: any) => {
        setSelectedOption(selectedOption);
    };

    const handleSearch = () => {
        async function fetchData() {
            const listCarCompany = await AdminApi.getListDelivery({
                companyName: companyName,
                email: email,
                hotline: hotline,
                phoneNumber: phoneNumber,
                status: status !== undefined ? status : ""
            });

            setListCarCompany(listCarCompany.data)
        }
        fetchData();
    }

    const handleApproveCarCompany = async (carCompanyId: string) => {
        const response = await AdminApi.approveCarCompany({
            carCompanyId: carCompanyId,
        });

        if (response.data === true) {
            // Toast success
            toast.success('Duyệt nhà xe thành công !', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
            setTimeout(function () {
                window.location.reload();
            }, 3000); // Chờ 3 giây trước khi reload
        }
        else {
            toast.error('Đã có lỗi xảy ra !', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
        }
    }

    const handleChangeStatusCarCompany = async (carCompanyId: string, status: string) => {
        const response = await AdminApi.changeStatusCarCompany({
            carCompanyId: carCompanyId,
            status: status
        });

        let msg = '';
        if (status === 'lock')
            msg = "Khóa nhà xe thành công!";
        else
            msg = "Mở khóa nhà xe thành công!"

        if (response.data === true) {
            // Toast success
            toast.success(msg, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
            setTimeout(function () {
                window.location.reload();
            }, 3000); // Chờ 3 giây trước khi reload
        }
        else {
            toast.error('Đã có lỗi xảy ra !', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
        }
    }

    return (
        <Box className={styles.bodyContainer}>
            <div className="d-flex justify-content-between align-items-center">
                <Typography variant="h6">
                    QUẢN LÝ NHÀ XE
                </Typography>
                <a className={`btn btn-primary ${styles.customBtn}`} href={baseURL + '/admin/car-company-manager/create'} target="_blank">
                    <i className={`fas fa-plus mr-2 ${styles.customIcon}`}></i>
                    Thêm mới
                </a>
            </div>
            <Box className={styles.headerContent}>
                <Paper>
                    <Box className={styles.filterContainer} justifyContent="center">
                        <Container className="pt-3">
                            <Row>
                                <Col md={5}>
                                    <Row className="mb-3">
                                        <Col md={4} className="d-flex align-items-center justify-content-end">
                                            <label className={styles.customLabel}>Tên nhà xe</label>
                                        </Col>
                                        <Col md={8}>
                                            <input
                                                type="text"
                                                className={`form-control ${styles.customInput}`}
                                                onChange={(e) => setCompanyName(e.target.value)}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={5} className="mb-3">
                                    <Row>
                                        <Col md={4} className="d-flex align-items-center justify-content-end">
                                            <label className={styles.customLabel}>Email</label>
                                        </Col>
                                        <Col md={8}>
                                            <input
                                                type="text"
                                                className={`form-control ${styles.customInput}`}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={5}>
                                    <Row className="mb-3">
                                        <Col md={4} className="d-flex align-items-center justify-content-end">
                                            <label className={styles.customLabel}>Hotline</label>
                                        </Col>
                                        <Col md={8}>
                                            <input
                                                type="text"
                                                className={`form-control ${styles.customInput}`}
                                                onChange={(e) => setHotline(e.target.value)}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={5}>
                                    <Row className="mb-3">
                                        <Col md={4} className="d-flex align-items-center justify-content-end">
                                            <label className={styles.customLabel}>Số điện thoại</label>
                                        </Col>
                                        <Col md={8}>
                                            <input
                                                type="text"
                                                className={`form-control ${styles.customInput}`}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={5}>
                                    <Row className="mb-3">
                                        <Col md={4} className="d-flex align-items-center justify-content-end">
                                            <label className={styles.customLabel}>Trạng thái</label>
                                        </Col>
                                        <Col md={8}>
                                            {/* <Select
                                                options={options}
                                                value={selectedOption}
                                                onChange={handleChange}
                                                isSearchable={true}
                                                className={styles.customDropdown}
                                            /> */}
                                            <Select
                                                defaultValue={options[0]}
                                                options={options}
                                                onChange={(options) => setStatus(options?.value)}
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
                </Paper>
            </Box>
            <Box className={styles.mainContent}>
                <Paper>
                    <TableContainer className={styles.tableContainer}>
                        <Table stickyHeader aria-label="sticky table" size="small">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            className={column.id === "carCompanyId" ? styles.hiddenItem : styles.tableHeader}
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
                                {listCarCompany.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                    const rowNumber = page * rowsPerPage + index + 1;
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.carCompanyId}
                                            className={row.status === 'Chờ duyệt' ? styles.rowPending : row.status === "Đã khóa" ? styles.rowLock : styles.row}
                                        >
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                if (column.id === 'feature') {
                                                    return (
                                                        <TableCell className={styles.tableData} key={column.id} align={column.align}>
                                                            <a className={`btn btn-primary ${styles.customBtn}`} href={baseURL + '/admin/car-company-manager/detail/' + row.carCompanyId}>
                                                                <i className={`fas fa-search-plus mr-2 ${styles.customIcon}`}></i>
                                                                Chi tiết
                                                            </a>
                                                            {row.status === 'Chờ duyệt' ?
                                                                <button
                                                                    className={`btn btn-primary ${styles.customBtn}`}
                                                                    onClick={() => handleApproveCarCompany(row.carCompanyId)}
                                                                >
                                                                    <i className={`fas fa-check mr-2 ${styles.customIcon}`}></i>
                                                                    Duyệt
                                                                </button> : ""}
                                                            {row.status === 'Đang sử dụng' ?
                                                                <button
                                                                    className={`btn btn-primary ${styles.customBtn}`}
                                                                    onClick={() => handleChangeStatusCarCompany(row.carCompanyId, 'lock')}
                                                                >
                                                                    <i className={`fas fa-lock mr-2 ${styles.customIcon}`}></i>
                                                                    Khóa
                                                                </button> : ""}
                                                            {row.status === 'Đã khóa' ?
                                                                <button
                                                                    className={`btn btn-primary ${styles.customBtn}`}
                                                                    onClick={() => handleChangeStatusCarCompany(row.carCompanyId, 'active')}
                                                                >
                                                                    <i className={`fas fa-lock-open mr-2 ${styles.customIcon}`}></i>
                                                                    Mở khóa
                                                                </button> : ""}
                                                        </TableCell>
                                                    );
                                                } else if (column.id === 'createTime') {
                                                    return (
                                                        <TableCell className={styles.tableData} key={column.id} align={column.align}>
                                                            {moment(row.createTime).format('DD-MM-yyyy HH:mm:ss')}
                                                        </TableCell>
                                                    );
                                                }
                                                return (
                                                    <TableCell
                                                        className={column.id === 'carCompanyId' ?
                                                            styles.hiddenItem :
                                                            styles.tableData}
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
                        count={listCarCompany.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
        </Box>
    );
}