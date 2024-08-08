"use client";

import React from 'react';
import { RecoilRoot } from 'recoil';
import Service from '../components/Service';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MoneySidebar from '../components/MoneySidebar';

export default function Home() {
  return (
    <RecoilRoot>
      <div className="h-screen flex flex-col bg-custom-bg bg-cover bg-custom-right-bottom bg-fixed overflow-y-auto">
        <Header />
        <div className="flex-1 grid grid-cols-5">
          <div className="col-span-1">
            <Sidebar />
          </div>
          <div className="col-span-3">
            <Service />
          </div>
          <div className="col-span-1">
            <MoneySidebar />
          </div>
        </div>
      </div>
    </RecoilRoot>
  );
}
