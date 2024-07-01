import { auth, currentUser} from "@clerk/nextjs/server";
import LogLogIn, { CheckUser } from "~/server/queries";

export default async function Dashboard() {

    const { userId } = auth();
    if (userId) {
    // Query DB for user specific information or display assets only to signed in users
        console.log(`User ${userId}`);
        await LogLogIn();
        await CheckUser(userId);
    }else{
        auth().redirectToSignIn();
    }

    // Get the Backend API User object when you need access to the user's information
    const user = await currentUser()

    //Need to Add Socials
    return(
    <main className="flex justify-center items-center bg-rose_toupe w-full min-h-screen">
      <div className="flex flex-col container justify-start items-center bg-plaster_white h-99 w-3/4 rounded-2xl">
        <h1 className="text-6xl mt-8">About {user?.username} Page</h1>
        <p className="mt-16 h-auto w-2/3 text-center">I am a college student and a developer but what I am the most these days is broke, so I being a dev I did not take the easy route and manage my moneymyself but made an app that tracks my expences for me and you’re looking at it. Be free to look around and explore and you can reach me at any of my socials</p> 
      </div>
    </main>
    )
}