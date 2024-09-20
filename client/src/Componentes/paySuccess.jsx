import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";


function PaySuccess () {
    return (
        <div style={{ height: "100%"}}>
            <Typography>
                Compra realizada!
            </Typography>
            <Link
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
                margin:"30px",
              }}
            >
              <ArrowBackIosIcon />
              <small>Voltar para página principal</small>
            </Link>
        </div>
    )
}

export default PaySuccess;