
import React from 'react';
import { GlobalSettings, ActionType } from '../types';
import { ACTIONS } from '../constants';

interface SidebarProps {
  settings: GlobalSettings;
  setSettings: React.Dispatch<React.SetStateAction<GlobalSettings>>;
  currentCosts: Record<ActionType, number>;
  onCalculate: () => void;
  isCalculating: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ settings, setSettings, currentCosts, onCalculate, isCalculating }) => {
  const updateSetting = <K extends keyof GlobalSettings>(key: K, value: GlobalSettings[K]) => {
    // 針對體力欄位進行範圍限制 (0-100)
    if (key === 'startStamina' || key === 'targetStamina') {
      const clampedValue = Math.min(100, Math.max(0, value as number));
      setSettings(prev => ({ ...prev, [key]: clampedValue }));
    } else {
      setSettings(prev => ({ ...prev, [key]: value }));
    }
  };

  return (
    <aside className="w-48 flex-shrink-0 border-r border-slate-200 bg-white p-3 flex flex-col justify-between overflow-y-auto custom-scrollbar">
      <div className="space-y-4">
        <div>
          <h1 className="text-slate-800 text-[11px] font-bold mb-0.5 uppercase tracking-tight">全局設定</h1>
          <p className="text-slate-400 text-[8px]">調整參數規劃路徑</p>
        </div>

        <div className="space-y-2.5">
          <label className="flex flex-col w-full">
            <p className="text-slate-600 text-[10px] font-semibold pb-1 flex justify-between items-center">
              起始 (Start) <span className="text-[7px] text-blue-500 bg-blue-50 px-1 rounded">0-100</span>
            </p>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-blue-500 text-sm">battery_charging_full</span>
              <input 
                className="form-input flex w-full rounded-md border-slate-200 bg-slate-50 h-8 text-[11px] text-slate-800 focus:ring-blue-400 focus:border-blue-400 pl-8 pr-1" 
                type="number" 
                min="0"
                max="100"
                value={settings.startStamina}
                onChange={(e) => updateSetting('startStamina', parseInt(e.target.value) || 0)}
              />
            </div>
          </label>

          <label className="flex flex-col w-full">
            <p className="text-slate-600 text-[10px] font-semibold pb-1 flex justify-between items-center">
              目標 (Target) <span className="text-[7px] text-slate-400 bg-slate-50 px-1 rounded">0-100</span>
            </p>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-slate-300 text-sm">flag</span>
              <input 
                className="form-input flex w-full rounded-md border-slate-200 bg-slate-50 h-8 text-[11px] text-slate-800 focus:ring-blue-400 focus:border-blue-400 pl-8 pr-1" 
                type="number" 
                min="0"
                max="100"
                value={settings.targetStamina}
                onChange={(e) => updateSetting('targetStamina', parseInt(e.target.value) || 0)}
              />
            </div>
          </label>

          <label className="flex flex-col w-full">
            <p className="text-slate-600 text-[10px] font-semibold pb-1 flex justify-between items-center">
              剩餘回合 <span className="text-[7px] text-blue-500 bg-blue-50 px-1 rounded">1-14</span>
            </p>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-slate-300 text-sm">edit_calendar</span>
              <input 
                className="form-input flex w-full rounded-md border-slate-200 bg-slate-50 h-8 text-[11px] text-slate-800 focus:ring-blue-400 focus:border-blue-400 pl-8 pr-1" 
                max="14" 
                min="1" 
                type="number" 
                value={settings.remainingTurns}
                onChange={(e) => updateSetting('remainingTurns', Math.min(14, Math.max(1, parseInt(e.target.value) || 1)))}
              />
            </div>
          </label>

          <div className="pt-1">
            <p className="text-slate-600 text-[10px] font-semibold mb-1">運動等級 (Skill Lv)</p>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => updateSetting('skillLevel', Math.max(0, settings.skillLevel - 1))}
                className="size-7 flex items-center justify-center rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-sm">remove</span>
              </button>
              <div className="flex-1 h-7 flex items-center justify-center rounded-md bg-blue-50 border border-blue-100">
                <span className="text-blue-700 font-bold text-[10px] tracking-tight">LV.{settings.skillLevel}</span>
              </div>
              <button 
                onClick={() => updateSetting('skillLevel', settings.skillLevel + 1)}
                className="size-7 flex items-center justify-center rounded-md bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-sm">add</span>
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">當前參數</p>
          <div className="grid grid-cols-1 gap-0.5">
            {ACTIONS.map((action) => (
              <div 
                key={action.type}
                className={`flex items-center justify-between text-[9px] px-1.5 py-1 rounded-md border ${
                  action.type === ActionType.REST 
                    ? 'bg-green-50 border-green-100 text-green-700' 
                    : 'bg-slate-50 border-slate-100 text-slate-600'
                }`}
              >
                <span className="flex items-center gap-1 font-medium truncate">
                  <span className={`material-symbols-outlined text-[12px] flex-shrink-0 ${action.iconColorClass}`}>{action.icon}</span> 
                  {action.name}
                </span>
                <span className="font-bold flex-shrink-0 ml-1">
                  {currentCosts[action.type] > 0 ? `+${currentCosts[action.type]}` : currentCosts[action.type]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button 
        onClick={onCalculate}
        disabled={isCalculating}
        className={`mt-4 flex w-full cursor-pointer items-center justify-center gap-1 rounded-md h-9 text-white text-[11px] font-bold transition-all shadow-md active:scale-95 ${
          isCalculating ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-100'
        }`}
      >
        <span className={`material-symbols-outlined text-sm ${isCalculating ? 'animate-spin' : ''}`}>
          {isCalculating ? 'autorenew' : 'bolt'}
        </span>
        <span>{isCalculating ? '計算中' : '重新計算'}</span>
      </button>
    </aside>
  );
};

export default Sidebar;
