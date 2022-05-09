import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { useState, useEffect, useRef } from "react";
import style from "./Tagging.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useLocation } from "react-router-dom";
import img1 from "../../images/62157_b1013877-00200.jpg";
import img2 from "../../images/62157_b1013877-00202.jpg";
import img3 from "../../images/62157_b1013877-00203.jpg";
import img4 from "../../images/62157_b1013877-00204.jpg";
import img5 from "../../images/62157_b1013877-00205.jpg";
import FullScreen from "./../FullScreen/FullScreen";
import Sidebar from "./../Sidebar/Sidebar";
import disableScroll from 'disable-scroll';

export default function Indextagging() {
    const imgRef = useRef(null);
    const canvRef = useRef(null);
    const mainSectionRef = useRef(null);
    const [disabled, setDisabled] = useState(false);
    const [params, setParams] = useState({
        type: "Baptism",
    });
    const [bbdCheck, setBbdCheck] = useState([]);
    const [open, setOpen] = useState(false);
    const [imgType, setImgType] = useState("");
    const [records, setRecords] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [images, setImages] = useState([
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
    ]);
    const [lineNo, setLineNo] = useState(1);
    const [localData, setLocalData] = useState({});
    const [scale, setScale] = useState(1);

    const [heightRatio, setHeightRatio] = useState(0);
    const [widthRatio, setWidthRatio] = useState(0);

    //=====================================================
    //Static value for field start
    //=======================================================

    const [fieldCoordinates, setFieldCoordinates] = useState([
        {
            name: "Surname",
            positionX:100,
            positionY:100,
        },
        {
            name: "Given Name",
            positionX:200,
            positionY:100,
        },
        {
            name: "Father Name",
            positionX:300,
            positionY:100,
        },
        {
            name: "Mother Name",
            positionX:400,
            positionY:100,
        },
        {
            name: "Age",
            positionX:500,
            positionY:100,
        },
    ]);

    //=====================================================
    //Static value for field end
    //=======================================================

    //=====================================================
    //sideeffects and others start
    //=======================================================

    useEffect(() => {
        document.title = "Image Tagging | Data Keying  ";
    }, []);

    useEffect(() => {         
        window.addEventListener("resize", settingRation);
        // settingRation();

        let timer1 = setTimeout(() => settingRation(), 1000);
      return () => {
        clearTimeout(timer1);
      };


    }, [widthRatio,heightRatio]);

    //=====================================================
    //sideeffects and others end
    //=======================================================

    //=====================================================
    //Getting the height and width ratio start
    //=======================================================

    function settingRation(){
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

        // console.log("width Ratio" , widthRatio);
        // console.log("height Ratio", heightRatio)

        // console.log(w,h)
        // console.log(realWidth,realHeight)
    }

    //=====================================================
    //Getting the height and width ratio end
    //=======================================================

    //=====================================================
    //images Bbd check  start
    //=======================================================
    const handleClickOpen = (name) => {
        //for modal opening
        setImgType(name);
        setOpen(true);
    };

    const handleClose = () => {
        //for modal closing
        setOpen(false);
    };

    const handleBBD = (name) => {
        //for  select image as bbd

        images.map((image) => {
            if (image.id === name.id) {
                return (image.bbd = 1);
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

    let hasNext = currentIndex < images.length - 1;

    const goToNextSlide = () => {
        setLineNo(1);
        if (hasNext) {
            setCurrentIndex(currentIndex + 1);
        }
        removeElements(document.querySelectorAll("canvas"));
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
            });
        } else if (selectedType === "Burial") {
            setParams({
                type: "Burial",
            });
        } else if (selectedType === "Marriage") {
            setParams({
                type: "Marriage",
            });
        } else if (selectedType === "Mixed") {
            setParams({
                type: "Mixed",
            });
        }
    };

    //=====================================================
    //radio button click menu change end
    //=======================================================

    //=====================================================
    //enable and disabling button start
    //=======================================================

    const checkingTag = () => {
        
        let cavCount = document.querySelectorAll(".hidden-tag");        
        cavCount.length > 0 ? setDisabled(true) : setDisabled(false);
    };

   
    useEffect(() => {
        checkingTag();
    });

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
        if (!e.altKey && !e.shiftKey) {
            disableScroll.on();
            var delta = e.wheelDelta ? e.wheelDelta : -e.deltaY;
            delta > 0
                ? setScale((prevScale) => (prevScale *= 1.02).toFixed(2))
                : setScale((prevScale) => (prevScale /= 1.02).toFixed(2));
            setTransform(e);
        }
        else{
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

        let newPos = { x: newPosx / widthRatio, y: newPosy / heightRatio};
        getFieldValue(e,newPos)
    };

    //=====================================================
    //onclick menu showing and event handling end
    //=======================================================

    //=====================================================
    //tagging on image start
    //=======================================================

    const createTag = (e,positionx,positiony) => {
        e.preventDefault();

        const appendTag = canvRef.current;

        var tagLine = document.createElement("div");

        tagLine.style.display = "none";
        tagLine.style.width = "200px";
        tagLine.style.background = "blue";
        tagLine.style.height = "3px";
        tagLine.style.position = "absolute";
        tagLine.style.left = positionx * widthRatio + "px";
        tagLine.style.top = positiony * widthRatio + "px";
        tagLine.className = "hidden-tag";

        appendTag.appendChild(tagLine);

        handleSubmit()
    };

    //=====================================================
    //tagging on image end
    //=======================================================

    //=====================================================
    //right click hide start
    //=======================================================

    const handleMenuShowing = (e) => {
        const isClicked = !mainSectionRef.current.contains(e.target);
    };

    const getFieldValue = (e,newpos) => {
        let positionx = parseInt(newpos.x);
        let positiony = parseInt(newpos.y);
        let imageName = images[currentIndex].name;
        let imageId = images[currentIndex].id;

        setRecords([
            ...records,
            {
                coordinateX: positionx,
                coordinateY: positiony,
                imageName: imageName,
                imageId: imageId,
                line: lineNo,
            },
        ]);
        createTag(e,positionx,positiony);
    };

    //=====================================================
    //right button click menu end
    //=======================================================

    //=====================================================
    //remove last tag start
    //=======================================================

    const clearTag2 = (e) => {
        e.preventDefault();
        var blueLastTag = document.querySelectorAll(".hidden-tag");

        if (blueLastTag.length !== 0) {
            blueLastTag[blueLastTag.length - 1].remove();
            records.pop();
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

        document.querySelectorAll(".hidden-tag").forEach((el) => {
            el.style.display = "block";
        });
    };

    // get tagged data from local storage

    useEffect(() => {
        var localStorageValues = JSON.parse(localStorage.getItem("taggedData"));
        if (localStorageValues) {
            setLocalData([...localStorageValues]);
        }
    }, []);

    //remove data from localstorage every minute
    useEffect(() => {
        const interval = setInterval(() => {
            localStorage.removeItem("taggedData");
        }, 60 * 1000);
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
                    {
                        "Current image has been marked as BAD or BLANK or DUPLICATE image"
                    }
                </DialogTitle>
                <DialogContent></DialogContent>
                <DialogActions>
                    <Button
                        color="error"
                        variant="outlined"
                        onClick={handleClose}
                    >
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
                sx={{ flexGrow: 1, height: "70vh", overflow: "scroll" }}
                ref={mainSectionRef}
            >
                <Grid container spacing={2}>
                    <Grid item lg={12}>
                        <Box>
                            <div
                                ref={canvRef}
                                className="zoom"
                                onWheel={(e) => zooming(e)}
                            >
                                <img
                                    style={{ position: "relative" }}
                                    className="imageContainer"
                                    tabIndex="-1"
                                    ref={imgRef}
                                    src={images[currentIndex].location}
                                    onContextMenu={(e) => clearTag2(e)}
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
                            >
                                Save
                            </Button>

                            <Typography variant="h6" color="error">
                                {" "}
                                showing : ({currentIndex + 1} of {images.length}
                                )
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
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="CopyZone"
                                />
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
                            <FormLabel component="legend">
                                Multiple Type{" "}
                            </FormLabel>
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
