export type WorkoutType = 'Running'|'Tapis'|'Sortie longue'|'Fractionné'|'Tempo'|'Allure marathon'|'Endurance'|'Piscine'|'Musculation'|'Parkour'|'Sanda'|'Mobilité'|'Repos';
export interface Workout { id:string; date:string; type:WorkoutType; distance?:number; duration?:number; pace?:number; heartRateAvg?:number; heartRateMax?:number; elevation?:number; cadence?:number; rpe?:number; calories?:number; notes?:string }
export interface Goal { id:string; title:string; targetDate:string; targetValue:number; currentValue:number; unit:string; status:'À venir'|'En cours'|'Atteint'|'Reporté' }
export interface TrainingDay { id:string; day:number; activity:string; type:WorkoutType; plannedDistance?:number; plannedDuration?:number; completedDistance?:number; status:'À faire'|'Réalisée'|'Manquée'|'Reportée'|'Supplémentaire'; resultWorkoutId?:string }
export interface Race { id:string; name:string; date:string; location:string; status:'principal'|'secondaire'|'à définir'; goalTime?:string }
export interface Recovery { id?:string; date:string; sleep:number; fatigue:number; pain:number; motivation:number; recovery:number; notes?:string }
export interface AppData { workouts:Workout[]; goals:Goal[]; week:TrainingDay[]; races:Race[]; recovery:Recovery[] }
