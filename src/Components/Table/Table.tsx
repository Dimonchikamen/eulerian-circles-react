import Table from "react-bootstrap/Table";
import styles from "./Table.module.css";

interface ITable {
  headers: string[];
  data: (string[] | number[])[];
}

const TableConstructor = (props: ITable) => {
  console.log(props.headers);
  return (
    <div className={styles.container}>
      <div className={styles.tableTitle}>ТАБЛИЦА ИСТИННОСТИ</div>
      <Table striped bordered responsive size="sm">
        {/* <caption><h3>Таблица истинности</h3></caption> */}
        <thead>
          <tr>
            {props.headers.map((header, index) => {
              return (
                <th key={`header-${index}`} className={styles.cell}>
                  {header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {props.data.map((elem, rowIndex) => {
            return (
              <tr key={`row-${rowIndex}`}>
                {elem.map((value, dataIndex) => {
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
