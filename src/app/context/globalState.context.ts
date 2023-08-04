import { createContext, useEffect, useState } from "react";
import { testConnection } from "../services/weather.service";

const init = async () =>{
    let connectionStatus;
    let res = await testConnection().then(res => connectionStatus = res);

    return {
        AuthorisationStatus:connectionStatus
    };
}

const getInitialState = () => {
    return init();
}

export const globalStateContext = createContext(getInitialState());