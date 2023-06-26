import { Box, Button, TextField, Typography } from "@material-ui/core";
import { DetailCar, Seat, UpdateCarRequest } from "models/carCompany/car/car";
import React, { useEffect, useState } from "react";
import styles from "../styles.module.css"
import carCompanyApi, { updateCar } from "api/carCompanyApi";
import { CommonResponse2 } from "models";

interface Props {
    carId: string;
    onSave: (value: string) => void;
}

const EditCarForm: React.FC<Props> = ({ carId, onSave }) => {
    const accountId = localStorage.getItem('accountId');

    // const [listCarType, setListCarType] = useState<CommonResponse2[]>([]);
    const [detailCar, setDetailCar] = useState<DetailCar>();
    const [carNumber, setCarNumber] = useState<string>("");
    const [carDescription, setCarDescription] = useState<string>("");

    const [carTypeName, setCarTypeName] = useState<string>("");
    const [levels, setLevels] = useState<number>(0);
    const [columns, setColumns] = useState<number>(0);
    const [rowNumbers, setRowNumbers] = useState<number>(0);
    const [seatList, setSeatList] = useState<Seat[]>([]);


    useEffect(() => {
        async function fetchData() {
            const carTypes = await carCompanyApi.getListCarType({ keyword: null, accountId: accountId });
            const carDetail = await carCompanyApi.getDetailCar(carId);
            // setListCarType(carTypes.data);
            setDetailCar(carDetail.data);

            if (carDetail) {
                setCarNumber(carDetail.data.carNumber)
                setCarDescription(carDetail.data.description)
                setLevels(carDetail.data.levels)
                setColumns(carDetail.data.columns)
                setRowNumbers(carDetail.data.rows)
                setSeatList(carDetail.data.seats)
            }
        }
        fetchData();
    }, [accountId])



    const renderSeatButtons = (seat: Seat) => {
        return (
            <button
                key={seat.seatNumber}
                className={seat.actived === true ? styles.btnSeat : styles.btnSeat + ' ' + styles.inActived}
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

    return (
        <Box>
            <Box className={styles.formHeader + ' ' + styles.addCarContainer}>
                <Box className={styles.addCarItem}>
                    <Typography className={styles.labelFilter}>Mã số xe</Typography>
                    <TextField
                        required
                        className={styles.addCarInput}
                        size="small"
                        id="CarNumber"
                        variant="outlined"
                        value={carNumber}
                        onChange={(e) => setCarNumber(e.target.value)} />
                </Box>
                <Box className={styles.addCarItem}>
                    <Typography className={styles.labelFilter}>Loại xe</Typography>
                    <TextField
                        required
                        className={styles.addCarInput}
                        size="small"
                        id="CarType"
                        variant="outlined"
                        disabled
                        value={detailCar?.carTypeName} />
                </Box>
                <Box className={styles.addCarItem}>
                    <Typography className={styles.labelFilter}>Ghi chú</Typography>
                    <TextField
                        className={styles.addCarInput}
                        id="Description"
                        size="small"
                        variant="outlined"
                        value={carDescription}
                        onChange={(e) => setCarDescription(e.target.value)} />
                </Box>

            </Box>
            <div className={styles.seatDiagram}>
                {renderLevels()}
            </div>
        </Box>

    );
};

export default EditCarForm;