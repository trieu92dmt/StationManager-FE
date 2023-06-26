import { Box, Button, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styles from "../styles.module.css"
import { DetailTripResponse, Seat } from "models/carCompany/trip/trip";
import moment from "moment";
import TripApi from "api/tripApi";
import { ActionTicketRequest } from "models/carCompany/ticket/ticket";
import { actionTicket } from "api/ticketApi";

interface Props {
    tripId: string;
    // onSave: (value: string) => void;
}

const BuyTicketForm: React.FC<Props> = ({ tripId }) => {
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

    const handleActionTicket = () => {
        const request = {
            tripId: tripId,
            userId: null,
            name: name,
            phoneNumber: phoneNumber,
            email: "",
            price: price,
            status: 'bought',
            seats: listSeat.filter((item) => item.status === 'chose').map((item) => item.seatId)
        } as ActionTicketRequest

        // console.log(request)

        actionTicket(request, "Mua vé thành công");
    }

    return (
        <Box>
            <Box>
                <Box className={styles.detailTripContainer}>
                    <Box className={styles.detailTripItem}>
                        <Typography className={styles.labelFilter}>Tuyến đi:</Typography>
                        <TextField
                            className={styles.detailTripContent}
                            size="small"
                            id="Route"
                            value={tripDetail?.route} />
                    </Box>
                    <Box className={styles.detailTripItem}>
                        <Typography className={styles.labelFilter}>Điểm đi:</Typography>
                        <TextField
                            className={styles.detailTripContent}
                            size="small"
                            id="StartPoint"
                            value={tripDetail?.startPoint} />
                    </Box>
                    <Box className={styles.detailTripItem}>
                        <Typography className={styles.labelFilter}>Điểm đến:</Typography>
                        <TextField
                            className={styles.detailTripContent}
                            size="small"
                            id="EndPoint"
                            value={tripDetail?.endPoint} />
                    </Box>
                    <Box className={styles.detailTripItem}>
                        <Typography className={styles.labelFilter}>Ngày đi:</Typography>
                        <TextField
                            className={styles.detailTripContent}
                            size="small"
                            id="date"
                            value={selectedDate ? moment(selectedDate).format('DD-MM-YYYY') : ''} />
                    </Box>
                    <Box className={styles.detailTripItem}>
                        <Typography className={styles.labelFilter}>Giờ đi:</Typography>
                        <TextField
                            className={styles.detailTripContent}
                            size="small"
                            id="time"
                            value={selectedDate ? moment(selectedDate).format('HH:mm') : ''} />
                    </Box>
                    <Box className={styles.detailTripItem}>
                        <Typography className={styles.labelFilter}>Mã số xe:</Typography>
                        <TextField
                            className={styles.detailTripContent}
                            size="small"
                            id="CarNumber"
                            value={tripDetail?.carNumber} />
                    </Box>
                    <Box className={styles.detailTripItem}>
                        <Typography className={styles.labelFilter}>Nhân viên lái xe:</Typography>
                        <TextField
                            className={styles.detailTripContent}
                            size="small"
                            id="Driver"
                            value={tripDetail?.driverName} />
                    </Box>
                    <Box className={styles.detailTripItem}>
                        <Typography className={styles.labelFilter}>Ghi chú:</Typography>
                        <TextField
                            className={styles.detailTripContent}
                            size="small"
                            id="Description"
                            value={description} />
                    </Box>
                </Box>
                <Box className={styles.bookFormContainer}>
                    <Box className={styles.diagramContainer}>
                        <Typography variant="h6">
                            Sơ đồ ghế ngồi
                        </Typography>
                        <Box className={styles.seatDiagram}>
                            {renderLevels()}
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant="h6">
                            Thông tin đặt vé
                        </Typography>
                        <Box>
                            <Box className={styles.bookDetailItem}>
                                <Typography>Tên người mua:</Typography>
                                <TextField
                                    required
                                    size="small"
                                    id="booker"
                                    color="primary"
                                    className={styles.bookDetailInput}
                                    onChange={(e) => setName(e.target.value)}
                                    variant="outlined" />
                            </Box>
                            <Box className={styles.bookDetailItem}>
                                <Typography>Số điện thoại:</Typography>
                                <TextField
                                    required
                                    size="small"
                                    color="primary"
                                    id="bookerPhoneNumber"
                                    className={styles.bookDetailInput}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    variant="outlined" />
                            </Box>
                            <Box className={styles.bookDetailItem}>
                                <Typography>Ghế:</Typography>
                                <Typography>
                                    {listSeatChose
                                        .map((item) => (
                                            item.seatNumber
                                        )).join(', ')}
                                </Typography>
                            </Box>
                            <Box className={styles.bookDetailItem}>
                                <Typography>Thành tiền:</Typography>
                                <Typography>{price} vnđ</Typography>
                            </Box>
                        </Box>
                        <Button className={styles.btnSubmit} onClick={handleActionTicket}>
                            Mua vé
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>

    );
};

export default BuyTicketForm;