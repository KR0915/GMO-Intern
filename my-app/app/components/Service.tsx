"use client";

import React, { useState } from "react";

interface ServiceItem {
  icon: string;
  name: string;
}

// サービスのオプション
const services: ServiceItem[] = [
  { icon: "☁️", name: "VPS" },
  { icon: "🖥️", name: "Windows Server" },
  { icon: "💿", name: "GPUサーバー" },
  { icon: "✉️", name: "メールサーバー" },
  { icon: "📊", name: "DBサーバー" },
];

// 丸いボタンのオプション
const roundButtonLabelsApplication = [
  "かんたんKUSANAGI",
  "Mattermost",
  "Docker",
  "LAMP(PHP)",
  "Metabase",
];
const roundButtonLabelsOS = [
  "CentOS",
  "Ubuntu",
  "Debian",
  "Rocky Linux",
  "AlmaLinux",
  "Oracle Linux",
  "MIRACLE LINUX",
  "FreeBSD",
  "Arch Linux",
  "NetBSD",
  "OpenBSD",
];

// 長方形ボタンのオプション
const rectangleButtonLabels = [
  "WordPress<br/>(KUSANAGI)",
  "Dokku",
  "Node.js",
  "webmin",
  "Prometheus",
  "Cacti Nagios",
  "Laravel",
  "LEMP(PHP)",
  "Mastodon",
  "Misskey",
  "Zabbix",
  "Ruby on Rails",
  "ownCloud",
  "Nextcloud",
  "GitLab",
  "Redmine",
  "Django",
  "Concrete CMS",
  "MediaWiki",
  "Jenkins",
  "Drupal",
  "MIRACLE ZBX",
  "Joomla",
  "baserCMS",
  "Matomo",
  "ArchiveBox",
  "Auto-GPT",
  "BabyAGI UI",
  "GPTEngineer",
  "StableStudio",
];

// イメージタイプのオプション
const imageTypeOptions = [
  "OS",
  "アプリケーション",
  "保存イメージ",
  "自動バックアップ",
];

// 料金タイプのオプション
const pricingOptions = [
  "時間課金",
  "１ヶ月",
  "３ヶ月",
  "６ヶ月",
  "１２ヶ月",
  "２４ヶ月",
  "３６ヶ月",
];

// プランのオプション
const planOptions = [
  "512MB",
  "1GB",
  "2GB",
  "4GB",
  "8GB",
  "16GB",
  "32GB",
  "64GB",
];

// サービスコンポーネント
const Services: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedAppButton, setSelectedAppButton] = useState<string | null>(
    null
  );
  const [selectedOSButton, setSelectedOSButton] = useState<string | null>(
    null
  );
  const [selectedPricing, setSelectedPricing] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showMore, setShowMore] = useState(false);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setShowMore(false); // Reset "show more" when switching options
    setSelectedAppButton(null); // Reset selected application button
    setSelectedOSButton(null); // Reset selected OS button
    setSelectedPricing(null); // Reset selected pricing
    setSelectedPlan(null); // Reset selected plan
  };

  const handleAppButtonClick = (label: string) => {
    setSelectedAppButton(label);
  };

  const handleOSButtonClick = (label: string) => {
    setSelectedOSButton(label);
  };

  const handlePricingClick = (option: string) => {
    setSelectedPricing(option);
  };

  const handlePlanClick = (option: string) => {
    setSelectedPlan(option);
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <h1 className="col-span-3 text-2xl font-bold text-center mb-4">
        サービス
      </h1>
      {services.map((service) => (
        <button
          key={service.name}
          className="bg-white border border-black shadow-md rounded-lg p-4 flex flex-col items-center text-center"
        >
          <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
          <hr className="w-full mb-2" />
          <div className="p-2">{service.icon}</div>
        </button>
      ))}
      <div className="col-span-3 h-8"></div> {/* 空白行 */}
      <div className="col-span-3 flex justify-center items-center mb-4">
        <h1 className="text-2xl font-bold text-center mr-4">イメージタイプ</h1>
        <div>
          {imageTypeOptions.map((option) => (
            <button
              key={option}
              onClick={() => handleOptionClick(option)}
              className={`rounded px-4 py-2 mx-2 ${
                selectedOption === option
                  ? "bg-blue-600 text-white"
                  : "bg-blue-500 text-white"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      {selectedOption === "アプリケーション" && (
        <>
          <div className="col-span-3 flex justify-center items-center mb-4 gap-4">
            {roundButtonLabelsApplication.map((label, index) => (
              <button
                key={index}
                onClick={() => handleAppButtonClick(label)}
                className={`h-24 w-36 rounded-full border border-black text-center px-4 py-2 leading-tight ${
                  selectedAppButton === label
                    ? "bg-blue-400 text-white"
                    : "bg-white text-black"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          {showMore && (
            <div className="col-span-3 grid grid-cols-5 gap-4 mb-4">
              {rectangleButtonLabels.map((label, index) => (
                <button
                  key={index}
                  onClick={() => handleAppButtonClick(label)}
                  className={`h-20 w-full border border-black rounded text-center px-2 py-1 leading-tight ${
                    selectedAppButton === label
                      ? "bg-blue-400 text-white"
                      : "bg-white text-black"
                  }`}
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
              {showMore ? "少なく見る" : "もっと見る"}
            </button>
          </div>
          <div className="col-span-3 flex flex-col items-center mt-4">
            <h2 className="text-xl font-bold mb-2">料金タイプ</h2>
            <div className="flex gap-4">
              {pricingOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handlePricingClick(option)}
                  className={`rounded px-4 py-2 ${
                    selectedPricing === option
                      ? "bg-blue-400 text-white"
                      : "bg-white border border-black text-black"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div className="col-span-3 flex flex-col items-center mt-4">
            <h2 className="text-xl font-bold mb-2">プラン</h2>
            <div className="flex gap-4 flex-wrap justify-center">
              {planOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handlePlanClick(option)}
                  className={`rounded px-4 py-2 ${
                    selectedPlan === option
                      ? "bg-blue-400 text-white"
                      : "bg-white border border-black text-black"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
      {selectedOption === "OS" && (
        <div className="col-span-3 flex flex-wrap justify-center items-center mb-4 gap-4">
          {roundButtonLabelsOS.map((label, index) => (
            <button
              key={index}
              onClick={() => handleOSButtonClick(label)}
              className={`h-24 w-36 rounded-full border border-black text-center px-4 py-2 leading-tight ${
                selectedOSButton === label
                  ? "bg-blue-400 text-white"
                  : "bg-white text-black"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Services;
