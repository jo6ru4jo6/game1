
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ActionType, StrategyPlan, GlobalSettings } from './types';
import { ACTIONS, INITIAL_SETTINGS } from './constants';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StrategyCard from './components/StrategyCard';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [settings, setSettings] = useState<GlobalSettings>(INITIAL_SETTINGS);
  const [plans, setPlans] = useState<StrategyPlan[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);

  // 計算調整後的消耗
  const getAdjustedCosts = useCallback((skillLv: number) => {
    return ACTIONS.reduce((acc, action) => {
      if (action.type === ActionType.REST) {
        acc[action.type] = action.baseCost;
      } else {
        // 動作消耗減少 (負數增加趨向0)
        acc[action.type] = Math.min(0, action.baseCost + skillLv);
      }
      return acc;
    }, {} as Record<ActionType, number>);
  }, []);

  const currentCosts = useMemo(() => getAdjustedCosts(settings.skillLevel), [settings.skillLevel, getAdjustedCosts]);

  // 計算完美達標（體力剛好等於目標值）的方案數量
  const perfectMatchCount = useMemo(() => {
    return plans.filter(p => p.finalStamina === settings.targetStamina).length;
  }, [plans, settings.targetStamina]);

  // 核心 DFS 搜尋邏輯
  const generatePlans = useCallback(() => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const costs = getAdjustedCosts(settings.skillLevel);
      const actionTypes = ACTIONS.map(a => a.type);
      const costValues = actionTypes.map(t => costs[t]);
      const N = settings.remainingTurns;
      const startStamina = settings.startStamina;
      const targetStamina = settings.targetStamina;
      
      const allResults: StrategyPlan[] = [];
      const currentCounts = new Array(actionTypes.length).fill(0);

      // 上課限制邏輯
      const maxSchoolCount = Math.max(0, N - 9);
      const schoolIdx = actionTypes.indexOf(ActionType.SCHOOL);

      function dfs(idx: number, remaining: number) {
        if (idx === actionTypes.length - 1) {
          currentCounts[idx] = remaining;
          
          let totalChange = 0;
          for (let i = 0; i < actionTypes.length; i++) {
            totalChange += currentCounts[i] * costValues[i];
          }
          
          // 計算最終體力，並限制在 0 - 100 之間
          const rawFinalStamina = startStamina + totalChange;
          const finalStamina = Math.min(100, Math.max(0, rawFinalStamina));
          
          // 篩選條件：最終體力與目標體力誤差在 ±10 以內
          if (Math.abs(finalStamina - targetStamina) <= 10) {
            const countsMap = {} as Record<ActionType, number>;
            actionTypes.forEach((type, i) => {
              countsMap[type] = currentCounts[i];
            });

            allResults.push({
              id: Math.random(),
              label: '',
              tag: '',
              tagColorClass: '',
              counts: countsMap,
              finalStamina: finalStamina
            });
          }
          return;
        }

        for (let i = 0; i <= remaining; i++) {
          if (idx === schoolIdx && i > maxSchoolCount) {
            break; 
          }
          currentCounts[idx] = i;
          dfs(idx + 1, remaining - i);
        }
      }

      dfs(0, N);

      // 排序邏輯：絕對誤差越小越前面，誤差相同則體力較高的優先
      allResults.sort((a, b) => {
        const diffA = Math.abs(a.finalStamina - targetStamina);
        const diffB = Math.abs(b.finalStamina - targetStamina);
        if (diffA !== diffB) return diffA - diffB;
        return b.finalStamina - a.finalStamina;
      });

      // 處理標籤與標記
      const processedPlans = allResults.map((plan, index) => {
        const diff = plan.finalStamina - targetStamina;
        const isPerfect = diff === 0;
        
        let tag = '接近目標';
        let color = 'bg-orange-100 text-orange-700';
        
        if (isPerfect) {
          tag = '完美消耗';
          color = 'bg-green-100 text-green-700';
        } else if (diff > 0) {
          tag = '符合標竿';
          color = 'bg-blue-100 text-blue-700';
        }

        return {
          ...plan,
          label: `方案 ${index + 1}`,
          tag,
          tagColorClass: color,
          isRecommended: isPerfect || Math.abs(diff) <= 2 // 誤差極小時標記為推薦
        };
      });

      setPlans(processedPlans);
      setIsCalculating(false);
    }, 100);
  }, [settings, getAdjustedCosts]);

  useEffect(() => {
    generatePlans();
  }, [generatePlans]);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          settings={settings} 
          setSettings={setSettings} 
          currentCosts={currentCosts}
          onCalculate={generatePlans}
          isCalculating={isCalculating}
        />
        
        <main className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
          <div className="px-8 pt-8 pb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center size-10 rounded-full bg-blue-50 text-blue-600">
                  <span className="material-symbols-outlined">filter_alt</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">搜尋結果 ({plans.length})</h4>
                  <p className="text-xs text-slate-400">
                    目標：{settings.targetStamina} | 僅顯示誤差 ±10 點以內之方案
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar px-8 pb-8 space-y-4">
            {plans.length > 0 ? (
              plans.map((plan) => (
                <StrategyCard 
                  key={plan.id} 
                  plan={plan} 
                  target={settings.targetStamina}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-slate-400 bg-white rounded-2xl border-2 border-dashed border-slate-200">
                <span className="material-symbols-outlined text-4xl mb-2">search_off</span>
                <p className="font-medium">找不到符合誤差範圍的組合</p>
                <p className="text-xs mt-1 text-slate-300">請嘗試調整目標體力或增加運動等級</p>
              </div>
            )}
          </div>

          <Footer 
            start={settings.startStamina} 
            target={settings.targetStamina} 
            best={perfectMatchCount}
          />
        </main>
      </div>
    </div>
  );
};

export default App;
