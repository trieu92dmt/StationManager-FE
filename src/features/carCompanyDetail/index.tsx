import { Avatar, Box, Button, Card, CardContent, Grid, ListItem, ListItemIcon, Typography } from "@material-ui/core";
import carCompanyApi from "api/carCompanyApi";
import UserFooter from "components/UserCommon/Footer";
import UserHeader from "components/UserCommon/Header";
import { DetailCarCompanyByUserSideResponse, DetailCarCompanyResponse } from "models/carCompany/detailCarCompany";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from './styles.module.css';
import { StarOutline, StarRate } from "@material-ui/icons";
import { baseURL } from "utils";
import { Alert, AlertTitle, Rating } from "@material-ui/lab";
import RatingApi from "api/ratingApi";
import { toast } from "react-toastify";
import moment from "moment";
import 'moment/locale/vi';
import { ApiSuccessResponse } from "models";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ImStarFull } from "react-icons/im";

interface CarCompanyRequestParams {
    companyId: string;
}

export default function CarCompanyDetail() {
    const accountId = localStorage.getItem('accountId');
    const role = localStorage.getItem('userRole');

    const params = useParams<CarCompanyRequestParams>();
    const { companyId } = params;

    moment.locale('vi');

    const [carCompanyDetail, setCarCompanyDetail] = useState<DetailCarCompanyByUserSideResponse>();
    const [checkRatePermission, setRatePermission] = useState<ApiSuccessResponse<boolean>>();

    useEffect(() => {
        async function fetchData() {
            const carCompany = await carCompanyApi.getDetailByUserSide(companyId);
            const checkRatePermission = await RatingApi.checkRatePermission(accountId, companyId);
            setCarCompanyDetail(carCompany.data)
            setRatePermission(checkRatePermission)
        }
        fetchData();
        console.log(checkRatePermission);
    }, [])

    const [comment, setComment] = useState('');
    const [ratePoint, setRatePoint] = useState(5);

    const handleCommentChange = (event: any) => {
        setComment(event.target.value);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        // Reset trạng thái của input
        setComment('');
        setRatePoint(5);

        const response = await RatingApi.createRating({
            senderId: accountId,
            carCompanyId: carCompanyDetail !== undefined ? carCompanyDetail.carCompanyId : null,
            content: comment,
            rate: ratePoint
        });

        if (response.data === true) {
            // Toast success
            toast.success('Thêm đánh giá thành công !', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1500,
            });
            setTimeout(function () {
                window.location.reload();
            }, 1500); // Chờ 3 giây trước khi reload
        }
        else {
            toast.error('Đã có lỗi xảy ra !', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
        }
    };


    return (
        <Box>
            <Box>
                <UserHeader />
            </Box>
            <Box className={styles.bodyContainer}>
                <Box>
                    <div className="container">
                        <div className={styles.mainBody}>
                            <Grid className={styles.mainGrid} container spacing={5} justifyContent="space-between">
                                <Grid item container className={styles.lGrid}>
                                    <Card variant="outlined" className={styles.avatarGrid + '' + styles.cardBody}>
                                        <CardContent>
                                            <Box className={styles.avatarContainer}>
                                                <Avatar src={carCompanyDetail?.image} alt="Admin" className={styles.avatarStyle} />
                                                <div className="mt-3">
                                                    <Typography variant="h5">Nhà Xe {carCompanyDetail?.carCompanyName}</Typography>
                                                    <div className="d-flex justify-content-between align-items-center p-3">
                                                        <label className="d-block">Đánh giá: </label>
                                                        <p className={styles.starRate}><ImStarFull className={styles.starIcon} />{carCompanyDetail?.rate} ({carCompanyDetail?.rateCount})</p>
                                                    </div>
                                                </div>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                    <Card variant="outlined" className={styles.socialCard}>
                                        <CardContent className={styles.socialCardContent}>
                                            <ListItem className={styles.listSocial}>
                                                {carCompanyDetail?.socialMediaResponses.map((item) => (
                                                    <ListItemIcon className={styles.listItemSocial}>
                                                        <h6 className={styles.listItemSocialLeft}>
                                                            {/* <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-globe mr-2 icon-inline"><circle cx={12} cy={12} r={10} /><line x1={2} y1={12} x2={22} y2={12} /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg> */}
                                                            <Typography variant="h6" className={styles.listItemSocialTitle}>{item.socialMediaName}</Typography>
                                                        </h6>
                                                        <span className="text-secondary">{item.link !== "null" ? item.link : "Chưa có"}</span>
                                                    </ListItemIcon>
                                                ))}
                                            </ListItem>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item container className={styles.rGrid}>
                                    <Card variant="outlined">
                                        <CardContent className={styles.infoContainer}>
                                            <Grid container justifyContent="space-between">
                                                <Typography variant="h6" className={styles.basicInfoLabel}>
                                                    Thông tin cơ bản nhà xe
                                                </Typography>
                                                <div>

                                                </div>
                                            </Grid>
                                            <Grid container className={styles.infoItem}>
                                                <Grid item sm={3}>
                                                    <Typography variant="subtitle2">Tên nhà xe</Typography>
                                                </Grid>
                                                <Grid item sm={9} container alignItems="center">
                                                    Nhà xe {carCompanyDetail?.carCompanyName}
                                                </Grid>
                                            </Grid>
                                            <hr />
                                            <Grid container className={styles.infoItem}>
                                                <Grid item sm={3}>
                                                    <Typography variant="subtitle2">Email</Typography>
                                                </Grid>
                                                <Grid item sm={9} container alignItems="center">
                                                    {carCompanyDetail?.email}
                                                </Grid>
                                            </Grid>
                                            <hr />
                                            <Grid container className={styles.infoItem}>
                                                <Grid item sm={3}>
                                                    <Typography variant="subtitle2">Hotline</Typography>
                                                </Grid>
                                                <Grid item sm={9} container alignItems="center">
                                                    {carCompanyDetail?.hotline}
                                                </Grid>
                                            </Grid>
                                            <hr />
                                            <Grid container className={styles.infoItem}>
                                                <Grid item sm={3}>
                                                    <Typography variant="subtitle2">Số điện thoại</Typography>
                                                </Grid>
                                                <Grid item sm={9} container alignItems="center">
                                                    {carCompanyDetail?.phoneNumber}
                                                </Grid>
                                            </Grid>
                                            <hr />
                                            <Grid container className={styles.infoItem}>
                                                <Grid item sm={3}>
                                                    <Typography variant="subtitle2">Địa chỉ văn phòng</Typography>
                                                </Grid>
                                                <Grid item sm={9} container alignItems="center">
                                                    {carCompanyDetail?.officeAddress}
                                                </Grid>
                                            </Grid>
                                            <hr />
                                            <Grid container className={styles.infoItem}>
                                                <Grid item sm={3}>
                                                    <Typography variant="subtitle2">Mô tả</Typography>
                                                </Grid>
                                                <Grid item sm={9} container alignItems="center">
                                                    {carCompanyDetail?.description}
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                    <Card variant="outlined" className={styles.rateContainer}>
                                        <CardContent className={styles.infoContainer}>
                                            <Grid container justifyContent="space-between" alignItems="center">
                                                <Typography variant="h6" className={styles.basicInfoLabel}>
                                                    Đánh giá
                                                </Typography>
                                                <div className="d-flex align-items-center">
                                                    <span>{carCompanyDetail?.rate}</span>
                                                    <ImStarFull className={styles.starIcon} />
                                                    <span>/ {carCompanyDetail?.rateCount} lượt đánh giá</span>
                                                </div>
                                            </Grid>
                                            <Box>
                                                {checkRatePermission?.isSuccess === true ?
                                                    (<form onSubmit={handleSubmit}>
                                                        <div className={styles.topRatingForm}>
                                                            <label>Viết nhận xét:</label>
                                                            <Box>
                                                                <Box className={styles.ratingOpt}>
                                                                    <Rating
                                                                        name="text-feedback"
                                                                        value={ratePoint}
                                                                        precision={0.5}
                                                                        onChange={(event, newValue) => {
                                                                            setRatePoint(newValue ?? 0);
                                                                        }}
                                                                        emptyIcon={<StarOutline style={{ opacity: 0.55 }} fontSize="inherit" />}
                                                                    />
                                                                </Box>
                                                            </Box>
                                                        </div>
                                                        <div>
                                                            <textarea className={styles.commentInput} value={comment} onChange={handleCommentChange} placeholder="hãy viết đánh giá..."></textarea>
                                                        </div>
                                                        <Button className={styles.sendBtn} onClick={handleSubmit}>Gửi</Button>
                                                    </form>) : (<Alert severity="info" className="my-3">
                                                        <AlertTitle>Thông báo!</AlertTitle>
                                                        <strong>{checkRatePermission?.message}</strong>
                                                    </Alert>)
                                                }
                                                <div className="my-3">
                                                    <h6>Bình luận:</h6>
                                                    {carCompanyDetail !== undefined && carCompanyDetail?.ratingList.length > 0 ?
                                                        carCompanyDetail?.ratingList.map((rate, index) => (
                                                            <div key={index} className={styles.commentItem}>
                                                                <Box className={styles.userAvatarWrapper}>
                                                                    <Avatar alt="image" className={styles.userImage} />
                                                                </Box>
                                                                <Box className={styles.commentContent}>
                                                                    <Box className={styles.topCommentContent}>
                                                                        <Box className={`${styles.username} d-flex align-items-center`}>{rate.senderName} | {rate.rate}
                                                                            <ImStarFull className={styles.starIcon} />
                                                                        </Box>
                                                                        <Box className={styles.timeComment}>{moment(rate.createTime).fromNow()}</Box>
                                                                    </Box>
                                                                    <Box className={styles.mainCommentContent}>
                                                                        {rate.content}
                                                                    </Box>
                                                                </Box>
                                                            </div>
                                                        )) : <Alert severity="info" className="my-3">
                                                            <AlertTitle>Thông báo!</AlertTitle>
                                                            <strong>Chưa có bình luận!</strong>
                                                        </Alert>}
                                                </div>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </div>
                    </div>

                </Box>
            </Box>
            <Box>
                <UserFooter />
            </Box>
        </Box>
    );
}