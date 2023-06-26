import { Box, Button, TextField } from "@material-ui/core";
import { AddCarTypeRequest, Seat, SeatLayout } from "models/carCompany/car/car";
import React, { useEffect, useState } from "react";
import styles from "../styles.module.css"
import carCompanyApi, { addCarType } from "api/carCompanyApi";
import { Col, Container, Row } from "react-bootstrap";

interface SeatFormProps {
    layout: SeatLayout;
}

const SeatLayoutForm: React.FC<SeatFormProps> = ({ layout }) => {
    const accountId = localStorage.getItem('accountId');

    const [carTypeName, setCarTypeName] = useState<string>("");
    const [levels, setLevels] = useState<number>(layout.levels);
    const [columns, setColumns] = useState<number>(layout.columns);
    const [rowNumbers, setRowNumbers] = useState<number>(layout.rows);
    const [seatList, setSeatList] = useState<Seat[]>([]);

    useEffect(() => {
        const newSeatList = [];
        for (let level = 1; level <= layout.levels; level++) {
            for (let row = 1; row <= rowNumbers; row++) {
                for (let column = 1; column <= columns; column++) {
                    const code = 'A'.charCodeAt(0);
                    const levelFmt = level === 1 ? 'D' : 'T';
                    const seatNumber = String.fromCharCode(code + column - 1) + (row - 1) + levelFmt;
                    const newSeat: Seat = {
                        columns: column,
                        rows: row,
                        levels: level,
                        seatNumber: seatNumber,
                        seatStatus: "",
                        actived: true
                    };
                    newSeatList.push(newSeat);
                }
            }
        }
        setSeatList(newSeatList);
    }, [layout.levels, rowNumbers, columns]);

    const handleClickSeatBtn = (level: number, col: number, row: number) => {
        const updatedSeatList = seatList.map(seat => {
            if (seat.levels === level && seat.rows === row && seat.columns === col && seat.actived === true) {
                return { ...seat, actived: false };
            }
            else if (seat.levels === level && seat.rows === row && seat.columns === col && seat.actived === false) {
                return { ...seat, actived: true };
            }
            return seat;
        });
        setSeatList(updatedSeatList);
    }

    const renderSeatButtons = (seat: Seat) => {
        return (
            <button
                key={seat.seatNumber}
                className={seat.actived === true ? styles.btnSeat : styles.btnSeat + ' ' + styles.inActived}
                onClick={() => handleClickSeatBtn(seat.levels, seat.columns, seat.rows)}
            >
                {seat.seatNumber}
            </button>
        );
    };

    const renderRow = (level: number, row: number) => {
        const buttons = [];
        const rowSeats = seatList.filter(seat => seat.levels === level && seat.rows === row);
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
                <h2 className={styles.textCenter}>Tầng {level}</h2>
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

    const handleChangeLevels = (level: number) => {
        console.log(level)
        if (level < 1 || level > 2) {
            alert('Số tầng phải lớn hơn 0 và nhỏ hơn 3')
            return
        }
        setLevels(Number(level))
    }

    const handleAddCarType = () => {
        const request = {
            accountId: accountId,
            carTypeName: carTypeName,
            columns: columns,
            rows: rowNumbers,
            levels: levels,
            seats: seatList
        } as AddCarTypeRequest

        addCarType(request)
    }

    return (
        <Box>
            <Box className={`${styles.formHeader}`}>
                <Container className="pt-3">
                    <Row>
                        <Col md={6}>
                            <Row className="mb-3">
                                <Col md={4} className="d-flex align-items-center justify-content-end">
                                    <label className={styles.customLabel}>Tên loại xe</label>
                                </Col>
                                <Col md={6}>
                                    <input
                                        type="text"
                                        className={`form-control ${styles.customInput}`}
                                        onChange={(e) => setCarTypeName(e.target.value)}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col md={6}>
                            <Row className="mb-3">
                                <Col md={4} className="d-flex align-items-center justify-content-end">
                                    <label className={styles.customLabel}>Số tầng</label>
                                </Col>
                                <Col md={6}>
                                    <input
                                        type="text"
                                        className={`form-control ${styles.customInput}`}
                                        value={levels}
                                        onChange={(e) => handleChangeLevels(Number(e.target.value))}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col md={6}>
                            <Row className="mb-3">
                                <Col md={4} className="d-flex align-items-center justify-content-end">
                                    <label className={styles.customLabel}>Số dãy</label>
                                </Col>
                                <Col md={6}>
                                    <input
                                        type="text"
                                        value={columns}
                                        className={`form-control ${styles.customInput}`}
                                        onChange={(e) => setColumns(Number(e.target.value))}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col md={6}>
                            <Row className="mb-3">
                                <Col md={4} className="d-flex align-items-center justify-content-end">
                                    <label className={styles.customLabel}>Số hàng</label>
                                </Col>
                                <Col md={6}>
                                    <input
                                        type="text"
                                        value={rowNumbers}
                                        className={`form-control ${styles.customInput}`}
                                        onChange={(e) => setRowNumbers(Number(e.target.value))}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Box>
            <div className={styles.seatDiagram}>
                {renderLevels()}
            </div>
            <div className="row">
                <div className="col-md-12 d-flex justify-content-center mb-3">
                    <button
                        className={`btn btn-primary ${styles.customBtn}`} onClick={handleAddCarType}>
                        <i className={`fas fa-plus mr-2 ${styles.customIcon}`}></i>
                        Thêm mới
                    </button>
                </div>
            </div>
        </Box>

    );
};

export default SeatLayoutForm;