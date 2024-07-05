export default function Tabs(param:{id:string}){
        return(
            <div className="flex bg-platinum justify-center items-center w-1/3 p-2 rounded-xl">
                <img src={`/${param.id}`} alt="TabImage" />
            </div>
        )
}