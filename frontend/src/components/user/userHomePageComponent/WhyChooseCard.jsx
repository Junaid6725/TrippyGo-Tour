import React from "react";
import { IoDiamond } from "react-icons/io5";
import { LiaMedalSolid } from "react-icons/lia";
import { MdAirplaneTicket } from "react-icons/md";
import { TbAirBalloon } from "react-icons/tb";
import { ourSpecialty } from "../../../data";

const WhyChooseCard = () => {
  const iconList = {
    MdAirplaneTicket: MdAirplaneTicket,
    TbAirBalloon: TbAirBalloon,
    IoDiamond: IoDiamond,
    LiaMedalSolid: LiaMedalSolid,
  };

  return (
    <>
      {ourSpecialty.map((item, index) => {
        const IconComponent = iconList[item.icon];

        return (
          <div
            key={index}
            className="flex flex-row sm:flex-col items-start sm:items-center text-center sm:text-center gap-4"
          >
            <div className="text-purple-600 text-4xl sm:mb-2">
              {IconComponent ? <IconComponent /> : null}
            </div>
            <div className="text-left sm:text-center">
              <h1 className="text-lg font-semibold text-gray-800 mb-1">
                {item.title}
              </h1>
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default WhyChooseCard;
