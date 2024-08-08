"use client";

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Loading from './components/Loading';
import { useRouter } from 'next/navigation';

export default function NotFound() {
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            router.push('/dashboard');
        }, 700); // 2秒間のローディングを挟む
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white">
            {loading ? (
                <Loading />
            ) : (
                <>
                    <h1 className="text-4xl">404 - Page Not Found</h1>
                    <p className="text-2xl">お探しのページは見つかりませんでした。</p>
                    <br></br>
                    <Image src="/images/404-2.png" alt="404" width={240} height={240} />
                    <br></br>
                    <br></br>
                    <Link href="/dashboard" legacyBehavior>
                        <a className="text-black hover:text-blue-500 text-2xl" onClick={handleLinkClick}>
                            コントロールパネルに戻る
                        </a>
                    </Link>
                </>
            )}
        </div>
    );
}