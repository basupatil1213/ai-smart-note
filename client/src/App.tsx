import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import Editor from './components/Editor';

export default function App() {
  
  return (
    <>
    <header className='flex justify-end items-center p-4 hover:underline'>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
    <main className=''>
      <Editor />
    </main>
    </>
  );
}