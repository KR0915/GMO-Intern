import React from 'react';
import Link from 'next/link';
import { EntypoPlus } from './icon/Plus';
import { StreamlineDatabaseServer1Solid } from './icon/Server';
import { StreamlineComputerStorageHardDrive1DiskComputerDeviceElectronicsDiscDriveRaid } from './icon/Strage';
import { SubwayImage } from './icon/Image';
import { StreamlineInterfaceHierarchy2NodeOrganizationLinksStructureLinkNodesNetworkHierarchy } from './icon/Network';
import { CodiconKey } from './icon/Security';
import { CodiconFileSubmodule } from './icon/ObjectStrage';
import { CodiconGlobe } from './icon/DNS';
import { CodiconFile } from './icon/License';
import { MaterialSymbolsDomain } from './icon/Domain';
import { AntDesignApiFilled } from './icon/API';
import { MaterialSymbolsHelpOutline } from './icon/Support';
import { MaterialSymbolsFeedbackOutline } from './icon/Feedback';
import { MaterialSymbolsChangeCircleOutline } from './icon/Version';


interface MenuItem {
  icon: React.ReactNode; // JSX要素を受け入れるためにReact.ReactNodeに型を変更
  label: string;
  subItems?: string[];
}

// 「サーバー追加」アイテムにEntypoPlusコンポーネントを使用するようにmenuItems配列を更新
const menuItems: MenuItem[] = [
  { icon: <EntypoPlus />, label: 'サーバー追加' },
  { icon: <StreamlineDatabaseServer1Solid />, label: 'サーバー' },
  { icon: <StreamlineComputerStorageHardDrive1DiskComputerDeviceElectronicsDiscDriveRaid />, label: 'ストレージ' },
  { icon: <SubwayImage />, label: 'イメージ' },
  { icon: <StreamlineInterfaceHierarchy2NodeOrganizationLinksStructureLinkNodesNetworkHierarchy />, label: 'ネットワーク', subItems: ['追加IPアドレス', 'プライベートネットワーク', 'ロードバランサー'] },
  { icon: <CodiconKey />, label: 'セキュリティ' },
  { icon: <CodiconFileSubmodule />, label: 'オブジェクトストレージ' },
  { icon: <CodiconGlobe />, label: 'DNS' },
  { icon: <CodiconFile />, label: 'ライセンス' },
  { icon: <MaterialSymbolsDomain />, label: 'ドメイン' },
  { icon: <AntDesignApiFilled />, label: 'API' },
  { icon: <MaterialSymbolsHelpOutline />, label: 'サポート' },
  { icon: <MaterialSymbolsFeedbackOutline />, label: 'フィードバック' },
  { icon: <MaterialSymbolsChangeCircleOutline />, label: 'バージョン切り替え' },
];

export default function Sidebar() {
  return (
    <div className="col-span-1 bg-gray-100 p-4">
      <div className="flex flex-col space-y-2">
        {menuItems.map((item, index) => (
          <Link href="/error/404" key={index} legacyBehavior>
            <a>
              <li
                className={`flex items-center p-3 rounded transition-colors cursor-pointer 
                  ${item.label === 'サーバー追加' ? 'bg-blue-400 text-white' : 'hover:bg-gray-100'}`}
              >
                <span className="mr-3 text-xl">{item.icon}</span>
                <span className="text-lg">{item.label}</span>
              </li>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
