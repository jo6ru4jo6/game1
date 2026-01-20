
export enum ActionType {
  SCHOOL = 'SCHOOL',
  RESEARCH = 'RESEARCH',
  FITNESS = 'FITNESS',
  WORK = 'WORK',
  REST = 'REST'
}

export interface Action {
  type: ActionType;
  name: string;
  icon: string;
  baseCost: number;
  colorClass: string;
  iconColorClass: string;
}

export interface StrategyPlan {
  id: number;
  label: string;
  tag: string;
  tagColorClass: string;
  isRecommended?: boolean;
  counts: Record<ActionType, number>;
  finalStamina: number;
}

export interface GlobalSettings {
  startStamina: number;
  targetStamina: number;
  remainingTurns: number;
  skillLevel: number;
}
