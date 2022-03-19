import "./App.css";
import EulerCircles from "./Components/EulerCircles";
import PageHeader from "./Components/PageHeader/PageHeader";
import { css } from "@emotion/css";

function App() {
  return (
    <>
      <div className={styles.wrapper}>
        <PageHeader />
        <EulerCircles />
      </div>
    </>
  );
}

const styles = {
  wrapper: css`
    width: 90%;
    margin: 0 auto;
    height: 100vh;
  `,
};
export default App;
