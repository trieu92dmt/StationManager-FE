import { Box, makeStyles, Paper, Grid, ButtonBase, Typography, Link, List, ListItemAvatar, Avatar, ListItemText, ListItem, Button } from "@material-ui/core";
import { MdOutlineCheckCircle } from "react-icons/md";
import { FaPeopleArrows } from "react-icons/fa";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from './Section.module.css'
import animates from './Animate.module.css'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
    },

    primaryColor: {
        color: 'rgb(76 175 80)',
    },

    bannerContainer: {
        height: 'inherit',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
    },

    cusbutton: {
        backgroundColor: 'rgb(76 175 80)',
        color: '#FFF',
        width: 'fit-content',
        display: 'block',
        marginTop: '12px',
        marginBottom: '12px',
        margin: 'auto'
    },

    label: {
        textAlign: 'center',
    },

    box: {
        padding: theme.spacing(3),
    },

    avatar: {
        margin: '1',
        backgroundColor: 'rgb(76 175 80)',
    },

    paperRouteList: {
        boxShadow: '0 0 2px',
        borderRadius: '5px',
        margin: '10px',
        maxWidth: 500,
        height: '100%'
    },

    imageRouteList: {
        padding: 0,
        margin: 0,
        width: '100%',
        height: 200,
    },

    imgRouteList: {
        width: '100%',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },

    RouteItem: {
    },

    routeItemContent: {
        textAlign: 'center',
        fontSize: '20px',
        color: '#fff',
        backgroundColor: '#1976d2',
        padding: '20px 20px 40px'
    },

    newsItemContent: {
        fontSize: '16px',
        padding: '20px 20px'
    },

    seeAll: {
        textAlign: 'right',
        marginRight: '10px'
    },

    banner: {

    },

    imgBannerWrapper: {
        width: '100%',
        height: '100%'
    }

}));

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};


export function SectionLayout() {
    const classes = useStyles();

    return (
        <Box>
            <Box className={styles.componentContainer}>
                <Typography variant="h5" className={styles.labelSection}>
                    Danh sách các tuyến xe
                </Typography>
                <Carousel
                    responsive={responsive}
                >
                    <div>
                        <Paper className={classes.paperRouteList}>
                            <Grid
                                container
                                className={classes.RouteItem}
                                direction={'column'}
                            >
                                <Grid item>
                                    <ButtonBase className={classes.imageRouteList}>
                                        <img className={classes.imgRouteList} alt="complex" src="https://bazantravel.com/cdn/medias/uploads/23/23335-716-bazan-travel-600x388.jpg" />
                                    </ButtonBase>
                                </Grid>
                                <Grid item className={classes.routeItemContent}>
                                    Sài Gòn - Phan Thiết
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
                    <div>
                        <Paper className={classes.paperRouteList}>
                            <Grid
                                container
                                className={classes.RouteItem}
                                direction={'column'}
                            >
                                <Grid item>
                                    <ButtonBase className={classes.imageRouteList}>
                                        <img className={classes.imgRouteList} alt="complex" src="https://khoinguonsangtao.vn/wp-content/uploads/2022/11/hinh-anh-nha-trang.jpg" />
                                    </ButtonBase>
                                </Grid>
                                <Grid item className={classes.routeItemContent}>
                                    Sài Gòn - Nha Trang
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
                    <div>
                        <Paper className={classes.paperRouteList}>
                            <Grid
                                container
                                className={classes.RouteItem}
                                direction={'column'}
                            >
                                <Grid item>
                                    <ButtonBase className={classes.imageRouteList}>
                                        <img className={classes.imgRouteList} alt="complex" src="https://www.flynow.vn/blog/wp-content/uploads/2017/01/3-1.jpg" />
                                    </ButtonBase>
                                </Grid>
                                <Grid item className={classes.routeItemContent}>
                                    Sài Gòn - Đà lạt
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
                    <div>
                        <Paper className={classes.paperRouteList}>
                            <Grid
                                container
                                direction={'column'}
                                className={classes.RouteItem}
                            >
                                <Grid item>
                                    <ButtonBase className={classes.imageRouteList}>
                                        <img className={classes.imgRouteList} alt="complex" src="https://datviettour.com.vn/uploads/images/tin-tuc/cam-nang-du-lich/du-lich-vung-tau/du-lich-vung-tau-1.jpg" />
                                    </ButtonBase>
                                </Grid>
                                <Grid item className={classes.routeItemContent}>
                                    Sài Gòn - Vũng Tàu
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
                    <div>
                        <Paper className={classes.paperRouteList}>
                            <Grid
                                container
                                className={classes.RouteItem}
                                direction={'column'}
                            >
                                <Grid item>
                                    <ButtonBase className={classes.imageRouteList}>
                                        <img className={classes.imgRouteList} alt="complex" src="https://allimages.sgp1.digitaloceanspaces.com/photographereduvn/2022/04/300-Hinh-anh-SAI-GON-dep-ruc-ro-trang-le.jpg" />
                                    </ButtonBase>
                                </Grid>
                                <Grid item className={classes.routeItemContent}>
                                    Phan Thiết - Sài Gòn
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
                    <div>
                        <Paper className={classes.paperRouteList}>
                            <Grid
                                container
                                className={classes.RouteItem}
                                direction={'column'}
                            >
                                <Grid item>
                                    <ButtonBase className={classes.imageRouteList}>
                                        <img className={classes.imgRouteList} alt="complex" src="https://thulehotel.com.vn/wp-content/uploads/2020/09/3.jpg" />
                                    </ButtonBase>
                                </Grid>
                                <Grid item className={classes.routeItemContent}>
                                    Sài Gòn - Đồng Tháp
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
                </Carousel>
                <Typography className={classes.seeAll}>
                    <Link href="#">
                    Xem tất cả
                    </Link>
                </Typography>
            </Box>
            <Box className={styles.banner1}>
                <Box className={styles.componentContainer}>
                        <Grid container className={styles.lContentBanner}>
                            <Grid item xs={12} sm={5} spacing={10}>
                                <Typography variant="h5" className={styles.labelSection}>
                                    Cung cấp giải pháp quản lý nhà xe
                                </Typography>
                                <Box>
                                    <List>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar className={styles.check}>
                                                    <MdOutlineCheckCircle />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Cung cấp công cụ quản lý" 
                                                          secondary="Cung cấp các công cụ quản lý cơ bản cho nhà xe như
                                                          quản lý xe, quản lý chuyến, quản lý vé,..." />
                                        </ListItem>
                                    </List>
                                    <List>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar className={styles.check}>
                                                    <MdOutlineCheckCircle />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Nhiều gói đăng ký" 
                                                          secondary="Hệ thống có nhiều gói đăng ký phục vụ nhiều nhu cầu
                                                          từ các đối tác nhà xe" />
                                        </ListItem>
                                    </List>
                                    <List>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar className={styles.check}>
                                                    <MdOutlineCheckCircle />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Hỗ trợ 24/7" 
                                                          secondary="Hệ thống giải đáp mọi thắc mắc của đối tác trước và sau
                                                          khi trở thành đối tác" />
                                        </ListItem>
                                    </List>
                                </Box>
                            </Grid>
                            <Grid item  xs={12} sm={6} spacing={10} className={classes.imgBannerWrapper}>
                                <img width={'100%'} height={'100%'} alt="complex" src="https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                            </Grid>
                        </Grid>
                </Box>
            </Box>
            <Box className={styles.componentContainer}>
                <Typography variant="h5" className={styles.labelSection}>
                    Tin tức mới nhất
                </Typography>
                <Carousel
                    responsive={responsive}
                >
                    <div className={styles.newsContainer}>
                        <Paper className={classes.paperRouteList}>
                            <Grid
                                container
                                className={classes.RouteItem}
                                direction={'column'}
                            >
                                <Grid item>
                                    <ButtonBase className={classes.imageRouteList}>
                                        <img className={classes.imgRouteList} alt="complex" src="https://images2.thanhnien.vn/Uploaded/khanhtd/2022_10_09/d913c1cf13c4d49a8dd515-3329.jpg" />
                                    </ButtonBase>
                                </Grid>
                                <Grid item className={classes.newsItemContent}>
                                Bến xe Miền Đông mới vừa được đưa vào khai thác từ ngày 10/10.
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
                    <div className={styles.newsContainer}>
                        <Paper className={classes.paperRouteList}>
                            <Grid
                                container
                                className={classes.RouteItem}
                                direction={'column'}
                            >
                                <Grid item>
                                    <ButtonBase className={classes.imageRouteList}>
                                        <img className={classes.imgRouteList} alt="complex" src="https://cdnthumb.baotintuc.vn/ha_w/260/https@@$$media.baotintuc.vn/Upload/c2tvplmdloSDblsn03qN2Q/files/2019/09/10/ben-xe-krong-no_.jpg" />
                                    </ButtonBase>
                                </Grid>
                                <Grid item className={classes.newsItemContent}>
                                Thu hồi hơn 2,3 tỷ đồng chi sai tại dự án bến xe huyện Krông Nô, Đắk Nông
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
                    <div className={styles.newsContainer}>
                        <Paper className={classes.paperRouteList}>
                            <Grid
                                container
                                className={classes.RouteItem}
                                direction={'column'}
                            >
                                <Grid item>
                                    <ButtonBase className={classes.imageRouteList}>
                                        <img className={classes.imgRouteList} alt="complex" src="https://cdnthumb.baotintuc.vn/ha_w/260/https@@$$media.baotintuc.vn/Upload/3qVxwVtNEPp6Wp9kkF77g/files/2022/01/30/can-tho-300122.jpg" />
                                    </ButtonBase>
                                </Grid>
                                <Grid item className={classes.newsItemContent}>
                                Bến xe Cần Thơ đìu hiu ngày 28 Tết
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
                    <div>
                        <Paper className={classes.paperRouteList}>
                            <Grid
                                container
                                direction={'column'}
                                className={classes.RouteItem}
                            >
                                <Grid item>
                                    <ButtonBase className={classes.imageRouteList}>
                                        <img className={classes.imgRouteList} alt="complex" src="https://cdnthumb.baotintuc.vn/ha_w/260/https@@$$media.baotintuc.vn/Upload/pTMF1jgWpbjY1m8G1xWUsg/files/2021/12/ve%20que%202022/que2.jpg" />
                                    </ButtonBase>
                                </Grid>
                                <Grid item className={classes.newsItemContent}>
                                Lượng hành khách đi lại dịp Tết giảm sâu
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
                    <div className={styles.newsContainer}>
                        <Paper className={classes.paperRouteList}>
                            <Grid
                                container
                                className={classes.RouteItem}
                                direction={'column'}
                            >
                                <Grid item>
                                    <ButtonBase className={classes.imageRouteList}>
                                        <img className={classes.imgRouteList} alt="complex" src="https://cdnthumb.baotintuc.vn/ha_w/260/https@@$$media.baotintuc.vn/Upload/CCcQv1fjdlI5Hob1jh0mA/files/2021/10/23/xekhach/xekhach.jpg" />
                                    </ButtonBase>
                                </Grid>
                                <Grid item className={classes.newsItemContent}>
                                Bến xe khách đìu hiu, nhà xe càng chạy càng lỗ
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
                    <div className={styles.newsContainer}>
                        <Paper className={classes.paperRouteList}>
                            <Grid
                                container
                                className={classes.RouteItem}
                                direction={'column'}
                            >
                                <Grid item>
                                    <ButtonBase className={classes.imageRouteList}>
                                        <img className={classes.imgRouteList} alt="complex" src="https://source.unsplash.com/random" />
                                    </ButtonBase>
                                </Grid>
                                <Grid item className={classes.newsItemContent}>
                                    Tin tức nóng hổi vừa thổi vừa ăn, vé xe giảm 50%
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
                </Carousel>
                <Typography className={classes.seeAll}>
                    <Link href="#">
                    Xem tất cả
                    </Link>
                </Typography>
            </Box>
            <Box className={styles.banner2}>
                <Box className={styles.componentContainer}>
                    <Grid container className={styles.rContentBanner}>
                        <Grid item  xs={12} sm={6} spacing={10} className={classes.imgBannerWrapper}>
                            <img width={'100%'} height={'100%'} alt="complex" src="https://images.pexels.com/photos/845451/pexels-photo-845451.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                        </Grid>
                        <Grid item xs={12} sm={5} spacing={10}>
                            <Typography variant="h5" className={styles.labelSection}>
                                Hỗ trợ người dùng tìm chuyến đặt vé
                            </Typography>
                            <Box>
                                    <List>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar className={styles.check}>
                                                    <MdOutlineCheckCircle />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText className={styles.textColorFFF}
                                                          primary="Cung cấp công cụ hỗ trợ tìm chuyến" 
                                                          secondary="Cung cấp các công cụ lọc dữ liệu theo nhu cầu người dùng,
                                                                     Giúp người dùng tìm được chuyến xe phù hợp" />
                                        </ListItem>
                                    </List>
                                    <List>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar className={styles.check}>
                                                    <MdOutlineCheckCircle />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText className={styles.textColorFFF}
                                                          primary="Hỗ trợ thanh toán online" 
                                                          secondary="Cung cấp nhiều phương thức thanh toán online, đa dạng
                                                          lựa chọn cho người dùng" />
                                        </ListItem>
                                    </List>
                                    <List>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar className={styles.check}>
                                                    <MdOutlineCheckCircle />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText className={styles.textColorFFF}
                                                          primary="Hỗ trợ 24/7" 
                                                          secondary="Hệ thống giải đáp mọi thắc mắc của người dùng khi sử dụng
                                                          hệ thống" />
                                        </ListItem>
                                    </List>
                                </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Box className={styles.componentContainer}>
                <hr className={styles.becomePartnerHr}></hr>
                <Box className={styles.becomePartner}>
                    <div className={animates.bg}></div>
                    <div className={animates.bg + ' '+ animates.bg2}></div>
                    <div className={animates.bg + ' '+ animates.bg3}></div>
                    <Typography variant="h4" className={styles.textColorFFF}>
                    Trở thành đối tác với chúng tôi
                    </Typography>
                    <Button className={styles.becomePartnerBtn} variant="contained" endIcon={<FaPeopleArrows />}>
                        Tham gia
                    </Button>
                </Box>
                <hr className={styles.becomePartnerHr}></hr>
            </Box>
            <Box className={styles.componentContainer}>
                <Typography variant="h5" className={styles.labelSection}>
                    Danh sách bến xe
                </Typography>
                <Carousel
                    responsive={responsive}
                >
                    <div>
                        <Paper className={classes.paperRouteList}>
                            <Grid
                                container
                                className={classes.RouteItem}
                                direction={'column'}
                            >
                                <Grid item>
                                    <ButtonBase className={classes.imageRouteList}>
                                        <img className={classes.imgRouteList} alt="complex" src="https://images2.thanhnien.vn/Uploaded/khanhtd/2022_10_09/d913c1cf13c4d49a8dd515-3329.jpg" />
                                    </ButtonBase>
                                </Grid>
                                <Grid item className={styles.stationName}>
                                Bến xe Miền Đông
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
                    <div>
                        <Paper className={classes.paperRouteList}>
                            <Grid
                                container
                                className={classes.RouteItem}
                                direction={'column'}
                            >
                                <Grid item>
                                    <ButtonBase className={classes.imageRouteList}>
                                        <img className={classes.imgRouteList} alt="complex" src="http://giadinh.mediacdn.vn/2021/2/2/img9269-1612278612815891123717.jpg" />
                                    </ButtonBase>
                                </Grid>
                                <Grid item className={styles.stationName}>
                                Bến xe Miền Tây
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
                    <div>
                        <Paper className={classes.paperRouteList}>
                            <Grid
                                container
                                className={classes.RouteItem}
                                direction={'column'}
                            >
                                <Grid item>
                                    <ButtonBase className={classes.imageRouteList}>
                                        <img className={classes.imgRouteList} alt="complex" src="https://lh3.googleusercontent.com/p/AF1QipMMG6fgabKWx8dEXp3opRCvRGrWq95zW6gxB1ot=s1360-w1360-h1020" />
                                    </ButtonBase>
                                </Grid>
                                <Grid item className={styles.stationName}>
                                Bến xe Bắc Phan Thiết
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
                    <div>
                        <Paper className={classes.paperRouteList}>
                            <Grid
                                container
                                direction={'column'}
                                className={classes.RouteItem}
                            >
                                <Grid item>
                                    <ButtonBase className={classes.imageRouteList}>
                                        <img className={classes.imgRouteList} alt="complex" src="https://lh3.googleusercontent.com/p/AF1QipMIcjuKyQgflJc055fqC3sDQnzH4I_lu4OqkVvj=s1360-w1360-h1020" />
                                    </ButtonBase>
                                </Grid>
                                <Grid item className={styles.stationName}>
                                Bến xe An Sương
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
                </Carousel>
                <Typography className={classes.seeAll}>
                    <Link href="#">
                    Xem tất cả
                    </Link>
                </Typography>
            </Box>
        </Box>
    )
}