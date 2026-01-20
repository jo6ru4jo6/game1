
import { Action, ActionType } from './types';

export const ACTIONS: Action[] = [
  {
    type: ActionType.SCHOOL,
    name: '上課',
    icon: 'school',
    baseCost: -10,
    colorClass: 'bg-blue-50 border-blue-100',
    iconColorClass: 'text-blue-500'
  },
  {
    type: ActionType.RESEARCH,
    name: '研究',
    icon: 'science',
    baseCost: -17,
    colorClass: 'bg-purple-50 border-purple-100',
    iconColorClass: 'text-purple-500'
  },
  {
    type: ActionType.FITNESS,
    name: '運動',
    icon: 'fitness_center',
    baseCost: -25,
    colorClass: 'bg-red-50 border-red-100',
    iconColorClass: 'text-red-500'
  },
  {
    type: ActionType.WORK,
    name: '打工',
    icon: 'work',
    baseCost: -30,
    colorClass: 'bg-orange-50 border-orange-100',
    iconColorClass: 'text-orange-500'
  },
  {
    type: ActionType.REST,
    name: '休息',
    icon: 'bed',
    baseCost: 10,
    colorClass: 'bg-green-50 border-green-100',
    iconColorClass: 'text-green-500'
  }
];

export const INITIAL_SETTINGS = {
  startStamina: 100,
  targetStamina: 1,
  remainingTurns: 14,
  skillLevel: 0
};
