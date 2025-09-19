import { auth } from "@/auth"

export default async function (){
    const session = await auth()
    if(!session?.user?.id){
        return
    }
    return (
        <div>
            {session.user.name}
        </div>
    )

}