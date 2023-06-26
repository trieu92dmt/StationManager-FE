import { Box, Button, FormControl, Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import styles from './HomepageFilter.module.css'
import React, { useEffect } from 'react'
import { Autocomplete } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import provinceApi from "api/provinceApi";
import { CommonResponse4 } from "models";
import moment from "moment";


// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' }
// ]

export function HomepageFilterLayout() {
  //const provinceList = useAppSelector(selectProvinceList);

  const [selectedDate, setSelectedDate] = React.useState(moment().format('YYYY-MM-DD'));
  const [listProvinceSP, setListProvinceSP] = React.useState<CommonResponse4[]>([]);
  const [listProvinceEP, setListProvinceEP] = React.useState<CommonResponse4[]>([]);


  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    console.log(selectedDate)
  };

  const getDatatProvince = async (key = '', isFirst = true) => {
    const listProvince = await provinceApi.getListProvince(key);
    if (listProvince && listProvince.data && listProvince.data.length > 0 && isFirst) {
      setListProvinceEP(listProvince.data);
      setEndPoint(listProvince.data[1]);
    }
    else setListProvinceEP(listProvince.data);
  }

  const getDatatProvinceSP = async (key = '', isFirst = true) => {
    const listProvinceSP = await provinceApi.getListProvince(key);
    if (listProvinceSP && listProvinceSP.data && listProvinceSP.data.length > 0 && isFirst) {
      setListProvinceSP(listProvinceSP.data)
      setStartPoint(listProvinceSP.data[0])
    }
    else setListProvinceSP(listProvinceSP.data)
  }

  useEffect(() => {
    getDatatProvince()
    getDatatProvinceSP()
  }, [])

  const [startPoint, setStartPoint] = React.useState<CommonResponse4 | null>(null);
  const [endPoint, setEndPoint] = React.useState<CommonResponse4 | null>(null);

  const [openSearchResultPage, setOpenSearchResultPage] = React.useState(false);
  const history = useHistory();

  const handleSearch = () => {
    // async function fetchData() {
    //   const route = await TripApi.searchTrip({
    //     paging: {
    //       pageSize: 10,
    //       pageIndex: 1,
    //       orderBy: '',
    //       orderByDesc: '',
    //     },
    //     endPoint: endPoint,
    //     startPoint: startPoint,
    //     startDate: selectedDate,
    //     priceFrom: 0,
    //     priceTo: 0,
    //     emptySeat: 0,
    //     isFirstRow: false,
    //     isMiddleRow: false,
    //     isLastRow: false,
    //     ratePointFrom: 0,
    //     listCarCompany: []
    //   });
    // }
    // fetchData();

    setOpenSearchResultPage(true);
    const url = `/search-result?startPoint=${startPoint?.key}&endPoint=${endPoint?.key}&startDate=${selectedDate}`;
    history.push(url);
  }

  return (
    <Box>
      <Grid
        container
        className={styles.banner}
      >
        <Grid
          container
          item
          direction={"column"}
          justify={'center'}
          alignItems={'center'}
        >
          <Typography variant="h3" component="h2" className={styles.title}>
            Hỗ trợ và kết nối người dùng và đối tác nhà xe
          </Typography>
          <Grid
            className={styles.filterContainer}
            container
            spacing={2}
            alignItems={'center'}
            justify={'center'}
          >
            <Grid item className={styles.textFieldInput}>
              <label className={styles.inputLabelCustom}>Nơi đi</label>
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
            <Grid item className={styles.textFieldInput}>
              <label className={styles.inputLabelCustom}>Nơi đến</label>
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
                  <label className={styles.inputLabelCustom}>Ngày đi</label>
                  <input
                    type="Date"
                    className={`border-0 ${styles.inputDateCustom}`}
                    onChange={(e) => handleDateChange(e.target.value)}
                    value={selectedDate}
                    min={moment().format('YYYY-MM-DD')}
                  >
                  </input>
                </div>
              </FormControl>
            </Grid>
            <Grid item>
              <Button variant="outlined" className={styles.btnFilter} onClick={handleSearch}>
                Tìm chuyến
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

    </Box>
  );
}

