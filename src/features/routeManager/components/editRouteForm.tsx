import { Box, Button, Container, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styles from "../styles.module.css"
import { DetailRouteResponse, UpdateRouteRequest } from "models/carCompany/route/route";
import RouteApi, { updateRoute } from "api/routeApi";
import { Col, Row } from "react-bootstrap";
import { Autocomplete } from "@material-ui/lab";

interface Props {
    routeId: string;
    // onSave: (value: string) => void;
}


const EditRouteForm: React.FC<Props> = ({ routeId }) => {
    const accountId = localStorage.getItem('accountId');

    const [distance, setDistance] = React.useState<number>(0);
    const [description, setDescription] = React.useState<string>("");
    const [detailRoute, setDetailRoute] = useState<DetailRouteResponse>();

    useEffect(() => {
        async function fetchData() {
            try {
                const route = await RouteApi.getDetailRoute(routeId);
                setDetailRoute(route.data);
                setDescription(route.data.description);
                setDistance(route.data.distance);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
        // console.log(listPosition)
        // console.log(detailEmployee)
    }, []);

    const handleEditRoute = () => {
        const request = {
            routeId: routeId,
            distance: distance,
            description: description
        } as UpdateRouteRequest

        updateRoute(request)
    }

    return (
        <Box>
            <Box className={styles.filterContainer} justifyContent="center"></Box>
            <Container className="pt-3">
                <Row>
                    <Col md={6}>
                        <Row className="mb-3">
                            <Col md={4} className="d-flex align-items-center justify-content-end">
                                <label className={styles.customLabel}>Điểm đi</label>
                            </Col>
                            <Col md={8}>
                                <input
                                    type="text"
                                    disabled
                                    className={`form-control ${styles.customInput}`}
                                    value={detailRoute?.startPoint}
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
                                <input
                                    type="text"
                                    disabled
                                    className={`form-control ${styles.customInput}`}
                                    value={detailRoute?.endPoint}
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
                                    value={distance}
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
                                    value={description}
                                    className={`form-control ${styles.customInput}`}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <div className="row">
                <div className="col-md-12 d-flex justify-content-center mb-3">
                    <button
                        className={`btn btn-primary ${styles.customBtn}`} onClick={handleEditRoute}>
                        <i className={`fas fa-save mr-2 ${styles.customIcon}`}></i>
                        Lưu chỉnh sửa
                    </button>
                </div>
            </div>
        </Box>

    );
};

export default EditRouteForm;