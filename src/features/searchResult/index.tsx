import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, Slider, TextField, Typography } from "@material-ui/core";
import { Autocomplete, Rating } from "@material-ui/lab";
import UserFooter from "components/UserCommon/Footer";
import UserHeader from "components/UserCommon/Header";
import { useEffect, useState } from "react";
import styles from './styles.module.css'
import React from "react";
import { StarOutline, StarRate } from "@material-ui/icons";
import { FaMinus, FaPlus } from "react-icons/fa";
import { ImLocation } from "react-icons/im";
import { BiCurrentLocation, BiDotsVerticalRounded } from "react-icons/bi";
import UserBuyTicketForm from "./components/userBuyTicketForm";
import { TripSearchResponse } from "models/carCompany/trip/trip";
import TripApi from "api/tripApi";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { CommonResponse2, CommonResponse4 } from "models";
import provinceApi from "api/provinceApi";
import 'bootstrap/dist/css/bootstrap.min.css';
import CommonApi from "api/commonApi";

function valuetext(value: number) {
    return `${value}°C`;
}


const SearchResultPage: React.FC = () => {
    const [listTrip, setListTrip] = useState<TripSearchResponse[]>([]);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const [listProvinceSP, setListProvinceSP] = React.useState<CommonResponse4[]>([]);
    const [listProvinceEP, setListProvinceEP] = React.useState<CommonResponse4[]>([]);
    const [startPoint, setStartPoint] = React.useState<CommonResponse4 | null>(null);
    const [endPoint, setEndPoint] = React.useState<CommonResponse4 | null>(null);
    const [selectedDate, setSelectedDate] = React.useState<string | null>(searchParams.get('startDate') ?? null);
    const [isEarlyTime, setIsEarlyTime] = React.useState(false);
    const [isLateTime, setIsLateTime] = React.useState(false);
    const [priceFrom, setPriceFrom] = React.useState(0);
    const [priceTo, setPriceTo] = React.useState(3000000);
    const [emptySeat, setEmptySeat] = React.useState(1);
    const [selectedCompany, setSelectedCompany] = React.useState<number[]>([]);
    const [listCarCompany, setListCarCompany] = React.useState<CommonResponse2[]>([]);
    // const [isFirstRow, setIsFirstRow] = React.useState(false);
    // const [isLastRow, setIsLastRow] = React.useState(false);
    // const [isMiddleRow, setIsMiddleRow] = React.useState(false);
    const [ratePointFrom, setRatePointFrom] = React.useState(3);

    useEffect(() => {
        async function fetchData() {
            const listCarCompany = await CommonApi.getListCarCompany();
            setListCarCompany(listCarCompany.data);
        }
        fetchData();
    }, [])

    useEffect(() => {
        async function fetchData() {
            const tripSearch = await TripApi.searchTrip({
                paging: {
                    pageSize: 10,
                    pageIndex: 1,
                    orderBy: isEarlyTime ? "startDate" : '',
                    orderByDesc: isLateTime ? "startDate" : '',
                },
                endPoint: searchParams.get('endPoint') ?? "",//endPoint?.key ?? "",
                startPoint: searchParams.get('startPoint') ?? "",
                startDate: selectedDate === "" ? null : selectedDate,
                priceFrom: priceFrom,
                priceTo: priceTo,
                emptySeat: emptySeat,
                isFirstRow: null,//isFirstRow,
                isMiddleRow: null,//isMiddleRow,
                isLastRow: null,//isLastRow,
                ratePointFrom: ratePointFrom,
                listCarCompany: selectedCompany
            });
            const listCarCompany = await CommonApi.getListCarCompany();

            setListTrip(tripSearch.data);
            setListCarCompany(listCarCompany.data);
        }
        fetchData();
    }, [ratePointFrom, selectedCompany, emptySeat, isEarlyTime, isLateTime])

    const [value, setValue] = React.useState<number[]>([0, 3000000]);

    const handleDateChange = (date: string) => {
        setSelectedDate(date);
    };

    const handleChange = (event: any, newValue: number | number[]) => {
        setValue(newValue as number[]);
        setPriceFrom(value[0]);
        setPriceTo(value[1]);
    };

    const increment = () => {
        setEmptySeat(emptySeat + 1);
    }

    const decrement = () => {
        if (emptySeat === 0)
            setEmptySeat(0);
        else setEmptySeat(emptySeat - 1);
    }

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const labelRatings: { [index: string]: string } = {
        0.5: 'Useless',
        1: 'Useless+',
        1.5: 'Poor',
        2: 'Poor+',
        2.5: 'Ok',
        3: 'Ok+',
        3.5: 'Good',
        4: 'Good+',
        4.5: 'Excellent',
        5: 'Excellent+',
    };


    const [openBuyTicketForm, setOpenBuyTicketForm] = React.useState(false);
    const [tripIdChose, setTripIdChose] = React.useState("");

    const handleClickOpenBuyTicketForm = (tripId: string) => {
        console.log(tripId);
        setOpenBuyTicketForm(true);
        setTripIdChose(tripId);
    };

    const handleCloseBuyTicketForm = () => {
        setOpenBuyTicketForm(false);
    };

    const handleSearch = () => {
        async function fetchData() {
            const tripSearch = await TripApi.searchTrip({
                paging: {
                    pageSize: 10,
                    pageIndex: 1,
                    orderBy: isEarlyTime ? "startDate" : '',
                    orderByDesc: isLateTime ? "startDate" : '',
                },
                endPoint: endPoint?.key ?? "",
                startPoint: startPoint?.key ?? "",
                startDate: selectedDate === "" ? null : selectedDate,
                priceFrom: priceFrom,
                priceTo: priceTo,
                emptySeat: emptySeat,
                isFirstRow: null,//isFirstRow,
                isMiddleRow: null,//isMiddleRow,
                isLastRow: null,//isLastRow,
                ratePointFrom: ratePointFrom,
                listCarCompany: selectedCompany
            });
            setListTrip(tripSearch.data);
        }
        fetchData();
    }

    const handleSortButtonClick = (type: string) => {
        if (type === 'early') {
            setIsEarlyTime(true);
            setIsLateTime(false);
        }
        else if (type === 'late') {
            setIsEarlyTime(false);
            setIsLateTime(true);
        }
    };

    const getDatatProvince = async (key = '', isFirst = true) => {
        const listProvince = await provinceApi.getListProvince(key);
        if (listProvince && listProvince.data && listProvince.data.length > 0 && isFirst) {
            setListProvinceEP(listProvince.data);
            //setEndPoint(listProvince.data[1]);
            console.log(listProvince)
        }
        else setListProvinceEP(listProvince.data);
    }

    const getDatatProvinceSP = async (key = '', isFirst = true) => {
        const listProvinceSP = await provinceApi.getListProvince(key);
        if (listProvinceSP && listProvinceSP.data && listProvinceSP.data.length > 0 && isFirst) {
            setListProvinceSP(listProvinceSP.data)
            //setStartPoint(listProvinceSP.data[0])
        }
        else setListProvinceSP(listProvinceSP.data)
    }

    const getAllProvince = async () => {
        const allProvince = await provinceApi.getAllProvince();

        setStartPoint(allProvince.data.find(item => item.key === searchParams.get("startPoint")) ?? null);
        setEndPoint(allProvince.data.find(item => item.key === searchParams.get("endPoint")) ?? null);
    }

    useEffect(() => {
        getAllProvince()
        getDatatProvince()
        getDatatProvinceSP()
    }, [])

    const handleReverseButtonClick = () => {
        let a = startPoint;
        let b = endPoint;
        setStartPoint(b);
        setEndPoint(a);
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        const value = parseInt(event.target.value, 10); // Chuyển đổi giá trị sang số nguyên

        if (isChecked) {
            // Nếu checkbox được chọn, thêm giá trị vào state selectedCompany
            setSelectedCompany((prevSelected) => [...prevSelected, value]);
        } else {
            // Nếu checkbox bị bỏ chọn, loại bỏ giá trị khỏi state selectedCompany
            setSelectedCompany((prevSelected) =>
                prevSelected.filter((item) => item !== value)
            );
        }
    };

    return (
        <Box>
            <Box>
                <UserHeader />
            </Box>
            <Box className={styles.sectionContainer}>
                <nav aria-label="breadcrumb" className={styles.breadcrumb}>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/home">Trang chủ</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Tìm chuyến</li>
                    </ol>
                </nav>
                <Box className={styles.searchFormContainer}>
                    <Grid
                        container
                        spacing={2}
                        alignItems={'center'}
                        className={styles.searchInputContainer}
                    >
                        <Grid item className={styles.textFieldInput}>
                            <Autocomplete
                                //classes={classes}
                                id="start-point"
                                options={listProvinceSP}
                                groupBy={(option) => option.group}
                                getOptionLabel={(option) => option.value}
                                value={startPoint}
                                onChange={(event, value) => setStartPoint(value)}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        onChange={async (e) => { await getDatatProvinceSP(e.target.value, false) }}
                                    />}
                            />
                        </Grid>
                        <button
                            className={`btn btn-outline-primary ${styles.btnRotate}`} onClick={handleReverseButtonClick}>
                            <i className={`fas fa-arrows-alt-h mr-2 ${styles.customIcon}`}></i>
                        </button>
                        <Grid item className={styles.textFieldInput}>
                            <Autocomplete
                                //classes={classes}
                                id="end-point"
                                options={listProvinceEP}
                                groupBy={(option) => option.group}
                                getOptionLabel={(option) => option.value}
                                value={endPoint}
                                onChange={(event, value) => { setEndPoint(value) }}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        onChange={async (e) => { await getDatatProvince(e.target.value, false) }}
                                    />}
                            />
                        </Grid>
                        <Grid item className={styles.dateFieldInput}>
                            <FormControl fullWidth variant="outlined" size="small">
                                <div className="d-flex flex-column p-2">
                                    <input
                                        type="Date"
                                        className={`border-0 ${styles.inputDateCustom}`}
                                        onChange={(e) => handleDateChange(e.target.value)}
                                        min={moment().format('YYYY-MM-DD')}
                                        value={selectedDate ?? moment().format('YYYY-MM-DD')}
                                    >
                                    </input>
                                </div>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Box>
                        <Button variant="outlined" className={styles.searchBtn} onClick={handleSearch}>
                            Tìm chuyến
                        </Button>
                    </Box>
                </Box>
                <Box className={styles.resultContainer}>
                    <Box className={styles.filterOptionContainer}>
                        <Typography className={styles.filterOptionLabel}>
                            Lọc
                        </Typography>
                        <Box className={styles.filterOptionList}>
                            <Box className={styles.filterOptionItem}>
                                <Typography className={styles.itemFilterLabel}>
                                    Giờ đi
                                </Typography>
                                <Box className={styles.filterOptItem}>
                                    <Button
                                        variant="outlined"
                                        className={styles.btnFilterOption}
                                        onClick={() => handleSortButtonClick('early')}>
                                        Giờ đi sớm nhất
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        className={styles.btnFilterOption}
                                        onClick={() => handleSortButtonClick('late')}>
                                        Giờ đi muộn nhất
                                    </Button>
                                </Box>
                            </Box>
                            <Box>
                                <Typography className={styles.itemFilterLabel}>
                                    Giá vé
                                </Typography>
                                <Box className={styles.filterOptItem}>
                                    <Slider
                                        className={styles.mySlider}
                                        value={value}
                                        max={priceTo}
                                        min={priceFrom}
                                        onChange={handleChange}
                                        valueLabelDisplay="auto"
                                        aria-labelledby="range-slider"
                                        step={10000}
                                        getAriaValueText={valuetext}
                                    />
                                </Box>

                                <Box className={styles.valueSlider}>
                                    <Typography className={styles.valueSliderItem}>
                                        {priceFrom} đ
                                    </Typography>
                                    <Typography className={styles.valueSliderItem}>
                                        {priceTo} đ
                                    </Typography>
                                </Box>
                            </Box>
                            <Box>
                                <Typography className={styles.itemFilterLabel}>
                                    Vị trí ghế
                                </Typography>
                                <Box className={styles.seatOptionGroup}>
                                    <Box className={styles.seatOption}>
                                        <Typography>
                                            Số ghế trống
                                        </Typography>
                                        <Box className={styles.seatOptionItem}>
                                            <div className={styles.seatNumberOpt}>
                                                <button
                                                    className={styles.addSeatBtn}
                                                    onClick={decrement}>
                                                    <FaMinus />
                                                </button>
                                                <input type="number" className={styles.seatNumberInput} value={emptySeat} onChange={(e) => setEmptySeat(Number(e.target.value))} />
                                                <button
                                                    className={styles.deleteSeatBtn}
                                                    onClick={increment}>
                                                    <FaPlus />
                                                </button>
                                            </div>
                                        </Box>
                                    </Box>
                                    {/* <Box className={styles.seatRowOpt}>
                                        <Typography>
                                            Hàng ghế đầu
                                        </Typography>
                                        <Box>
                                            <Checkbox {...label} onChange={(e) => setIsFirstRow(e.target.checked)} />
                                        </Box>
                                    </Box>
                                    <Box className={styles.seatRowOpt}>
                                        <Typography>
                                            Hàng ghế giữa
                                        </Typography>
                                        <Box>
                                            <Checkbox {...label} onChange={(e) => setIsMiddleRow(e.target.checked)} />
                                        </Box>
                                    </Box>
                                    <Box className={styles.seatRowOpt}>
                                        <Typography>
                                            Hàng ghế cuối
                                        </Typography>
                                        <Box>
                                            <Checkbox {...label} onChange={(e) => setIsLastRow(e.target.checked)} />
                                        </Box>
                                    </Box> */}
                                </Box>
                            </Box>
                            <Box>
                                <Typography className={styles.itemFilterLabel}>
                                    Nhà xe
                                </Typography>
                                <Box className={styles.listCompany}>
                                    {listCarCompany.map((item) => (
                                        <Box className={styles.companyOptItem}>
                                            <Typography className={styles.companyOptLabelItem}>
                                                {item.value}
                                            </Typography>
                                            <Box>
                                                <Checkbox value={item.key} {...label} onChange={handleCheckboxChange} />
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                            <Box>
                                <Typography className={styles.itemFilterLabel}>
                                    Đánh giá
                                </Typography>
                                <Box>
                                    <Box className={styles.ratingOpt}>
                                        <Rating
                                            name="text-feedback"
                                            value={ratePointFrom}
                                            precision={0.5}
                                            onChange={(event, newValue) => {
                                                setRatePointFrom(newValue ?? 0);
                                            }}
                                            emptyIcon={<StarOutline style={{ opacity: 0.55 }} fontSize="inherit" />}
                                        />
                                        <div>3 sao trở lên</div>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box className={styles.listResultContainer}>
                        <Typography className={styles.searchResultLabel} variant="h5">Kết quả tìm kiếm: {listTrip.length} kết quả phù hợp</Typography>
                        <Box className={styles.listTripContainer}>
                            {listTrip.map((trip) => (
                                <Box className={styles.TripItem}>
                                    <div className={styles.card}>
                                        <div className={styles.cardImage}>
                                            <img src={trip.image != null ? trip.image : "https://carshop.vn/wp-content/uploads/2022/07/xe-vung-tau-bien-hoa-dong-nai-5.jpg"} alt="card-img" />
                                        </div>
                                        <div className={styles.cardContent}>
                                            <div className={styles.topContent}>
                                                <div className={styles.companyName}>
                                                    <a href={'/car-company-detail/' + trip.companyId}>{trip.companyName}</a>
                                                    <div className={styles.ratePoint}>
                                                        <StarRate />{trip.ratePoint} | {trip.rateCount}
                                                    </div>
                                                </div>
                                                <div className={styles.ticketPrice}>
                                                    {trip.ticketPrice.toLocaleString()} VNĐ
                                                </div>
                                            </div>

                                            <div className={styles.tripContentItem}>
                                                <label className="pt-2">{trip.carType}</label>
                                                <div>
                                                    <label className="pt-2">Ngày khởi hành: {moment(trip.startDate).format('DD-MM-YYYY HH:mm')}</label>
                                                    <div className="pt-2">
                                                        <div className="d-flex align-items-center">
                                                            <BiCurrentLocation className="me-1" />
                                                            <label>{trip.startPoint}</label>
                                                        </div>
                                                        <BiDotsVerticalRounded className="d-block" />
                                                        <div className="d-flex align-items-center">
                                                            <ImLocation className="me-1" />
                                                            <label>{trip.endPoint}</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={styles.bottomTripItem}>
                                                <label className="pt-2">Còn {trip.emptySeat} chỗ trống</label>
                                                <Button
                                                    onClick={() => handleClickOpenBuyTicketForm(trip.tripId)}
                                                    className={styles.choseBtn}>
                                                    Chọn chuyến
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box>
                <UserFooter />
            </Box>

            <Dialog
                open={openBuyTicketForm}
                onClose={handleCloseBuyTicketForm}
                aria-labelledby="form-dialog-title"
                fullWidth={true}
                maxWidth="md">
                <DialogTitle id="form-dialog-title">Mua vé</DialogTitle>
                <DialogContent>
                    <UserBuyTicketForm tripId={tripIdChose} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseBuyTicketForm} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default SearchResultPage;