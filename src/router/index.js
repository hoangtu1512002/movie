import {Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Detail from "../pages/Detail";
import CataLog from "../pages/CataLog";

const Router = () => {
    return (
        <Routes>
            <Route path="/:category/search/:keyword" element={<CataLog/>}></Route>
            <Route path="/:category" element={<CataLog/>}></Route>
            <Route path="/:category/:id" element={<Detail/>}></Route>
            <Route path="/" element={<Home/>}></Route>
        </Routes>
    )
}

export default Router;