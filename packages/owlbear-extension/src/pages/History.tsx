import { useEffect, useState } from "react";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { owlbearStore } from "@stores/owlbear";
import cong from "@/utils/firebase"
import { calculateFromRolls, type Roll, type RollResult} from '@hldv/hldv-utility'
import OBR from "@owlbear-rodeo/sdk";

type DbRolls = { [id: string]: RollResult };

export default function HistoryPage() {
    const [history, setHistory] = useState<DbRolls>({});

    useEffect(() => {
        // Initialize the Firebase database with the provided configuration
        const database = getFirestore(cong);

        const { getRollCollectionName } = owlbearStore.getState();

        // Reference to the specific collection in the database
        

        const fetchData = async function () {
            console.log('===----=--=--=')
            console.log(await OBR.room.getMetadata())
            console.log('=-=-=----')
            const collectionRef = collection(database, getRollCollectionName());
            const snapShot = await getDocs(collectionRef);
            snapShot.forEach(doc => {
                const data = doc.data();
                const rollHistory = calculateFromRolls(data?.rolls as Roll[])
                
                setHistory((prevHistory) => ({
                    ...prevHistory,
                    [doc.id]: rollHistory,
                }));
                

            })
        }

        // Fetch data when the component mounts
        fetchData();
    }, [setHistory]);

    return (
        <div className="rounded bg-beige-200 m-2 mt-4 p-4 text-black">
            <h1 className="text-xl text-black">Lịch sử</h1>

            <div className="mt-4 flex space-y-4 flex-col">
                {Object.values(history).map((rollHistory, index) => (
                    <div key={index} className="bg-beige-300 rounded-lg p-3 pb-4 pl-5 overflow-hidden relative shadow hover:shadow-xl border border-transparent hover:border-beige-600">
                        <div className="absolute w-1.5 top-0 bottom-0 left-0 bg-beige-600"></div>
                        <div className="flex space-x-8">
                            <h2>
                                Dương:
                                <strong className={`inline-block text-2xl ml-1 text-teal tabular-nums`}>{rollHistory.duongResult}</strong>
                            </h2>
                            <h2>
                                Bình:
                                <strong className={`inline-block text-2xl ml-1 text-purple tabular-nums`}>{rollHistory.binhResult}</strong>
                            </h2>
                            <h2>
                                Âm:
                                <strong className={`inline-block text-2xl ml-1 text-maroon tabular-nums`}>{rollHistory.amResult}</strong>
                            </h2>
                            
                        </div>
                        <h2 className="text-base text-black">
                            <small>Roll:</small> 
                            {rollHistory.rolls.map(val => val.value).join(',')}
                        </h2>

                    </div>
                ))}
            </div>
        </div>
    )
}