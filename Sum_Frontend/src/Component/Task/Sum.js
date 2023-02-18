import { Grid, Button, TextField, Avatar } from "@mui/material";
import { useState, useEffect } from "react";
import { useStyles } from "./SumCss";
import { postData } from "../Services/FetchBackendData";
import Swal from "sweetalert2";

export default function Sum(props) {
  const classes = useStyles();
  const [getData, setData] = useState(null);
  var [firstValue, setFirstValue] = useState("");
  var [secondValue, setSecondValue] = useState("");

  const handleSubmit = async () => {
    var body = { firstValue: firstValue, secondValue: secondValue };
    var response = await postData("add/add", body);
    setData(response.data);
  };

  return (
    <div className={classes.box}>
      <div className={classes.center}>
        <Grid spacing={2} container>
          <Grid item xs={12} className={classes.headingStyle}>
            Add Numbers
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="First Value"
              onChange={(event) => setFirstValue(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Second Value"
              onChange={(event) => setSecondValue(event.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth variant="contained" onClick={handleSubmit}>
              ADD
            </Button>
          </Grid>
          <Grid item xs={12}>
            <pre>{getData ? JSON.stringify(getData, undefined, 3) : ""}</pre>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
