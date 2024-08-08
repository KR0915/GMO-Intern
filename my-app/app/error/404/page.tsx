import Image from 'next/image';
import Link from 'next/link';

export default function Custom404() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white">
            <h1>404 - Page Not Found</h1>
            <p>お探しのページは見つかりませんでした。</p>
            <br></br>
            <Image src="/images/404-2.png" alt="404" width={120} height={120} />
            <br></br>
            <br></br>
            <Link href="/dashboard" legacyBehavior>
                <a className="text-black hover:text-blue-500">ダッシュボードに戻る</a>
            </Link>
        </div>
        
    );
}
