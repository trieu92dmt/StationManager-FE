import { AppBar, Box, Button, Grid, Paper, Tab, Tabs, TextField, Theme, Typography, createStyles, makeStyles, useTheme } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import styles from "./styles.module.css"
import { SearchOutlined } from "@material-ui/icons";
import { provinceAction, selectProvinceList } from "features/common/province/provinceSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import React, { useEffect, useState } from "react";
import { CommonResponse2 } from "models";
import SwipeableViews from 'react-swipeable-views';
import CommonApi from "api/commonApi";
import ReportApi from "api/reportApi";
import { FrequencyReportResponse, RevenueReportResponse } from "models/carCompany/report/report";
import { number } from "yup";
import { BarChart } from "./components/BarChar";
import { LineChart } from "./components/LineChart";
import 'bootstrap/dist/css/bootstrap.min.css';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        // root: {
        //     '& .MuiTextField-root': {
        //         margin: theme.spacing(1),
        //         width: '25ch',
        //     },
        // },
        root: {
            backgroundColor: theme.palette.background.paper,
            width: 500,
        },

        container: {
            maxHeight: 440,
        },
    }),
);

function a11yProps(index: any) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

export default function CompanyReport() {
    const accountId = localStorage.getItem('accountId');

    const classes = useStyles();
    const theme = useTheme();

    const provinceList = useAppSelector(selectProvinceList);
    const [startPoint, setStartPoint] = React.useState<string>("");
    const [endPoint, setEndPoint] = React.useState<string>("");
    const [startPoint2, setStartPoint2] = React.useState<string>("");
    const [endPoint2, setEndPoint2] = React.useState<string>("");
    const [listRoute, setListRoute] = useState<CommonResponse2[]>([]);
    const [route, setRoute] = useState<string>("");
    const [type, setType] = useState<string>("MONTH");
    const [revenueReport, setRevenueReport] = useState<RevenueReportResponse[]>([]);
    const [frequencyReport, setFrequencyReport] = useState<FrequencyReportResponse[]>([]);
    const types = ["DAY", "MONTH", "YEAR"];

    const options = provinceList.map((option: any) => {
        const groupBy = option.provinceName;

        return {
            groupBy: groupBy,
            ...option,
        };
    });


    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(
            provinceAction.fetchProvinceList({
            })
        );
    }, [dispatch])

    useEffect(() => {
        async function fetchData() {
            const routes = await CommonApi.getListRoute(accountId);
            setListRoute(routes.data);
        }
        fetchData();
    }, [accountId])

    useEffect(() => {
        async function fetchData() {
            const revenueReport = await ReportApi.getRevenueReport({
                accountId: accountId ?? "",
                startPoint: startPoint,
                endPoint: endPoint,
                dateFrom: selectedDateFrom,
                dateTo: selectedDateTo,
                type: type
            });
            const frequencyReport = await ReportApi.getFrequencyReport({
                accountId: accountId ?? "",
                startPoint: startPoint2,
                endPoint: endPoint2,
                dateFrom: selectedDateFrom2,
                dateTo: selectedDateTo2,
            });
            setRevenueReport(revenueReport.data);
            setFrequencyReport(frequencyReport.data);
        }
        fetchData();
    }, [type])

    const [selectedDateFrom, setSelectedDateFrom] = React.useState<string | null>(null);
    const [selectedDateTo, setSelectedDateTo] = React.useState<string | null>(null);
    const [selectedDateFrom2, setSelectedDateFrom2] = React.useState<string | null>(null);
    const [selectedDateTo2, setSelectedDateTo2] = React.useState<string | null>(null);


    const handleDateChangeDateFrom = (date: string) => {
        setSelectedDateFrom(date);
    };

    const handleDateChangeDateTo = (date: string) => {
        setSelectedDateTo(date);
    };

    const handleDateChangeDateFrom2 = (date: string) => {
        setSelectedDateFrom2(date);
    };

    const handleDateChangeDateTo2 = (date: string) => {
        setSelectedDateTo2(date);
    };

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    const handleSearchRevenue = () => {
        async function fetchData() {
            const revenueReport = await ReportApi.getRevenueReport({
                accountId: accountId ?? "",
                startPoint: startPoint,
                endPoint: endPoint,
                dateFrom: selectedDateFrom,
                dateTo: selectedDateTo,
                type: type
            });
            setRevenueReport(revenueReport.data);
        }
        fetchData();
    }

    return (
        <Box>
            <Typography variant="h6">
                BÁO CÁO
            </Typography>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Báo cáo doanh thu" {...a11yProps(0)} />
                    <Tab label="Báo cáo tần suất" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
                className={styles.tabConatiner}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <Box className={styles.contentHeader}>
                        <Grid container className={styles.filterContainer}>
                            <Grid className={styles.leftFilterContainer}>
                                <Grid item className={styles.filterItem} container alignItems="center" justifyContent="space-between">
                                    <Typography className={styles.labelFilter}>Điểm đi</Typography>
                                    <Autocomplete
                                        id="start-point"
                                        options={options.sort((a: any, b: any) => -b.provinceCode.localeCompare(a.provinceCode))}
                                        groupBy={(option: any) => option.groupBy}
                                        style={{ width: 300 }}
                                        size="small"
                                        getOptionLabel={(option) => option.districtName}
                                        onChange={(event, value) => setStartPoint(value == null ? "" : value.districtCode)}
                                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                                    />
                                </Grid>
                                <Grid item className={styles.filterItem} container alignItems="center" justifyContent="space-between">
                                    <Typography className={styles.labelFilter}>Từ ngày</Typography>
                                    <TextField
                                        id="date"
                                        type="date"
                                        variant="outlined"
                                        size="small"
                                        style={{ width: 300 }}
                                        onChange={(e) => handleDateChangeDateFrom(e.target.value)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid className={styles.rightFilterContainer}>
                                <Grid item className={styles.filterItem} container alignItems="center" justifyContent="space-between">
                                    <Typography className={styles.labelFilter}>Điểm đến</Typography>
                                    <Autocomplete
                                        id="end-point"
                                        style={{ width: 300 }}
                                        size="small"
                                        options={options.sort((a: any, b: any) => -b.provinceCode.localeCompare(a.provinceCode))}
                                        groupBy={(option: any) => option.groupBy}
                                        getOptionLabel={(option: any) => option.districtName}
                                        onChange={(event, value) => setEndPoint(value == null ? "" : value.districtCode)}
                                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                                    />
                                </Grid>
                                <Grid item className={styles.filterItem} container alignItems="center" justifyContent="space-between">
                                    <Typography className={styles.labelFilter}>Đến ngày</Typography>
                                    <TextField
                                        id="date"
                                        type="date"
                                        variant="outlined"
                                        size="small"
                                        style={{ width: 300 }}
                                        onChange={(e) => handleDateChangeDateTo(e.target.value)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Box className={styles.btnFilterContainer}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                className={styles.btnFilter}
                                startIcon={<SearchOutlined />}
                                onClick={handleSearchRevenue}
                            >
                                Tra cứu
                            </Button>
                        </Box>
                    </Box>
                    <Paper className={styles.reportContent}>
                        <Grid item className={styles.filterChartItem} container alignItems="center" justifyContent="flex-end">
                            <Typography className={styles.labelFilter}>Lọc</Typography>
                            <Autocomplete
                                id="type"
                                options={types}
                                //groupBy={(option: any) => option.groupBy}
                                style={{ width: 150 }}
                                size="small"
                                defaultValue={type}
                                //getOptionLabel={(option) => option.districtName}
                                onChange={(event, value) => setType(value ?? "")}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                        </Grid>
                        <Box>
                            <Typography variant="h6" className={styles.reportLabel}>Thống kê doanh thu theo ngày đi</Typography>
                            <LineChart data={revenueReport.map(item => ({
                                label: item.label,
                                value: item.value
                            }))} />
                        </Box>
                    </Paper>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <Box className={styles.contentHeader}>
                        <Grid container className={styles.filterContainer}>
                            <Grid className={styles.leftFilterContainer}>
                                <Grid item className={styles.filterItem} container alignItems="center" justifyContent="space-between">
                                    <Typography className={styles.labelFilter}>Điểm đi</Typography>
                                    <Autocomplete
                                        id="start-point"
                                        options={options.sort((a: any, b: any) => -b.provinceCode.localeCompare(a.provinceCode))}
                                        groupBy={(option: any) => option.groupBy}
                                        style={{ width: 300 }}
                                        size="small"
                                        getOptionLabel={(option: any) => option.districtName}
                                        onChange={(event, value) => setStartPoint2(value == null ? "" : value.districtCode)}
                                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                                    />
                                </Grid>
                                <Grid item className={styles.filterItem} container alignItems="center" justifyContent="space-between">
                                    <Typography className={styles.labelFilter}>Từ ngày</Typography>
                                    <TextField
                                        id="date"
                                        type="date"
                                        variant="outlined"
                                        size="small"
                                        style={{ width: 300 }}
                                        onChange={(e) => handleDateChangeDateFrom2(e.target.value)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid className={styles.rightFilterContainer}>
                                <Grid item className={styles.filterItem} container alignItems="center" justifyContent="space-between">
                                    <Typography className={styles.labelFilter}>Điểm đến</Typography>
                                    <Autocomplete
                                        id="end-point"
                                        style={{ width: 300 }}
                                        size="small"
                                        options={options.sort((a: any, b: any) => -b.provinceCode.localeCompare(a.provinceCode))}
                                        groupBy={(option: any) => option.groupBy}
                                        getOptionLabel={(option: any) => option.districtName}
                                        onChange={(event, value) => setEndPoint2(value == null ? "" : value.districtCode)}
                                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                                    />
                                </Grid>
                                <Grid item className={styles.filterItem} container alignItems="center" justifyContent="space-between">
                                    <Typography className={styles.labelFilter}>Đến ngày</Typography>
                                    <TextField
                                        id="date"
                                        type="date"
                                        variant="outlined"
                                        size="small"
                                        style={{ width: 300 }}
                                        onChange={(e) => handleDateChangeDateTo2(e.target.value)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Box className={styles.btnFilterContainer}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                className={styles.btnFilter}
                                startIcon={<SearchOutlined />}
                            >
                                Tra cứu
                            </Button>
                        </Box>
                    </Box>
                    <Paper className="p-3">
                        <Typography variant="h6" className={styles.reportLabel}>Thống kê số chuyến đi theo tuyến</Typography>
                        <BarChart data={frequencyReport.map(item => ({
                            label: item.label,
                            value: item.value
                        }))} />
                    </Paper>
                </TabPanel>
            </SwipeableViews>
        </Box>
    );
}