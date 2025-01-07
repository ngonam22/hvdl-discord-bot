import { Slider } from "antd";
import { useState } from "react"

export default function HomePage() {
    const [times, setTimes] = useState(1);

    const timesSliderChange = (val: number) => {
        setTimes(val)
    }

    return (
        <div className="rounded bg-slate-300 m-2 mt-4 p-4">
            <div className="text-center mb-4">
                <button className="flex space-x-1 mx-auto items-center">
                    <img src="https://witchdice.com/static/media/d6.7948cd9e.svg" width={50} height={50} />
                    <span>x</span>
                    <span className="tabular-nums">{times}</span>
                </button>
            </div>

            <Slider defaultValue={1} min={1} max={6} onChange={timesSliderChange} />
        </div>
    )
}