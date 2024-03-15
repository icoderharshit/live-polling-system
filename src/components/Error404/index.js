import { useNavigate } from "react-router-dom"
export default function Error404(){
    let navigate = useNavigate();
    return (
        <div className="flex flex-col justify-center items-center h-screen gap-4">
            Error 404: Not found
            <button className="border border-2 rounded p-2" onClick={()=>navigate('/')}>Go to homepage!</button>
        </div>
    )
}