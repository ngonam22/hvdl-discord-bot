import { Slider, Input, Form, type FormProps} from "antd";
import { useEffect, useState } from "react"
import { rollDice, type RollResult } from '@hldv/hldv-utility';
import { owlbearStore } from "@stores/owlbear";
import { collection, addDoc } from "firebase/firestore";
import {db} from "@/utils/firebase";
import {generateWords} from '@/utils/randomWord'
import OBR from "@owlbear-rodeo/sdk";

function renderButton({ times, rollDice }: { times: number, rollDice: () => void }) {
    return (
        <div className="text-center mb-4 text-black">
            <button className="flex space-x-1 mx-auto items-center" onClick={rollDice}>
                <img src="https://witchdice.com/static/media/d6.7948cd9e.svg" width={50} height={50} />
                <span>x</span>
                <span className="tabular-nums">{times}</span>
            </button>
        </div>
    )
}

function RenderResult({ result, onReset }: { result?: RollResult, onReset: () => void }) {
    const [isRolling, setIsRolling] = useState(false);

    // Trigger animation when result changes
    useEffect(() => {
        setIsRolling(true);
        const timer = setTimeout(() => setIsRolling(false), 250);
        return () => clearTimeout(timer);
    }, [result]);

    if (!result)
        return

    return (
        <div className="flex justify-center items-center">
            <div className="relative border border-red-900 rounded text-black mb-4 shadow-lg py-2 px-4">

                <button type="button"
                    className="absolute -top-2 -right-2 bg-white rounded-md p-1 inline-flex items-center justify-center text-danger hover:text-maroon hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-danger"
                    onClick={onReset}
                >
                    <span className="sr-only">Close menu</span>
                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="flex">
                    <h2 className="px-4">
                        Âm:
                        <strong className={`${isRolling ? 'dice-rolling-anim' : ''} inline-block text-2xl ml-1 text-maroon tabular-nums`}>{result.amResult}</strong>
                    </h2>
                    <h2 className="px-4">
                        Bình:
                        <strong className={`${isRolling ? 'dice-rolling-anim' : ''} inline-block text-2xl ml-1 text-purple tabular-nums`}>{result.binhResult}</strong>
                    </h2>
                    <h2 className="px-4">
                        Dương:
                        <strong className={`${isRolling ? 'dice-rolling-anim' : ''} inline-block text-2xl ml-1 text-teal tabular-nums`}>{result.duongResult}</strong>
                    </h2>
                </div>
                <div className="text-center px-4 text-sm">
                    Roll: {result.rolls.map(val => val.value).join(',')}
                </div>
            </div>
        </div>
    )
}

function RenderOwlbearSettings() {
    const {roomName, playerName, updateRoom, updatePlayerName, metadataKey} = owlbearStore(state => state)
    
    const [form] = Form.useForm()

    const onFinish: FormProps['onFinish'] = (values: any) => {
        console.log('submitted')
        console.log(values)
        updatePlayerName(values.playerName)
        updateRoom(values.roomName)
        OBR.room.setMetadata({
            [metadataKey]: {
                roomName: values['roomName']
            }
        })
    }

    useEffect(() => {
        const formVals: any = {}

        if (roomName !== '') {
            formVals['roomName'] = roomName
        }

        if (playerName !== '') {
            formVals['playerName'] = playerName
        }

        form.setFieldsValue(formVals)
    }, [roomName, playerName, form])

    if (roomName !== '' && playerName !== '') {
        return
    }

    const randomRoomName: string = generateWords(3, '-')

    return (
        <div className="rounded bg-beige-200 m-2 mt-4 p-4">
            <Form 
                form={form}
                name="metadata" autoComplete="off" 
                onFinish={onFinish}
                initialValues={{
                    roomName: randomRoomName,
                    playerName
                }}
            >
                <div>Chao {roomName} - {playerName}</div>
                <div className="text-left items-center bg-beige-100 border-red-900 rounded text-black py-2 mb-4 shadow-lg py-2 px-4">
                    <div className="flex mb-2 space-x-2 items-center">
                        <span className="w-1/2">
                            Tên Phòng:
                        </span>
                        <Form.Item name="roomName"
                            rules={[{required: true}]}
                            className="w-10/12 mb-0" 
                        >
                            <Input />
                        </Form.Item>
                        
                    </div>

                    <div className="flex space-x-2 items-center">
                        <span className="w-1/2">Tên người dùng:</span>
                        <Form.Item name="playerName" className="w-10/12 mb-0">
                            <Input />
                        </Form.Item>
                    </div>

                    <div className="text-center mt-2">
                        <button type="submit" className="btn-default mx-auto">Kết nối</button>
                    </div>
                </div>
            </Form>
        </div>
        
    )
}

function RenderCurrentInfo() {
    const {roomName, playerName} = owlbearStore(state => state)

    if (!roomName || !playerName) {
        return
    }

    return (
        <div className="rounded bg-beige-200 m-2 mt-4 p-4 text-black text-sm">
            Player: {playerName}<br />
            Phòng: {roomName}
        </div>
    )
}

export default function HomePage() {
    const [times, setTimes] = useState(1);
    const [result, setResult] = useState<RollResult | null>()
    const { getRollCollectionName, formatToRollResultFirestore } = owlbearStore.getState();

    const timesSliderChange = (val: number) => {
        setTimes(val)
    }

    const btnClicked = async () => {
        const result: RollResult = rollDice(times);
        const fireStoreResult = formatToRollResultFirestore(result)
        

        const collectionRef = collection(db, getRollCollectionName());
        await addDoc(collectionRef, fireStoreResult);

        setResult(result)
    }

    const renderTopBlock = () => {
        if (result)
            return <RenderResult result={result} onReset={() => setResult(null)} />

        return renderButton({
            times,
            rollDice: btnClicked
        })
    }

    return (
        <>
            <RenderOwlbearSettings />

            <div className="rounded bg-beige-200 m-2 mt-4 p-4">
                {renderTopBlock()}

                <p className="text-black">Số lượng Dice:</p>
                <Slider
                    defaultValue={1} min={1} max={6}
                    onChange={timesSliderChange}
                    className="mb-6"
                />

                <div className="text-center px-4 text-sm">
                    <button type="button"
                        className="bg-danger hover:bg-maroon text-white font-bold py-2 px-6 rounded"
                        onClick={btnClicked}
                    >
                        ROLL
                    </button>
                </div>
            </div>

            <RenderCurrentInfo />
            
        </>
        
    )
}