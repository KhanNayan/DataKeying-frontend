import React, { useRef, useState, useEffect } from 'react';

const HideMenuOnClick = () => {
    const ref = useRef(null);
    const [open, setOpen] = useState();

    const handleClickOutside = (event) => {
        console.log(ref);
        if (ref.current && !ref.current.contains(event.target)) setOpen(false);
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    }, [ref]);

    return { open, setOpen, ref }
}

export default HideMenuOnClick;