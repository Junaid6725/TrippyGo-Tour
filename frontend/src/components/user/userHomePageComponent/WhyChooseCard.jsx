import React from "react";
import { IoDiamond } from "react-icons/io5";
import { LiaMedalSolid } from "react-icons/lia";
import { MdAirplaneTicket } from "react-icons/md";
import { TbAirBalloon } from "react-icons/tb";
import { ourSpecialty } from "../../../data";
import { motion } from "framer-motion";

const WhyChooseCard = () => {
  const iconList = {
    MdAirplaneTicket: MdAirplaneTicket,
    TbAirBalloon: TbAirBalloon,
    IoDiamond: IoDiamond,
    LiaMedalSolid: LiaMedalSolid,
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.2,
        ease: "easeOut",
      },
    }),
  };

  return (
    <>
      {ourSpecialty.map((item, index) => {
        const IconComponent = iconList[item.icon];

        return (
          <motion.div
            key={index}
            className="flex flex-row sm:flex-col items-start sm:items-center text-center gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            custom={index}
          >
            <div className="text-blue-600 text-4xl sm:mb-2">
              {IconComponent ? <IconComponent /> : null}
            </div>
            <div className="text-left sm:text-center">
              <h1 className="text-lg font-semibold text-gray-900 mb-1">
                {item.title}
              </h1>
              <p className="text-gray-700 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        );
      })}
    </>
  );
};

export default WhyChooseCard;
