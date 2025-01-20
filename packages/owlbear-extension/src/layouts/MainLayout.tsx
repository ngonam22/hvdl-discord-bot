import { Outlet } from "react-router";
import Nav from "../components/layouts/MainLayout/Nav";
import OBR from "@owlbear-rodeo/sdk";
import { useEffect } from "react";
import { owlbearStore } from "@stores/owlbear";


export default function MainLayout() {

    useEffect(() => {

        OBR.onReady(async () => {
            const {updateRoom, metadataKey, updatePlayerName} = owlbearStore.getState();

            const allRoomMeta = await OBR.room.getMetadata();
            
            console.log('>>>>>>>>>>> ========================== <<<<<<<<<<<');

            const playerName: string = await OBR.player.getName();
            updatePlayerName(playerName)

            console.log('roomMeta', allRoomMeta);
            let roomMeta: any = allRoomMeta[metadataKey]

            if (!roomMeta) {
                return
            }

            console.log('roomMeta', roomMeta);
            updateRoom(roomMeta.roomName);

            
        });
    }, [])
    return (
        <>
            <Nav />
            <main className="">
                <Outlet />
            </main>
        </>
    )
}