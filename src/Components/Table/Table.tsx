import Table from "react-bootstrap/Table";
import styles from "./Table.module.css";

interface ITable {
  headers: string[];
  data: number[][];  
  filterValue: boolean;
}

const TableConstructor: React.FC<ITable> = ({ headers, data, filterValue }) => {
  console.log(headers);  
  const filterColumns = (h: any,i: number,t: any[])=> filterValue == null || (filterValue != null && i != t.length-1);
  const filterRows = (row: number[])=> Boolean(row[row.length-1]) == filterValue;

  return (
    <div className={styles.container}>
      <div className={styles.tableTitle}>ТАБЛИЦА ИСТИННОСТИ</div>
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
          {data
            .filter(filterRows)
            .map((elem, rowIndex) => {
            return (
              <tr key={`row-${rowIndex}`}>
                {elem                  
                  .filter(filterColumns).map((value, dataIndex) => {
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
