import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import img1 from "../../images/62157_b1013877-00200.jpg";
import img2 from "../../images/62157_b1013877-00202.jpg";
import img3 from "../../images/62157_b1013877-00203.jpg";
import img4 from "../../images/62157_b1013877-00204.jpg";
import img5 from "../../images/62157_b1013877-00205.jpg";
import { getImageSeries } from "../../Redux/Actions/imageTaggingAction";

function ConfirmationDialogRaw(props) {
  const { onClose, open, ...other } = props;
  const [checked, setChecked] = useState(null);
  const [selectedSeries, setSelectedSeries] = useState([]);
  const [series, setSeries] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [imagesPool, setImagesPool] = useState([
    {
      seriesNo: 11222000000,
      images: [
        {
          id: 1,
          name: "First img",
          location: img1,
          bbd: 0,
        },
        {
          id: 2,
          name: "second img",
          location: img2,
          bbd: 0,
        },
        {
          id: 3,
          name: "third img",
          location: img3,
          bbd: 0,
        },
        {
          id: 4,
          name: "fourth img",
          location: img4,
          bbd: 0,
        },
        {
          id: 5,
          name: "fifth img",
          location: img5,
          bbd: 0,
        },
      ],
    },
    {
      seriesNo: 33344400000,
      images: [
        {
          id: 1,
          name: "Last img",
          location: img1,
          bbd: 0,
        },
        {
          id: 2,
          name: "second img",
          location: img2,
          bbd: 0,
        },
        {
          id: 3,
          name: "third img",
          location: img3,
          bbd: 0,
        },
        {
          id: 4,
          name: "fourth img",
          location: img4,
          bbd: 0,
        },
        {
          id: 5,
          name: "fifth img",
          location: img5,
          bbd: 0,
        },
      ],
    },
  ]);

  const dispatch = useDispatch();
  const imageSeries = useSelector((state) => state.imageTaggingReducer);

  useEffect(() => {
    dispatch(getImageSeries());
  }, []);

  useEffect(() => {
    setSeries(imageSeries);
  }, [imageSeries]);

  let history = useHistory();

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    if (checked != null) {
      history.push({
        pathname: "/tag",
        state: selectedSeries,
      });
    } else {
      console.log("please select radio button");
    }
  };

  const handleChange = (images, i) => {
    setDisabled(false);
    setChecked(i);
    setSelectedSeries(images);
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
      {...other}
    >
      <DialogTitle>Select Image Series</DialogTitle>
      <DialogContent dividers>
        {series.length > 0 &&
          series.map((image, i) => {
            return (
              <div
                key={i}
                className="d-block"
                style={{
                  borderBottom: "1px solid #dee2e6",
                  cursor: "pointer",
                }}
              >
                <input
                  id={image.SERIES_NUMBER}
                  type="radio"
                  value={image.SERIES_NUMBER}
                  onChange={() => handleChange(image.SERIES_NUMBER, i)}
                  checked={checked == i ? true : false}
                ></input>
                <label htmlFor={image.SERIES_NUMBER} className="p-1">
                  {image?.SERIES_NUMBER}
                </label>
              </div>
            );
          })}

        {/* Image Static Data */}

        {/* {imagesPool.map((image, i) => {
          return (
            <div
              key={i}
              className="d-block"
              style={{
                borderBottom: "1px solid #dee2e6",
                cursor: "pointer",
              }}
            >
              <input
                id={image.seriesNo}
                type="radio"
                value={image.seriesNo}
                onChange={() => handleChange(image.images, i)}
                checked={checked == i ? true : false}
              ></input>
              <label htmlFor={image.seriesNo} className="p-1">
                {image.seriesNo}
              </label>
            </div>
          );
        })} */}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button disabled={disabled} onClick={handleOk}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function ImageSeries() {
  const [open, setOpen] = useState(false);

  const handleClose = (newValue) => {
    setOpen(false);
  };
  const handleClickListItem = () => {
    setOpen(true);
  };
  return (
    <Box
      sx={{
        width: "400px",
        maxWidth: 860,
        maxHeight: 800,
        bgcolor: "#dee2e6",
        position: "relative",
        borderRadius: "10px",
        top: "200px",
        left: "555px",
        padding: "10px",
      }}
    >
      <List component="div">
        <ListItem
          button
          divider
          aria-haspopup="true"
          aria-controls="image_series"
          aria-label="phone ringtone"
          onClick={handleClickListItem}
        >
          <ListItemText primary="Click to select Image Series" />
        </ListItem>

        <ConfirmationDialogRaw
          id="image_series"
          keepMounted
          open={open}
          onClose={handleClose}
        />
      </List>
    </Box>
  );
}
