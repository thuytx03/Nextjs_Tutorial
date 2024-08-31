'use client'
import { useRouter } from 'next/navigation';
import { Button } from 'react-bootstrap';


const Page = () => {
    const router = useRouter();

    const handleBtn = () => {
        router.push('/');
    };

    return (
        <>
            <div>facebook</div>
            <Button variant="primary">Primary</Button>
            <button onClick={handleBtn}>back</button>
        </>
    );
};

export default Page;
