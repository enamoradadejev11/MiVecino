import { Box, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { typographyStyles } from "../../utils/stylesUtils";
import { headerAccess } from "../../utils/utils";
import Footer from "../Common/Footer/Footer";
import Navbar from "../Common/Navbar/Navbar";
import { getEmprendimientosForApproval } from "../Emprendimientos/emprendimientosServices";
import PendingApprovalsTable from "./PendingApprovalsTable";

const Approvals = () => {
  const typography = typographyStyles();
  const [emprendimientos, setEmprendimientos] = useState([]);

  useEffect(() => {
    getEmprendimientosForApproval().then((resp) => setEmprendimientos(resp));
  }, []);

  return (
    <>
      <Navbar types={[headerAccess.LOGIN]} />
      <Box p={5}>
        <Box pb={3}>
          <Typography className={typography.dark_title}>
            Peticiones pendientes:
          </Typography>
        </Box>
        <PendingApprovalsTable
          data={emprendimientos}
          setData={setEmprendimientos}
        />
      </Box>
      <Footer fixed />
    </>
  );
};

export default Approvals;
