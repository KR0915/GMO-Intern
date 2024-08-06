"use client";  // これを追加

import React, { useState } from 'react';

interface ServiceItem {
  icon: string;
  name: string;
}

// サービスアイテム
const services: ServiceItem[] = [
  { icon: '☁️', name: 'VPS' },
  { icon: '🖥️', name: 'Windows Server' },
  { icon: '💿', name: 'GPUサーバー' },
  { icon: '✉️', name: 'メールサーバー' },
  { icon: '📊', name: 'DBサーバー' }
];

// 丸いボタンのラベル
const roundButtonLabelsApplication = ['かんたんKUSANAGI', 'Mattermost', 'Docker', 'LAMP(PHP)', 'Metabase'];
const roundButtonLabelsOS = [
  'CentOS', 'Ubuntu', 'Debian', 'Rocky Linux', 'AlmaLinux',
  'Oracle Linux', 'MIRACLE LINUX', 'FreeBSD', 'Arch Linux', 'NetBSD',
  'OpenBSD'
];

// 横長の長方形ボタンのラベル
const rectangleButtonLabels = [
  'WordPress<br/>(KUSANAGI)', 'Dokku', 'Node.js', 'webmin', 'Prometheus',
  'Cacti Nagios', 'Laravel', 'LEMP(PHP)', 'Mastodon', 'Misskey',
  'Zabbix', 'Ruby on Rails', 'ownCloud', 'Nextcloud', 'GitLab',
  'Redmine', 'Django', 'Concrete CMS', 'MediaWiki', 'Jenkins',
  'Drupal', 'MIRACLE ZBX', 'Joomla', 'baserCMS', 'Matomo',
  'ArchiveBox', 'Auto-GPT', 'BabyAGI UI', 'GPTEngineer', 'StableStudio'
];

// イメージタイプのオプション
const imageTypeOptions = [
  'OS', 
  'アプリケーション', 
  '保存イメージ', 
  '自動バックアップ'
];

// サービスコンポーネント
const Services: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showMore, setShowMore] = useState(false);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setShowMore(false); // Reset "show more" when switching options
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <h1 className="col-span-3 text-2xl font-bold text-center mb-4">サービス</h1>
      {services.map(service => (
        <button key={service.name} className="bg-white border border-black shadow-md rounded-lg p-4 flex flex-col items-center text-center">
          <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
          <hr className="w-full mb-2" />
          <div className="p-2">{service.icon}</div>
        </button>
      ))}
      <div className="col-span-3 h-8"></div> {/* 空白行 */}
      <div className="col-span-3 flex justify-center items-center mb-4">
        <h1 className="text-2xl font-bold text-center mr-4">イメージタイプ</h1>
        <div>
          {imageTypeOptions.map(option => (
            <button
              key={option}
              onClick={() => handleOptionClick(option)}
              className={`rounded px-4 py-2 mx-2 ${selectedOption === option ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      {selectedOption === 'アプリケーション' && (
        <>
          <div className="col-span-3 flex justify-center items-center mb-4 gap-4">
            {roundButtonLabelsApplication.map((label, index) => (
              <button key={index} className="h-24 w-36 rounded-full border border-black bg-white text-black text-center px-4 py-2 leading-tight">
                {label}
              </button>
            ))}
          </div>
          {showMore && (
            <div className="col-span-3 grid grid-cols-5 gap-4 mb-4">
              {rectangleButtonLabels.map((label, index) => (
                <button
                  key={index}
                  className="h-20 w-full border border-black bg-white text-black rounded text-center px-2 py-1 leading-tight"
                  dangerouslySetInnerHTML={{ __html: label }} // HTMLを直接レンダリング
                />
              ))}
            </div>
          )}
          <div className="col-span-3 flex justify-center">
            <button
              onClick={toggleShowMore}
              className="bg-gray-500 text-white rounded px-4 py-2 mt-4"
            >
              {showMore ? '少なく見る' : 'もっと見る'}
            </button>
          </div>
        </>
      )}
      {selectedOption === 'OS' && (
        <div className="col-span-3 flex flex-wrap justify-center items-center mb-4 gap-4">
          {roundButtonLabelsOS.map((label, index) => (
            <button key={index} className="h-24 w-36 rounded-full border border-black bg-white text-black text-center px-4 py-2 leading-tight">
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Services;
