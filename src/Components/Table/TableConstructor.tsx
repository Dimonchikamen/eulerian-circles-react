import Table from "react-bootstrap/Table";
import styles from "./TableConstructor.module.css";

interface ITable {
    title: string;
    headers: string[];
    data: number[][];
    isLogicalSolver: boolean;
}

const TableConstructor: React.FC<ITable> = ({ title, headers, data, isLogicalSolver }) => {
    console.log(headers);
    const filterColumns = (h: any, i: number, t: any[]) => isLogicalSolver && i !== t.length - 1;

    return (
        <div className={styles.container}>
            <div className={styles.tableTitle}>{title}</div>
            <Table striped bordered responsive size="sm">
                <thead>
                    <tr>
                        {headers.filter(filterColumns).map((header, index) => {
                            return (
                                <th key={`header-${index}`} className={styles.cell}>
                                    {header}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data.map((elem, rowIndex) => {
                        return (
                            <tr key={`row-${rowIndex}`}>
                                {elem.filter(filterColumns).map((value, dataIndex) => {
                                    return (
                                        <td
                                            key={`row-${rowIndex}-data-${dataIndex}`}
                                            className={styles.cell}
                                        >
                                            {value}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
};

export default TableConstructor;
