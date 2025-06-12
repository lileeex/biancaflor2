import { Typography } from "@mui/material";
import Image from "components/base/Image";
import { Fragment } from "react/jsx-runtime";

const Logo = () => {
  return (
    <Fragment>
      <Image src="/biancaflor/src/assets/Biancaflor2.svg" alt="Logo" sx={{ width: 40 }} />
      <Typography variant="h2">Biancaflor</Typography>
    </Fragment>
  );
};

export default Logo;
