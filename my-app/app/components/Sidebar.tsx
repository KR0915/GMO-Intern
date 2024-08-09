import React, { useState } from 'react';
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
  icon: React.ReactNode;
  label: string;
  subItems?: string[];
}

const menuItems: MenuItem[] = [
  { icon: <EntypoPlus />, label: 'サーバー追加' },
  { icon: <StreamlineDatabaseServer1Solid />, label: 'サーバー' },
  { icon: <StreamlineComputerStorageHardDrive1DiskComputerDeviceElectronicsDiscDriveRaid />, label: 'ストレージ' },
  { icon: <SubwayImage />, label: 'イメージ' },
  { icon: <StreamlineInterfaceHierarchy2NodeOrganizationLinksStructureLinkNodesNetworkHierarchy />, label: 'ネットワーク', subItems: ['追加IPアドレス', 'プライベートネットワーク', 'ロードバランサー'] },
  { icon: <CodiconKey />, label: 'セキュリティ', subItems: ['SSH Key', 'WAF', 'SSL', 'セキュリティグループ'] },
  { icon: <CodiconFileSubmodule />, label: 'オブジェクトストレージ' },
  { icon: <CodiconGlobe />, label: 'DNS' },
  { icon: <CodiconFile />, label: 'ライセンス' },
  { icon: <MaterialSymbolsDomain />, label: 'ドメイン', subItems: ['ドメイン', '移管', '転送設定'] },
  { icon: <AntDesignApiFilled />, label: 'API' },
  { icon: <MaterialSymbolsHelpOutline />, label: 'サポート' },
  { icon: <MaterialSymbolsFeedbackOutline />, label: 'フィードバック' },
  { icon: <MaterialSymbolsChangeCircleOutline />, label: 'バージョン切り替え' },
];

export default function Sidebar() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleSubMenu = (label: string) => {
    setOpenItems(prev => ({
      ...prev,
      [label]: !prev[label] // Toggle the current state
    }));
  };

  return (
    <div className="col-span-1 bg-gray-100 p-4 mt-[70px] fixed h-[calc(100vh-64px)] overflow-y-auto">
      <div className="flex flex-col space-y-2">
        {menuItems.map((item, index) => (
          <div key={index}>
            {item.subItems ? (
              <>
                <div onClick={() => toggleSubMenu(item.label)} className={`flex items-center p-3 rounded transition-colors cursor-pointer ${openItems[item.label] ? 'bg-blue-400 text-white' : 'hover:bg-blue-200'}`}>
                  <span className="mr-3 text-xl">{item.icon}</span>
                  <span className="text-lg">{item.label}</span>
                  {<span className="ml-auto">{openItems[item.label] ? '▲' : '▼'}</span>}
                </div>
                {openItems[item.label] && (
                  <div className="bg-blue-100">
                    {item.subItems.map((subItem, subIndex) => (
                      <Link href="/custom404" key={subIndex} legacyBehavior>
                        <a className="block px-5 py-2 hover:bg-blue-200">{subItem}</a>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link href="/custom404" key={index} legacyBehavior>
                <a className={`flex items-center p-3 rounded transition-colors cursor-pointer 
                  ${item.label === 'サーバー追加' ? 'bg-blue-500 text-white hover:bg-blue-600' : 'hover:bg-blue-200'}`}>
                  <span className="mr-3 text-xl">{item.icon}</span>
                  <span className="text-lg">{item.label}</span>
                </a>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
