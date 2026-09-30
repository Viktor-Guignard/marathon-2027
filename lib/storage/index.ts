'use client';
import type { AppData, Workout, Goal, TrainingDay, Recovery } from '@/types';
const KEY='marathon-2027:v1';
const seedRun = {id:'demo-long-run',date:'2026-09-26',type:'Sortie longue' as const,distance:12,duration:72,pace:6,heartRateAvg:145,elevation:45,cadence:160,rpe:5,notes:'Séance exemple — modifiable'};
export const initialData:AppData={workouts:[seedRun],goals:[{id:'goal-30k',title:'Réaliser une sortie longue de 30 km',targetDate:'2026-12-31',targetValue:30,currentValue:seedRun.distance??0,unit:'km',status:'En cours'}],week:[{id:'mon-shoulder',day:1,activity:'Musculation – épaules',type:'Musculation',status:'À faire'},{id:'tue-run',day:2,activity:'Course sur tapis',type:'Tapis',plannedDistance:9,plannedDuration:60,status:'À faire'},{id:'tue-parkour',day:2,activity:'Parkour',type:'Parkour',status:'À faire'},{id:'wed-swim',day:3,activity:'Piscine',type:'Piscine',status:'À faire'},{id:'thu-legs',day:4,activity:'Musculation – jambes',type:'Musculation',status:'À faire'},{id:'fri-chest',day:5,activity:'Musculation – pectoraux',type:'Musculation',status:'À faire'},{id:'sat-long',day:6,activity:'Sortie longue',type:'Sortie longue',plannedDistance:16,status:'À faire'},{id:'sat-swim',day:6,activity:'Piscine',type:'Piscine',status:'À faire'},{id:'sun-sanda',day:7,activity:'Sanda',type:'Sanda',status:'À faire'}],races:[{id:'paris',name:'Marathon de Paris',date:'2027-04-04',location:'Paris',status:'principal'},{id:'gdansk',name:'Marathon de Gdańsk',date:'2027-04-25',location:'Gdańsk',status:'à définir'}],recovery:[]};
function read():AppData { if(typeof window==='undefined')return initialData; try { const raw=localStorage.getItem(KEY); return raw?{...initialData,...JSON.parse(raw)}:initialData; } catch{return initialData;} }
function write(data:AppData){ localStorage.setItem(KEY,JSON.stringify(data)); window.dispatchEvent(new Event('marathon-data')); }
export const getData=read; export const getWorkouts=()=>read().workouts; export const getGoals=()=>read().goals; export const getPlan=()=>read().week;
export const saveData=(data:AppData)=>write(data);
export const addWorkout=(w:Workout)=>{const d=read();write({...d,workouts:[w,...d.workouts]});};
export const updateWorkout=(w:Workout)=>{const d=read();write({...d,workouts:d.workouts.map(x=>x.id===w.id?w:x)});};
export const deleteWorkout=(id:string)=>{const d=read();write({...d,workouts:d.workouts.filter(x=>x.id!==id)});};
export const addGoal=(g:Goal)=>{const d=read();write({...d,goals:[g,...d.goals]});};
export const updateGoal=(g:Goal)=>{const d=read();write({...d,goals:d.goals.map(x=>x.id===g.id?g:x)});};
export const deleteGoal=(id:string)=>{const d=read();write({...d,goals:d.goals.filter(x=>x.id!==id)});};
export const updatePlan=(week:TrainingDay[])=>{const d=read();write({...d,week});};
export const addRecovery=(entry:Recovery)=>{const d=read();write({...d,recovery:[entry,...d.recovery]});};
