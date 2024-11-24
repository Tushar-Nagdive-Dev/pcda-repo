import React, {useEffect, useState} from "react";
import { intial } from "../services/apiService";

const HOME = () => {
    const [msg, setMsg] = useState("");

    useEffect(() => {
        intial()
            .then((data) => setMsg(data))
            .catch((error) => console.error(error))
    }, []);

    return <h1>{ msg || 'Loading.....' }</h1>
};

export default HOME;