import { Avatar, Box, Button, Card, CardContent, Grid, ListItem, ListItemIcon, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@material-ui/core";
import styles from './styles.module.css'
import { useAppDispatch, useAppSelector } from "app/hooks";
import { carCompanyInfoActions, selectCarCompanyInfo } from "./carCompanyInfoSlice";
import { useEffect } from 'react';
import { baseURL } from "utils";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ImStarFull } from "react-icons/im";
import moment from "moment";
import React from "react";

interface Column2 {
    id: 'stt' | 'rateId' | 'rate' | 'content' | 'createTime';
    label: string;
    minWidth?: number;
    align?: 'right' | 'center' | 'left';
    format?: (value: number) => string;
}

const column2s: Column2[] = [
    { id: 'stt', label: 'STT', align: 'center' },
    { id: 'rateId', label: 'Id đánh giá' },
    { id: 'rate', label: 'Điểm đánh giá', minWidth: 100, align: 'right' },
    { id: 'content', label: 'Nội dung', minWidth: 450, align: 'left' },
    { id: 'createTime', label: 'Ngày tạo', minWidth: 120, align: 'center' },
];

export default function CompanyInfo() {
    const dispatch = useAppDispatch();

    const accountId = localStorage.getItem("accountId") ?? "";

    const carCompanyInfo = useAppSelector(selectCarCompanyInfo);


    useEffect(() => {
        dispatch(carCompanyInfoActions.fetchCarCompanyInfo(accountId))
    }, [dispatch]);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    return (
        <Box className={styles.sectionContainer}>
            <div className="container">
                <div className={styles.mainBody}>
                    <Grid className={styles.mainGrid} container spacing={5}>
                        <Grid sm={4} item container className={styles.lGrid}>
                            <Card variant="outlined" className={styles.avatarGrid + '' + styles.cardBody}>
                                <CardContent>
                                    <Box className={styles.avatarContainer}>
                                        <Avatar src={carCompanyInfo.image} alt="Admin" className={styles.avatarStyle} />
                                        <div className="mt-3">
                                            <Typography variant="h5">Nhà Xe {carCompanyInfo.carCompanyName}</Typography>
                                            <div className="d-flex justify-content-between align-items-center p-3">
                                                <label className="d-block">Đánh giá: </label>
                                                <p className={styles.starRate}><ImStarFull className={styles.starIcon} />{carCompanyInfo.rate} ({carCompanyInfo.rateCount})</p>
                                            </div>
                                            <Button variant="contained" className={styles.customerLookBtn}>
                                                Xem dưới dạng người dùng
                                            </Button>
                                        </div>
                                    </Box>
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className={styles.socialCard}>
                                <CardContent className={styles.socialCardContent}>
                                    <ListItem className={styles.listSocial}>
                                        {carCompanyInfo.socialMediaResponses.map((item) => (
                                            <ListItemIcon className={styles.listItemSocial}>
                                                <h6 className={styles.listItemSocialLeft}>
                                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-globe mr-2 icon-inline"><circle cx={12} cy={12} r={10} /><line x1={2} y1={12} x2={22} y2={12} /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg> */}
                                                    <Typography variant="h6" className={styles.listItemSocialTitle}>{item.socialMediaName}</Typography>
                                                </h6>
                                                <span className="text-secondary">{item.link !== "null" ? item.link : "Chưa có"}</span>
                                            </ListItemIcon>
                                        ))}
                                    </ListItem>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid sm={8} item container className={styles.rGrid}>
                            <Card variant="outlined">
                                <CardContent className={styles.infoContainer}>
                                    <Grid container justifyContent="space-between">
                                        <Typography variant="h6" className={styles.basicInfoLabel}>
                                            Thông tin cơ bản nhà xe
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            className={styles.btnEdit}
                                            href={baseURL + "/company/info/edit/"}
                                        >
                                            Chỉnh sửa
                                        </Button>
                                    </Grid>
                                    <Grid container className={styles.infoItem}>
                                        <Grid item sm={3}>
                                            <Typography variant="subtitle2">Tên nhà xe</Typography>
                                        </Grid>
                                        <Grid item sm={9} container alignItems="center">
                                            Nhà xe {carCompanyInfo.carCompanyName}
                                        </Grid>
                                    </Grid>
                                    <hr />
                                    <Grid container className={styles.infoItem}>
                                        <Grid item sm={3}>
                                            <Typography variant="subtitle2">Email</Typography>
                                        </Grid>
                                        <Grid item sm={9} container alignItems="center">
                                            {carCompanyInfo.email}
                                        </Grid>
                                    </Grid>
                                    <hr />
                                    <Grid container className={styles.infoItem}>
                                        <Grid item sm={3}>
                                            <Typography variant="subtitle2">Hotline</Typography>
                                        </Grid>
                                        <Grid item sm={9} container alignItems="center">
                                            {carCompanyInfo.hotline}
                                        </Grid>
                                    </Grid>
                                    <hr />
                                    <Grid container className={styles.infoItem}>
                                        <Grid item sm={3}>
                                            <Typography variant="subtitle2">Số điện thoại</Typography>
                                        </Grid>
                                        <Grid item sm={9} container alignItems="center">
                                            {carCompanyInfo.phoneNumber}
                                        </Grid>
                                    </Grid>
                                    <hr />
                                    <Grid container className={styles.infoItem}>
                                        <Grid item sm={3}>
                                            <Typography variant="subtitle2">Địa chỉ văn phòng</Typography>
                                        </Grid>
                                        <Grid item sm={9} container alignItems="center">
                                            {carCompanyInfo.officeAddress}
                                        </Grid>
                                    </Grid>
                                    <hr />
                                    <Grid container className={styles.infoItem}>
                                        <Grid item sm={3}>
                                            <Typography variant="subtitle2">Mô tả</Typography>
                                        </Grid>
                                        <Grid item sm={9} container alignItems="center">
                                            {carCompanyInfo.description}
                                        </Grid>
                                    </Grid>
                                    <hr />
                                    <Grid container className={styles.infoItem}>
                                        <Grid item sm={12}>
                                            <Typography variant="subtitle2">Ảnh thumnail</Typography>
                                        </Grid>
                                        <img src={carCompanyInfo.thumnail} alt="thumnail" className={styles.thumnail} />
                                    </Grid>
                                </CardContent>
                            </Card>
                            <Card variant="outlined" className="mt-3">
                                <CardContent className={styles.rateContainer}>
                                    <Typography variant="h6">
                                        Đánh giá
                                    </Typography>
                                    {carCompanyInfo?.ratingList.length === 0 ? <div className={styles.noItem}>Chưa có đánh giá!</div> :
                                        <><TableContainer className={styles.tableContainer}>
                                            <Table stickyHeader aria-label="sticky table" size="small">
                                                <TableHead>
                                                    <TableRow>
                                                        {column2s.map((column) => (
                                                            <TableCell
                                                                className={column.id === "rateId" ? styles.hiddenItem : styles.tableHeader}
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
                                                    {carCompanyInfo?.ratingList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                                        const rowNumber = page * rowsPerPage + index + 1;
                                                        return (
                                                            <TableRow
                                                                hover
                                                                role="checkbox"
                                                                tabIndex={-1}
                                                                key={row.rateId}
                                                            >
                                                                {column2s.map((column) => {
                                                                    const value = row[column.id];
                                                                    if (column.id === 'createTime') {
                                                                        return (
                                                                            <TableCell className={styles.tableData} key={column.id} align={column.align}>
                                                                                {moment(row.createTime).format('DD-MM-yyyy HH:mm:ss')}
                                                                            </TableCell>
                                                                        );
                                                                    }
                                                                    else if (column.id === 'stt') {
                                                                        return (
                                                                            <TableCell className={styles.tableData} key={column.id} align={column.align}>
                                                                                {rowNumber}
                                                                            </TableCell>
                                                                        );
                                                                    }
                                                                    return (
                                                                        <TableCell
                                                                            className={column.id === 'rateId' ?
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
                                                count={carCompanyInfo !== undefined ? carCompanyInfo?.ratingList.length : 0}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                onPageChange={handleChangePage}
                                                onRowsPerPageChange={handleChangeRowsPerPage} /></>
                                    }
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
            </div>

        </Box>
    );
}