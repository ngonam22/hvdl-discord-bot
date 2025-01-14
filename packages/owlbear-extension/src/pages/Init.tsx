import { Table, Input } from 'antd';
import type { TableProps, ColumnType } from 'antd';
import { useState } from 'react';

interface DataType {
    key: string;
    name: string;
    sucLuc: number;
    init: number;
}
type ColumnTypes = Exclude<TableProps<DataType>['columns'], undefined>;
type ExtendedColumnTypes = ColumnTypes[number] & {
    ceilClass?: string
}
type ExtendedCeilProps = {
    ceilClass?: string
}


export default function InitPage() {


    const [data, setData] = useState<DataType[]>([
        { key: '2', name: 'hello 12', sucLuc: 6, init: 1 }
    ])
    const [round, setRound] = useState<number>(0)
    const [turn, setTurn] = useState<number>(0)

    const addMore = () => {
        const id = Math.random().toString()
        const lastElem = data[data.length - 1]
        console.log(lastElem)
        setData([
            ...data,
            { key: id, name: 'hello' + id, sucLuc: 4, init: +lastElem?.init + 1 }
        ])
    }

    const removeRow = (key: string) => {
        setData(data.filter(val => val?.key !== key))
    }

    const defaultColumns: ExtendedColumnTypes[] = [
        {
            title: 'Init',
            dataIndex: 'init',
            key: 'init',
            ceilClass: 'w-1/6',
            sorter: {
                compare: (a, b) => parseInt(a.key) - parseInt(b.key)
            },
            render: (text: string) => <i>{text}</i>
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            ceilClass: 'hello',
            render: (text) => <Input value={text} />,
        },
        {
            title: 'Sức Lực',
            dataIndex: 'sucLuc',
            key: 'sucLuc',
            ceilClass: 'hello',
            render: (text) => <>{text}</>,
        },
        {
            title: 'Xóa',
            dataIndex: '',
            key: 'delete',
            ceilClass: 'hello',
            render: (_, record) => <button onClick={() => removeRow(record.key)}>Xóa</button>
        }
    ]

    const columns = defaultColumns.map((col) => {
        return {
            ...col,
            onCell: () => ({
                ceilClass: col?.ceilClass,
            }),

        };
    });
    const rowHandler = ({ index, ...props }) => {
        return (
            <tr {...props} />
        )
    }

    // const EditableCell: React.FC<React.PropsWithChildren<ExtendedCeilProps>> = ({
    //     children,
    //     ceilClass,
    //     ...restProps
    // }) => {

    //     restProps['className'] += ceilClass !== '' ? ` ${ceilClass}` : ''
    //     return <td {...restProps}>{children}</td>
    // }

    const updateFormValue = (event, fieldName: string, fieldKey: string) => {

        const newData = data.map(val => {
            if (val.key !== fieldKey) {
                return val
            }

            return { ...val, ...{ [fieldName]: event.target.value } }
        })
        setData(newData)
    }
    const components = {
        body: {
            // cell: EditableCell,
            row: rowHandler
        },
    };

    const increaseRound = function () {
        setRound(round + 1)
    }
    const resetRound = function () {
        setRound(0)
        setTurn(0)
    }

    const increaseTurn = function () {
        if (turn < data.length - 1) {
            setTurn(turn + 1)
            return;
        }

        setTurn(0)
        increaseRound()
    }

    return (
        <div className="rounded bg-beige m-2 mt-4 p-4">
            <div className="text-xl text-black mb-4 flex">
                <div>
                    <span>Ván đấu:</span> <strong>{round}</strong>
                </div>
                <div className="ml-auto">
                    <button type='button'
                        className='bg-slate-400 hover:bg-slate-600 text-white font-bold py-1 px-3 rounded'
                        onClick={resetRound}
                    >
                        Reset
                    </button>
                </div>
            </div>

            <Table
                components={components}
                columns={columns as ColumnTypes}
                dataSource={data}
                className="highlighted-table"
                pagination={false}
                rowClassName={(_, index) => {
                    return index === turn ? 'bg-red-200' : ''
                }}
            />

            <div className="flex mt-3 space-x-5">
                <button type='button' onClick={addMore}>Thêm Đối Tượng</button>

                <button type='button'
                    className='bg-danger hover:bg-maroon text-white font-bold py-1 px-3 rounded'
                    onClick={increaseTurn}
                >
                    Lượt tiếp theo
                </button>

            </div>


        </div>
    )
}