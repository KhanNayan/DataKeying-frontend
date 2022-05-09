import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import style from "./Tagging.css";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  getImageData,
  updateImageComment,
  imageDataInsert,
} from "../../Redux/Actions/imageTaggingAction";

import FullScreen from "./../FullScreen/FullScreen";
import Sidebar from "./../Sidebar/Sidebar";
import disableScroll from "disable-scroll";

const baptismField = [
  "Baptism Date",
  "Name",
  "Gender",
  "Chi:Gender",
  "Birth Date",
  "Fathers_name",
  "Mothers_name",
];
const burialField = [
  "Burial Date",
  "Name",
  "Age",
  "Gender",
  "Deathl_date",
  "Fathers_name",
  "Mothers_name",
  "Spouse_name",
];
const marriageField = [
  "Event Date",
  "Birth Date",
  "father",
  "mother",
  "brother",
  "sister",
];
const mixedField = [
  "Event Date",
  "Birth Date",
  "wife",
  "children",
  "L-Chi:F:Name",
  "L-Chi:M:Name",
];

const imageBaseUrl = "http://10.0.0.9:8234/nas/M21025/";

export default function Tagging() {
  const imgRef = useRef(null);
  const keyevent = useRef(null);
  const canvRef = useRef(null);
  const zoomRef = useRef(null);
  const rightMenu = useRef(null);
  const mainSectionRef = useRef(null);
  const [disabled, setDisabled] = useState(false);
  const [params, setParams] = useState({
    type: "Baptism",
    fields: baptismField,
  });
  const [bbdCheck, setBbdCheck] = useState([]);
  const [open, setOpen] = useState(false);
  const [imgType, setImgType] = useState("");
  const baprismMenuState = [
    {
      id: 1,
      name: "Father Givenname",
      dbName: "FATHER_GIVENNAME",
      disabled: null,
      keyCode: 65,
      keyName: "A",
      taggedTime: "",
    },
    {
      id: 2,
      name: "Mother Givenname",
      dbName: "MOTHER_GIVENNAME",
      disabled: null,
      keyCode: 83,
      keyName: "S",
      taggedTime: "",
    },
    {
      id: 3,
      name: "Spouse Givenname",
      dbName: "SPOUSE_GIVENNAME",
      disabled: null,
      keyCode: 68,
      keyName: "D",
      taggedTime: "",
    },
    {
      id: 4,
      name: "Age",
      dbName: "AGE_POS",
      disabled: null,
      keyCode: 70,
      keyName: "F",
      taggedTime: "",
    },
  ];
  const burialMenuState = [
    {
      id: 1,
      name: "gender",
      dbName: "gender",
      disabled: null,
      keyCode: 77,
      keyName: "M",
    },
    {
      id: 2,
      name: "husband Name",
      dbName: "husband_name",
      disabled: null,
      keyCode: 76,
      keyName: "L",
    },
    {
      id: 3,
      name: "children Name",
      dbName: "children_name",
      disabled: null,
    },
    {
      id: 4,
      name: "Mothers Name",
      dbName: "mothers_name",
      disabled: null,
    },
    {
      id: 5,
      name: "Fathers Name",
      dbName: "fathers_name",
      disabled: null,
    },
  ];
  const marriageMenuState = [
    {
      id: 1,
      name: "Birth date",
      disabled: null,
    },
    {
      id: 2,
      name: "Wife Name",
      disabled: null,
    },
    {
      id: 3,
      name: "Fathers Name",
      disabled: null,
    },
    {
      id: 4,
      name: "Mothers Name",
      disabled: null,
    },
    {
      id: 5,
      name: "Event date",
      disabled: null,
    },
  ];
  const [records, setRecords] = useState([]);
  const [positionXY, setPositionXY] = useState({
    x: 0,
    y: 0,
  });

  const [menuOptions, setMenuOptions] = useState(baprismMenuState);
  const [currentIndex, setCurrentIndex] = useState(0);
  const location = useLocation();
  const [selectedSeries, setSelectedSeries] = useState(location.state);

  const [lineNo, setLineNo] = useState(1);
  const [localData, setLocalData] = useState({});
  const [images, setImages] = useState([]);
  const [scale, setScale] = useState(1);

  const [heightRatio, setHeightRatio] = useState(0);
  const [widthRatio, setWidthRatio] = useState(0);

  const dispatch = useDispatch();
  const imagesData = useSelector((state) => state.imageTaggingReducer);

  //=====================================================
  //sideeffects and others start
  //=======================================================

  useEffect(() => {
    dispatch(getImageData(selectedSeries));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSeries]);

  useEffect(() => {
    setImages(imagesData);
  }, [imagesData]);

  useEffect(() => {
    document.title = "Image Tagging | Data Keying  ";
  }, []);

  useEffect(() => {
    checking();
  });

  useEffect(() => {
    window.addEventListener("resize", settingRation);
    let timer1 = setTimeout(() => settingRation(), 1000);
    return () => {
      clearTimeout(timer1);
    };
  }, [widthRatio, heightRatio]);

  //=====================================================
  //sideeffects and others end
  //=======================================================

  //=====================================================
  //Getting the height and width ratio start
  //=======================================================

  function settingRation() {
    var windowSize = document.querySelectorAll("#imagesss");
    var w = windowSize[0].clientWidth;
    var h = windowSize[0].clientHeight;
    var myImg = document.querySelector("#imagesss");
    var realWidth = myImg.naturalWidth;
    var realHeight = myImg.naturalHeight;

    var widthRatios = w / realWidth;
    var heightRatios = h / realHeight;

    setWidthRatio(widthRatios);
    setHeightRatio(heightRatios);
  }

  //=====================================================
  //Getting the height and width ratio end
  //=======================================================

  //=====================================================
  //images Bbd check  start
  //=======================================================
  const handleClickOpen = (statusCode) => {
    //for modal opening
    setImgType(statusCode);
    setOpen(true);
  };

  const handleClose = () => {
    //for modal closing
    setOpen(false);
  };

  const handleBBD = (name) => {
    //for  select image as bbd

    // console("imagetype", imgType);
    let status = 2;
    if (imgType === "Blank") {
      status = -99;
    }
    if (imgType === "Bad") {
      status = -9;
    }
    if (imgType === "Bad") {
      status = -999;
    }
    if (imgType === "Tag") {
      status = 2;
    }
    images.map((image) => {
      if (image.IMAGE_NUMBER === name.IMAGE_NUMBER) {
        return dispatch(
          updateImageComment({
            COMMENTS: status,
            IMAGE_NUMBER: image.IMAGE_NUMBER,
          })
        );
      } else {
        return image;
      }
    });

    setBbdCheck([
      ...bbdCheck,
      {
        imageType: imgType,
        imageName: name.name,
        imageLocation: name.location,
        imageId: name.id,
      },
    ]);
    setOpen(false);
    goToNextSlide();
  };

  //=====================================================
  //images Bbd check  end
  //=======================================================

  const removeElements = (elms) => {
    //for removing child element
    elms.forEach((el) => el.remove());
  };

  //=====================================================
  //prev and next images start
  //=======================================================

  let hasNext = currentIndex < images?.length - 1;

  const goToNextSlide = () => {
    setLineNo(1);

    if (hasNext) {
      setCurrentIndex(currentIndex + 1);
    }
    removeElements(document.querySelectorAll("canvas"));
    setMenuOptions(baprismMenuState);
  };

  //=====================================================
  //prev and next images end
  //=======================================================

  //=====================================================
  //radio button click menu change start
  //=======================================================

  const handleRadioButtons = (event) => {
    const selectedType = event.target.value;

    if (selectedType === "Baptism") {
      setParams({
        type: "Baptism",
        fields: baptismField,
      });
      setMenuOptions(baprismMenuState);
    } else if (selectedType === "Burial") {
      setParams({
        type: "Burial",
        fields: burialField,
      });
      setMenuOptions(burialMenuState);
    } else if (selectedType === "Marriage") {
      setParams({
        type: "Marriage",
        fields: marriageField,
      });

      setMenuOptions(marriageMenuState);
    } else if (selectedType === "Mixed") {
      setParams({
        type: "Mixed",
        fields: mixedField,
      });
    }
  };

  //=====================================================
  //radio button click menu change end
  //=======================================================

  //=====================================================
  //enable and disabling button start
  //=======================================================

  const checking = () => {
    var cavCount = document.querySelectorAll(".hidden-tag");

    console.log("Checking Call");
    cavCount.length > 0 ? setDisabled(true) : setDisabled(false);
  };

  //=====================================================
  //enable and disabling button end
  //=======================================================

  //=====================================================
  //image zooming start
  //=======================================================

  var setTransform = (e) => {
    const zoomImg = canvRef.current;
    zoomImg.style.transform = "scale(" + scale + ")";
  };

  const zooming = (e) => {
    // var windowSize = document.querySelectorAll("#imagesss");
    // windowSize.onMouseEnter(() => {
    //   alert("hey");
    // });

    if (!e.altKey && !e.shiftKey) {
      disableScroll.on();
      var delta = e.wheelDelta ? e.wheelDelta : -e.deltaY;
      delta > 0
        ? setScale((prevScale) => (prevScale *= 1.02).toFixed(2))
        : setScale((prevScale) => (prevScale /= 1.02).toFixed(2));
      setTransform(e);
    } else {
      disableScroll.off();
    }
  };
  //=====================================================
  //image zooming end
  //=======================================================

  //=====================================================
  //onclick menu showing and event handling start
  //=======================================================

  const handleMenu = (e) => {
    e.preventDefault();

    const showingMenu = rightMenu.current;
    const mainSec = mainSectionRef.current;
    const appendRef = canvRef.current;
    const bounds = appendRef.getBoundingClientRect();
    const newPosx =
      scale > 0
        ? (e.clientX - bounds.left) / scale
        : (e.clientX - bounds.left) * scale;
    const newPosy =
      scale > 0
        ? (e.clientY - bounds.top) / scale
        : (e.clientY - bounds.top) * scale;

    let newPos = { x: newPosx / widthRatio, y: newPosy / heightRatio };

    //for menu click coordinate
    const rectMenu = mainSec.getBoundingClientRect();

    const x = e.clientX - rectMenu.left;
    const y = e.clientY - rectMenu.top;

    // Set the position for menu
    showingMenu.style.top = `${y}px`;
    showingMenu.style.left = `${x}px`;

    // Show the showingMenu
    showingMenu.classList.remove("container__menu_hidden");
    //handleMenuShowing(e)

    //showHideMenu.addEventListener('click',handleMenuShowing)
    setPositionXY(newPos);
    // console.log(positionXY)
  };

  //=====================================================
  //onclick menu showing and event handling end
  //=======================================================

  //=====================================================
  //tagging on image start
  //=======================================================

  const handleClick = (e) => {
    const appendRefN = canvRef.current;

    var canv = document.createElement("canvas");
    canv.style.position = "absolute";
    canv.style.left = positionXY.x * widthRatio + "px";
    canv.style.top = positionXY.y * heightRatio + "px";

    appendRefN.appendChild(canv);
    createTag();
  };
  const createTag = (e) => {
    const appendTag = canvRef.current;

    var tagLine = document.createElement("div");

    tagLine.style.display = "none";
    tagLine.style.width = "60px";
    tagLine.style.background = "blue";
    tagLine.style.height = "3px";
    tagLine.style.position = "absolute";
    tagLine.style.left = positionXY.x * widthRatio + "px";
    tagLine.style.top = positionXY.y * heightRatio + "px";
    tagLine.className = "hidden-tag";

    appendTag.appendChild(tagLine);
  };

  //=====================================================
  //tagging on image end
  //=======================================================

  //=====================================================
  //right click hide start
  //=======================================================

  const handleMenuShowing = (e) => {
    const showingMenu = rightMenu.current;
    const isClicked = !mainSectionRef.current.contains(e.target);
    if (isClicked) {
      showingMenu.classList.add("container__menu_hidden");
    }
  };

  const getFieldValue = (e, menuId) => {
    const showingMenu = rightMenu.current;

    //***saving tagged values to state
    let name = menuOptions[menuId - 1].dbName;
    let positionx = parseInt(positionXY.x);
    let positiony = parseInt(positionXY.y);
    let imageName = images[currentIndex]?.IMAGE_NAME;
    let imageId = images[currentIndex]?.IMAGE_NUMBER;
    let seriseNumber = selectedSeries;

    console.log("ImageName", imageName);

    setRecords([
      ...records,
      {
        fieldName: name,
        coordinateX: positionx,
        coordinateY: positiony,
        imageName: imageName,
        imageId: imageId,
        line: lineNo,
        seriesNumber: seriseNumber,
      },
    ]);

    //***disabling menu
    setMenuOptions((prevState) => {
      const newMenuOptions = [...prevState];
      newMenuOptions[menuId - 1].disabled = true;
      newMenuOptions[menuId - 1].taggedTime = new Date().toLocaleString();
      return newMenuOptions;
    });

    handleClick(e);
    showingMenu.classList.add("container__menu_hidden");
  };

  //=====================================================
  //right button click menu end
  //=======================================================

  //=====================================================
  //Save Tage Data to Database Start
  //=======================================================
  const handleSave = () => {
    setImgType((prevSate) => {
      return prevSate + "Tag";
    });
    console.log("image type", imgType);

    var localStorageValues = JSON.parse(localStorage.getItem("taggedData"));
    if (localStorageValues) {
      dispatch(imageDataInsert(localStorageValues));
      //localStorage.removeItem("taggedData");
      handleBBD(images[currentIndex]);
    }
  };
  //=====================================================
  //Save Tage Data to Database End
  //=======================================================

  //=====================================================
  //remove last tag start
  //=======================================================

  const clearTag = (e) => {
    e.preventDefault();
    var selectLastTag = document.querySelectorAll("canvas");
    var blueLastTag = document.querySelectorAll(".hidden-tag");

    if (selectLastTag.length !== 0) {
      const lastTagedId = menuOptions
        .slice()
        .reverse()
        .find((menu) => menu.disabled === true);

      const lastTagedTime = menuOptions
        .map((tag) => tag.taggedTime)
        .sort()
        .reverse()[0];
      const lastTagedObj = menuOptions.find(
        (tt) => tt.taggedTime === lastTagedTime
      );

      setMenuOptions((prevState) => {
        const prevMenuOptions = [...prevState];
        prevMenuOptions[lastTagedObj !== 0 && lastTagedObj.id - 1].disabled =
          null;
        prevMenuOptions[lastTagedObj !== 0 && lastTagedObj.id - 1].taggedTime =
          "";
        return prevMenuOptions;
      });
      selectLastTag[selectLastTag.length - 1].remove();
      records.pop();
    }
    if (blueLastTag.length !== 0) {
      blueLastTag[blueLastTag.length - 1].remove();
    }
  };
  //=====================================================
  //remove last tag end
  //=======================================================

  //=====================================================
  //save data to localstorage and retrieve start
  //=======================================================

  const handleSubmit = () => {
    setLineNo(lineNo + 1);
    localStorage.setItem("taggedData", JSON.stringify(records));
    setMenuOptions(baprismMenuState);
    removeElements(document.querySelectorAll("canvas"));

    document.querySelectorAll(".hidden-tag").forEach((el) => {
      el.style.display = "block";
    });
  };

  // //get tagged data from local storage

  useEffect(() => {
    var localStorageValues = JSON.parse(localStorage.getItem("taggedData"));
    if (localStorageValues) {
      setLocalData([...localStorageValues]);
    }
  }, []);

  // remove data from localstorage every minute
  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.removeItem("taggedData");
    }, 60 * 1000 * 60);
    return () => clearInterval(interval);
  });

  //=====================================================
  //save data to localstorage  and retrieve end
  //=======================================================

  //=====================================================
  //image rotation  start
  //=======================================================

  var current_rotation = 0;
  const handleRotation = () => {
    const imgRot = imgRef.current;

    current_rotation += 90;

    // rotate clockwise by 90 degrees

    imgRot.style.transform = "rotate(" + current_rotation + "deg)";
  };

  //=====================================================
  //image rotation  end
  //=======================================================

  //=====================================================
  //keyboard key press for tagging   start
  //=======================================================

  const handleKeyPress = (e) => {
    var xkey = e.which;
    menuOptions.map((menu) => {
      if (menu.disabled !== true && xkey === menu.keyCode) {
        return getFieldValue(e, menu.id);
      }
      return true;
    });
  };

  //=====================================================
  //keyboard key press for tagging   end
  //=======================================================

  return (
    <>
      <FullScreen></FullScreen>
      <Sidebar></Sidebar>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Current image has been marked as BAD or BLANK or DUPLICATE image"}
        </DialogTitle>
        <DialogContent></DialogContent>

        <DialogActions>
          <Button color="error" variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            color="success"
            variant="outlined"
            onClick={() => handleBBD(images[currentIndex])}
            autoFocus
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      <Box
        sx={{
          width: "100%",
          maxWidth: 250,
          bgcolor: "background.paper",
        }}
        ref={rightMenu}
        className="container__menu container__menu_hidden"
      >
        <List>
          {menuOptions?.map((option) => {
            return (
              <ListItem key={option.id} disablePadding>
                <ListItemButton
                  component="a"
                  onClick={(e) => getFieldValue(e, option.id)}
                  disabled={option.disabled}
                  ref={keyevent}
                >
                  <ListItemText primary={option.name} />
                  <span>{option?.keyName}</span>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Box
        sx={{ flexGrow: 1, height: "70vh", overflow: "scroll" }}
        ref={mainSectionRef}
      >
        <Grid container spacing={2}>
          <Grid item lg={12}>
            <Box>
              <div ref={canvRef} className="zoom" onWheel={(e) => zooming(e)}>
                <img
                  style={{ position: "relative" }}
                  className="imageContainer"
                  tabIndex="-1"
                  onKeyDown={(e) => handleKeyPress(e)}
                  ref={imgRef}
                  src={
                    images &&
                    `${imageBaseUrl}${images[currentIndex]?.SERIES_NUMBER}/${images[currentIndex]?.IMAGE_NAME}`
                  }
                  onContextMenu={(e) => clearTag(e)}
                  onClick={(e) => handleMenu(e)}
                  alt="img"
                  id="imagesss"
                />
              </div>

              {/* must use tabIndex  otherwise keyboard event wont work */}
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Divider />

      <Box
        sx={{ flexGrow: 1, height: "20vh", px: 3 }}
        onClick={(e) => handleMenuShowing(e)}
      >
        <Grid container item lg={12} spacing={2} py={1}>
          <Grid item lg={8}>
            <Stack direction="row" spacing={2}>
              {params.fields?.map((singleParam, index) => {
                return (
                  <Typography
                    key={index}
                    sx={{
                      color: "error.main",
                      fontSize: "15px",
                      minWidth: 100,
                    }}
                  >
                    {singleParam}
                  </Typography>
                );
              })}
            </Stack>
          </Grid>

          <Grid item lg={4}>
            <Stack direction="row" spacing={2}>
              <Button
                sx={{ fontSize: "12px" }}
                onClick={handleSubmit}
                color="success"
                variant="outlined"
              >
                Add Record
              </Button>

              <Button sx={{ fontSize: "12px" }} variant="outlined" disabled>
                Get Last Record No and add
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <Divider />
        <Grid container item lg={12} spacing={1} py={2}>
          <Grid item lg={4}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Language</FormLabel>
              <RadioGroup
                row
                aria-label="language"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="German"
                  control={<Radio />}
                  label="German"
                />
                <FormControlLabel
                  value="Latin"
                  control={<Radio />}
                  label="Latin"
                />
                <FormControlLabel
                  value="English"
                  control={<Radio />}
                  label="English"
                />
              </RadioGroup>
            </FormControl>
            <Stack direction="row" spacing={1}>
              <Button
                disabled={!hasNext}
                sx={{ fontSize: "12px" }}
                color="primary"
                onClick={goToNextSlide}
                variant="outlined"
              >
                Next Image
              </Button>

              {/* <Button onClick={goToPrevSlide} color="secondary" variant="outlined" >
                                        Prev Image
                                        </Button> */}
              <Button
                sx={{ fontSize: "12px" }}
                color="success"
                disabled={!disabled}
                variant="outlined"
                onClick={handleSave}
              >
                Save
              </Button>

              <Typography variant="h6" color="error">
                {" "}
                showing : ({currentIndex + 1} of {images?.length}) Name :
                {images[currentIndex]?.IMAGE_NAME}
              </Typography>
            </Stack>
          </Grid>

          <Grid item lg={4}>
            <Stack direction="row">
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="First record connection"
                />
                <FormControlLabel control={<Checkbox />} label="CopyZone" />
              </FormGroup>
              <Box>
                <Button
                  sx={{ mx: 1, my: 1, fontSize: "12px" }}
                  color="primary"
                  variant="outlined"
                >
                  continue
                </Button>
                <Button
                  sx={{ mx: 1, my: 1, fontSize: "12px" }}
                  color="primary"
                  variant="outlined"
                >
                  No Ext DataImage
                </Button>
                <Button
                  sx={{ mx: 1, my: 1, fontSize: "12px" }}
                  color="secondary"
                  variant="outlined"
                >
                  Other Language
                </Button>
              </Box>
            </Stack>
          </Grid>
          <Grid item lg={4}>
            <Stack direction="row" spacing={1}>
              <Button
                sx={{ fontSize: "12px" }}
                color="info"
                disabled={disabled}
                variant="outlined"
                onClick={() => handleClickOpen("Blank")}
              >
                Blank
              </Button>
              <Button
                sx={{ fontSize: "12px" }}
                color="error"
                disabled={disabled}
                variant="outlined"
                onClick={() => handleClickOpen("Bad")}
              >
                Bad
              </Button>
              <Button
                sx={{ fontSize: "12px" }}
                color="warning"
                disabled={disabled}
                variant="outlined"
                onClick={() => handleClickOpen("Duplicate")}
              >
                Duplicate
              </Button>
              <Button
                sx={{ fontSize: "12px" }}
                startIcon={<RotateLeftIcon />}
                color="primary"
                onClick={handleRotation}
                variant="outlined"
              >
                Rotate
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <Divider />
        <Grid container item lg={12} spacing={2} py={2}>
          <Grid item lg={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Data Type</FormLabel>
              <RadioGroup
                row
                aria-label="types"
                name="row-radio-buttons-group"
                defaultValue="Baptism"
                value={params.type}
                onChange={handleRadioButtons}
              >
                <FormControlLabel
                  value="Baptism"
                  control={<Radio />}
                  label="Baptism"
                />
                <FormControlLabel
                  value="Burial"
                  control={<Radio />}
                  label="Burial"
                />
                <FormControlLabel
                  value="Marriage"
                  control={<Radio />}
                  label="Marriage"
                />
                <FormControlLabel
                  value="Mixed"
                  control={<Radio />}
                  label="Mixed"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item lg={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Multiple Type </FormLabel>
              <RadioGroup
                row
                aria-label="gender"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="Baptism"
                  control={<Radio />}
                  label="Baptism"
                />
                <FormControlLabel
                  value="Burial"
                  control={<Radio />}
                  label="Burial"
                />
                <FormControlLabel
                  value="Marriage"
                  control={<Radio />}
                  label="Marriage"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
