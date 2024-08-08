import React, { useState } from 'react';

export default function Option() {
    const [isOpen, setIsOpen] = useState(false);
    const [isBackupEnabled, setIsBackupEnabled] = useState(false);
    const [storageOption, setStorageOption] = useState('none'); // 'none', 'new', 'added'
    const [isSecurityGroupEnabled, setIsSecurityGroupEnabled] = useState(false);
    const [selectedSecurityGroup, setSelectedSecurityGroup] = useState('');
    const [sshKeyOption, setSshKeyOption] = useState('none'); // 'none', 'select', 'create'
    const [startupScriptOption, setStartupScriptOption] = useState('none'); // 'none', 'template', 'text', 'url'

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    const enableBackup = () => {
        setIsBackupEnabled(true);
    };

    const disableBackup = () => {
        setIsBackupEnabled(false);
    };

    const selectStorageOption = (option: string) => {
        setStorageOption(option);
    };

    const toggleSecurityGroup = () => {
        setIsSecurityGroupEnabled(!isSecurityGroupEnabled);
    };

    const handleSecurityGroupChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSecurityGroup(event.target.value);
    };

    const selectSshKeyOption = (option: string) => {
        setSshKeyOption(option);
    };

    const selectStartupScriptOption = (option: string) => {
        setStartupScriptOption(option);
    };

    return (
        <div className="mt-5 flex justify-center">
            <div className="w-full max-w-2xl">
                <h1 onClick={toggleOpen} className="cursor-pointer text-center">オプションを選択</h1>
                {isOpen && (
                    <div className="mt-4">
                        <ul className="list-inside pl-0">
                            <li className="my-2 flex items-center text-sm whitespace-nowrap">
                                <span className="w-1/3">自動バックアップ</span>
                                <div className="flex w-2/3">
                                    <button 
                                        onClick={enableBackup} 
                                        className={`px-2 py-1 border rounded-l ${isBackupEnabled ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                                    >
                                        有効
                                    </button>
                                    <button 
                                        onClick={disableBackup} 
                                        className={`px-2 py-1 border rounded-r ${!isBackupEnabled ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                                    >
                                        無効
                                    </button>
                                </div>
                            </li>
                            <li className="my-2 flex items-center text-sm whitespace-nowrap">
                                <span className="w-1/3">追加ストレージ</span>
                                <div className="flex w-2/3">
                                    <button 
                                        onClick={() => selectStorageOption('none')} 
                                        className={`px-2 py-1 border rounded-l ${storageOption === 'none' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                                    >
                                        使用しない
                                    </button>
                                    <button 
                                        onClick={() => selectStorageOption('new')} 
                                        className={`px-2 py-1 border ${storageOption === 'new' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                                    >
                                        新規ストレージ追加
                                    </button>
                                    <button 
                                        onClick={() => selectStorageOption('added')} 
                                        className={`px-2 py-1 border rounded-r ${storageOption === 'added' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                                    >
                                        追加済みストレージ
                                    </button>
                                </div>
                            </li>
                            <li className="my-2 flex items-center text-sm whitespace-nowrap">
                                <span className="w-1/3">セキュリティグループ</span>
                                <div className="flex w-2/3">
                                    <select 
                                        value={selectedSecurityGroup} 
                                        onChange={handleSecurityGroupChange} 
                                        className="px-2 py-1 border rounded w-full"
                                    >
                                        <option value="">選択してください</option>
                                        <option value="group1">グループ1</option>
                                        <option value="group2">グループ2</option>
                                        <option value="group3">グループ3</option>
                                    </select>
                                </div>
                            </li>
                            <li className="my-2 flex items-center text-sm whitespace-nowrap">
                                <span className="w-1/3">SSH Key</span>
                                <div className="flex w-2/3">
                                    <button 
                                        onClick={() => selectSshKeyOption('none')} 
                                        className={`px-2 py-1 border rounded-l ${sshKeyOption === 'none' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                                    >
                                        使用しない
                                    </button>
                                    <button 
                                        onClick={() => selectSshKeyOption('select')} 
                                        className={`px-2 py-1 border ${sshKeyOption === 'select' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                                    >
                                        キーを選択
                                    </button>
                                    <button 
                                        onClick={() => selectSshKeyOption('create')} 
                                        className={`px-2 py-1 border rounded-r ${sshKeyOption === 'create' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                                    >
                                        キーを新規作成
                                    </button>
                                </div>
                            </li>
                            <li className="my-2 flex items-center text-sm whitespace-nowrap">
                                <span className="w-1/3">スタートアップスクリプト</span>
                                <div className="flex w-2/3">
                                    <button 
                                        onClick={() => selectStartupScriptOption('none')} 
                                        className={`px-2 py-1 border rounded-l ${startupScriptOption === 'none' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                                    >
                                        使用しない
                                    </button>
                                    <button 
                                        onClick={() => selectStartupScriptOption('template')} 
                                        className={`px-2 py-1 border ${startupScriptOption === 'template' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                                    >
                                        テンプレート
                                    </button>
                                    <button 
                                        onClick={() => selectStartupScriptOption('text')} 
                                        className={`px-2 py-1 border ${startupScriptOption === 'text' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                                    >
                                        テキスト入力
                                    </button>
                                    <button 
                                        onClick={() => selectStartupScriptOption('url')} 
                                        className={`px-2 py-1 border rounded-r ${startupScriptOption === 'url' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                                    >
                                        URL指定
                                    </button>
                                </div>
                            </li>
                            <li className="my-2 text-sm whitespace-nowrap">表示金額は税込みです。</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}