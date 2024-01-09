import React, { useContext } from "react";
import { AppStateContext } from "../contexts/AppStateContext";

const useAppState = () => {
    return useContext(AppStateContext)
}

export default useAppState