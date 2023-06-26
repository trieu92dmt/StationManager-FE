import { Box, Button } from "@material-ui/core";
import { HomepageFilterLayout, SectionLayout } from "components/UserCommon";
import UserFooter from "components/UserCommon/Footer";
import UserHeader from "components/UserCommon/Header";
import "react-multi-carousel/lib/styles.css";

export function HomepageLayout() {
    return (
      <Box>
        <Box>
          <UserHeader />
        </Box>
        <Box>
          <HomepageFilterLayout />
        </Box>
        <Box>
          <SectionLayout />
        </Box>
        <Box>
          <UserFooter />
        </Box>
      </Box>
    );
  }
  