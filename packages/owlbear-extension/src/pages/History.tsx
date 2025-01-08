import { rollStore } from "@stores/roll";

export default function HistoryPage() {
    const { counter } = rollStore()

    return (
        <h1>
            History page + {counter}
        </h1>
    )
}