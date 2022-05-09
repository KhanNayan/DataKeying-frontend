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
//import style from './Tagging.css'
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import img1 from "../../images/62157_b1013877-00200.jpg";
import img2 from "../../images/62157_b1013877-00202.jpg";
import img3 from "../../images/62157_b1013877-00203.jpg";
import img4 from "../../images/62157_b1013877-00204.jpg";
import img5 from "../../images/62157_b1013877-00205.jpg";
const baptismField = [
    "Baptism Date",
    "Name",
    "Gender",
    "Chi:Gender",
    "Birth Date",
    "Fathers_name",
    "Mothers_name",
];

export default function Aitagging() {
    const imgRef = useRef(null);
    const canvRef = useRef(null);
    const rightMenu = useRef(null);
    const mainSectionRef = useRef(null);

    const [disabled, setDisabled] = useState(false);

    const [params, setParams] = useState({
        type: "Baptism",
        fields: baptismField,
    });

    const baprismMenuState = [
        {
            id: 1,
            name: "First Name",
            disabled: null,
            keyCode: 65,
            keyName: "A",
        },
        {
            id: 2,
            name: "Last Name",
            disabled: null,
            keyCode: 83,
            keyName: "S",
        },
        {
            id: 3,
            name: "Fathers Name",
            disabled: null,
            keyCode: 68,
            keyName: "D",
        },
        {
            id: 4,
            name: "Mothers Name",
            disabled: null,
            keyCode: 70,
            keyName: "F",
        },
    ];
    const [open, setOpen] = useState(false);
    const [imgType, setImgType] = useState("");

    const [menuOptions, setMenuOptions] = useState(baprismMenuState);
    const handleClickOpen = (name) => {
        setImgType(name);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
    function setMousePosition(e) {
        var ev = e || window.event; //Moz || IE
        if (ev.pageX) {
            //Moz
            mouse.x = ev.pageX + window.pageXOffset;
            mouse.y = ev.pageY + window.pageYOffset;
        }
    }

    var mouse = {
        x: 0,
        y: 0,
        startX: 0,
        startY: 0,
    };
    var element = null;

    const onmousemove = (e) => {
        setMousePosition(e);
        if (element !== null) {
            element.style.width = Math.abs(mouse.x - mouse.startX) + "px";
            element.style.height = Math.abs(mouse.y - mouse.startY) + "px";
            element.style.left =
                mouse.x - mouse.startX < 0
                    ? mouse.x + "px"
                    : mouse.startX + "px";
            element.style.top =
                mouse.y - mouse.startY < 0
                    ? mouse.y + "px"
                    : mouse.startY + "px";
        }
    };

    const handleClick = (e) => {
        const canvas = canvRef.current;

        if (element !== null) {
            element = null;
            canvas.style.cursor = "default";
            console.log("finsihed.", mouse.x, mouse.y);
            handleMenu(e);
        } else {
            mouse.startX = mouse.x;
            mouse.startY = mouse.y;
            element = document.createElement("div");
            element.className = "rectangle";
            element.style.left = mouse.x + "px";
            element.style.top = mouse.y + "px";
            canvas.appendChild(element);
            canvas.style.cursor = "crosshair";
            console.log("begun.", mouse.startX, mouse.startY);
        }
    };

    //********remove last tag start********

    const clearTag = (e) => {
        e.preventDefault();
        var selectLastTag = document.querySelectorAll(".rectangle");

        if (selectLastTag.length !== 0) {
            //    const lastTagedId = menuOptions.slice().reverse().find( ( menu ) => menu.disabled === true );
            //    setMenuOptions(prevState => {
            //        const prevMenuOptions = [...prevState];
            //        prevMenuOptions[lastTagedId !== 0 && lastTagedId.id -1].disabled = null;
            //        return prevMenuOptions;
            //    })

            selectLastTag[selectLastTag.length - 1].remove();
        }
    };
    //********remove last tag end********
    const handleMenu = (e) => {
        e.preventDefault();

        const showingMenu = rightMenu.current;
        const mainSec = mainSectionRef.current;

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
    };

    const getFieldValue = (e, menuId) => {
        const showingMenu = rightMenu.current;

        //saving tagged values to state
        // let name =menuOptions[menuId -1].name
        // let positionx =positionXY.x
        // let positiony =positionXY.y
        // let imageName =images[currentIndex].name
        // let imageId =images[currentIndex].id

        // setRecords([
        //         ...records,
        //         {
        //             fieldName: name,
        //             coordinateX:positionx,
        //             coordinateY:positiony,
        //             imageName:imageName,
        //             imageId:imageId,
        //             line:lineNo
        //         }
        // ])

        //disabling menu
        setMenuOptions((prevState) => {
            const newMenuOptions = [...prevState];
            newMenuOptions[menuId - 1].disabled = true;
            return newMenuOptions;
        });

        handleClick(e);
        showingMenu.classList.add("container__menu_hidden");
    };

    return (
        <>
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
                    <Button color="success" variant="outlined" autoFocus>
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
                            <div
                                ref={canvRef}
                                className="zoom"
                                onClick={(e) => handleClick(e)}
                                onMouseMove={(e) => onmousemove(e)}
                                onContextMenu={(e) => clearTag(e)}
                                style={{ position: "relative" }}
                            >
                                <img
                                    className="imageContainer"
                                    ref={imgRef}
                                    src={images[currentIndex].location}
                                    alt="img"
                                />
                            </div>

                            {/* must use tabIndex  otherwise keyboard event wont work */}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Divider />

            <Box sx={{ flexGrow: 1, height: "20vh", px: 3 }}>
                <Grid container item lg={12} spacing={2} py={1}>
                    <Grid item lg={8}></Grid>

                    <Grid item lg={4}>
                        <Stack direction="row" spacing={2}>
                            <Button
                                sx={{ fontSize: "12px" }}
                                color="success"
                                variant="outlined"
                            >
                                Add Record
                            </Button>

                            <Button
                                sx={{ fontSize: "12px" }}
                                variant="outlined"
                                disabled
                            >
                                Get Last Record No and add
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
                <Divider />
                <Grid container item lg={12} spacing={1} py={2}>
                    <Grid item lg={3}>
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
                                sx={{ fontSize: "12px" }}
                                color="primary"
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
                        </Stack>
                    </Grid>

                    <Grid item lg={5}>
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
