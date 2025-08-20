import React from "react";
import styles from "./LoadingScreen.module.css";

const LoadingScreen: React.FC<{component:string}> = ({component}) => {
    return (
        <div className={styles.container}>
            <div className={styles.spinner}></div>
            <p className={styles.text}>Loading {component}...</p>
        </div>
    );
};

export default LoadingScreen;
