import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useState, useEffect, useRef } from "react";
import Divider from "@mui/material/Divider";
import style from "./DataEntry.css";
import img1 from "../../images/62157_b1013877-00200.jpg";
import img2 from "../../images/62157_b1013877-00202.jpg";
import { useHistory } from "react-router-dom";
import Data from "./mock-data.json";
import SearchBar from "./SearchBar";
import FullScreen from "./../FullScreen/FullScreen";
import AlertBox from "./../AlertBox/AlertBox";
import Sidebar from "../Sidebar/Sidebar";

export default function DataEntry() {
    const imgRef = useRef(null);
    const canvRef = useRef(null);

    const mainSectionRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentImgIndex, setCurrentImgIndex] = useState(0);
    const [tagIndex, setTagIndex] = useState(0);
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentField, setCurrentField] = useState("");
    const [openInp, setOpenInp] = useState(false);
    const [inputFields, setInputFields] = useState([
        {
            labelName: "certiNo",
            fieldName: "certiNo",
            active: true,
            fieldIndex: 1,
            inpType: "text",
            inpVal: "",
            searchField: true,
        },
        {
            labelName: "Baptism Date",
            fieldName: "baptismDate",
            active: true,
            fieldIndex: 2,
            inpType: "text",
            inpVal: "",
            searchField: false,
        },
        {
            labelName: "Givenname",
            fieldName: "givenName",
            active: true,
            fieldIndex: 3,
            inpType: "text",
            inpVal: "",
            searchField: true,
        },

        {
            labelName: "Surname",
            fieldName: "surName",
            active: true,
            fieldIndex: 4,
            inpType: "text",
            inpVal: "",
            searchField: true,
        },
        {
            labelName: "Gender",
            fieldName: "gender",
            active: true,
            fieldIndex: 5,
            inpType: "text",
            inpVal: "",
            searchField: false,
        },
        {
            labelName: "Birth Date",
            fieldName: "birthDate",
            active: true,
            fieldIndex: 6,
            inpType: "text",
            inpVal: "",
            searchField: false,
        },
        {
            labelName: "Father GName",
            fieldName: "fgName",
            active: true,
            fieldIndex: 7,
            inpType: "text",
            inpVal: "",
            searchField: true,
        },
        {
            labelName: "Father SName",
            fieldName: "fsName",
            active: true,
            fieldIndex: 8,
            inpType: "text",
            inpVal: "",
            searchField: true,
        },
    ]);
    const [customFields, setCustomFields] = useState(inputFields);

    const [images, setImages] = useState([
        {
            id: 1,
            name: "First img",
            location:
                "http://10.0.0.9:8234/nas/M21025/d_62157.IDX.002_62157_B1013805/62157_b1013805-00005.jpg",
        },
        {
            id: 2,
            name: "second img",
            location: img2,
        },
        // {
        //     id:3,
        //     name:'third img',
        //     location:img3,

        // },
        // {
        //     id:4,
        //     name:'fourth img',
        //     location:img4,

        // },
        // {
        //     id:4,
        //     name:'fifth img',
        //     location:img5,

        // },
    ]);
    const [query, setQuery] = useState("");
    const [entryData, setEntryData] = useState([]);
    const [taggedData, setTaggedData] = useState([]);

    const [heightRatio, setHeightRatio] = useState(0);
    const [widthRatio, setWidthRatio] = useState(0);

    const [taggedDatas, setTaggedDatas] = useState([
        {
            lineNumber: 1,
            tagged: [
                {
                    fieldName: "First Name",
                    coordinateX: 354,
                    coordinateY: 234,
                    imageName: "First img",
                    imageId: 1,
                    line: 1,
                },
                {
                    fieldName: "Last Name",
                    coordinateX: 524,
                    coordinateY: 232,
                    imageName: "First img",
                    imageId: 1,
                    line: 1,
                },
                {
                    fieldName: "Fathers Name",
                    coordinateX: 743,
                    coordinateY: 239,
                    imageName: "First img",
                    imageId: 1,
                    line: 1,
                },
                {
                    fieldName: "Mothers Name",
                    coordinateX: 382,
                    coordinateY: 281,
                    imageName: "First img",
                    imageId: 1,
                    line: 1,
                },
                {
                    fieldName: "First Name",
                    coordinateX: 372,
                    coordinateY: 549,
                    imageName: "First img",
                    imageId: 1,
                    line: 2,
                },
                {
                    fieldName: "Last Name",
                    coordinateX: 646,
                    coordinateY: 563,
                    imageName: "First img",
                    imageId: 1,
                    line: 2,
                },
                {
                    fieldName: "Fathers Name",
                    coordinateX: 386,
                    coordinateY: 667,
                    imageName: "First img",
                    imageId: 1,
                    line: 2,
                },
                {
                    fieldName: "Mothers Name",
                    coordinateX: 712,
                    coordinateY: 674,
                    imageName: "First img",
                    imageId: 1,
                    line: 2,
                },
            ],
        },
        {
            lineNumber: 2,
            tagged: [
                {
                    fieldName: "First Name",
                    coordinateX: 352,
                    coordinateY: 599,
                    imageName: "First img",
                    imageId: 1,
                    line: 1,
                },
                {
                    fieldName: "Last Name",
                    coordinateX: 670,
                    coordinateY: 607,
                    imageName: "First img",
                    imageId: 1,
                    line: 1,
                },
                {
                    fieldName: "Fathers Name",
                    coordinateX: 418,
                    coordinateY: 686,
                    imageName: "First img",
                    imageId: 1,
                    line: 1,
                },
                {
                    fieldName: "Mothers Name",
                    coordinateX: 794,
                    coordinateY: 695,
                    imageName: "First img",
                    imageId: 1,
                    line: 1,
                },
                {
                    fieldName: "Last Name",
                    coordinateX: 360,
                    coordinateY: 851,
                    imageName: "First img",
                    imageId: 1,
                    line: 2,
                },
                {
                    fieldName: "First Name",
                    coordinateX: 694,
                    coordinateY: 845,
                    imageName: "First img",
                    imageId: 1,
                    line: 2,
                },
                {
                    fieldName: "Fathers Name",
                    coordinateX: 369,
                    coordinateY: 969,
                    imageName: "First img",
                    imageId: 1,
                    line: 2,
                },
                {
                    fieldName: "Mothers Name",
                    coordinateX: 669,
                    coordinateY: 962,
                    imageName: "First img",
                    imageId: 1,
                    line: 2,
                },
            ],
        },
        {
            lineNumber: 3,
            tagged: [
                {
                    fieldName: "First Name",
                    coordinateX: 1187,
                    coordinateY: 255,
                    imageName: "First img",
                    imageId: 1,
                    line: 1,
                },
                {
                    fieldName: "Last Name",
                    coordinateX: 1488,
                    coordinateY: 249,
                    imageName: "First img",
                    imageId: 1,
                    line: 1,
                },
                {
                    fieldName: "Fathers Name",
                    coordinateX: 1240,
                    coordinateY: 290,
                    imageName: "First img",
                    imageId: 1,
                    line: 1,
                },
                {
                    fieldName: "Mothers Name",
                    coordinateX: 1557,
                    coordinateY: 335,
                    imageName: "First img",
                    imageId: 1,
                    line: 1,
                },
                {
                    fieldName: "First Name",
                    coordinateX: 1185,
                    coordinateY: 557,
                    imageName: "First img",
                    imageId: 1,
                    line: 2,
                },
                {
                    fieldName: "Last Name",
                    coordinateX: 1524,
                    coordinateY: 557,
                    imageName: "First img",
                    imageId: 1,
                    line: 2,
                },
                {
                    fieldName: "Fathers Name",
                    coordinateX: 1147,
                    coordinateY: 668,
                    imageName: "First img",
                    imageId: 1,
                    line: 2,
                },
                {
                    fieldName: "Mothers Name",
                    coordinateX: 1575,
                    coordinateY: 674,
                    imageName: "First img",
                    imageId: 1,
                    line: 2,
                },
            ],
        },
        {
            lineNumber: 4,
            tagged: [
                {
                    fieldName: "First Name",
                    coordinateX: 344,
                    coordinateY: 211,
                    imageName: "second img",
                    imageId: 2,
                    line: 1,
                },
                {
                    fieldName: "Last Name",
                    coordinateX: 588,
                    coordinateY: 214,
                    imageName: "second img",
                    imageId: 2,
                    line: 1,
                },
                {
                    fieldName: "Fathers Name",
                    coordinateX: 377,
                    coordinateY: 312,
                    imageName: "second img",
                    imageId: 2,
                    line: 1,
                },
                {
                    fieldName: "Mothers Name",
                    coordinateX: 706,
                    coordinateY: 314,
                    imageName: "second img",
                    imageId: 2,
                    line: 1,
                },
                {
                    fieldName: "First Name",
                    coordinateX: 351,
                    coordinateY: 523,
                    imageName: "second img",
                    imageId: 2,
                    line: 2,
                },
                {
                    fieldName: "Last Name",
                    coordinateX: 653,
                    coordinateY: 519,
                    imageName: "second img",
                    imageId: 2,
                    line: 2,
                },
                {
                    fieldName: "Fathers Name",
                    coordinateX: 345,
                    coordinateY: 577,
                    imageName: "second img",
                    imageId: 2,
                    line: 2,
                },
                {
                    fieldName: "Mothers Name",
                    coordinateX: 697,
                    coordinateY: 594,
                    imageName: "second img",
                    imageId: 2,
                    line: 2,
                },
            ],
        },
        {
            lineNumber: 5,
            tagged: [
                {
                    fieldName: "First Name",
                    coordinateX: 1208,
                    coordinateY: 231,
                    imageName: "second img",
                    imageId: 1,
                    line: 1,
                },
                {
                    fieldName: "Last Name",
                    coordinateX: 1494,
                    coordinateY: 242,
                    imageName: "second img",
                    imageId: 1,
                    line: 1,
                },
                {
                    fieldName: "Fathers Name",
                    coordinateX: 1181,
                    coordinateY: 294,
                    imageName: "second img",
                    imageId: 1,
                    line: 1,
                },
                {
                    fieldName: "Mothers Name",
                    coordinateX: 1573,
                    coordinateY: 298,
                    imageName: "second img",
                    imageId: 1,
                    line: 1,
                },
                {
                    fieldName: "First Name",
                    coordinateX: 1192,
                    coordinateY: 556,
                    imageName: "second img",
                    imageId: 1,
                    line: 2,
                },
                {
                    fieldName: "Last Name",
                    coordinateX: 1409,
                    coordinateY: 557,
                    imageName: "second img",
                    imageId: 1,
                    line: 2,
                },
                {
                    fieldName: "Fathers Name",
                    coordinateX: 1167,
                    coordinateY: 611,
                    imageName: "second img",
                    imageId: 1,
                    line: 2,
                },
                {
                    fieldName: "Mothers Name",
                    coordinateX: 1578,
                    coordinateY: 607,
                    imageName: "second img",
                    imageId: 1,
                    line: 2,
                },
            ],
        },
    ]);
    const history = useHistory();

    //=====================================================
    //sideeffects and others start
    //=======================================================

    useEffect(() => {
        const currentImg = images[currentImgIndex].name;
        
        let filteredData = taggedDatas.filter((newItem) => {
            return newItem.tagged[0].imageName === currentImg;
        });

        setTaggedData(filteredData);
    }, [currentImgIndex]);

    useEffect(() => {
        document.title = "Data Entry | Data Keying  ";
    }, []);

    useEffect(() => {
        function handleKeyUp(event) {
            event.preventDefault();
            if (event.ctrlKey && event.keyCode === 113) {
                setOpenInp(true);
            }
        }

        window.addEventListener("keyup", handleKeyUp);

        return () => window.removeEventListener("keyup", handleKeyUp);
    });

    useEffect(() => {
        if (
            images[currentImgIndex + 1] !== undefined &&
            taggedData.length > 0 &&
            taggedData.length === currentIndex
        ) {
            setCurrentImgIndex(currentImgIndex + 1);
            setCurrentIndex(0);
        }
    }, [currentImgIndex, currentIndex, taggedData.length]);
    const handleCloseFields = () => {
        setOpenInp(false);
    };
    const handleClose = () => {
        setOpen(true);
        history.push("/");
    };

    useEffect(() => {         
        window.addEventListener("resize", settingRation);
        settingRation();
    }, [widthRatio,heightRatio]);

    //=====================================================
    //sideeffects and others end
    //=======================================================

    //=====================================================
    //Getting the height and width ratio start
    //=======================================================

    function settingRation(){
        var windowSize = document.querySelectorAll(".imgdiv");
        var w = windowSize[0].clientWidth;
        var h = windowSize[0].clientHeight;
        
        var myImg = document.querySelector("#imagesss");
        var realWidth = myImg.naturalWidth;
        var realHeight = myImg.naturalHeight;

        var widthRatios = w / realWidth;
        var heightRatios = h / realHeight;

        setWidthRatio(widthRatios);
        setHeightRatio(heightRatios);

        console.log("width Ratio" , widthRatio);
        console.log("height Ratio", heightRatio)
    }

    //=====================================================
    //Getting the height and width ratio end
    //=======================================================

    //=====================================================
    //changing input field position start
    //=======================================================

    const checkBoxChange = (e) => {
        const { value, checked } = e.target;

        const newArr = inputFields.map((field) => {
            if (field.fieldIndex === value) {
                if (checked === false) {
                    const removedField = customFields.filter(
                        (data) => data.fieldIndex !== field.fieldIndex
                    );

                    setCustomFields(removedField);
                } else if (checked === true) {
                    const addedField = inputFields.find(
                        (singleField) =>
                            singleField.fieldIndex === field.fieldIndex
                    );
                    customFields.push(addedField);
                }

                return { ...field, active: !field.active };
            } else {
                return field;
            }
        });

        setInputFields(newArr);
    };
    //=====================================================
    //changing input field position end
    //=======================================================

    //=====================================================
    //validadtion formating  end  date start
    //=======================================================

    const validateFunc = (field, value) => {
        const validEmailRegex = RegExp(
            /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        );

        const regexddmmyyyy =
            /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;

        // if (field == "certiNo") {
        //     if (!validEmailRegex.test(value)) {
        //         alert("Please enter  valid email address");
        //     }
        // } else if (field == "baptismDate") {
        //     if (!regexddmmyyyy.test(value)) {
        //         alert("Please enter  valid date format");
        //     }
        // }
    };
    //=====================================================
    //validadtion formating  end  date
    //=======================================================

    //=====================================================
    //click enter to goto next field start
    //=======================================================

    function handleEnter(event) {
        if (event.keyCode === 13 && !event.shiftKey) {
            event.preventDefault();
            validateFunc(event.target.name, event.target.value);
            const form = event.target.form;
            const index = Array.prototype.indexOf.call(form, event.target);

            index + 1 > inputFields.length - 1
                ? handleSubmit(event)
                : form.elements[index + 1].focus();
        }
        if (event.keyCode === 13 && event.shiftKey) {
            event.preventDefault();
            validateFunc(event.target.name, event.target.value);
            const form = event.target.form;
            const index = Array.prototype.indexOf.call(form, event.target);

            index == 0
                ? void(0)
                : form.elements[index - 1].focus();
        }

    }
    //=====================================================
    //click enter to goto next field end
    //=======================================================

    //=====================================================
    //get tagging vlues start
    //=======================================================

    const handleChanges = (e) => {
        const { name, value } = e.target;

        customFields.map((ek) => {
            if (ek.fieldName == name) {
                ek.inpVal = value;
            }
        });

        setEntryData({
            ...entryData,
            [name]: value,
        });
    };

    //=====================================================
    //get tagging vlues end
    //=======================================================

    //=====================================================
    //submitting vlues start
    //=======================================================

    const handleSubmit = (e) => {
        setQuery("");
        if (entryData) {
            setData([
                ...data,
                {
                    certiNo: entryData.certiNo ? entryData.certiNo : null,
                    baptismDate: entryData.baptismDate ? entryData.baptismDate : null,
                    givenName: entryData.givenName ? entryData.givenName : null,
                    surName: entryData.surName ? entryData.surName : null,
                    gender: entryData.gender ? entryData.gender : null,
                    birthDate: entryData.birthDate ? entryData.birthDate : null,
                    fgName: entryData.fgName ? entryData.fgName : null,
                    fsName: entryData.fsName ? entryData.fsName : null,
                },
            ]);
            setEntryData([]);
            var selectLastTag = document.querySelectorAll(".inputCls");
            selectLastTag.forEach((el) => (el.value = ""));

            if (taggedData.length > currentIndex) {
                setCurrentIndex((currentIndex) => currentIndex + 1);
            }
        }
        if (
            images[currentImgIndex + 1] === undefined &&
            taggedData.length - 1 === currentIndex
        ) {
            setOpen(true);
        }
        const form = e.target.form;
        form.elements[0].focus()

        handlefocus(
            taggedData[currentIndex+1]?.tagged[0]?.coordinateX,
            taggedData[currentIndex+1]?.tagged[0]?.coordinateY
        )

    };

    //=====================================================
    //submitting vlues end
    //=======================================================

    //=====================================================
    //for changing image if current image tagging is start
    //=======================================================

    //=====================================================
    //for changing image if current image tagging is finished
    //=======================================================

    //=====================================================
    //dragging div start
    //=======================================================

    //=====================================================
    //dragging div finished
    //=======================================================


    //=====================================================
    //tagging show on field focus start
    //=======================================================

    const handlefocus = (x, y) => {
        settingRation()
        const appendRef = canvRef.current;
        var canv = document.createElement("canvas");
        canv.style.position = "absolute";
        canv.style.left = x * widthRatio + "px";
        canv.style.top = y * heightRatio + "px";
        canv.style.background = "red";
        appendRef.appendChild(canv);
        var element = document.querySelector("canvas");
        appendRef.style.transform = "scale(" + 1.1 + ")";
        element.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
        });
        var selectLastTag = document.querySelectorAll("canvas");
        if (selectLastTag.length > 1) {
            appendRef.removeChild(selectLastTag[0]);
        }
        setTagIndex(tagIndex + 1);
        var taggNew = document.querySelector("canvas");
        taggNew.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
        });
    }

    //=====================================================
    //tagging show on field focus finished
    //=======================================================

    return (
        <>
            <div>
                <Sidebar></Sidebar>
                <FullScreen></FullScreen>
                <AlertBox
                    open={open}
                    onClose={handleClose}
                    header="No data to entry"
                    title="  Your entry is finished.To entry new data please tag
                    again"
                ></AlertBox>
                <AlertBox
                    open={openInp}
                    onClose={handleCloseFields}
                    header="Add remove fields"
                    inputFields={inputFields}
                    onChange={checkBoxChange}
                ></AlertBox>

                <Box
                    sx={{ flexGrow: 1, height: "70vh", overflow: "scroll" }}
                    ref={mainSectionRef}
                >
                    <Grid container spacing={2}>
                        <Grid item lg={12}>
                            <Box>
                                <div
                                    ref={canvRef}
                                    style={{ position: "relative" }}
                                    className="imgdiv"
                                >
                                    <img
                                        className="imageContainer"
                                        tabIndex="-1"
                                        ref={imgRef}
                                        src={images[currentImgIndex].location}
                                        alt="img"
                                        objectfit="cover"
                                        id="imagesss"
                                    />
                                </div>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Divider />
            </div>

            <div>
                <Box sx={{ flexGrow: 1, height: "20vh", m: 2 }}>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2} className="form-fields">
                            {customFields.map((field, i) => (
                                <Grid item lg={1} key={i}>
                                    <h6
                                        className="text-danger"
                                        style={{ height: "30px" }}
                                    >
                                        {field.inpVal ? field.inpVal : ""}
                                    </h6>
                                    <div className="d-block">
                                        <label>{field.labelName}</label>
                                        <input
                                            key={i}
                                            className="inputCls adaptive_input"
                                            autoComplete="off"
                                            type={field.inpType}
                                            onKeyDown={(e) =>
                                                handleEnter(e)
                                            }
                                            onChange={(e) => {
                                                handleChanges(e);
                                                setQuery(e.target.value);
                                                setCurrentField(e.target.name);
                                            }}
                                            name={field.fieldName}
                                            onFocus={() =>
                                                handlefocus(
                                                    taggedData[currentIndex]
                                                        ?.tagged[
                                                        field.fieldIndex - 1
                                                    ]?.coordinateX,
                                                    taggedData[currentIndex]
                                                        ?.tagged[
                                                        field.fieldIndex - 1
                                                    ]?.coordinateY
                                                )
                                            }
                                            //value={field.inpVal}
                                            //ref={inputRef}
                                        ></input>
                                        {currentField === field.fieldName &&
                                            query !== "" &&
                                            field.searchField && (
                                                <SearchBar
                                                    currentField={currentField}
                                                    query={query}
                                                ></SearchBar>
                                            )}
                                    </div>
                                </Grid>
                            ))}
                        </Grid>
                    </form>
                </Box>
            </div>
        </>
    );
}
