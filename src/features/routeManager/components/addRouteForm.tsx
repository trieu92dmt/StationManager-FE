import { Avatar, Box, Button, Container, TextField, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import styles from "../styles.module.css"
import { addRoute } from "api/routeApi";
import { AddRouteRequest } from "models/carCompany/route/route";
import { Autocomplete } from "@material-ui/lab";
import provinceApi from "api/provinceApi";
import { CommonResponse4 } from "models";
import { Col, Row } from "react-bootstrap";

const AddRouteForm = () => {
    const accountId = localStorage.getItem('accountId');

    const [distance, setDistance] = React.useState<number>(0);
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
        else setListProvinceEP(listProvince.data);
    }

    const getDatatProvinceSP = async (key = '', isFirst = true) => {
        const listProvinceSP = await provinceApi.getListProvince(key);
        if (listProvinceSP && listProvinceSP.data && listProvinceSP.data.length > 0 && isFirst) {
            setListProvinceSP(listProvinceSP.data)
            setStartPoint(listProvinceSP.data[0])
        }
        else setListProvinceSP(listProvinceSP.data)
    }

    useEffect(() => {
        getDatatProvince()
        getDatatProvinceSP()
    }, [])

    const handleAddRoute = () => {
        const request = {
            accountId: accountId,
            startPoint: startPoint?.key,
            endPoint: endPoint?.key,
            distance: distance,
            description: description
        } as AddRouteRequest

        addRoute(request)
    }

    return (
        <Box>
            <Box className={styles.filterContainer} justifyContent="center">
                <Container className="pt-3">
                    <Row>
                        <Col md={6}>
                            <Row className="mb-3">
                                <Col md={4} className="d-flex align-items-center justify-content-end">
                                    <label className={styles.customLabel}>Điểm đi</label>
                                </Col>
                                <Col md={8}>
                                    <Autocomplete
                                        //classes={classes}
                                        id="start-point"
                                        options={listProvinceSP}
                                        groupBy={(option) => option.group}
                                        getOptionLabel={(option) => option.value}
                                        value={startPoint}
                                        //style={{ width: 300 }}
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
                        <Col md={6} className="mb-3">
                            <Row>
                                <Col md={4} className="d-flex align-items-center justify-content-end">
                                    <label className={styles.customLabel}>Điểm đến</label>
                                </Col>
                                <Col md={8}>
                                    <Autocomplete
                                        //classes={classes}
                                        id="end-point"
                                        options={listProvinceEP}
                                        groupBy={(option) => option.group}
                                        getOptionLabel={(option) => option.value}
                                        value={endPoint}
                                        //style={{ width: 300 }}
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
                        <Col md={6} className="mb-3">
                            <Row>
                                <Col md={4} className="d-flex align-items-center justify-content-end">
                                    <label className={styles.customLabel}>Khoảng cách</label>
                                </Col>
                                <Col md={8}>
                                    <input
                                        type="text"
                                        className={`form-control ${styles.customInput}`}
                                        onChange={(e) => setDistance(Number(e.target.value))}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Row>
                                <Col md={4} className="d-flex align-items-center justify-content-end">
                                    <label className={styles.customLabel}>Ghi chú</label>
                                </Col>
                                <Col md={8}>
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
                        className={`btn btn-primary ${styles.customBtn}`} onClick={handleAddRoute}>
                        <i className={`fas fa-plus mr-2 ${styles.customIcon}`}></i>
                        Thêm mới
                    </button>
                </div>
            </div>
        </Box>

    );
};

export default AddRouteForm;