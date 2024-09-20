import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function PayCancel () {
    return (
        <div>
            <Typography>
                Compra cancelada!
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

export default PayCancel;