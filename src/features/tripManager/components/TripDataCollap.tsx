import { TableCell } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import styles from "../styles.module.css"
import TripApi from "api/tripApi";
import { Seat, TripDataResponse } from "models/carCompany/trip/trip";
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from "moment";

interface Props {
    row: any;
    columns: any;
    // onSave: (value: string) => void;
}

const TripDataCollap: React.FC<Props> = ({ row, columns }) => {
    const accountId = localStorage.getItem('accountId');
    const [tripData, setTripData] = React.useState<TripDataResponse>();
    const [levelNumbers, setLevel] = useState<number>(0);
    const [columnNumbers, setColumn] = useState<number>(0);
    const [rowNumbers, setRowNumbers] = useState<number>(0);

    useEffect(() => {
        async function fetchData() {
            const tripDetail = await TripApi.getTripData(row.tripId);
            setTripData(tripDetail.data);
            setColumn(tripDetail.data.seatDiagram.columns);
            setRowNumbers(tripDetail.data.seatDiagram.rows);
            setLevel(tripDetail.data.seatDiagram.levels);
        }
        fetchData();
    }, [accountId])

    const renderSeatButtons = (seat: Seat) => {
        return (
            <button
                key={seat.seatNumber}
                className={seat.status === 'available' ? styles.btnSeat :
                    seat.status === 'booked' ? styles.btnSeat + ' ' + styles.btnBooked :
                        seat.status === 'bought' ? styles.btnSeat + ' ' + styles.btnBought :
                            seat.status === 'chose' ? styles.btnSeat + ' ' + styles.btnChose :
                                styles.btnSeat + ' ' + styles.inActived}
            >
                {seat.seatNumber}
            </button>
        );
    };

    const renderRow = (level: number, row: number) => {
        const buttons = [];
        const rowSeats = tripData?.seatDiagram.seats.filter(seat => seat.levels === level && seat.rows === row);
        for (let column = 1; column <= columnNumbers; column++) {
            const seat = rowSeats !== undefined ? rowSeats.find(seat => seat.columns === column) : undefined;
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
                <label className="text-center fw-bold d-block">Tầng {level}</label>
                <table>
                    <tbody>{rows}</tbody>
                </table>
            </div>
        );
    };

    const renderLevels = () => {
        const levelLists = [];
        for (let level = 1; level <= levelNumbers; level++) {
            levelLists.push(renderLevel(level));
        }
        return levelLists;
    };

    return (
        <TableCell colSpan={columns.length + 1}>
            <Row>
                <Col sm={4} className="p-3">
                    <label className="fw-bold pb-3">Sơ đồ chỗ ngồi</label>
                    <div className={`${styles.seatDiagramContainer} d-flex justify-content-around border border-primary p-3`}>
                        {renderLevels()}
                    </div>
                    <div className="d-flex flex-wrap">
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
                </Col>
                <Col sm={8} className="p-3">
                    <label className="fw-bold pb-3">Danh sách vé đã mua/đặt</label>
                    <div className={styles.listTicketContainer}>
                        {tripData?.ticketDatas.length == 0 ? "Chưa có vé nào được đặt/mua" :
                            <Row>
                                {tripData?.ticketDatas.map((item) => (
                                    <Col sm={4} key={item.ticketCode} className="pb-3">
                                        <div className={item.status === "bought" ? styles.tkBought : styles.tkBooked}>
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div>
                                                    <label className="fw-bold d-inline pe-1">{item.status === "bought" ? "Người mua" : "Người đặt"}:</label><span>{item.name}</span>
                                                </div>
                                                <span className={`${styles.badgeCustom} ${item.status === "bought" ? styles.badgeBought : styles.badgeBooked} badge badge-secondary`}>{item.status === "bought" ? "Đã mua" : "Đã đặt"}</span>
                                            </div>
                                            <div className="d-flex">
                                                <div className={styles.w40}>
                                                    <label className="fw-bold d-inline pe-1">SĐT:</label><span>{item.phoneNumber}</span>
                                                </div>
                                                <label className="fw-bold d-inline ps-3 pe-1">Email:</label><span>{item.email}</span>
                                            </div>
                                            <div className="d-flex">
                                                <div className={styles.w40}>
                                                    <label className="fw-bold d-inline pe-1">Mã ghế:</label><span>{item.seats}</span>
                                                </div>
                                                <label className="fw-bold d-inline ps-3 pe-1">Thành tiền:</label><span>{item.price.toLocaleString()} VNĐ</span>
                                            </div>
                                            <label className="fw-bold d-inline pe-1">Ngày đặt:</label><span>{moment(item.createTime).format("DD/MM/yyyy hh:mm")}</span>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        }
                    </div>
                </Col>
            </Row>
        </TableCell >

    );
};

export default TripDataCollap;