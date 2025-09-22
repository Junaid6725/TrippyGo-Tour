import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const packingItems = [
  "Original CNIC/Passport with valid visa",
  "Comfortable walking shoes",
  "Weather-appropriate clothing",
  "Personal medication and first aid",
  "Reusable water bottle",
  "Power bank and charging cables",
  "Sunscreen and sunglasses",
  "Personal hygiene items",
  "Camera or smartphone for photos",
  "Lightweight backpack for day trips",
];

const PackingList = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const checkIconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { duration: 0.4, ease: "backOut" },
    },
  };

  return (
    <section className=" px-4 py-12 md:px-16">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-300"
            variants={headingVariants}
          >
            Recommended Packing List
          </motion.h2>
          <motion.p
            className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm leading-relaxed"
            variants={headingVariants}
            transition={{ delay: 0.2 }}
          >
            Pack light! While help may be available, bulky luggage is difficult
            to manage in Pakistan's terrain. Use a backpack and a daypack, and
            always carry your original CNIC or passport with a valid visa.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-end"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {packingItems.map((item, index) => (
            <motion.div
              key={index}
              className="flex items-start gap-3"
              variants={itemVariants}
              whileHover={{
                x: 5,
                transition: { duration: 0.2 },
              }}
            >
              <motion.div
                variants={checkIconVariants}
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaCheckCircle className="text-blue-500 dark:text-blue-400 mt-1" />
              </motion.div>
              <p className="text-gray-700 dark:text-gray-200 text-sm md:text-base">
                {item}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          viewport={{ once: true }}
        >
          * Adjust this list based on your tour type and personal preferences.
        </motion.p>
      </div>
    </section>
  );
};

export default PackingList;
