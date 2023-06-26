import { Box, Paper, Typography } from "@material-ui/core";
import styles from "../styles.module.css"
import { useEffect, useState } from "react";
import AdminApi from "api/adminApi";
import { CommonResponse3 } from "models";
import { Col, Container, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import { toast } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import packageApi from "api/packageApi";
import carCompanyApi from "api/carCompanyApi";

export default function AdminCarCompanyCreate() {

    const [companyName, setCompanyName] = useState("");
    const [email, setEmail] = useState("");
    const [hotline, setHotline] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [officeAddress, setOfficeAddress] = useState("");
    const [description, setDescription] = useState("");
    const [packageChose, setPackageChose] = useState("");
    const [listPackage, setListPackage] = useState<CommonResponse3[]>([]);

    useEffect(() => {
        async function fetchData() {
            const listPackage = await packageApi.getListPackage();

            setListPackage(listPackage.data.map((item) => ({ label: `${item.packageName} | ${item.price.toLocaleString()} VNĐ`, value: item.packageCode })));
        }
        fetchData();
    }, [])

    const handleCreateCarCompany = async () => {
        const response = await carCompanyApi.addCarCompany({
            companyName: companyName,
            officeAddress: officeAddress,
            email: email,
            phoneNumber: hotline,
            phoneNumber2: phoneNumber,
            description: description,
            packageCode: packageChose
        });

        let msg = '';
        msg = "Thêm mới nhà xe thành công!"

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
            <div className="d-flex justify-content-between align-items-center mb-3">
                <Typography variant="h6">
                    THÊM MỚI NHÀ XE
                </Typography>
                <button
                    onClick={handleCreateCarCompany}
                    className={`btn btn-primary ${styles.customBtn}`}>
                    <i className={`fas fa-save mr-2 ${styles.customIcon}`}></i>
                    Lưu
                </button>
            </div>
            <Box className={styles.mainContent}>
                <Paper>
                    <Box className={styles.filterContainer} justifyContent="center">
                        <Container className="pt-3">
                            <Row className="pb-3">
                                <Col md={4} className=" d-flex justify-content-end align-items-center">
                                    <label className={styles.customLabel}>Tên người đăng ký</label>
                                </Col>
                                <Col md={6}>
                                    <input
                                        type="text"
                                        className={`form-control ${styles.customInput}`}
                                    />
                                </Col>
                            </Row>
                            <Row className="pb-3">
                                <Col md={4} className=" d-flex justify-content-end align-items-center">
                                    <label className={styles.customLabel}>Tên nhà xe</label>
                                </Col>
                                <Col md={6}>
                                    <input
                                        type="text"
                                        className={`form-control ${styles.customInput}`}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Row className="pb-3">
                                <Col md={4} className=" d-flex justify-content-end align-items-center">
                                    <label className={styles.customLabel}>Địa chỉ văn phòng</label>
                                </Col>
                                <Col md={6}>
                                    <input
                                        type="text"
                                        className={`form-control ${styles.customInput}`}
                                        onChange={(e) => setOfficeAddress(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Row className="pb-3">
                                <Col md={4} className=" d-flex justify-content-end align-items-center">
                                    <label className={styles.customLabel}>Email</label>
                                </Col>
                                <Col md={6}>
                                    <input
                                        type="text"
                                        className={`form-control ${styles.customInput}`}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Row className="pb-3">
                                <Col md={4} className=" d-flex justify-content-end align-items-center">
                                    <label className={styles.customLabel}>Hotline</label>
                                </Col>
                                <Col md={6}>
                                    <input
                                        type="text"
                                        className={`form-control ${styles.customInput}`}
                                        onChange={(e) => setHotline(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Row className="pb-3">
                                <Col md={4} className=" d-flex justify-content-end align-items-center">
                                    <label className={styles.customLabel}>Số điện thoại</label>
                                </Col>
                                <Col md={6}>
                                    <input
                                        type="text"
                                        className={`form-control ${styles.customInput}`}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Row className="pb-3">
                                <Col md={4} className=" d-flex justify-content-end align-items-center">
                                    <label className={styles.customLabel}>Mô tả</label>
                                </Col>
                                <Col md={6}>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={""}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setDescription(data);
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="pb-3">
                                <Col md={4} className=" d-flex justify-content-end align-items-center">
                                    <label className={styles.customLabel}>Gói đăng ký</label>
                                </Col>
                                <Col md={6}>
                                    <Select
                                        defaultValue={listPackage[0]}
                                        options={listPackage}
                                        onChange={(options) => setPackageChose(options !== undefined && options !== null ? options.value : "")}
                                        className={styles.customDropdown}
                                        theme={(theme) => ({
                                            ...theme,
                                            borderRadius: 0,
                                        })}
                                    />
                                </Col>
                            </Row>
                        </Container>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
}