import Image from 'next/image'
import Header from '@/components/Header'
import Body from '@/components/Body'

export default function Home() {
  return (
    <main className="bg-white ">
      <div className='h-screen grid grid-flow-row grid-rows-4 gap-0'>
        <div className=''><Header/></div>
        <div className=''><Body/></div>
       
      </div>
    </main>
  )
}
