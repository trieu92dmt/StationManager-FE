import { Avatar, Box, Grid, Link, List, ListItem, Typography } from "@material-ui/core";
import { FaFacebook, FaGithub, FaInstagram, FaTwitch, FaTwitterSquare, FaYoutube } from "react-icons/fa";
import styles from './Footer.module.css'

export default function UserFooter(){
    return(
        <Box className={styles.footerWrapper}>
            <Grid container className={styles.itemContainer}>
                <Grid item className={styles.footerItem}>
                    <Typography variant="h4">
                        Station Manager
                    </Typography>
                    <Typography>
                        Hệ thống quản lý nhà xe và hỗ trợ đặt vé tạo nền tảng cho các đối tác nhà xe
                        quản lý, vận hành hệ thống dễ dàng đồng thời cung cấp công cụ hỗ trợ người dùng
                        đặt vé. Hệ thống cũng là nền tảng kết nối giữa đối tác nhà xe và người dùng thông
                        qua môi trường internet.
                    </Typography>
                </Grid>
                <Grid item className={styles.footerItem}>
                    <Typography variant="h5">
                        Về chúng tôi
                    </Typography>
                    <List>
                        <ListItem className={styles.listItem}>
                            <Link href="#">
                                Danh sách bến xe
                            </Link>
                        </ListItem>
                        <ListItem className={styles.listItem}>
                            <Link href="#">
                                Danh sách nhà xe
                            </Link>
                        </ListItem>
                        <ListItem className={styles.listItem}>
                            <Link href="#">
                                Tin tức
                            </Link>
                        </ListItem>
                        <ListItem className={styles.listItem}>
                            <Link href="#">
                                Hướng dẫn sử dụng
                            </Link>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item className={styles.footerItem}>
                    <Typography  variant="h5">
                        Đối tác
                    </Typography>
                </Grid>
                <Grid item className={styles.footerItem}>
                    <Typography  variant="h5">
                        Liên hệ
                    </Typography>
                    <List>
                        <ListItem className={styles.listItem}>
                            Địa chỉ: 16 đường 13, phường Bình Hưng Hòa, quận Bình Tân
                        </ListItem>
                        <ListItem className={styles.listItem}>
                            Số điện thoại: 0948513923
                        </ListItem>
                        <ListItem className={styles.listItem}>
                            Email: trieu251101@gmail.com
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
            <hr></hr>
            <Box className={styles.social}>
                <Avatar className={styles.socialItem}>
                    <FaGithub className={styles.github}/>
                </Avatar>
                <Avatar className={styles.socialItem}>
                    <FaFacebook className={styles.facebook}/>
                </Avatar>
                <Avatar className={styles.socialItem}>
                    <FaInstagram className={styles.instagram}/>
                </Avatar>
                <Avatar className={styles.socialItem}>
                    <FaYoutube  className={styles.youtube}/>
                </Avatar>
                <Avatar className={styles.socialItem}>
                    <FaTwitterSquare className={styles.twitter}/>
                </Avatar>
                <Avatar className={styles.socialItem}>
                    <FaTwitch  className={styles.twitch}/>
                </Avatar>
            </Box>
            <Typography className={styles.copyright}>
                Copyright 2023 by Dang Minh Trieu
            </Typography>
        </Box>
    );
}