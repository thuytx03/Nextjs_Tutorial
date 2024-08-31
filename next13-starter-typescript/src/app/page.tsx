'use client'
import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'
import x from '@/styles/app.module.css'
import y from '@/styles/thuy.module.css'
import AppTable from '@/components/AppTable';
import { useEffect } from 'react'
import useSWR from 'swr'
import CreateModal from '@/components/CreateModal'
export default function Home() {

  // đây là cách call api với react
  // const fetchData = async () => {
  //   const res = await fetch('http://localhost:3001/blogs')
  //   const data = await res.json()
  //   console.log(data)
  // }
  // useEffect(() => {
  //   fetchData()
  // }, [])

  const fetcher = (url: string) => fetch(url)
    .then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    "http://localhost:3001/blogs",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );
  console.log(data)

  if (!data) {
    return <div>Loading...</div>
  }
  return (
    <main className={styles.main}>

      <div>{data?.length}</div>
      {/* <ul>

        <li className={x['red']}>
          <Link href='/facebook'>
            <span className={y['red']}>Facebook</span>
          </Link>
        </li>
        <li>
          <Link href="/tiktok">tiktok</Link>
        </li>
        <li>
          <Link href="/youtube">youtube</Link>
        </li>
      </ul> */}
     
      {/* <AppTable blogs={data} /> */}
      <h1 className='mx-auto'>Hello Nextjs</h1>
    </main>
  )
}
