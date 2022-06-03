import s from "./SavePDFButton.module.css";
import img from "../../static/images/download.svg";
import { saverToPDF } from "../../Helpers/SaverToPDF";

const SavePDFButton = ({ theme }: { theme: string }) => {
    return (
        <div className={s.button} onClick={() => saverToPDF(theme)}>
            <div className={s.text}>PDF</div>
            <img className={s.img} src={img} alt="" />
        </div>
    );
};

export default SavePDFButton;
