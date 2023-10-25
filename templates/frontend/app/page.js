import Image from 'next/image'
import Header from '/components/Header'
import Body from '/components/Body'

export default function Home() {
  return (
    <main className="bg-white ">
      <div className='h-screen'>
        <div className=''><Header/></div>
        <div className=''><Body/></div>
       
      </div>
    </main>
  )
}
