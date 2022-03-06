import "./App.css";
import EulerCircles from "./components/EulerCircles";
import PageHeader from "./components/PageHeader/PageHeader";
import { css } from "@emotion/css";

function App() {
  return (
    <>
      <PageHeader />
      <div className={styles.wrapper}>
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
