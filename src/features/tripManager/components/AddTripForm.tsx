import { Avatar, Box, Button, Container, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styles from "../styles.module.css"
// import TripApi, { addTrip } from "api/routeApi";
// import { AddTripRequest } from "models/carCompany/route/route";
import { Autocomplete } from "@material-ui/lab";
import { CommonResponse2, CommonResponse4 } from "models";
import carCompanyApi from "api/carCompanyApi";
import EmployeeApi from "api/employeeApi";
import CommonApi from "api/commonApi";
import { AddTripRequest } from "models/carCompany/trip/trip";
import { addTrip } from "api/tripApi";
import moment from "moment";
import { Col, Row } from "react-bootstrap";
import provinceApi from "api/provinceApi";

const AddTripForm = () => {
    const accountId = localStorage.getItem('accountId');

    const [description, setDescription] = React.useState<string>("");
    const [startPoint, setStartPoint] = React.useState<CommonResponse4 | null>(null);
    const [endPoint, setEndPoint] = React.useState<CommonResponse4 | null>(null);
    const [listProvinceSP, setListProvinceSP] = React.useState<CommonResponse4[]>([]);
    const [listProvinceEP, setListProvinceEP] = React.useState<CommonResponse4[]>([]);
    const getDatatProvince = async (key = '', isFirst = true) => {
        const listProvince = await provinceApi.getListProvince(key);
        if (listProvince && listProvince.data && listProvince.data.length > 0 && isFirst) {
            setListProvinceEP(listProvince.data);
            setEndPoint(listProvince.data[1]);
        }
        else {
            setListProvinceEP(listProvince.data);
        }
    }

    const getDatatProvinceSP = async (key = '', isFirst = true) => {
        const listProvinceSP = await provinceApi.getListProvince(key);
        if (listProvinceSP && listProvinceSP.data && listProvinceSP.data.length > 0 && isFirst) {
            setListProvinceSP(listProvinceSP.data)
            setStartPoint(listProvinceSP.data[0])
        }
        else {
            setListProvinceSP(listProvinceSP.data)
        }
    }

    useEffect(() => {
        getDatatProvince()
        getDatatProvinceSP()
    }, [])

    const handleAddTrip = () => {
        const request = {
            startPoint: startPoint !== null ? startPoint.key : "",
            endPoint: endPoint !== null ? endPoint.key : "",
            description: description,
            routeId: route,
            startDate: selectedDate !== null ? moment(selectedDate).format('yyyy-MM-DDTHH:mm:ss') : null,
            carNumber: carNumber,
            driver: driver,
            ticketPrice: ticketPrice
        } as AddTripRequest

        addTrip(request)
    }

    const [selectedDate, setSelectedDate] = React.useState<string | null>(null);

    const handleDateChange = (date: string) => {
        setSelectedDate(date);
    };

    const [listCarNumber, setListCarNumber] = useState<CommonResponse2[]>([]);
    const [carNumber, setCarNumber] = useState<string>("");
    const [listDriver, setListDriver] = useState<CommonResponse2[]>([]);
    const [driver, setDriver] = useState<string>("");
    const [listRoute, setListRoute] = useState<CommonResponse2[]>([]);
    const [route, setRoute] = useState<string>("");
    const [ticketPrice, setTicketPrice] = useState<number>(0);

    useEffect(() => {
        async function fetchData() {
            const carNumbers = await carCompanyApi.getListCarNumber({ keyword: null, accountId: accountId });
            const drivers = await EmployeeApi.getListDriver(accountId);
            const routes = await CommonApi.getListRoute(accountId);
            setListCarNumber(carNumbers.data);
            setListDriver(drivers.data);
            setListRoute(routes.data);
        }
        fetchData();
    }, [accountId])

    return (
        <Box>
            <Box justifyContent="center">
                <Container className="pt-3">
                    <Row>
                        <Col md={5}>
                            <Row className="mb-3">
                                <Col md={4} className="d-flex align-items-center justify-content-end">
                                    <label className={styles.customLabel}>Tuyến đi</label>
                                </Col>
                                <Col md={6}>
                                    <Autocomplete
                                        id="combo-box-route"
                                        options={listRoute}
                                        getOptionLabel={(option) => option.value}
                                        className={styles.inputField}
                                        style={{ width: 300 }}
                                        size="small"
                                        onChange={(event, value) => setRoute(value == null ? "" : value.key)}
                                        renderInput={(params) => <TextField {...params} variant="outlined" />
                                        }
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col md={5}>
                            <Row className="mb-3">
                                <Col md={6} className="d-flex align-items-center justify-content-end">
                                    <label className={styles.customLabel}>Điểm đi</label>
                                </Col>
                                <Col md={6}>
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
                                <Col md={6}>
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
                        <Col md={5} className="mb-3">
                            <Row>
                                <Col md={6} className="d-flex align-items-center justify-content-end">
                                    <label className={styles.customLabel}>Ngày đi</label>
                                </Col>
                                <Col md={6}>
                                    <input
                                        type="datetime-local"
                                        className={styles.inputDateCustom}
                                        onChange={(e) => handleDateChange(e.target.value)}
                                        value={selectedDate ?? ''}
                                        min={moment().format('YYYY-MM-DD HH:mm')}
                                    >
                                    </input>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={5} className="mb-3">
                            <Row>
                                <Col md={4} className="d-flex align-items-center justify-content-end">
                                    <label className={styles.customLabel}>Mã số xe</label>
                                </Col>
                                <Col md={6}>
                                    <Autocomplete
                                        id="combo-box-car-number"
                                        options={listCarNumber}
                                        getOptionLabel={(option) => option.value}
                                        className={styles.inputField}
                                        style={{ width: 300 }}
                                        size="small"
                                        onChange={(event, value) => setCarNumber(value == null ? "" : value.key)}
                                        renderInput={(params) => <TextField {...params} variant="outlined" />
                                        }
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col md={5} className="mb-3">
                            <Row>
                                <Col md={6} className="d-flex align-items-center justify-content-end">
                                    <label className={styles.customLabel}>Nhân viên lái xe</label>
                                </Col>
                                <Col md={6}>
                                    <Autocomplete
                                        id="combo-box-car-type"
                                        options={listDriver}
                                        getOptionLabel={(option) => option.value}
                                        className={styles.inputField}
                                        style={{ width: 300 }}
                                        size="small"
                                        onChange={(event, value) => setDriver(value == null ? "" : value.key)}
                                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col md={5} className="mb-3">
                            <Row>
                                <Col md={4} className="d-flex align-items-center justify-content-end">
                                    <label className={styles.customLabel}>Giá vé</label>
                                </Col>
                                <Col md={6}>
                                    <input
                                        type="text"
                                        className={`form-control ${styles.customInput}`}
                                        onChange={(e) => setTicketPrice(Number.parseInt(e.target.value))}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col md={5} className="mb-3">
                            <Row>
                                <Col md={6} className="d-flex align-items-center justify-content-end">
                                    <label className={styles.customLabel}>Ghi chú</label>
                                </Col>
                                <Col md={6}>
                                    <input
                                        type="text"
                                        className={`form-control ${styles.customInput}`}
                                        onChange={(e) => setDescription(e.target.value)}
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
                        className={`btn btn-primary ${styles.customBtn}`} onClick={handleAddTrip}>
                        <i className={`fas fa-plus mr-2 ${styles.customIcon}`}></i>
                        Thêm mới
                    </button>
                </div>
            </div>
        </Box>

    );
};

export default AddTripForm;