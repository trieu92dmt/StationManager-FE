import { Backdrop, Box, Button, Card, CardActions, CardContent, CardHeader, CircularProgress, Container, createStyles, CssBaseline, Fade, Grid, Input, makeStyles, Modal, TextareaAutosize, Theme, Typography } from "@material-ui/core";
import { ShoppingCartOutlined, StarOutline } from "@material-ui/icons";
import UserFooter from "components/UserCommon/Footer";
import UserHeader from "components/UserCommon/Header";
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import React, { useEffect, useState } from "react";
import styles from './Pricing.module.css'
import { PackageResponse } from "models/package";
import packageApi from "api/packageApi";
import { number } from "yup";
import transactionApi from "api/transactionApi";
import carCompanyApi, { addCarCompany } from "api/carCompanyApi";
import { Col, Row } from "react-bootstrap";
// import { CKEditor } from "@ckeditor/ckeditor5-react";

const ariaLabel = { 'aria-label': 'description' };

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: '60%',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền overlay
      zIndex: 9999, // Z-index để đảm bảo hiển thị trên các thành phần khác
    },
  }),
);

export interface PackageProp {
  key: string,
  title: string,
  price: string
}

const LoadingOverlay = () => {
  const classes = useStyles();

  return (
    <div className={classes.overlay}>
      <CircularProgress color="secondary" /> {/* Hiệu ứng loading */}
    </div>
  );
};

export default function CarCompanyRegister() {
  const classes = useStyles();

  const [packageOpen, setPackageOpen] = React.useState<PackageProp>()
  const [listPackage, setListPackage] = React.useState<PackageResponse[]>([])
  const [open, setOpen] = React.useState(false);

  const [carCompanyName, setCarCompanyName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [phoneNumber2, setPhoneNumber2] = React.useState("");
  const [officeAddress, setOfficeAddress] = React.useState("");


  const handleOpen = (title: string, price: string, key: string) => {
    setOpen(true);
    setPackageOpen({ title: title, price: price, key: key });
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function fetchData() {
      const packages = await packageApi.getListPackage();

      setListPackage(packages.data);
    }
    fetchData();
  }, [])

  const [openPaymentOpt, setOpenPaymentOpt] = React.useState(false);

  const handleChangeStatusPayment = () => {
    if (openPaymentOpt === true)
      setOpenPaymentOpt(false);
    else
      setOpenPaymentOpt(true);
  }

  const handleZaloPayClick = async () => {
    const order = await transactionApi.createZaloPayOrder({
      amount: packageOpen !== undefined ? parseInt(packageOpen.price) : 0,
      description: "Đăng ký đối tác nhà xe",
      email: email,
      phoneNumber: phoneNumber2,
      transactionType: "ĐKNX"
    });
    //setIsLoading(true);

    console.log(order.data.order_url);
    window.location.href = order.data.order_url;

    if (order.isSuccess) {
      await addCarCompany({
        companyName: carCompanyName,
        description: description,
        email: email,
        officeAddress: officeAddress,
        packageCode: packageOpen !== undefined ? packageOpen.key : "",
        phoneNumber: phoneNumber,
        phoneNumber2: phoneNumber2
      });
    }
  }

  const  [error, seterror] = useState(false);

  const handlePay = async () => {
    setIsLoading(true);
    var check = await transactionApi.saveTransaction({
      transactionType: "ĐKNX",
      email: email,
      phoneNumber: phoneNumber2,
      price: packageOpen !== undefined ? Number.parseFloat(packageOpen.price) : 0,
    });

    if (check.isSuccess) {
      await addCarCompany({
        companyName: carCompanyName,
        description: description,
        email: email,
        officeAddress: officeAddress,
        packageCode: packageOpen !== undefined ? packageOpen.key : "",
        phoneNumber: phoneNumber,
        phoneNumber2: phoneNumber2
      });
    }
  }

  const [isLoading, setIsLoading] = useState(false);

    // Theo dõi thay đổi của biến isLoading và dừng lại nếu có lỗi xảy ra hoặc quá trình đăng nhập hoàn thành
    useEffect(() => {
        if (!isLoading || error) {
            setIsLoading(false);
        }
    }, [isLoading, error]);

  return (
    <Box>
      {isLoading && <LoadingOverlay />}
      <Box>
        <UserHeader />
      </Box>
      <Box className={styles.pricingContainer}>
        <CssBaseline />
        {/* Hero unit */}
        <Container disableGutters maxWidth="sm" component="main">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            gutterBottom
          >
            Đăng Ký Trở Thành Đối Tác Nhà Xe
          </Typography>
          <Typography variant="h5" align="center" component="p">
            Vui Lòng Chọn Gói Đăng Ký
          </Typography>
        </Container>
        {/* End hero unit */}
        <Container maxWidth="md" component="main">
          <Grid container spacing={5} alignItems="flex-end" className={styles.pricingItem}>
            {listPackage.map((item) => (
              // Enterprise card is full width at sm breakpoint
              <Grid
                item
                key={item.packageCode}
                xs={12}
                sm={item.packageCode === 'VIP' ? 12 : 6}
                md={4}
              >
                <Card>
                  <CardHeader
                    title={item.packageName}
                    //subheader={p.subheader}
                    titleTypographyProps={{ align: 'center' }}
                    action={item.packageCode === 'PREMIUM' ? <StarOutline /> : null}
                    subheaderTypographyProps={{
                      align: 'center',
                    }}
                  />
                  <CardContent>
                    <Box
                      className={styles.pricingPrice}
                    >
                      <Typography component="h2" variant="h3">
                        {item.price.toLocaleString()} VNĐ
                      </Typography>
                    </Box>
                    <div>
                      <Typography
                        className={styles.packageContentItem}
                        //component="li"
                        variant="subtitle1"
                        align="center"
                      >
                        Thời hạn: {item.duration} tháng
                      </Typography>
                      <Typography
                        className={styles.packageContentItem}
                        //component="li"
                        variant="subtitle1"
                        align="center"
                      >
                        Số lượng xe quản lý: {item.carQuantity}
                      </Typography>
                      <Typography
                        className={styles.packageContentItem}
                        //component="li"
                        variant="subtitle1"
                        align="center"
                      >
                        Số lượng tuyến quản lý: {item.routeQuantity}
                      </Typography>
                      <Typography
                        className={styles.packageContentItem}
                        //component="li"
                        variant="subtitle1"
                        align="center"
                      >
                        Số lượng chuyến: {item.tripPerDay}/Ngày
                      </Typography>
                    </div>
                  </CardContent>
                  <CardActions>
                    <Button
                      className={styles.btnRegister}
                      onClick={() => handleOpen(item.packageName, item.price.toString(), item.packageCode)}
                      fullWidth
                    >
                      Đăng ký
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Box>
        <div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={styles.registerModal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <Typography variant="h4" id="transition-modal-title" className={styles.modalTitle}>Thông Tin Đăng Ký Nhà Xe</Typography>
                <Grid container>
                  <Grid item sm={6}>
                    <Typography className={styles.modalTitle}>
                      Thông tin đăng ký nhà xe
                    </Typography>
                    <Box className={styles.registerForm}>
                      <Container className="pt-3">
                        <Row>
                          <Col md={12}>
                            <Row className="mb-3">
                              <Col md={4} className="d-flex align-items-center justify-content-end">
                                <label className={styles.customLabel}>Tên nhà xe</label>
                              </Col>
                              <Col md={8}>
                                <input
                                  type="text"
                                  className={`form-control ${styles.customInput}`}
                                  onChange={(e) => setCarCompanyName(e.target.value)}
                                />
                              </Col>
                            </Row>
                          </Col>
                          <Col md={12} className="mb-3">
                            <Row>
                              <Col md={4} className="d-flex align-items-center justify-content-end">
                                <label className={styles.customLabel}>Địa chỉ văn phòng</label>
                              </Col>
                              <Col md={8}>
                                <input
                                  type="text"
                                  className={`form-control ${styles.customInput}`}
                                  onChange={(e) => setOfficeAddress(e.target.value)}
                                />
                              </Col>
                            </Row>
                          </Col>
                          <Col md={12} className="mb-3">
                            <Row>
                              <Col md={4} className="d-flex align-items-center justify-content-end">
                                <label className={styles.customLabel}>Email</label>
                              </Col>
                              <Col md={8}>
                                <input
                                  type="text"
                                  className={`form-control ${styles.customInput}`}
                                  onChange={(e) => setEmail(e.target.value)}
                                />
                              </Col>
                            </Row>
                          </Col>
                          <Col md={12} className="mb-3">
                            <Row>
                              <Col md={4} className="d-flex align-items-center justify-content-end">
                                <label className={styles.customLabel}>Hotline</label>
                              </Col>
                              <Col md={8}>
                                <input
                                  type="text"
                                  className={`form-control ${styles.customInput}`}
                                  onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                              </Col>
                            </Row>
                          </Col>
                          <Col md={12} className="mb-3">
                            <Row>
                              <Col md={4} className="d-flex align-items-center justify-content-end">
                                <label className={styles.customLabel}>Số điện thoại</label>
                              </Col>
                              <Col md={8}>
                                <input
                                  type="text"
                                  className={`form-control ${styles.customInput}`}
                                  onChange={(e) => setPhoneNumber2(e.target.value)}
                                />
                              </Col>
                            </Row>
                          </Col>
                          <Col md={12} className="mb-3">
                            <Row>
                              <Col md={4} className="d-flex align-items-center justify-content-end">
                                <label className={styles.customLabel}>Mô tả</label>
                              </Col>
                              <Col md={8}>
                                <input
                                  type="text"
                                  className={`form-control ${styles.customInput}`}
                                  onChange={(e) => setDescription(e.target.value)}
                                />
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Container>
                    </Box>
                  </Grid>
                  <Grid item sm={6}>
                    <Typography className={styles.modalTitle}>
                      Thông tin gói đăng ký
                    </Typography>
                    <Box>
                      <Box className={styles.registerItem}>
                        <label className={styles.customLabel}>Tên gói:</label>
                        <span className={styles.textContent}>{packageOpen?.title}</span>
                      </Box>
                      <Box className={styles.registerItem}>
                        <label className={styles.customLabel}>Phí đăng ký:</label>
                        <span className={styles.textContent}>{packageOpen !== undefined ? parseInt(packageOpen?.price).toLocaleString() : ''} VNĐ</span>
                      </Box>
                      <Box>
                        <Button className={styles.btnPay} variant="contained" onClick={handleChangeStatusPayment}>
                          <ShoppingCartOutlined />
                          Thanh Toán
                        </Button>
                        <Box className={openPaymentOpt === true ? styles.heightFitContent : styles.height0}>
                          <Button className={styles.zaloPayBtn} variant="contained" onClick={handleZaloPayClick}>
                            Zalo Pay
                          </Button>
                          {/* <Button className={styles.momoBtn} variant="contained" onClick={handlePay}>
                            Dev
                          </Button> */}
                        </Box>

                      </Box>

                    </Box>
                  </Grid>
                </Grid>
              </div>
            </Fade>
          </Modal>
        </div>
      </Box>
      <Box>
        <UserFooter />
      </Box>
    </Box>
  );
}

