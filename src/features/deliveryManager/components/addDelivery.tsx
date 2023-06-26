import { Box, Button, FormControlLabel, Radio, RadioGroup, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styles from "../styles.module.css"
import { useAppDispatch, useAppSelector } from "app/hooks";
import { provinceAction, selectProvinceList } from "features/common/province/provinceSlice";
import { Autocomplete } from "@material-ui/lab";
import { CommonResponse2 } from "models";
import CommonApi from "api/commonApi";
import { AddTripRequest } from "models/carCompany/trip/trip";
import { addTrip } from "api/tripApi";
import { AddDeliveryRequest } from "models/carCompany/delivery/delivery";
import { addDelivery } from "api/deliveryApi";

const AddDeliveryForm = () => {
    const accountId = localStorage.getItem('accountId');

    const [description, setDescription] = React.useState<string>("");
    const provinceList = useAppSelector(selectProvinceList);
    const [startPoint, setStartPoint] = React.useState<string>("");
    const [cost, setCost] = React.useState<number>(45000);
    const [isShip, setIsShip] = React.useState<string>("no");
    const [sender, setSender] = React.useState<string>("");
    const [receiver, setReceiver] = React.useState<string>("");
    const [phoneNumber, setPhoneNumber] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [address, setAddress] = React.useState<string>("");


    const handleAddDelivery = () => {
        const request = {
            accountId: accountId,
            tripId: tripId,
            sender: sender,
            receiver: receiver,
            email: email,
            phoneNumber: phoneNumber,
            address: address,
            isShipAtHome: isShip === "yes" ? true : false,
            cost: cost
        } as AddDeliveryRequest

        addDelivery(request)
    }

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(
            provinceAction.fetchProvinceList({
            })
        );
    }, [dispatch])

    const options = provinceList.map((option) => {
        const groupBy = option.provinceName;

        return {
            groupBy: groupBy,
            ...option,
        };
    });

    const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    const [listRoute, setListRoute] = useState<CommonResponse2[]>([]);
    const [route, setRoute] = useState<string>("");
    const [listTripTime, setListTripTime] = useState<CommonResponse2[]>([]);
    const [tripId, setTripId] = useState<string>("");

    useEffect(() => {
        async function fetchData() {
            const routes = await CommonApi.getListRoute(accountId);
            setListRoute(routes.data);
        }
        fetchData();
    }, [accountId])

    useEffect(() => {
        async function fetchData() {
            const tripTimes = await CommonApi.getListTripByRouteId({
                routeId: route,
                startDate: selectedDate !== null ? selectedDate.toISOString() : null,
            });
            setListTripTime(tripTimes.data);
        }
        if (selectedDate !== null)
            fetchData();
    }, [selectedDate])

    const changeIsShipHandler = (isShip: string) => {
        setIsShip(isShip);
        if (isShip === "yes")
            setCost(75000);
        else if (isShip === "no")
            setCost(45000);
    }

    return (
        <Box>
            <Box>
                <Box className={styles.formAddContainer}>
                    <Box className={styles.leftFormAddContainer}>
                        <Box className={styles.addDeliveryItem}>
                            <Typography className={styles.labelFilter}>Tuyến đi: </Typography>
                            <Autocomplete
                                id="combo-box-route"
                                options={listRoute}
                                getOptionLabel={(option) => option.value}
                                style={{ width: 300 }}
                                size="small"
                                onChange={(event, value) => setRoute(value == null ? "" : value.key)}
                                renderInput={(params) => <TextField {...params} variant="outlined" />
                                }
                            />
                        </Box>
                        <Box className={styles.addDeliveryItem}>
                            <Typography className={styles.labelFilter}>Ngày đi: </Typography>
                            <TextField
                                id="date"
                                type="date"
                                variant="outlined"
                                size="small"
                                style={{ width: 300 }}
                                onChange={(e) => handleDateChange(new Date(e.target.value))}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Box>
                        <Box className={styles.addDeliveryItem}>
                            <Typography className={styles.labelFilter}>Chuyến đi lúc: </Typography>
                            <Autocomplete
                                id="start-time"
                                options={listTripTime}
                                getOptionLabel={(option) => option.value}
                                style={{ width: 300 }}
                                size="small"
                                onChange={(event, value) => setTripId(value == null ? "" : value.key)}
                                renderInput={(params) => <TextField {...params} variant="outlined" />
                                }
                            />
                        </Box>
                        <Box className={styles.addDeliveryItem}>
                            <Typography className={styles.labelFilter}>Người gửi:</Typography>
                            <TextField
                                required
                                className={styles.addTripInput}
                                size="small"
                                style={{ width: 300 }}
                                id="sender"
                                variant="outlined"
                                onChange={(e) => setSender(e.target.value)} />
                        </Box>
                    </Box>
                    <Box className={styles.rightFormAddContainer}>
                        <Box className={styles.addDeliveryItem}>
                            <Typography className={styles.labelFilter}>Người nhận:</Typography>
                            <TextField
                                required
                                className={styles.addTripInput}
                                size="small"
                                style={{ width: 300 }}
                                id="receiver"
                                variant="outlined"
                                onChange={(e) => setReceiver(e.target.value)} />
                        </Box>
                        <Box className={styles.addDeliveryItem}>
                            <Typography className={styles.labelFilter}>Số điện thoại:</Typography>
                            <TextField
                                required
                                className={styles.addTripInput}
                                size="small"
                                style={{ width: 300 }}
                                id="phoneNumber"
                                variant="outlined"
                                onChange={(e) => setPhoneNumber(e.target.value)} />
                        </Box>
                        <Box className={styles.addDeliveryItem}>
                            <Typography className={styles.labelFilter}>Email:</Typography>
                            <TextField
                                required
                                className={styles.addTripInput}
                                size="small"
                                id="email"
                                style={{ width: 300 }}
                                variant="outlined"
                                onChange={(e) => setEmail(e.target.value)} />
                        </Box>
                        <Box className={styles.addDeliveryItem}>
                            <Typography className={styles.labelFilter}>Địa chỉ:</Typography>
                            <TextField
                                required
                                className={styles.addTripInput}
                                size="small"
                                id="address"
                                style={{ width: 300 }}
                                variant="outlined"
                                onChange={(e) => setAddress(e.target.value)} />
                        </Box>
                        <Box className={styles.addDeliveryItem}>
                            <Typography className={styles.labelFilter}>Nhận ship:</Typography>
                            <RadioGroup
                                aria-label="isShip"
                                name="isShip"
                                value={isShip}
                                className={styles.radioIsShip}
                                onChange={(e) => changeIsShipHandler(e.target.value)}>
                                <FormControlLabel value="yes" control={<Radio />} label="Có" />
                                <FormControlLabel value="no" control={<Radio />} label="Không" />
                            </RadioGroup>
                        </Box>
                        <Box className={styles.addDeliveryItem}>
                            <Typography className={styles.labelFilter}>Phí vận chuyển:</Typography>
                            <TextField
                                required
                                disabled
                                className={styles.addTripInput}
                                size="small"
                                id="cost"
                                value={cost + "VNĐ"}
                                style={{ width: 300 }}
                                variant="outlined"/>
                        </Box>
                    </Box>

                </Box>
            </Box>
            <Button className={styles.btnAddDelivery} onClick={handleAddDelivery}>
                Thêm mới
            </Button>
        </Box>

    );
};

export default AddDeliveryForm;