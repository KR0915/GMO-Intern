import React, { useState } from "react";
import { MaterialSymbolsDataTableOutline } from "./icon/VPS";
import { MdiMicrosoftWindows } from "./icon/WindowServer";
import { BiGpuCard } from "./icon/GPUServer";
import { PhEnvelopeSimple } from "./icon/MailServer";
import { MdiDatabase } from "./icon/DBServer";
import { IcSharpPhp } from "./icon/Php";
import { LogosDockerIcon } from "./icon/Docker";
import { MdiApplicationBracesOutline } from "./icon/CodeEditar";
import { Fa6BrandsWordpress } from "./icon/WordPress";
import Option from "./option";

interface ServiceItem {
  icon: React.ReactNode;
  name: string;
}

interface ServiceProps {
  setSelectedPlan: (plan: string | null) => void;
  setSelectedPrice: (price: number | null) => void;
}

interface PlanDetail {
  size: string;
  cpu: string;
  ssd: string;
  flavorId: string;
}

const services: ServiceItem[] = [
  { icon: <MaterialSymbolsDataTableOutline />, name: "VPS" },
  { icon: <MdiMicrosoftWindows />, name: "Windows Server" },
  { icon: <BiGpuCard />, name: "GPUサーバー" },
  { icon: <PhEnvelopeSimple />, name: "メールサーバー" },
  { icon: <MdiDatabase />, name: "DBサーバー" },
];

const display_rectangleButtonLabels = [
  { label: "かんたんKUSANAGI", icon: <Fa6BrandsWordpress /> },
  { label: "Mattermost", icon: <MdiApplicationBracesOutline /> },
  { label: "Docker", icon: <LogosDockerIcon /> },
  { label: "LAMP(PHP)", icon: <IcSharpPhp /> },
  { label: "Metabase", icon: <MdiApplicationBracesOutline /> },
];

const roundButtonLabelsOS = [
  "CentOS", "Ubuntu", "Debian", "Rocky Linux", "AlmaLinux",
  "Oracle Linux", "MIRACLE LINUX", "FreeBSD", "Arch Linux", "NetBSD", "OpenBSD"
];

const storage_rectangleButtonLabels = [
  "WordPress<br/>(KUSANAGI)", "Dokku", "Node.js", "webmin", "Prometheus",
  "Cacti Nagios", "Laravel", "LEMP(PHP)", "Mastodon", "Misskey",
  "Zabbix", "Ruby on Rails", "ownCloud", "Nextcloud", "GitLab",
  "Redmine", "Django", "Concrete CMS", "MediaWiki", "Jenkins",
  "Drupal", "MIRACLE ZBX", "Joomla", "baserCMS", "Matomo",
  "ArchiveBox", "Auto-GPT", "BabyAGI UI", "GPTEngineer", "StableStudio"
];

const imageTypeOptions = [
  "OS", "アプリケーション", "保存イメージ", "自動バックアップ"
];

const pricingOptions = [
  "時間課金", "１ヶ月", "３ヶ月", "６ヶ月", "１２ヶ月", "２４ヶ月", "３６ヶ月"
];

const planDetails: PlanDetail[] = [
  { size: "512MB", cpu: "CPU 1Core", ssd: "SSD 30GB", flavorId: "flavor512MB" },
  { size: "1GB", cpu: "CPU 2Core", ssd: "SSD 100GB", flavorId: "flavor1GB" },
  { size: "2GB", cpu: "CPU 3Core", ssd: "SSD 100GB", flavorId: "flavor2GB" },
  { size: "4GB", cpu: "CPU 4Core", ssd: "SSD 100GB", flavorId: "flavor4GB" },
  { size: "8GB", cpu: "CPU 6Core", ssd: "SSD 100GB", flavorId: "flavor8GB" },
  { size: "16GB", cpu: "CPU 8Core", ssd: "SSD 100GB", flavorId: "flavor16GB" },
  { size: "32GB", cpu: "CPU 12Core", ssd: "SSD 100GB", flavorId: "flavor32GB" },
  { size: "64GB", cpu: "CPU 24Core", ssd: "SSD 100GB", flavorId: "flavor64GB" }
];

const date = new Date();
export default function Services({ setSelectedPlan, setSelectedPrice }: ServiceProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedAppButton, setSelectedAppButton] = useState<string | null>(null);
  const [selectedOSButton, setSelectedOSButton] = useState<string | null>(null);
  const [selectedPricing, setSelectedPricing] = useState<string | null>(null);
  const [selectedPlanLocal, setSelectedPlanLocal] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null); // 新しい状態を追加
  const [rootPassword, setRootPassword] = useState("");
  const [nameTag, setNameTag] = useState("vps-" + date.getFullYear() + "-" + ("0"+(date.getMonth() + 1)).slice(-2) + "-" + ("0"+(date.getDate())).slice(-2) + "-" + date.getHours() + "-" + ("0"+(date.getMinutes())).slice(-2));
  const [showMore, setShowMore] = useState(false);

  const pricingData: Record<string, number[]> = {
    時間課金: [750, 1064, 2032, 3968, 8082, 15730, 31460, 59290],
    "１ヶ月": [459, 762, 1258, 2407, 4827, 9746, 22099, 44198],
    "３ヶ月": [399, 666, 1055, 2189, 4389, 8144, 19939, 39884],
    "６ヶ月": [347, 547, 892, 1712, 3431, 6610, 18491, 36989],
    "１２ヶ月": [321, 508, 757, 1522, 3052, 6233, 16567, 33142],
    "２４ヶ月": [310, 491, 689, 1393, 2713, 5993, 15667, 30142],
    "３６ヶ月": [296, 468, 616, 1268, 2394, 5393, 13868, 28493]
  };

  const handleServiceClick = (serviceName: string) => {
    setSelectedService(serviceName);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setShowMore(false);
    setSelectedAppButton(null);
    setSelectedOSButton(null);
    setSelectedPricing(null);
    setSelectedPlanLocal(null);
    setSelectedPlan(null);
    setSelectedPrice(null);
    setRootPassword("");
    setNameTag("");
  };

  const handleAppButtonClick = (label: string) => {
    setSelectedAppButton(label);
  };

  const handleOSButtonClick = (label: string) => {
    setSelectedOSButton(label);
  };

  const handlePricingClick = (option: string) => {
    setSelectedPricing(option);
    setSelectedPlanLocal(null); // Reset plan when pricing changes
    setSelectedPlan(null);
    setSelectedPrice(null);
  };

  const handlePlanClick = (option: string) => {
    const planDetail = planDetails.find(plan => plan.size === option);
    if (planDetail) {
      const { flavorId } = planDetail;
      setSelectedPlanLocal(option);
      setSelectedPlan(option);

      const priceIndex = planDetails.findIndex(plan => plan.size === option);
      const price = selectedPricing ? pricingData[selectedPricing][priceIndex] : null;

      setSelectedPrice(price);
      console.log("Flavor ID for selected plan:", flavorId); // フレーバーIDを表示するかバックエンドに送信
    }
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="flex flex-col mt-[70px]"> {/* ヘッダーの高さ分だけ下へ調整 */}
      <div className="flex" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}> {/* 背景色を透明に設定 */}
        <div className="col-span-3 bg-transparent p-4">
          <h1 className="text-2xl font-bold text-center mb-4">サービス</h1>
          <div className="grid grid-cols-4 gap-4">
            {services.map(service => (
              <button
                key={service.name}
                onClick={() => handleServiceClick(service.name)}
                className={`bg-white border border-black shadow-md rounded-lg p-2 flex flex-col items-center text-center h-24 w-48 ${
                  selectedService === service.name 
                  ? "bg-blue-400 text-white" 
                  : "bg-white text-black hover:border-blue-400 hover:text-blue-400"
                }`}
              >
                <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
                <hr className="w-full mb-2" />
                <div className="p-2">{service.icon}</div>
              </button>
            ))}
          </div>

          <h1 className="text-2xl font-bold text-center mt-4 mb-4">イメージタイプ</h1>
          <div className="flex justify-center items-center mb-4">
            {imageTypeOptions.map(option => (
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
          <div className='border-b-2 border-b-slate-400 mb-2'></div>

          {selectedOption === "アプリケーション" && (
            <div>
              <div className="grid grid-cols-3 gap-2">
                {display_rectangleButtonLabels.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleAppButtonClick(item.label)}
                    className={`h-20 w-full border border-black rounded text-center px-2 py-1 leading-tight ${
                      selectedAppButton === item.label
                        ? "bg-blue-400 text-white"
                        : "bg-white text-black hover:border-blue-400 hover:text-blue-400"
                    }`}
                  >
                    <div className="flex items-center justify-center">
                      {item.icon}
                      <span className="ml-2 items-center justify-center">{item.label}</span>
                    </div>
                  </button>
                ))}
              </div>

              {showMore && (
                <div className="grid grid-cols-5 gap-2 mt-4">
                  {storage_rectangleButtonLabels.map((label, index) => (
                    <button
                      key={index}
                      onClick={() => handleAppButtonClick(label)}
                      className={`h-20 w-full border border-black rounded text-center px-2 py-1 leading-tight ${
                        selectedAppButton === label
                          ? "bg-blue-400 text-white"
                          : "bg-white text-black hover:border-blue-400 hover:text-blue-400"
                      }`}
                      dangerouslySetInnerHTML={{ __html: label }}
                    />
                  ))}
                </div>
              )}

              <div className="flex justify-center mt-4">
                <button
                  onClick={toggleShowMore}
                  className="bg-gray-500 text-white rounded px-4 py-2"
                >
                  {showMore ? "閉じる" : "他のアプリケーションを表示する"}
                </button>
              </div>

              <div className="flex flex-col items-center mt-4">
                <h2 className="text-xl font-bold mb-2">料金タイプ</h2>
                <div className="flex gap-4">
                  {pricingOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handlePricingClick(option)}
                      className={`rounded px-4 py-2 ${
                        selectedPricing === option
                          ? "bg-blue-400 text-white"
                          : "bg-white border border-black text-black hover:border-blue-400 hover:text-blue-400"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center mt-4">
                <h2 className="text-xl font-bold mb-2">プラン</h2>
                <div className="flex gap-4 flex-wrap justify-center">
                  {planDetails.map((plan, index) => (
                    <button
                      key={index}
                      onClick={() => handlePlanClick(plan.size)}
                      className={`rounded px-4 py-2 ${
                        selectedPlanLocal === plan.size
                          ? "bg-blue-400 text-white"
                          : "bg-white border border-black text-black hover:border-blue-400 hover:text-blue-400"
                      }`}
                    >
                      <div className="text-center">
                        <div>{plan.size}</div>
                        <div>{plan.cpu}</div>
                        <div>{plan.ssd}</div>
                      </div>
                      {selectedPricing ? `¥${pricingData[selectedPricing][index]} /月` : ""}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 選択されたオプションが「OS」の場合 */}
          {selectedOption === "OS" && (
            <>
              <div className="col-span-3 flex flex-wrap justify-center items-center mb-4 gap-4">
                {roundButtonLabelsOS.map((label, index) => (
                  <button
                    key={index}
                    onClick={() => handleOSButtonClick(label)}
                    className={`h-24 w-36 rounded-full border border-black text-center px-4 py-2 leading-tight ${
                      selectedOSButton === label
                        ? "bg-blue-300 text-white"
                        : "bg-white text-black hover:border-blue-400 hover:text-blue-400"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="flex flex-col items-center mt-4">
                <h2 className="text-xl font-bold mb-2">料金タイプ</h2>
                <div className="flex gap-4">
                  {pricingOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handlePricingClick(option)}
                      className={`rounded px-4 py-2 ${
                        selectedPricing === option
                          ? "bg-blue-400 text-white"
                          : "bg-white border border-black text-black hover:border-blue-400 hover:text-blue-400"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center mt-4">
                <h2 className="text-xl font-bold mb-2">プラン</h2>
                <div className="flex gap-4 flex-wrap justify-center">
                  {planDetails.map((plan, index) => (
                    <button
                      key={index}
                      onClick={() => handlePlanClick(plan.size)}
                      className={`rounded px-4 py-2 ${
                        selectedPlanLocal === plan.size
                          ? "bg-blue-400 text-white"
                          : "bg-white border border-black text-black hover:border-blue-400 hover:text-blue-400"
                      }`}
                    >
                      <div className="text-center">
                        <div>{plan.size}</div>
                        <div>{plan.cpu}</div>
                        <div>{plan.ssd}</div>
                      </div>
                      {selectedPricing ? `¥${pricingData[selectedPricing][index]} /月` : ""}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Rootパスワードとネームタグの入力欄 */}
          <div className='border-b-2 border-b-slate-400 mt-2'></div>
          <div className="col-span-3">
            <div className="flex flex-col items-center mb-4">
              <label htmlFor="rootPassword">Rootパスワード:</label>
              <input
                type="password"
                id="rootPassword"
                value={rootPassword}
                onChange={e => setRootPassword(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex flex-col items-center mb-4">
              <label htmlFor="nameTag">ネームタグ:</label>
              <input
                type="text"
                id="nameTag"
                value={nameTag}
                onChange={e => setNameTag(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <Option />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}