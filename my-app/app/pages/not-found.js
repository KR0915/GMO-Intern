import Image from 'next/image';

export default function Custom404() {
    return (
        <div>
            {/* <h1>404 - Page Not Found</h1>
            <h2>Sorry, the page you are looking for does not exist.</h2> */}
            <Image src="/images/404.jpg" alt="404" width={40} height={40} />
        </div>
    );
}
