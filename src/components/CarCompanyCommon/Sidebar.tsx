import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { Dashboard, DashboardOutlined, EmojiTransportationOutlined, LocalMallOutlined, LocationCityOutlined, LoopOutlined, LoyaltyOutlined, PeopleAltOutlined, PostAddOutlined, SupervisedUserCircleOutlined, TripOriginOutlined } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },

  link: {
    color: 'inherit',
    textDecoration: 'none',

    '&.active > div': {
      backgroundColor: theme.palette.action.selected,
    },
  },
}));

export function Sidebar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        {/* <NavLink to="/company/dashboard" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </NavLink> */}

        <NavLink to="/company/info" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <LocationCityOutlined />
            </ListItemIcon>
            <ListItemText primary="Thông tin nhà xe" />
          </ListItem>
        </NavLink>

        <NavLink to="/company/car-manager" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <EmojiTransportationOutlined />
            </ListItemIcon>
            <ListItemText primary="Quản lý xe" />
          </ListItem>
        </NavLink>

        <NavLink to="/company/employee-manager" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <PeopleAltOutlined />
            </ListItemIcon>
            <ListItemText primary="Quản lý nhân viên" />
          </ListItem>
        </NavLink>

        <NavLink to="/company/route-manager" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <LoopOutlined />
            </ListItemIcon>
            <ListItemText primary="Quản lý tuyến xe" />
          </ListItem>
        </NavLink>
        
        <NavLink to="/company/trip-manager" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <TripOriginOutlined />
            </ListItemIcon>
            <ListItemText primary="Quản lý chuyến xe" />
          </ListItem>
        </NavLink>

        <NavLink to="/company/ticket-manager" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <LoyaltyOutlined />
            </ListItemIcon>
            <ListItemText primary="Quản lý vé" />
          </ListItem>
        </NavLink>

        <NavLink to="/company/delivery-manager" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <LocalMallOutlined />
            </ListItemIcon>
            <ListItemText primary="Quản lý vận chuyển hàng hóa" />
          </ListItem>
        </NavLink>

        {/* <NavLink to="/company/customer-manager" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <SupervisedUserCircleOutlined />
            </ListItemIcon>
            <ListItemText primary="Quản lý thông tin khách hàng" />
          </ListItem>
        </NavLink> */}

        <NavLink to="/company/report" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <DashboardOutlined />
            </ListItemIcon>
            <ListItemText primary="Thống kê báo cáo" />
          </ListItem>
        </NavLink>

        {/* <NavLink to="/company/package-renew" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <PostAddOutlined />
            </ListItemIcon>
            <ListItemText primary="Gia hạn gói nhà xe" />
          </ListItem>
        </NavLink> */}
      </List>
    </div>
  );
}
