import { Box, Container } from "@material-ui/core";
import { useEffect, useState } from "react";
import styles from "../styles.module.css"
import carCompanyApi, { addCarType } from "api/carCompanyApi";
import { CommonResponse3 } from "models";
import { toast } from "react-toastify";
import { Col, Row } from "react-bootstrap";
import Select from 'react-select';


const AddCarForm = () => {
    const accountId = localStorage.getItem('accountId');

    const [listCarType, setListCarType] = useState<CommonResponse3[]>([]);
    const [carType, setCarType] = useState<CommonResponse3>(listCarType[0]);
    const [carNumber, setCarNumber] = useState<string>("");
    const [carDescription, setCarDescription] = useState<string>("");

    const getDataCartype = async () => {
        const carTypes = await carCompanyApi.getListCarType({ keyword: null, accountId: accountId });

        setListCarType(carTypes.data.map((carType) => ({
            label: carType.value,
            value: carType.key,
        })));
      }

      useEffect(() => {
        getDataCartype()
      }, [])

    const handleAddCarSubmit = async () => {
        console.log(carType)
        const response = await carCompanyApi.addCar({
            accountId: accountId,
            carNumber: carNumber,
            carType: carType != null ? carType.value : null,
            description: carDescription
        });

        if (response.data === true) {
            // Toast success
            toast.success('Thêm mới xe thành công !', {
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
            <Box className={styles.formHeader + ' ' + styles.addCarContainer}>
                <Container className="pt-3">
                    <Row>
                        <Col md={6}>
                            <Row className="mb-3">
                                <Col md={4} className="d-flex align-items-center justify-content-end">
                                    <label className={styles.customLabel}>Mã số xe</label>
                                </Col>
                                <Col md={8}>
                                    <input
                                        type="text"
                                        className={`form-control ${styles.customInput}`}
                                        onChange={(e) => setCarNumber(e.target.value)}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col md={6}>
                            <Row className="mb-3">
                                <Col md={4} className="d-flex align-items-center justify-content-end">
                                    <label className={styles.customLabel}>Loại xe</label>
                                </Col>
                                <Col md={8}>
                                    <Select
                                        value={carType}
                                        options={listCarType}
                                        className={styles.customDropdown}
                                        onChange={(option) => setCarType(option ?? listCarType[0])}
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
                                    <label className={styles.customLabel}>Ghi chú</label>
                                </Col>
                                <Col md={8}>
                                    <input
                                        type="text"
                                        className={`form-control ${styles.customInput}`}
                                        onChange={(e) => setCarDescription(e.target.value)}
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
                        className={`btn btn-primary ${styles.customBtn}`} onClick={handleAddCarSubmit}>
                        <i className={`fas fa-plus mr-2 ${styles.customIcon}`}></i>
                        Thêm mới
                    </button>
                </div>
            </div>
        </Box>

    );
};

export default AddCarForm;