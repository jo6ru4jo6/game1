
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-white sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center size-10 rounded-xl bg-blue-100 text-blue-600">
          <span className="material-symbols-outlined text-2xl">compare_arrows</span>
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">體力規劃器 (多方案對比版)</h2>
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">Multi-Strategy Comparison Optimizer</p>
        </div>
      </div>
      <div className="flex gap-3">
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-lg">
          <span className="material-symbols-outlined text-blue-500 text-sm">info</span>
          <span className="text-xs text-blue-700 font-medium">系統會自動篩選出符合目標體力的多種排程組合</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
