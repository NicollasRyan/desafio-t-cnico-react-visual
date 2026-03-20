import { LoaderCircle } from "lucide-react";

export function Loading() {
    return (
        <div className="flex flex-col items-center gap-4">
            <LoaderCircle className="animate-spin" />
             <p>Loading...</p> 
        </div>
    )
}