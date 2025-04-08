


export default function PaymentTypeSelector({ check, handleCheck, name }: Readonly<{ check: boolean; handleCheck: () => void; name:string }>) {

    return (
        <div className="flex flex-row p-4">
            <div className={`rounded-full my-auto mr-2 h-2 w-2 ${check?"bg-three":"bg-gray-500"}`}>

            </div>
            <div className="text-lg">
                {name}
            </div>
        </div>
    )
}