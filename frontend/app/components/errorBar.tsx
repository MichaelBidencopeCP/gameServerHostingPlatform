


export default function ErrorBar({className, children}:Readonly<{
    className?:string;
    children:React.ReactNode
}>){
    return(
        
            
            <div className={`bg-red-400 opacity-90 rounded-lg p-2 my-2 mx-4 ${className} `}>
                {children}
            </div>
        

    )

}