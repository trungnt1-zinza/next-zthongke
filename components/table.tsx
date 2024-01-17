import React from 'react';

interface TableRow {
    name: string;
    count: number;
}

interface TableProps {
    data: TableRow[];
}

const Table: React.FC<TableProps> = ({ data }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Tham gia</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row: TableRow, index: number) => (
                    <tr key={index}>
                        <td>{row.name}</td>
                        <td>{row.count}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
                   };
export default Table;
