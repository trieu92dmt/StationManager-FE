import { Avatar, Box, Button, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styles from "../styles.module.css"
// import TripApi, { addTrip } from "api/routeApi";
// import { AddTripRequest } from "models/carCompany/route/route";
import { Autocomplete } from "@material-ui/lab";
import { CommonResponse2 } from "models";
import carCompanyApi from "api/carCompanyApi";
import EmployeeApi from "api/employeeApi";
import { DetailTripResponse, Seat, UpdateTripRequest } from "models/carCompany/trip/trip";
import TripApi, { updateTrip } from "api/tripApi";
import moment from 'moment-timezone';

interface Props {
    tripId: string;
    // onSave: (value: string) => void;
}

const EditTripForm: React.FC<Props> = ({ tripId }) => {
    const accountId = localStorage.getItem('accountId');

    const [description, setDescription] = React.useState<string>("");
    const [tripDetail, setTripDetail] = React.useState<DetailTripResponse>();
    const [levels, setLevels] = useState<number>(0);
    const [columns, setColumns] = useState<number>(0);
    const [rowNumbers, setRowNumbers] = useState<number>(0);
    const [listSeat, setListSeat] = React.useState<Seat[]>([]);

    const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const handleDateChange = (date: Date | null) => {
        // const utcoffset = moment(date).tz(timeZone).utcOffset();
        // const dateWithTimeZone = moment(date).utcOffset(utcoffset); 
        // setSelectedDate(dateWithTimeZone.toDate());
        setSelectedDate(date);
    };

    const [listCarNumber, setListCarNumber] = useState<CommonResponse2[]>([]);
    const [carNumber, setCarNumber] = useState<CommonResponse2 | null>(null);
    const [listDriver, setListDriver] = useState<CommonResponse2[]>([]);
    const [driver, setDriver] = useState<CommonResponse2 | null>(null);

    useEffect(() => {
        async function fetchData() {
            const tripDetail = await TripApi.getDetailTrip(tripId);
            const carNumbers = await carCompanyApi.getListCarNumber({ keyword: null, accountId: accountId });
            const drivers = await EmployeeApi.getListDriver(accountId);
            setTripDetail(tripDetail.data);
            setListSeat(tripDetail.data.seats);
            setListCarNumber(carNumbers.data);
            setListDriver(drivers.data);
            setCarNumber(null);
            setDriver(drivers.data.find(x => x.key === tripDetail.data.driver) || null);
            setDescription(tripDetail.data.description);
            setColumns(tripDetail.data.carDetail.columns);
            setLevels(tripDetail.data.carDetail.levels);
            setRowNumbers(tripDetail.data.carDetail.rows);
            setSelectedDate(moment(tripDetail.data.startDate, 'YYYY-MM-DDTHH:mm:ss').toDate());
        }
        fetchData();
    }, [accountId])

    const handleChangeCarNumber = async (value: CommonResponse2 | null) => {
        setCarNumber(value);
        const seatDiagram = await TripApi.getSeatByCarNumber(value != null ? value.key : "");
        setListSeat(seatDiagram.data.seats);
        setColumns(seatDiagram.data.columns);
        setLevels(seatDiagram.data.levels);
        setRowNumbers(seatDiagram.data.rows);
    }

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

    const handleEditTrip = () => {
        console.log(selectedDate)
        const request = {
            tripId: tripId,
            startDate: selectedDate != null ? moment(selectedDate).format('YYYY-MM-DDTHH:mm:ss') : null,
            carNumber: carNumber?.key,
            driver: driver?.key,
            description: description
        } as UpdateTripRequest

        console.log(request)

        updateTrip(request)
    }

    return (
        <Box>
            <Box>
                <Box className={styles.formEditContainer}>
                    <Box className={styles.editTripItem}>
                        <Typography className={styles.labelFilter}>Tuyến đi</Typography>
                        <TextField
                            required
                            className={styles.editTripInput}
                            size="small"
                            id="Route"
                            disabled
                            value={tripDetail?.route}
                            variant="outlined" />
                    </Box>
                    <Box className={styles.editTripItem}>
                        <Typography className={styles.labelFilter}>Điểm đi</Typography>
                        <TextField
                            required
                            className={styles.editTripInput}
                            size="small"
                            id="StartPoint"
                            disabled
                            value={tripDetail?.startPoint}
                            variant="outlined" />
                    </Box>
                    <Box className={styles.editTripItem}>
                        <Typography className={styles.labelFilter}>Điểm đến</Typography>
                        <TextField
                            required
                            className={styles.editTripInput}
                            size="small"
                            id="EndPoint"
                            disabled
                            value={tripDetail?.endPoint}
                            variant="outlined" />
                    </Box>
                    <Box className={styles.editTripItem}>
                        <Typography className={styles.labelFilter}>Ngày đi</Typography>
                        <TextField
                            id="date"
                            type="datetime-local"
                            variant="outlined"
                            className={styles.editTripInput}
                            size="small"
                            style={{ width: 300 }}
                            value={selectedDate ? moment(selectedDate).format('YYYY-MM-DDTHH:mm') : ''}
                            onChange={(e) => handleDateChange(new Date(e.target.value))}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Box>
                    <Box className={styles.editTripItem}>
                        <Typography className={styles.labelFilter}>Mã số xe</Typography>
                        <Autocomplete
                            id="combo-box-car-number"
                            options={listCarNumber}
                            getOptionLabel={(option) => option.value}
                            className={styles.editTripInput}
                            style={{ width: 300 }}
                            size="small"
                            value={carNumber}
                            onChange={(event, newValue) => {
                                handleChangeCarNumber(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} variant="outlined" />
                            }
                        />
                    </Box>
                    <Box className={styles.editTripItem}>
                        <Typography className={styles.labelFilter}>Nhân viên lái xe</Typography>
                        <Autocomplete
                            id="combo-box-car-type"
                            options={listDriver}
                            getOptionLabel={(option) => option.value}
                            className={styles.editTripInput}
                            style={{ width: 300 }}
                            size="small"
                            value={driver}
                            onChange={(event, newValue) => {
                                setDriver(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                        />
                    </Box>
                    <Box className={styles.editTripItem}>
                        <Typography className={styles.labelFilter}>Ghi chú</Typography>
                        <TextField
                            required
                            className={styles.editTripInput}
                            size="small"
                            id="Description"
                            variant="outlined"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)} />
                    </Box>
                </Box>
                <Box>
                    <Typography variant="h6">
                        Sơ đồ ghế ngồi
                    </Typography>
                    <Box className={styles.seatDiagram}>
                        {renderLevels()}
                    </Box>
                </Box>
            </Box>
            <Button className={styles.btnEditTrip} onClick={handleEditTrip}>
                Lưu thay đổi
            </Button>
        </Box>

    );
};

export default EditTripForm;