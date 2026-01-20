
import React from 'react';

interface FooterProps {
  start: number;
  target: number;
  best: number;
}

const Footer: React.FC<FooterProps> = ({ start, target, best }) => {
  return (
    <footer className="h-auto md:h-20 bg-white border-t border-slate-200 flex flex-col md:flex-row items-center px-6 md:px-10 py-4 md:py-0 gap-4 md:gap-10 shadow-[0_-4px_20px_rgba(0,0,0,0.02)] shrink-0">
      <div className="flex flex-col min-w-[140px]">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">對比狀態</span>
        <span className="text-xl font-black text-blue-600">計算完畢</span>
      </div>
      
      <div className="flex-1 flex items-center gap-3 md:gap-6 flex-wrap justify-center md:justify-start">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-blue-500"></span>
          <span className="text-xs font-bold text-slate-500">起始: {start}</span>
        </div>
        <div className="material-symbols-outlined text-slate-300 hidden md:block">chevron_right</div>
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-slate-300"></span>
          <span className="text-xs font-bold text-slate-500">目標: {target}</span>
        </div>
        <div className="material-symbols-outlined text-slate-300 hidden md:block">chevron_right</div>
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-green-500 shadow-sm shadow-green-200"></span>
          <span className="text-xs font-bold text-slate-700">完美達標: <span className="text-green-600 text-sm">{best}</span> 組</span>
        </div>
      </div>

      <div className="flex items-center gap-3 bg-blue-50 px-5 py-2.5 rounded-xl border border-blue-100 w-full md:w-auto">
        <span className="material-symbols-outlined text-blue-500 text-lg flex-shrink-0">info</span>
        <p className="text-xs font-bold text-blue-700 leading-tight">體力值僅供參考，實際數值可能因遊戲隨機事件變動</p>
      </div>
    </footer>
  );
};

export default Footer;
