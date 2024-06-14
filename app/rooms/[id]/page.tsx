import { ResourceFormRoom } from "@/components/rooms/resources-form-room"

const resourcesFromRoom = ({ params }: {params: {id: string}}) => {
    return <ResourceFormRoom roomId={params.id}/>
}

export default resourcesFromRoom