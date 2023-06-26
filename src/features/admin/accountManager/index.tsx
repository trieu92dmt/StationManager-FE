import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Theme, Typography, alpha, createStyles, styled, withStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import React from "react";
import { CommonResponse2 } from "models";
import CommonApi from "api/commonApi";
import { Col, Container, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import { toast } from "react-toastify";
import styles from "./styles.module.css"
import { AccountResponse } from "models/admin/account";
import AccountApi from "api/accountApi";


interface Column {
    id: 'stt' | 'accountId' | 'username' | 'fullName' | 'role' | 'active' | 'feature';
    label: string;
    minWidth?: number;
    align?: 'right' | 'center' | 'left';
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: 'stt', label: 'STT', align: 'center' },
    { id: 'accountId', label: 'Id tài khoản' },
    { id: 'username', label: 'Tên đăng nhập', minWidth: 150, align: 'left' },
    { id: 'fullName', label: 'Tên đầy đủ', minWidth: 170, align: 'left' },
    { id: 'role', label: 'Vai trò', minWidth: 170, align: 'left' },
    { id: 'active', label: 'Trạng thái', minWidth: 170, align: 'left' },
    { id: 'feature', label: 'Chức năng', minWidth: 170, align: 'center', },
];

export default function AdminAccountManager() {

    const [username, setUsername] = useState("");
    const [fullname, setFullname] = useState("");
    const [active, setActive] = useState<boolean | null>(null);
    const [role, setRole] = useState<string | null>("");
    const [listAccount, setListAccount] = useState<AccountResponse[]>([]);
    const [listRole, setListRole] = useState<CommonResponse2[]>([]);

    useEffect(() => {
        async function fetchData() {
            const listAccount = await AccountApi.getListAccount({
                username: username,
                fullname: fullname,
                active: active,
                role: role
            });
            const rolelist = await CommonApi.getListRole();
            rolelist.data.unshift({ key: "", value: "-- Tất cả --" });

            setListAccount(listAccount.data)
            setListRole(rolelist.data)
        }
        fetchData();
        console.log(listRole)
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
        { value: null, label: '-- Tất cả --' },
        { value: true, label: 'Đang sử dụng' },
        { value: false, label: 'Ngưng sử dụng' },
    ];

    const option1s = listRole.map((role) => ({ value: role.key, label: role.value }))

    const [selectedOption, setSelectedOption] = useState({ value: null, label: '-- Tất cả --' });

    const handleChange = (selectedOption: any) => {
        setSelectedOption(selectedOption);
    };

    const handleSearch = () => {
        async function fetchData() {
            const listAccount = await AccountApi.getListAccount({
                username: username,
                fullname: fullname,
                active: active,
                role: role
            });
            setListAccount(listAccount.data)
        }
        fetchData();
    }

    const handleChangeStatusAccount = async (accountId: string, active: boolean) => {
        const response = await AccountApi.updateStatusAccount({
            accountId: accountId,
            active: active
        });

        let msg = '';
        if (active === false)
            msg = "Khóa tài khoản thành công!";
        else
            msg = "Mở khóa tài khoản thành công!"

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
                    QUẢN LÝ TÀI KHOẢN
                </Typography>
            </div>
            <Box className={styles.headerContent}>
                <Paper>
                    <Box className={styles.filterContainer} justifyContent="center">
                        <Container className="pt-3">
                            <Row>
                                <Col md={5}>
                                    <Row className="mb-3">
                                        <Col md={4} className="d-flex align-items-center justify-content-end">
                                            <label className={styles.customLabel}>Tên đăng nhập</label>
                                        </Col>
                                        <Col md={8}>
                                            <input
                                                type="text"
                                                className={`form-control ${styles.customInput}`}
                                                onChange={(e) => setUsername(e.target.value)}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={5} className="mb-3">
                                    <Row>
                                        <Col md={4} className="d-flex align-items-center justify-content-end">
                                            <label className={styles.customLabel}>Tên đầy đủ</label>
                                        </Col>
                                        <Col md={8}>
                                            <input
                                                type="text"
                                                className={`form-control ${styles.customInput}`}
                                                onChange={(e) => setFullname(e.target.value)}
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
                                            <Select
                                                defaultValue={options[0]}
                                                options={options}
                                                onChange={(options) => setActive(options?.value != undefined ? options.value : null)}
                                                className={styles.customDropdown}
                                                theme={(theme) => ({
                                                    ...theme,
                                                    borderRadius: 0,
                                                })}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={5}>
                                    <Row className="mb-3">
                                        <Col md={4} className="d-flex align-items-center justify-content-end">
                                            <label className={styles.customLabel}>Vai trò</label>
                                        </Col>
                                        <Col md={8}>
                                            <Select
                                                defaultValue={option1s[0]}
                                                options={option1s}
                                                onChange={(selectedOption) => setRole(selectedOption?.value || "")}
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
                    {listAccount?.length === 0 ? <div className={styles.noItem}>Chưa có tài khoản nào được tạo!</div> :
                        <><TableContainer className={styles.tableContainer}>
                            <Table stickyHeader aria-label="sticky table" size="small">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                className={column.id === "accountId" ? styles.hiddenItem : styles.tableHeader}
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
                                    {listAccount?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                        const rowNumber = page * rowsPerPage + index + 1;
                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={row.accountId}
                                            >
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    if (column.id === 'stt') {
                                                        return (
                                                            <TableCell className={styles.tableData} key={column.id} align={column.align}>
                                                                {rowNumber}
                                                            </TableCell>
                                                        );
                                                    }
                                                    else if (column.id === 'active') {
                                                        return (
                                                            <TableCell className={styles.tableData} key={column.id} align={column.align}>
                                                                {row.active === true ? "Đang hoạt động" : "Ngừng hoạt động"}
                                                            </TableCell>
                                                        );
                                                    }
                                                    else if (column.id === 'feature') {
                                                        return (
                                                            <TableCell className={styles.tableData} key={column.id} align={column.align}>
                                                                {
                                                                    row.active === true ?
                                                                        <button
                                                                            className={`btn btn-primary ${styles.customBtn}`}
                                                                            onClick={() => handleChangeStatusAccount(row.accountId, false)}
                                                                        >
                                                                            <i className={`fas fa-lock mr-2 ${styles.customIcon}`}></i>
                                                                            Khóa
                                                                        </button> : ""
                                                                }
                                                                {
                                                                    row.active === false ?
                                                                        <button
                                                                            className={`btn btn-primary ${styles.customBtn}`}
                                                                            onClick={() => handleChangeStatusAccount(row.accountId, true)}
                                                                        >
                                                                            <i className={`fas fa-unlock mr-2 ${styles.customIcon}`}></i>
                                                                            Mở khóa
                                                                        </button> : ""
                                                                }
                                                            </TableCell>
                                                        );
                                                    }
                                                    return (
                                                        <TableCell
                                                            className={column.id === 'accountId' ?
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
                                className="d-flex justify-content-end w-100"
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={listAccount.length ?? 0}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage} /></>
                    }
                </Paper>
            </Box>
        </Box>
    );
}