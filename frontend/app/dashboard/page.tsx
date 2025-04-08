'use client'

import useUserStore from "../lib/user-store"

export default function Dashboard() {
    let user = useUserStore((state) => state)
    let services = {
        "service1": {
            "name": "Service 1",
            "description": "This is a description of service 1"
        },
        "service2": {
            "name": "Service 2",
            "description": "This is a description of service 2"
        },
        "service3": {
            "name": "Service 3",
            "description": "This is a description of service 3"
        },
        "service4": {
            "name": "Service 4",
            "description": "This is a description of service 4"
        },
        "service5": {
            "name": "Service 5",
            "description": "This is a description of service 5"
        },
        "service6": {
            "name": "Service 6",
            "description": "This is a description of service 6"
        },
        "service7": {
            "name": "Service 7",
            "description": "This is a description of service 7"
        },
        "service8": {
            "name": "Service 8",


            "description": "This is a description of service 8"
        },
        "service9": {
            "name": "Service 9",
            "description": "This is a description of service 9"
        },
        "service10": {
            "name": "Service 10",
            "description": "This is a description of service 10"
        },
        "service11": {
            "name": "Service 11",
            "description": "This is a description of service 11"
        },
        "service12": {
            "name": "Service 12",
            "description": "This is a description of service 12"
        },
        "service13": {
            "name": "Service 13",
            "description": "This is a description of service 13"
        },
    }

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-3 gap-4 p-4 border-b-2">
                <div>
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                </div>
                <div className="col-start-3 flex items-center justify-end">
                    Credit: {user.credits}
                </div>
            </div>
            <div className="p-4 ">
                <h1 className="text-2xl font-semibold">Popular Services</h1>
                <div className="flex overflow-x-scroll">
                    {Object.keys(services).map((service) => (
                        <div key={service} className="bg-two rounded-lg shadow-md ml-2 p-6 h-48 w-48">
                            <h1 className="text-2xl font-semibold text-center">{services[service].name}</h1>
                            <p className="text-center">{services[service].description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}