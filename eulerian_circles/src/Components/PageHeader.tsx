import React from "react";
import { css } from "@emotion/css";

const PageHeader = () => {
  return <div className={styles.header}>PageHeader</div>;
};

const styles = {
  header: css`
    height: 25%;
    padding-top: 2rem;
    box-sizing: border-box;
  `,
};

export default PageHeader;
