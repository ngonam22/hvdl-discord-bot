import { Outlet } from "react-router";
import Nav from "../components/layouts/MainLayout/Nav";
import OBR from "@owlbear-rodeo/sdk";
import { useEffect } from "react";
import { owlbearStore } from "@stores/owlbear";


export default function MainLayout() {

    useEffect(() => {

        OBR.onReady(async () => {
            const {updateRoom} = owlbearStore.getState();

            const roomMeta = await OBR.room.getMetadata();
            console.log('roomMeta', roomMeta);
            
            console.log('OBR is ready');

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