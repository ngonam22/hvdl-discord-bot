import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { owlbearStore, type RollHistory, type RollResultFirestore } from "@stores/owlbear";
import {db} from "@/utils/firebase"
import OBR from "@owlbear-rodeo/sdk";

type DbRolls = { [id: string]: RollHistory };

export default function HistoryPage() {
    const [history, setHistory] = useState<DbRolls>({});

    useEffect(() => {
        // Initialize the Firebase database with the provided configuration

        const { getRollCollectionName, formatToRollHistory } = owlbearStore.getState();

        // Reference to the specific collection in the database
        

        const fetchData = async function () {
            const collectionRef = query(collection(db, getRollCollectionName()), orderBy('timestamp', 'desc'), limit(5));
            const snapShot = await getDocs(collectionRef);
            snapShot.forEach(doc => {
                
                setHistory((prevHistory) => ({
                    ...prevHistory,
                    [doc.id]: formatToRollHistory(doc.data() as RollResultFirestore),
                }));
                

            })
        }

        // Fetch data when the component mounts
        fetchData();
    }, [setHistory]);

    function formatTime(timestamp: number) {
        const date = new Date(timestamp);
        return new Intl.DateTimeFormat('vi-VN', {
            year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit',
            hour12: false
        }).format(timestamp)
    }

    return (
        <div className="rounded bg-beige-200 m-2 mt-4 p-4 text-black">
            <h1 className="text-xl text-black">Lịch sử</h1>

            <div className="mt-4 flex space-y-4 flex-col">
                {Object.values(history).map((rollHistory, index) => (
                    <div key={index} className="bg-beige-300 rounded-lg p-2 pb-3 pl-5 overflow-hidden relative shadow hover:shadow-xl border border-transparent hover:border-beige-600">
                        <div className="absolute w-1.5 top-0 bottom-0 left-0 bg-beige-600"></div>
                        <div className="flex items-baseline space-x-2">
                            <h2 
                                className="text-base truncate first-line:uppercase first-letter:font-daybreaker first-letter:text-4xl first-letter:mr-0 first-line:tracking-widest"
                                title={rollHistory.playerName}
                            >
                                {rollHistory.playerName}
                            </h2>
                            <span>-</span>
                            <small className="">{formatTime(rollHistory.timestamp)}</small>
                        </div>
                        <div className="flex space-x-8">
                            <h2>
                                Dương:
                                <strong className={`inline-block text-2xl ml-1 text-teal tabular-nums`}>{rollHistory.data.duongResult}</strong>
                            </h2>
                            <h2>
                                Bình:
                                <strong className={`inline-block text-2xl ml-1 text-purple tabular-nums`}>{rollHistory.data.binhResult}</strong>
                            </h2>
                            <h2>
                                Âm:
                                <strong className={`inline-block text-2xl ml-1 text-maroon tabular-nums`}>{rollHistory.data.amResult}</strong>
                            </h2>
                            
                        </div>
                        <h2 className="text-base text-black">
                            <small>Roll:</small> 
                            {rollHistory.data.rolls.map(val => val.value).join(',')}
                        </h2>
                        
                    </div>
                ))}
            </div>
        </div>
    )
}