import { AppBar, Avatar, Collapse, Link, List, ListItem, ListItemIcon, ListItemText, ListSubheader, makeStyles, Toolbar, Typography } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { authActions } from "features/auth/authSlice";
import React, { useEffect } from "react";
import { MdDashboardCustomize, MdOutlineLogout } from 'react-icons/md'
import { baseURL } from "utils";
import logoImage from './components/image/bus.png';
import { useHistory } from "react-router-dom";
import { InitFacebookSDK } from "features/Utils/initFacebookSDK";

const useStyles = makeStyles((theme) => ({
  menuUser: {
    width: 320,
    maxWidth: 320,
    borderRadius: '10px',
    boxShadow: '0 0 5px',
    backgroundColor: theme.palette.background.paper,
    color: 'rgb(0 0 0 / 54%)',
    position: 'absolute',
    top: '120%',
    right: 0,
  },

  nested: {
    paddingLeft: theme.spacing(4),
  },
  headerContainer: {
    backgroundColor: '#fff'
  },

  headerWrapper: {
    margin: '5px 80px'
  },

  menuUserWrapper: {
    position: 'relative',
    overflow: 'unset',
    display: 'flex',
  },

  menuUserAvatar: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer'
  },

  leftMenu: {
    marginLeft: 'auto',
    display: 'flex',
  },

  labelColor: {
    color: '#000',
  },

  linkItem: {
    padding: '10px',
    marginRight: '20px',
    color: '#000',
    fontWeight: 'bold',
    alignItems: 'center',
    transition: 'all ease-in-out .3s',
    '&:hover': {
      borderRadius: '30px',
      backgroundColor: '#1976d2',
      color: '#fff',
    }
  },

  logo: {
    margin: '10px'
  },

  homeName: {
    textDecoration: 'none'
  },

}));

export default function UserHeader() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const userRole = localStorage.getItem("userRole");
  const token_user = localStorage.getItem("access_token");
  const handleLogoutClick = () => {
    window.FB.logout((response: any) => {
      history.push('/login');
      setLoginFBState(false)
    });
    dispatch(authActions.logout());
  };

  const handleLoginClick = () => {
    history.push('/login');
  };

  const [openMenu, setOpenMenu] = React.useState(false);
  const [loginFBState, setLoginFBState] = React.useState(true);
  console.log(loginFBState);

  const handleAvatarClick = () => {
    setOpenMenu(!openMenu);
  };

  const history = useHistory();

  const loginUtil = InitFacebookSDK();

  // useEffect(() => {
  //   window.fbAsyncInit = function () {
  //     window.FB.init({
  //       appId: '1051208665855150',
  //       cookie: true,
  //       xfbml: true,
  //       version: 'v17.0'
  //     });

  //     window.FB.getLoginStatus(function (response: any) {
  //       statusChangeCallback(response);
  //     });
  //   }

  //   function statusChangeCallback(response: any) {
  //     console.log('statusChangeCallback');
  //     console.log(response);
  //     if (response.status === 'connected') {
  //       testAPI();
  //     } else {
  //       history.push('/login');
  //     }
  //   }

  //   function testAPI() {
  //     console.log('Welcome! Fetching your information....');
  //     window.FB.api('/me', function (response: any) {
  //       history.push('/home');
  //       console.log('Successful login for: ' + response.name);
  //       //document.getElementById('status')!.innerHTML = 'Thanks for logging in, ' + response.name + '!';
  //     });
  //   }
  //   // Load the Facebook SDK asynchronously
  //   (function (d, s, id) {
  //     var js,
  //       fjs = d.getElementsByTagName(s)[0];
  //     if (d.getElementById(id)) return;
  //     js = d.createElement(s) as HTMLScriptElement;
  //     js.id = id;
  //     js.src = 'https://connect.facebook.net/en_US/sdk.js';
  //     fjs.parentNode!.insertBefore(js, fjs);
  //   })(document, 'script', 'facebook-jssdk');
  // }, [loginFBState])


  return (
    <AppBar position="sticky" className={classes.headerContainer}>
      <Toolbar className={classes.headerWrapper}>
        <Avatar alt="logo" src={logoImage} className={classes.logo} />
        <a href={baseURL + "/home"}
            className={classes.homeName}
          >
          <Typography variant="h5" className={classes.labelColor}>
            StationMn
          </Typography>
        </a>

        <div
          className={classes.leftMenu}
        >
          {/* <Link
            href="#"
            underline="none"
            className={classes.linkItem}
          >
            Tin tức
          </Link>
          <Link
            href="#"
            underline="none"
            className={classes.linkItem}
          >
            Danh sách bến xe
          </Link> */}
          <Link
            href={baseURL + "/car-company-list"}
            underline="none"
            className={classes.linkItem}
          >
            Danh sách nhà xe
          </Link>
          <Link
            href={baseURL + "/car-company-register"}
            underline="none"
            className={classes.linkItem}
          >
            Đăng ký nhà xe
          </Link>
          <Avatar
            className={classes.menuUserWrapper}
            aria-controls="customized-menu"
            aria-haspopup="true"
            color="#FFF"

          >
            <Typography
              onClick={handleAvatarClick}
              className={classes.menuUserAvatar}
            >
              H
            </Typography>

            <Collapse in={openMenu} timeout="auto" unmountOnExit>
              <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader" className={classes.labelColor}>
                    Thông tin tài khoản
                  </ListSubheader>
                }
                className={classes.menuUser}
              >
                {userRole === "CarCompany" &&
                  <ListItem button component="a" href={baseURL + "/company/info"}>
                    <ListItemIcon>
                      <MdDashboardCustomize />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                  </ListItem>}

                <hr></hr>
                {token_user != null &&
                <ListItem button onClick={handleLogoutClick}>
                  <ListItemIcon>
                    <MdOutlineLogout />
                  </ListItemIcon>
                  <ListItemText primary="Log out" />
                </ListItem>
                }
                {token_user == null &&
                <ListItem button onClick={handleLoginClick}>
                  <ListItemIcon>
                    <MdOutlineLogout />
                  </ListItemIcon>
                  <ListItemText primary="Log in" />
                </ListItem>
                }
                {/* <ListItem button onClick={handleClick}>
                  <ListItemIcon>
                    <OutlinedFlag />
                  </ListItemIcon>
                  <ListItemText primary="Inbox" />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Starred" />
                    </ListItem>
                  </List>
                </Collapse> */}

              </List>
            </Collapse>
          </Avatar>
        </div>
      </Toolbar>

    </AppBar>
  );
}

