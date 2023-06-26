import { Box, Button, Container, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styles from "../styles.module.css"
import { DetailTripResponse, Seat } from "models/carCompany/trip/trip";
import moment from "moment";
import TripApi from "api/tripApi";
import { ActionTicketRequest } from "models/carCompany/ticket/ticket";
import { actionTicket } from "api/ticketApi";
import { Col, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import transactionApi from "api/transactionApi";

interface Props {
    tripId: string;
    // onSave: (value: string) => void;
}

const UserBuyTicketForm: React.FC<Props> = ({ tripId }) => {
    const accountId = localStorage.getItem('accountId');

    const [description, setDescription] = React.useState<string>("");
    const [tripDetail, setTripDetail] = React.useState<DetailTripResponse>();
    const [levels, setLevels] = useState<number>(0);
    const [columns, setColumns] = useState<number>(0);
    const [rowNumbers, setRowNumbers] = useState<number>(0);
    const [listSeat, setListSeat] = React.useState<Seat[]>([]);
    const [listSeatChose, setListSeatChose] = React.useState<Seat[]>([]);
    const [name, setName] = React.useState<string>("");
    const [phoneNumber, setPhoneNumber] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [price, setPrice] = React.useState<number>(0);

    const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const handleDateChange = (date: Date | null) => {
        // const utcoffset = moment(date).tz(timeZone).utcOffset();
        // const dateWithTimeZone = moment(date).utcOffset(utcoffset); 
        // setSelectedDate(dateWithTimeZone.toDate());
        setSelectedDate(date);
    };

    useEffect(() => {
        async function fetchData() {
            const tripDetail = await TripApi.getDetailTrip(tripId);
            setTripDetail(tripDetail.data);
            setListSeat(tripDetail.data.seats);
            setDescription(tripDetail.data.description);
            setColumns(tripDetail.data.carDetail.columns);
            setLevels(tripDetail.data.carDetail.levels);
            setRowNumbers(tripDetail.data.carDetail.rows);
            setSelectedDate(moment(tripDetail.data.startDate, 'YYYY-MM-DDTHH:mm:ss').toDate());
        }
        fetchData();
    }, [accountId])

    const handleClickSeatBtn = (level: number, col: number, row: number) => {
        const updatedSeatList = listSeat.map(seat => {
            if (seat.levels === level && seat.rows === row && seat.columns === col && seat.status === "available") {
                if (tripDetail !== undefined)
                    setPrice(price + tripDetail.ticketPrice);
                setListSeatChose(listSeatChose.concat(seat));
                return { ...seat, status: "chose" };
            }
            else if (seat.levels === level && seat.rows === row && seat.columns === col && seat.status === "chose") {
                if (tripDetail !== undefined)
                    setPrice(price - tripDetail.ticketPrice);
                setListSeatChose(listSeatChose.filter((item) => item.seatNumber !== seat.seatNumber));
                return { ...seat, status: "available" };
            }
            return seat;
        });
        setListSeat(updatedSeatList);
    }

    const renderSeatButtons = (seat: Seat) => {
        return (
            <button
                key={seat.seatNumber}
                className={seat.status === 'available' ? styles.btnSeat :
                    seat.status === 'booked' ? styles.btnSeat + ' ' + styles.btnBooked :
                        seat.status === 'bought' ? styles.btnSeat + ' ' + styles.btnBought :
                            seat.status === 'chose' ? styles.btnSeat + ' ' + styles.btnChose :
                                styles.btnSeat + ' ' + styles.inActived}
                onClick={() => handleClickSeatBtn(seat.levels, seat.columns, seat.rows)}
            >
                {seat.seatNumber}
            </button>
        );
    };

    const renderRow = (level: number, row: number) => {
        const buttons = [];
        const rowSeats = listSeat.filter(seat => seat.levels === level && seat.rows === row);
        for (let column = 1; column <= columns; column++) {
            const seat = rowSeats.find(seat => seat.columns === column);
            if (!seat) {
                return null; // or handle the error in a different way
            }

            buttons.push(
                <td key={`${level}-${row}-${column}`}>{renderSeatButtons(seat)}</td>
            );
        }
        return buttons;
    };

    const renderLevel = (level: number) => {
        const rows = [];
        for (let row = 1; row <= rowNumbers; row++) {
            rows.push(<tr key={`${level}-${row}`}>{renderRow(level, row)}</tr>);
        }
        return (
            <div key={level}>
                <h4 className="d-flex justify-content-center">Tầng {level}</h4>
                <table>
                    <tbody>{rows}</tbody>
                </table>
            </div>
        );
    };

    const renderLevels = () => {
        const levelLists = [];
        for (let level = 1; level <= levels; level++) {
            levelLists.push(renderLevel(level));
        }
        return levelLists;
    };

    const handleActionTicket = async () => {
        const order = await transactionApi.createZaloPayOrder({
            amount: price,
            description: "Mua vé xe",
            email: email,
            phoneNumber: phoneNumber,
            transactionType: "MUAVE"
          });

        console.log(order.data.order_url);
        window.location.href = order.data.order_url;

        const request = {
            tripId: tripId,
            userId: accountId ?? null,
            name: name,
            phoneNumber: phoneNumber,
            email: email,
            price: price,
            status: 'bought',
            seats: listSeat.filter((item) => item.status === 'chose').map((item) => item.seatId)
        } as ActionTicketRequest

        // console.log(request)

        if (order.isSuccess === true) actionTicket(request, "Mua vé thành công");
    }

    return (
        <Box>
            <Box>
                <Box className={styles.detailTripContainer}>
                    <Container className="pt-3">
                        <Row>
                            <Col md={6}>
                                <Row className="mb-3">
                                    <Col md={3} className="d-flex align-items-center justify-content-end">
                                        <label className={styles.customLabel}>Tuyến đi</label>
                                    </Col>
                                    <Col md={9}>
                                        <input
                                            type="text"
                                            className={`form-control ${styles.customInput}`}
                                            value={tripDetail?.route}
                                            disabled
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Row>
                                    <Col md={3} className="d-flex align-items-center justify-content-end">
                                        <label className={styles.customLabel}>Điểm đi</label>
                                    </Col>
                                    <Col md={9}>
                                        <input
                                            type="text"
                                            className={`form-control ${styles.customInput}`}
                                            disabled
                                            value={tripDetail?.startPoint}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Row>
                                    <Col md={3} className="d-flex align-items-center justify-content-end">
                                        <label className={styles.customLabel}>Điểm đến</label>
                                    </Col>
                                    <Col md={9}>
                                        <input
                                            type="text"
                                            className={`form-control ${styles.customInput}`}
                                            disabled
                                            value={tripDetail?.endPoint}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Row>
                                    <Col md={3} className="d-flex align-items-center justify-content-end">
                                        <label className={styles.customLabel}>Ngày đi</label>
                                    </Col>
                                    <Col md={9}>
                                        <input
                                            type="text"
                                            className={`form-control ${styles.customInput}`}
                                            disabled
                                            value={selectedDate ? moment(selectedDate).format('DD-MM-YYYY') : ''}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Row>
                                    <Col md={3} className="d-flex align-items-center justify-content-end">
                                        <label className={styles.customLabel}>Giờ đi</label>
                                    </Col>
                                    <Col md={9}>
                                        <input
                                            type="text"
                                            className={`form-control ${styles.customInput}`}
                                            disabled
                                            value={selectedDate ? moment(selectedDate).format('HH:mm') : ''}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Row>
                                    <Col md={3} className="d-flex align-items-center justify-content-end">
                                        <label className={styles.customLabel}>Mã số xe</label>
                                    </Col>
                                    <Col md={9}>
                                        <input
                                            type="text"
                                            className={`form-control ${styles.customInput}`}
                                            disabled
                                            value={tripDetail?.carNumber}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Row>
                                    <Col md={3} className="d-flex align-items-center justify-content-end">
                                        <label className={styles.customLabel}>Nhân viên lái xe</label>
                                    </Col>
                                    <Col md={9}>
                                        <input
                                            type="text"
                                            className={`form-control ${styles.customInput}`}
                                            disabled
                                            value={tripDetail?.driverName}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Row>
                                    <Col md={3} className="d-flex align-items-center justify-content-end">
                                        <label className={styles.customLabel}>Ghi chú</label>
                                    </Col>
                                    <Col md={9}>
                                        <input
                                            type="text"
                                            className={`form-control ${styles.customInput}`}
                                            disabled
                                            value={description}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </Box>
                <Box className={`${styles.bookFormContainer} my-3`}>
                    <Box className={styles.diagramContainer}>
                        <Typography variant="h6" className="text-center">
                            Sơ đồ ghế ngồi
                        </Typography>
                        <Box className={styles.seatDiagram}>
                            {renderLevels()}
                        </Box>
                        <div className="d-flex flex-wrap m-auto w-75">
                            <div className="d-flex align-items-center w-50">
                                <button className={`${styles.btnSeat} ms-0`}>A0D</button>
                                <span>Còn trống</span>
                            </div>
                            <div className="d-flex align-items-center w-50">
                                <button className={`${styles.btnSeat} ms-0 ${styles.btnBooked}`}>A0D</button>
                                <span>Đã đặt</span>
                            </div>
                            <div className="d-flex align-items-center w-50">
                                <button className={`${styles.btnSeat} ms-0 ${styles.btnBought}`}>A0D</button>
                                <span>Đã mua</span>
                            </div>
                            <div className="d-flex align-items-center w-50">
                                <button className={`${styles.btnSeat} ms-0 ${styles.inActived}`}>A0D</button>
                                <span>Ghế không sử dụng</span>
                            </div>
                        </div>
                    </Box>
                    <Box>
                        <Typography variant="h6" className="text-center">
                            Thông tin mua vé
                        </Typography>
                        <Box>
                            <Container className="pt-3">
                                <Row>
                                    <Col md={10}>
                                        <Row className="mb-3">
                                            <Col md={4} className="d-flex align-items-center justify-content-end">
                                                <label className={styles.customLabel}>Tên người mua</label>
                                            </Col>
                                            <Col md={8}>
                                                <input
                                                    type="text"
                                                    className={`form-control ${styles.customInput}`}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col md={10} className="mb-3">
                                        <Row>
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
                                    <Col md={10} className="mb-3">
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
                                    <Col md={10} className="mb-3">
                                        <Row>
                                            <Col md={4} className="d-flex align-items-center justify-content-end">
                                                <label className={styles.customLabel}>Ghế</label>
                                            </Col>
                                            <Col md={8} className="d-flex align-items-center justify-content-end">
                                                {listSeatChose
                                                    .map((item) => (
                                                        item.seatNumber
                                                    )).join(', ')}
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col md={10} className="mb-3">
                                        <Row>
                                            <Col md={4} className="d-flex align-items-center justify-content-end">
                                                <label className={styles.customLabel}>Thành tiền</label>
                                            </Col>
                                            <Col md={8} className="d-flex align-items-center justify-content-end">
                                                <span>{price.toLocaleString()} vnđ</span>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Container>
                        </Box>
                        <Row>
                            <Col md={10} className="mb-3">
                                <Row>
                                    <Col md={4} className="d-flex align-items-center justify-content-end">
                                    </Col>
                                    <Col md={8} className="d-flex align-items-center justify-content-center">
                                        <Button className={`${styles.btnSubmit}`} onClick={handleActionTicket}>
                                            Thanh toán với ZaloPay
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Box>
                </Box>
            </Box>
        </Box>

    );
};

export default UserBuyTicketForm;