import React, { useState } from "react";
import Image from "next/image";
import styles from "./Card.module.css";

import Logo from "../../../../../../public/images/avatars/1.png";
import Profile1 from "../../../../../../public/images/avatars/2.png";
import Profile2 from "../../../../../../public/images/avatars/3.png";
import Profile3 from "../../../../../../public/images/avatars/4.png";

const Card = () => {
  const [showActions, setShowActions] = useState(false);

  const handleToggleActions = () => {
    setShowActions(!showActions);
  };

  return (
    <div className={styles.card}>
      <div className={styles.profile}>
        <div className={styles.profiles}>
          <Image src={Logo} alt="Profile Image" width={80} height={80} />
        </div>
        <div className={styles.title}>HR and Administration</div>
      </div>
      <div className={styles.profiles}>
        <Image src={Profile1} alt="Profile 1" width={80} height={80} />
        <Image src={Profile2} alt="Profile 2" width={80} height={80} />
        <Image src={Profile3} alt="Profile 3" width={80} height={80} />
        {/* Add more profile images as needed */}
      </div>
      <div className={styles.dots} onClick={handleToggleActions}>
        <span></span>
        <span></span>
        <span></span>
        {showActions && (
          <div className={styles.actions}>
            <div className={styles.action}>Edit Department</div>
            <div className={styles.action}>Assign Resource</div>
            <div className={styles.action} style={{ color: "red" }}>
              Delete Department
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
