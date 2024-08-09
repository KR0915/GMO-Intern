"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DropdownMenu from './DropdownMenu';
import { GameIconsConsoleController } from './icon/Game';
import { MaterialSymbolsDataTableOutline } from './icon/VPS';
import { CbiApcUpsUpright } from './icon/Wing';
import { IconParkOutlineBrain } from './icon/AI';
import { IconParkOutlineMail } from './icon/Mail';
import { MaterialSymbolsCampaign } from './icon/Announcement';
import { MynauiQuestionCircle } from './icon/Question';

export default function Header() {
  return (
    <header className="bg-white border-b border-blue-400 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* 左側の要素 */}
        <div className="flex items-center">
          <Image src="/images/conoHa.png" alt="Logo" width={125} height={38} className="h-10" />
          <nav className="flex space-x-8 ml-8"> {/* 左側の要素を左に寄せるためのマージン調整 */}
            <Link href="http://localhost:3000/not-found.tsx" legacyBehavior>
              <a className="text-gray-700 hover:text-blue-500 flex flex-col items-center space-y-0">
                <MaterialSymbolsDataTableOutline />
                <div className="text-xs">VPS</div>
              </a>
            </Link>
            <Link href="http://localhost:3000/not-found.tsx" legacyBehavior>
              <a className="text-gray-700 hover:text-blue-500 flex flex-col items-center space-y-0">
                <CbiApcUpsUpright />
                <div className="text-xs">WING</div>
              </a>
            </Link>
            <Link href="http://localhost:3000/not-found.tsx" legacyBehavior>
              <a className="text-gray-700 hover:text-blue-500 flex flex-col items-center space-y-0">
                <GameIconsConsoleController />
                <div className="text-xs">GAME</div>
              </a>
            </Link>
            <Link href="http://localhost:3000/not-found.tsx" legacyBehavior>
              <a className="text-gray-700 hover:text-blue-500 flex flex-col items-center space-y-0">
                <IconParkOutlineBrain />
                <div className="text-xs">AI</div>
              </a>
            </Link>
          </nav>
        </div>
        {/* 右側の要素 */}
        <div className="flex items-center space-x-4"> {/* 右側の要素を右に寄せるためのスペーシング */}
          <Link href="http://localhost:3000/not-found.tsx" legacyBehavior>
            <a className="text-gray-700 hover:text-blue-500 flex items-center">
              <MaterialSymbolsCampaign />
              <div className="text-xs">お知らせ</div>
            </a>
          </Link>
          <Link href="http://localhost:3000/not-found.tsx" legacyBehavior>
            <a className="text-gray-700 hover:text-blue-500 flex items-center">
              <IconParkOutlineMail />
              <div className="text-xs">お問い合わせ</div>
            </a>
          </Link>
          <Link href="http://localhost:3000/not-found.tsx" legacyBehavior>
            <a className="text-gray-700 hover:text-blue-500 flex items-center">
              <MynauiQuestionCircle />
              <div className="text-xs">ヘルプ</div>
            </a>
          </Link>
          <div className="text-gray-700 hover:text-blue-500 flex items-center">
            <div className="text-xs"><DropdownMenu /></div>
          </div>
        </div>
      </div>
    </header>
  );
}