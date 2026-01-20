
import React from 'react';
import { StrategyPlan, ActionType } from '../types';
import { ACTIONS } from '../constants';

interface StrategyCardProps {
  plan: StrategyPlan;
  target: number;
}

const StrategyCard: React.FC<StrategyCardProps> = ({ plan, target }) => {
  const diff = plan.finalStamina - target;
  const isAchieved = diff >= 0;
  const isPerfect = diff === 0;

  return (
    <div className={`bg-white rounded-2xl shadow-sm overflow-hidden relative border-2 ${
      plan.isRecommended ? 'border-blue-400 shadow-md' : 'border-slate-200'
    }`}>
      {plan.isRecommended && (
        <div className="absolute top-0 right-0">
          <div className="bg-blue-400 text-white text-[10px] font-bold px-4 py-1 rounded-bl-xl uppercase tracking-widest">Recommended</div>
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-lg font-black text-slate-800">{plan.label}</span>
          <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${plan.tagColorClass}`}>
            {plan.tag}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 mb-8">
          {ACTIONS.map((action) => {
            const count = plan.counts[action.type] || 0;
            return (
              <div 
                key={action.type}
                className={`flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl border transition-colors ${
                  count > 3 ? action.colorClass : 'bg-slate-50 border-slate-100 opacity-80'
                }`}
              >
                <span className={`material-symbols-outlined ${action.iconColorClass}`}>
                  {action.icon}
                </span>
                <span className={`text-xs font-bold ${count > 3 && action.type === ActionType.REST ? 'text-green-700' : 'text-slate-400'}`}>
                  {action.name}
                </span>
                <span className="text-xl font-black text-slate-800">
                  {count} <span className="text-[10px] text-slate-400">次</span>
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase">預測最終體力</span>
              <span className={`text-2xl font-black ${isAchieved ? 'text-blue-600' : 'text-red-500'}`}>
                {plan.finalStamina} <span className="text-sm">pts</span>
              </span>
            </div>
            
            {isAchieved ? (
              <div className="flex items-center gap-1 text-green-600">
                <span className="material-symbols-outlined text-lg">check_circle</span>
                <span className="text-xs font-bold">
                  {isPerfect ? '完美達標' : `已達標 (+${diff})`}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-red-500">
                <span className="material-symbols-outlined text-lg">error_outline</span>
                <span className="text-xs font-bold">接近目標 ({diff})</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategyCard;
