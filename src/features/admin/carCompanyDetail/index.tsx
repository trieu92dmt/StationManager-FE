import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@material-ui/core";
import styles from "./styles.module.css"
import { useEffect, useState } from "react";
import AdminApi from "api/adminApi";
import { CarCompanyDetailResponse } from "models/admin/admin";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";
import moment from "moment";
import React from "react";
import { toast } from "react-toastify";
import { baseURL } from "utils";

interface Column {
    id: 'stt' | 'packageId' | 'packageCode' | 'packageName' | 'duration' | 'price' | 'carLimit' | 'routeLimit' | 'tripPerDay' | 'createTime';
    label: string;
    minWidth?: number;
    align?: 'right' | 'center';
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: 'stt', label: 'STT', align: 'center' },
    { id: 'packageId', label: 'Id gói' },
    { id: 'packageCode', label: 'Mã gói', minWidth: 170 },
    { id: 'packageName', label: 'Tên gói', minWidth: 170 },
    { id: 'duration', label: 'Thời hạn', minWidth: 120, align: 'right' },
    { id: 'price', label: 'Giá', minWidth: 170, align: 'center' },
    { id: 'carLimit', label: 'Số xe giới hạn', minWidth: 120, align: 'right' },
    { id: 'routeLimit', label: 'Số tuyến giới hạn', minWidth: 120, align: 'right' },
    { id: 'tripPerDay', label: 'Số chuyến/ngày', minWidth: 120, align: 'right' },
    { id: 'createTime', label: 'Ngày tạo', minWidth: 170, align: 'center' }
];

interface Column1 {
    id: 'stt' | 'routeId' | 'routeCode' | 'startPoint' | 'endPoint' | 'tripQuantity' | 'createTime' | 'active';
    label: string;
    minWidth?: number;
    align?: 'right' | 'center';
    format?: (value: number) => string;
}

const column1s: Column1[] = [
    { id: 'stt', label: 'STT', align: 'center' },
    { id: 'routeId', label: 'Id tuyến' },
    { id: 'routeCode', label: 'Mã tuyến', minWidth: 170 },
    { id: 'startPoint', label: 'Điểm đi', minWidth: 170 },
    { id: 'endPoint', label: 'Điểm đến', minWidth: 120, align: 'right' },
    { id: 'tripQuantity', label: 'Số chuyến đã thực hiện', minWidth: 170, align: 'center' },
    { id: 'createTime', label: 'Ngày tạo', minWidth: 120, align: 'right' },
    { id: 'active', label: 'Trạng thái', minWidth: 120, align: 'right' },
];

interface Column2 {
    id: 'stt' | 'rateId' | 'ratePoint' | 'content' | 'createTime';
    label: string;
    minWidth?: number;
    align?: 'right' | 'center' | 'left';
    format?: (value: number) => string;
}

const column2s: Column2[] = [
    { id: 'stt', label: 'STT', align: 'center' },
    { id: 'rateId', label: 'Id đánh giá' },
    { id: 'ratePoint', label: 'Điểm đánh giá', minWidth: 100, align: 'right' },
    { id: 'content', label: 'Nội dung', minWidth: 450, align: 'left' },
    { id: 'createTime', label: 'Ngày tạo', minWidth: 120, align: 'center' },
];

export default function AdminCarCompanyDetail() {

    const params = useParams<{ carCompanyId: string }>();

    const { carCompanyId } = params;

    const [carCompanyDetail, setCarCompanyDetail] = useState<CarCompanyDetailResponse>();

    useEffect(() => {
        async function fetchData() {
            const detailCarCompany = await AdminApi.getCarCompanyDetail(carCompanyId);

            setCarCompanyDetail(detailCarCompany.data)
        }
        fetchData();
    }, [])

    const [isOpenBasicInfo, setIsOpenBasicInfo] = useState(true);
    const [rotateBasicInfo, setRotateBasicInfo] = useState(false);

    const toggleAccordionBasicInfo = () => {
        setIsOpenBasicInfo(!isOpenBasicInfo);
        setRotateBasicInfo(!rotateBasicInfo);
    };

    const [isOpenPackageInfo, setIsOpenPackageInfo] = useState(true);
    const [rotatePackageInfo, setRotatePackageInfo] = useState(false);

    const toggleAccordionPackageInfo = () => {
        setIsOpenPackageInfo(!isOpenPackageInfo);
        setRotatePackageInfo(!rotatePackageInfo);
    };

    const [isOpenRouteInfo, setIsOpenRouteInfo] = useState(true);
    const [rotateRouteInfo, setRotateRouteInfo] = useState(false);

    const toggleAccordionRouteInfo = () => {
        setIsOpenRouteInfo(!isOpenRouteInfo);
        setRotateRouteInfo(!rotateRouteInfo);
    };

    const [isOpenRateInfo, setIsOpenRateInfo] = useState(true);
    const [rotateRateInfo, setRotateRateInfo] = useState(false);

    const toggleAccordionRateInfo = () => {
        setIsOpenRateInfo(!isOpenRateInfo);
        setRotateRateInfo(!rotateRateInfo);
    };

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

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
            <div className="d-flex align-items-center">
                <Typography variant="h6" className="me-2">
                    CHI TIẾT NHÀ XE
                </Typography>
                <div>
                    <i className={`fas fa-arrow-left mr-2 ${styles.customIcon}`}></i>
                    <a href={baseURL + '/admin/car-company-manager'}>Quay lại</a>
                </div>
            </div>
            <Box className={styles.headerContent}>
                <Paper>
                    <div className={styles.changeStatusBtn}>
                        {
                            carCompanyDetail?.status === "Chờ duyệt" ?
                                <button
                                    className={`btn btn-primary ${styles.customBtn}`}
                                    onClick={() => handleApproveCarCompany(carCompanyId)}
                                >
                                    <i className={`fas fa-check mr-2 ${styles.customIcon}`}></i>
                                    Duyệt
                                </button> : carCompanyDetail?.status === "Đang sử dụng" ?
                                    <button
                                        className={`btn btn-primary ${styles.customBtn}`}
                                        onClick={() => handleChangeStatusCarCompany(carCompanyId, 'lock')}
                                    >
                                        <i className={`fas fa-lock mr-2 ${styles.customIcon}`}></i>
                                        Khóa
                                    </button> : carCompanyDetail?.status === "Đã khóa" ?
                                        <button
                                            className={`btn btn-primary ${styles.customBtn}`}
                                            onClick={() => handleChangeStatusCarCompany(carCompanyId, 'active')}
                                        >
                                            <i className={`fas fa-lock-open mr-2 ${styles.customIcon}`}></i>
                                            Mở khóa
                                        </button> : ""
                        }
                    </div>
                    <div className={styles.accordion}>
                        <div className={styles.accordionLayout}>
                            <div className={styles.accordionHeader}>
                                <h3 className={styles.accordionTitle}>Thông tin cơ bản</h3>
                                <button onClick={toggleAccordionBasicInfo} className={`accordion-toggle ${isOpenBasicInfo ? 'open' : ''} ${styles.customBtnIcon} ${rotateBasicInfo ? styles.rotateIcon : ''}`}>
                                    {isOpenBasicInfo ? <i className={`fas fa-minus mr-2 ${styles.customIcon}`}></i> :
                                        <i className={`fas fa-plus mr-2 ${styles.customIcon}`}></i>}
                                </button>
                            </div>
                            <div
                                className={`${styles.accordionContent} ${isOpenBasicInfo ? styles.expand : ''}`}
                            >
                                <div className={styles.accordionContentWrapper}>
                                    <div className={styles.contentItem}>
                                        <div className={styles.contentLabel}>
                                            <label>Mã nhà xe</label>
                                        </div>
                                        <div className={styles.contentValue}>
                                            <p>{carCompanyDetail?.carCompanyCode}</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.contentItem} ${styles.separator}`}>
                                        <div className={styles.contentLabel}>
                                            <label>Email</label>
                                        </div>
                                        <div className={styles.contentValue}>
                                            <p>{carCompanyDetail?.email}</p>
                                        </div>
                                    </div>
                                    <div className={styles.contentItem}>
                                        <div className={styles.contentLabel}>
                                            <label>Ngày tạo</label>
                                        </div>
                                        <div className={styles.contentValue}>
                                            <p>{moment(carCompanyDetail?.createTime).format("DD-MM-yyyy HH:mm")}</p>
                                        </div>
                                    </div>
                                    <div className={styles.contentItem}>
                                        <div className={styles.contentLabel}>
                                            <label>Tên nhà xe</label>
                                        </div>
                                        <div className={styles.contentValue}>
                                            <p>{carCompanyDetail?.carCompanyName}</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.contentItem} ${styles.separator}`}>
                                        <div className={styles.contentLabel}>
                                            <label>Hotline</label>
                                        </div>
                                        <div className={styles.contentValue}>
                                            <p>{carCompanyDetail?.hotline}</p>
                                        </div>
                                    </div>
                                    <div className={styles.contentItem}>
                                        <div className={styles.contentLabel}>
                                            <label>Ngày hết hạn</label>
                                        </div>
                                        <div className={styles.contentValue}>
                                            <p>{carCompanyDetail?.expireDate != null ?
                                                moment(carCompanyDetail?.expireDate).format("DD-MM-yyyy HH:mm") :
                                                "Đã hết hạn"}</p>
                                        </div>
                                    </div>
                                    <div className={styles.contentItem}>
                                        <div className={styles.contentLabel}>
                                            <label>Tên đăng nhập</label>
                                        </div>
                                        <div className={styles.contentValue}>
                                            <p>{carCompanyDetail?.username}</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.contentItem} ${styles.separator}`}>
                                        <div className={styles.contentLabel}>
                                            <label>Số điện thoại</label>
                                        </div>
                                        <div className={styles.contentValue}>
                                            <p>{carCompanyDetail?.phoneNumber}</p>
                                        </div>
                                    </div>
                                    <div className={styles.contentItem}>
                                        <div className={styles.contentLabel}>
                                            <label>Số lượng xe</label>
                                        </div>
                                        <div className={styles.contentValue}>
                                            <p>{carCompanyDetail?.carQuantity}</p>
                                        </div>
                                    </div>
                                    <div className={styles.contentItem}>
                                        <div className={styles.contentLabel}>
                                            <label>Mô tả</label>
                                        </div>
                                        <div className={styles.contentValue}>
                                            <p>{carCompanyDetail?.description}</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.contentItem} ${styles.separator}`}>
                                        <div className={styles.contentLabel}>
                                            <label></label>
                                        </div>
                                        <div className={styles.contentValue}>
                                            <p></p>
                                        </div>
                                    </div>
                                    <div className={styles.contentItem}>
                                        <div className={styles.contentLabel}>
                                            <label>Số lượng tuyến</label>
                                        </div>
                                        <div className={styles.contentValue}>
                                            <p>{carCompanyDetail?.routeQuantity}</p>
                                        </div>
                                    </div>
                                    <div className={styles.contentItem}>
                                        <div className={styles.contentLabel}>
                                            <label>Trạng thái</label>
                                        </div>
                                        <div className={styles.contentValue}>
                                            <p>{carCompanyDetail?.status}</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.contentItem} ${styles.separator}`}>
                                        <div className={styles.contentLabel}>
                                            <label></label>
                                        </div>
                                        <div className={styles.contentValue}>
                                            <p></p>
                                        </div>
                                    </div>
                                    <div className={styles.contentItem}>
                                        <div className={styles.contentLabel}>
                                            <label>Số lượng chuyến cao nhất/ngày</label>
                                        </div>
                                        <div className={styles.contentValue}>
                                            <p>{carCompanyDetail?.maxTripQuantity}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.accordion}>
                        <div className={styles.accordionLayout}>
                            <div className={styles.accordionHeader}>
                                <h3 className={styles.accordionTitle}>Thông gói đăng ký</h3>
                                <button onClick={toggleAccordionPackageInfo} className={`accordion-toggle ${isOpenPackageInfo ? 'open' : ''} ${styles.customBtnIcon} ${rotatePackageInfo ? styles.rotateIcon : ''}`}>
                                    {isOpenPackageInfo ? <i className={`fas fa-minus mr-2 ${styles.customIcon}`}></i> :
                                        <i className={`fas fa-plus mr-2 ${styles.customIcon}`}></i>}
                                </button>
                            </div>
                            <div
                                className={`${styles.accordionContent} ${isOpenPackageInfo ? styles.expand : ''}`}
                            >
                                <div className={styles.accordionContentWrapper}>
                                    <TableContainer className={styles.tableContainer}>
                                        <Table stickyHeader aria-label="sticky table" size="small">
                                            <TableHead>
                                                <TableRow>
                                                    {columns.map((column) => (
                                                        <TableCell
                                                            className={column.id === "packageId" ? styles.hiddenItem : styles.tableHeader}
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
                                                {carCompanyDetail?.packages.map((row, index) => {
                                                    const rowNumber = index + 1;
                                                    return (
                                                        <TableRow
                                                            hover
                                                            role="checkbox"
                                                            tabIndex={-1}
                                                            key={row.packageId}
                                                        >
                                                            {columns.map((column) => {
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
                                                                else if (column.id === 'price') {
                                                                    return (
                                                                        <TableCell className={styles.tableData} key={column.id} align={column.align}>
                                                                            {row.price.toLocaleString()} VNĐ
                                                                        </TableCell>
                                                                    );
                                                                }
                                                                return (
                                                                    <TableCell
                                                                        className={column.id === 'packageId' ?
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
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.accordion}>
                        <div className={styles.accordionLayout}>
                            <div className={styles.accordionHeader}>
                                <h3 className={styles.accordionTitle}>Thông tin tuyến xe</h3>
                                <button onClick={toggleAccordionRouteInfo} className={`accordion-toggle ${isOpenRouteInfo ? 'open' : ''} ${styles.customBtnIcon} ${rotateRouteInfo ? styles.rotateIcon : ''}`}>
                                    {isOpenRouteInfo ? <i className={`fas fa-minus mr-2 ${styles.customIcon}`}></i> :
                                        <i className={`fas fa-plus mr-2 ${styles.customIcon}`}></i>}
                                </button>
                            </div>
                            <div
                                className={`${styles.accordionContent} ${isOpenRouteInfo ? styles.expand : ''}`}
                            >
                                <div className={styles.accordionContentWrapper}>
                                    {carCompanyDetail?.routes.length === 0 ? <div className={styles.noItem}>Chưa có tuyến xe nào được tạo!</div> :
                                        <TableContainer className={styles.tableContainer}>
                                            <Table stickyHeader aria-label="sticky table" size="small">
                                                <TableHead>
                                                    <TableRow>
                                                        {column1s.map((column) => (
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
                                                    {carCompanyDetail?.routes.map((row, index) => {
                                                        const rowNumber = index + 1;
                                                        return (
                                                            <TableRow
                                                                hover
                                                                role="checkbox"
                                                                tabIndex={-1}
                                                                key={row.routeId}
                                                            >
                                                                {column1s.map((column) => {
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
                                                                    else if (column.id === 'active') {
                                                                        return (
                                                                            <TableCell className={styles.tableData} key={column.id} align={column.align}>
                                                                                {row.active === true ? "Đang hoạt động" : "Ngưng hoạt động"}
                                                                            </TableCell>
                                                                        );
                                                                    }
                                                                    return (
                                                                        <TableCell
                                                                            className={column.id === 'routeId' ?
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
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.accordion} ${styles.finalAccordion}`}>
                        <div className={styles.accordionLayout}>
                            <div className={styles.accordionHeader}>
                                <h3 className={styles.accordionTitle}>Đánh giá ghi nhận</h3>
                                <button onClick={toggleAccordionRateInfo} className={`accordion-toggle ${isOpenRateInfo ? 'open' : ''} ${styles.customBtnIcon} ${rotateRateInfo ? styles.rotateIcon : ''}`}>
                                    {isOpenRateInfo ? <i className={`fas fa-minus mr-2 ${styles.customIcon}`}></i> :
                                        <i className={`fas fa-plus mr-2 ${styles.customIcon}`}></i>}
                                </button>
                            </div>
                            <div
                                className={`${styles.accordionContent} ${isOpenRateInfo ? styles.expand : ''}`}
                            >
                                <div className={styles.accordionContentWrapper}>
                                    <div className={styles.rateHeader}>
                                        <div className="d-flex">
                                            <label className="fw-bold">
                                                Điểm đánh giá:
                                            </label>
                                            <div>
                                                {(carCompanyDetail !== undefined && carCompanyDetail.rates.length > 0) ?
                                                    (carCompanyDetail?.rates.reduce((total, obj) => total + obj.ratePoint, 0) / carCompanyDetail?.rates.length).toFixed(1) : 0}
                                                <i className={`fas fa-star mr-2 ${styles.customIcon}`}></i>
                                            </div>
                                        </div>
                                        <div className="d-flex">
                                            <label className="fw-bold">
                                                Số lượt đánh giá:
                                            </label>
                                            <div>
                                                {carCompanyDetail?.rates.length} lượt
                                            </div>
                                        </div>
                                    </div>
                                    {carCompanyDetail?.rates.length === 0 ? <div className={styles.noItem}>Chưa có đánh giá!</div> :
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
                                                    {carCompanyDetail?.rates.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
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
                                                count={carCompanyDetail !== undefined ? carCompanyDetail.rates.length : 0}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                onPageChange={handleChangePage}
                                                onRowsPerPageChange={handleChangeRowsPerPage} /></>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </Paper>
            </Box>
        </Box>
    );
}