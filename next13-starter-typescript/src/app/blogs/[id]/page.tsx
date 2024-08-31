'use client'
import Link from 'next/link';
import useSWR from 'swr';

const Page = ({ params }: { params: { id: string } }) => {
    const fetcher = (url: string) => fetch(url)
        .then((res) => res.json());

    const { data } = useSWR(
        `http://localhost:3001/blogs/${params.id}`,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );
    console.log(data)
    return (
        <>
            <Link className="btn btn-secondary" href={'/blogs'}>
                Back
            </Link>
            <div className="mt-3">
                <h1>Chi tiết bài viết</h1>
                <div>Blog Id: {params.id}</div>
                <div>Blog Author: {data?.author}</div>
                <div>Blog Title: {data?.title}</div>
                <div>Blog Content: {data?.content}</div>
            </div>
        </>
    );
};

export default Page;
