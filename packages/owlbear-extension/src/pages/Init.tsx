import { Table, Input, InputNumber, Form } from 'antd';
import type { TableProps } from 'antd';
import React, { useState } from 'react';

interface DataType {
    key: string;
    name: string;
    sucLuc: number;
    init: number;
}
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: string;
    inputType: 'number' | 'text';
    record: DataType;
    index: number;
    ceilClass?: string
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
    editing,
    dataIndex,
    ceilClass,
    // title,
    inputType,
    // record,
    // index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

    if (ceilClass) {
        restProps['className'] += ` ${ceilClass}`
    }

    return (
        <td {...restProps}>
            {
                editing ? (
                    <Form.Item
                        name={dataIndex}
                        className='m-0'
                    >
                        {inputNode}
                    </Form.Item>
                ) : children
            }
        </td>
    )
}
type ColumnTypes = Exclude<TableProps<DataType>['columns'], undefined>;



export default function InitPage() {


    const [data, setData] = useState<DataType[]>([
        { key: '2', name: 'hello 12', sucLuc: 6, init: 1 }
    ])
    const [round, setRound] = useState<number>(0)
    const [turn, setTurn] = useState<number>(0)


    const [form] = Form.useForm()
    const [editingKey, setEditingKey] = useState('')
    const isEditing = (record: DataType) => record.key === editingKey
    const cancel = () => {
        setEditingKey('');
    };

    const edit = (record: Partial<DataType> & { key: React.Key }) => {
        form.setFieldsValue({
            init: record.init,
            name: record.name,
            sucLuc: record.sucLuc
        })
        setEditingKey(record.key)
    }

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

    const defaultColumns: (ColumnTypes[number] & { 
        editable?: boolean; 
        dataIndex: string;
        ceilClass?: string
    })[] = [
        {
            title: 'Init',
            dataIndex: 'init',
            key: 'init',
            ceilClass: 'w-1/6',
            editable: true,
            sorter: {
                compare: (a: DataType, b: DataType) => parseInt(a.key) - parseInt(b.key)
            },
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            ceilClass: 'w-3/6 break-all',
            editable: true,
            render: (text: string) => <p className="break-all">{text}</p>,
        },
        {
            title: 'Sức Lực',
            dataIndex: 'sucLuc',
            key: 'sucLuc',
            ceilClass: 'w-1/6',
            editable: true,
            render: (text: string) => <>{text}</>,
        },
        {
            title: 'Xóa',
            dataIndex: '',
            key: 'delete',
            ceilClass: 'w-1/6',
            render: (_: any, record: DataType) => {
                const editable = isEditing(record);

                return editable ? (
                    <span>
                        <button type="button" onClick={cancel}>Cancel</button>
                    </span>
                ) : (
                    <>
                        <button type="button" disabled={editingKey !== ''} onClick={() => edit(record)}>Edit</button>
                        <button onClick={() => removeRow(record.key)}>Xóa</button>
                    </>
                )
            }
        }
    ]

    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record: DataType) => ({
                ceilClass: col?.ceilClass,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col?.dataIndex,
                editing: isEditing(record)
            }),

        };
    });
    // const rowHandler = ({ index, ...props }) => {
    //     return (
    //         <tr {...props} />
    //     )
    // }


    // const updateFormValue = (event, fieldName: string, fieldKey: string) => {

    //     const newData = data.map(val => {
    //         if (val.key !== fieldKey) {
    //             return val
    //         }

    //         return { ...val, ...{ [fieldName]: event.target.value } }
    //     })
    //     setData(newData)
    // }
    const components = {
        body: {
            cell: EditableCell,
            // row: rowHandler
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
        <div className="rounded bg-beige-300 m-2 mt-4 p-4">
            <div className="text-xl text-black mb-3 flex">
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

            <Form form={form} component={false}>
                <Table
                    components={components}
                    columns={columns as ColumnTypes}
                    dataSource={data}
                    className="highlighted-table shadow"
                    pagination={false}
                    rowClassName={(_, index) => {
                        return index === turn ? 'bg-red-200' : ''
                    }}
                />
            </Form>


            <div className="flex mt-3 space-x-5">
                <button type='button' className='btn-default' onClick={addMore}>Thêm Đối Tượng</button>

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