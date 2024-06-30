import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export default function TopNav(){
    return(
        <nav className='flex w-full h-20 items-center justify-between bg-platinum'>
            <div className=' ml-5 float-left'>
                <h1 className='text-6xl'>FinTrak</h1>
            </div>
            <div className='mr-10'>
                <button type="button" className='text-2xl bg-plaster_white shadow-md rounded-xl p-2'>About Me</button>
            </div>
        </nav>
    )
} 