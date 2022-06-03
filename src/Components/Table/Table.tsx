import Table from "react-bootstrap/Table";
import s from "./Table.module.css";

interface ITable {
  headers: string[];
  data: number[][];
  filterValue: boolean;
}

const TableConstructor: React.FC<ITable> = ({ headers, data, filterValue }) => {
  console.log(headers);
  const filterColumns = (h: any, i: number, t: any[]) =>
    filterValue == null || (filterValue != null && i != t.length - 1);
  const filterRows = (row: number[]) =>
    Boolean(row[row.length - 1]) == filterValue;

  return (
    <div className={s.container} id="capture_table">
      <div className={s.tableTitle}>ТАБЛИЦА ИСТИННОСТИ</div>
      <Table striped bordered responsive size="sm" className={s.table}>
        <thead>
          <tr>
            {headers.filter(filterColumns).map((header, index) => {
              return (
                <th key={`header-${index}`} className={s.cell}>
                  {header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.filter(filterRows).map((elem, rowIndex) => {
            return (
              <tr key={`row-${rowIndex}`}>
                {elem.filter(filterColumns).map((value, dataIndex) => {
                  return (
                    <td
                      key={`row-${rowIndex}-data-${dataIndex}`}
                      className={s.cell}
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
