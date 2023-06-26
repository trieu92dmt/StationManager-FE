import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, makeStyles } from '@material-ui/core';
import styles from './styles.module.css'
import UserHeader from 'components/UserCommon/Header';
import UserFooter from 'components/UserCommon/Footer';
import { useEffect, useState } from 'react';
import { CarCompanyItemResponse } from 'models/carCompany/carCompany';
import carCompanyApi from 'api/carCompanyApi';
import { StarRate } from '@material-ui/icons';
import { Pagination } from '@material-ui/lab';
import { baseURL } from 'utils';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row } from 'react-bootstrap';

const useStyles = makeStyles({
    media: {
        height: 140,
    },
});

export default function CarCompanyList() {
    const classes = useStyles();

    const [carCompanyList, setCarCompanyList] = useState<CarCompanyItemResponse[]>([]);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);

    useEffect(() => {
        async function fetchData() {
            const listCarCompany = await carCompanyApi.getListCarCompany(page);
            setCarCompanyList(listCarCompany.data)
            setPageCount(listCarCompany.pagesCount)
        }
        fetchData();
    }, [page])

    return (
        <Box>
            <Box>
                <UserHeader />
            </Box>
            <Box className={styles.bodyContainer}>
                <Box>
                    <Typography variant='h4' className={styles.pageTitle}>
                        Danh sách nhà xe
                    </Typography>
                </Box>
                <Box className={styles.listCarCompanyContainer}>
                    <Row>
                        {carCompanyList.map(item => {
                            return (
                                <Col md={4}>
                                    <Card className={styles.cardItem}>
                                        <CardActionArea>
                                            <CardMedia
                                                className={classes.media}
                                                image={item.image != null ? item.image : "https://carshop.vn/wp-content/uploads/2022/07/xe-vung-tau-bien-hoa-dong-nai-5.jpg"}
                                                title="CarCompanyItem"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    <a href={baseURL + '/car-company-detail/' + item.carCompanyId} className={styles.carCompanyName}>Nhà xe {item.carCompanyName}</a>
                                                </Typography>
                                                <Box className={styles.cardItemContent}>
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        {item.description}
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Box className={styles.CardBottom}>
                                                <Box>
                                                    <p className='m-0'>
                                                        Số điện thoại: {item.phoneNumber}
                                                    </p>
                                                </Box>
                                                <Box className={styles.ratePoint}>
                                                    <StarRate className={styles.rateStar} />
                                                    <p>{item.rate}</p>
                                                    <p>({item.rateCount})</p>
                                                </Box>
                                            </Box>
                                        </CardActions>
                                    </Card>
                                </Col>
                            );
                        })}
                    </Row>
                </Box>
                <Pagination
                    count={pageCount}
                    page={page}
                    className={styles.pagination}
                    onChange={(event, value) => setPage(value)}
                    variant="outlined"
                    color="primary"
                />
            </Box>
            <Box>
                <UserFooter />
            </Box>
        </Box>
    );
}