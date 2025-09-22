import React from "react";

import CommonHeroSection from "./../../components/user/shared/CommonHeroSection";
import PackList from "../../components/user/whatToPackPageComponent/PackList";

const WhatToPack = () => {
  return (
    <>
      <CommonHeroSection title="Packing List" />
      <PackList />
    </>
  );
};

export default WhatToPack;
