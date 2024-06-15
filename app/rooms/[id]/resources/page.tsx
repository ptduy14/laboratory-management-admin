import { RoomResources } from "@/components/room-resources"

const resourcesFromRoom = ({ params }: {params: {id: string}}) => {
    return <RoomResources roomId={params.id}/>
}

export default resourcesFromRoom