import {exerciseById,movementPattern} from './exercises';
import type {Program,WorkoutLog} from './types';

export type ProgressPattern=ReturnType<typeof movementPattern>;
export type ProgressionSuggestion={exerciseId:string;name:string;pattern:ProgressPattern;patternLabel:string;recommendation:string;detail:string;last:string;score:number};
export type PatternBalance={pattern:ProgressPattern;label:string;sets:number;share:number;targetShare:number;status:'low'|'ok'|'high';statusLabel:string};
export type ProgressionInsights={finishedWorkouts:number;completedSets:number;loggedVolume:number;bestEstimatedOneRepMax:number;suggestions:ProgressionSuggestion[];balance:PatternBalance[];coachNotes:string[]};
export const progressPatternLabels:Record<ProgressPattern,string>={push:'İtiş',pull:'Çekiş',squat:'Squat',hinge:'Kalça menteşesi',core:'Core',cardio:'Kardiyo'};
const patternOrder:ProgressPattern[]=['push','pull','squat','hinge','core','cardio'];
const emptyCounts=():Record<ProgressPattern,number>=>({push:0,pull:0,squat:0,hinge:0,core:0,cardio:0});
const repBounds=(value:string)=>{const nums=value.match(/\d+/g)?.map(Number)??[];if(!nums.length)return {min:8,max:12};return {min:nums[0],max:nums[1]??nums[0]}};
const roundHalf=(value:number)=>Math.round(value*2)/2;
const oneRepMax=(kg:number,reps:number)=>kg>0&&reps>0?kg*(1+Math.min(reps,20)/30):0;
const logTime=(log:WorkoutLog)=>Date.parse(log.finishedAt??log.date)||0;

export function buildProgressionInsights(program:Program,logs:WorkoutLog[]):ProgressionInsights{
 const programLogs=logs.filter(log=>log.programId===program.id).sort((a,b)=>logTime(a)-logTime(b));
 const plannedCounts=emptyCounts();const recentCounts=emptyCounts();const exercisePlans=new Map<string,{sets:number;reps:string;pattern:ProgressPattern;name:string}>();
 for(const workout of program.workouts)for(const planned of workout.exercises){const ex=exerciseById(planned.exerciseId);if(!ex)continue;const pattern=movementPattern(ex);plannedCounts[pattern]+=planned.sets;if(!exercisePlans.has(planned.exerciseId))exercisePlans.set(planned.exerciseId,{sets:planned.sets,reps:planned.reps,pattern,name:ex.name});}
 const latestByExercise=new Map<string,{time:number;kg:number;reps:number;avgReps:number;completed:number;plannedSets:number;repMin:number;repMax:number;name:string;pattern:ProgressPattern}>();
 const cutoff=Date.now()-14*24*60*60*1000;let completedSets=0;let loggedVolume=0;let bestEstimatedOneRepMax=0;
 for(const log of programLogs){const workout=program.workouts.find(w=>w.id===log.workoutId);if(!workout)continue;const time=logTime(log);for(const planned of workout.exercises){const ex=exerciseById(planned.exerciseId);if(!ex)continue;const pattern=movementPattern(ex);const completed=log.completedSets[planned.instanceId]??[];completedSets+=completed.length;if(time>=cutoff)recentCounts[pattern]+=completed.length;const metricMap=log.setMetrics?.[planned.instanceId]??{};const metrics=completed.map(i=>metricMap[String(i)]).filter((m):m is {kg:number;reps:number}=>Boolean(m)&&Number.isFinite(m.kg)&&Number.isFinite(m.reps));for(const metric of metrics){loggedVolume+=metric.kg*metric.reps;bestEstimatedOneRepMax=Math.max(bestEstimatedOneRepMax,oneRepMax(metric.kg,metric.reps));}const lastMetric=metrics.at(-1);const bounds=repBounds(planned.reps);const previous=latestByExercise.get(planned.exerciseId);if(!previous||time>=previous.time){latestByExercise.set(planned.exerciseId,{time,kg:lastMetric?.kg??0,reps:lastMetric?.reps??0,avgReps:metrics.length?metrics.reduce((n,m)=>n+m.reps,0)/metrics.length:0,completed:completed.length,plannedSets:planned.sets,repMin:bounds.min,repMax:bounds.max,name:ex.name,pattern});}}}
 const suggestions=Array.from(latestByExercise.entries()).map(([exerciseId,last])=>{
  const addKg=last.pattern==='squat'||last.pattern==='hinge'?5:2.5;let recommendation='Setleri aynı hedefle tekrarla';let detail='Formu ve tekrar kalitesini sabitle; sonra küçük artış yap.';let score=last.time;
  if(last.completed<last.plannedSets){recommendation='Önce eksik setleri tamamla';detail=`Son kayıtta ${last.completed}/${last.plannedSets} set tamamlandı.`;score-=3000}
  else if(!last.avgReps){recommendation='Kg/tekrar kaydı gir';detail='Bir sonraki öneri için set başına kg ve tekrar verisi lazım.';score-=2000}
  else if(last.kg>0&&last.avgReps>=last.repMax){recommendation=`Sonraki denemede ${roundHalf(last.kg+addKg)} kg`;detail=`Ortalama ${Math.round(last.avgReps)} tekrar hedef üstüne çıktı; küçük yük artışı uygun.`;score+=2000}
  else if(last.avgReps>=last.repMax){recommendation=`Sonraki denemede ${last.repMax+2} tekrar`;detail='Vücut ağırlığı/tempo hareketinde önce tekrar veya süreyi artır.';score+=1500}
  else if(last.avgReps<last.repMin){recommendation='Aynı yükle tekrar dene';detail=`Ortalama ${Math.round(last.avgReps)} tekrar hedef altındaydı; yük artırma.`;score-=1000}
  else {recommendation=`${last.repMax} tekrara yaklaş`;detail=`Hedef aralık ${last.repMin}-${last.repMax}; önce tekrar kalitesini yükselt.`;}
  return {exerciseId,name:last.name,pattern:last.pattern,patternLabel:progressPatternLabels[last.pattern],recommendation,detail,last:last.kg>0?`${last.kg} kg × ${last.reps}`:`${last.reps||last.completed} tekrar/set`,score};
 }).sort((a,b)=>b.score-a.score).slice(0,6);
 const recentTotal=Object.values(recentCounts).reduce((a,b)=>a+b,0);const plannedTotal=Object.values(plannedCounts).reduce((a,b)=>a+b,0)||1;const sourceCounts=recentTotal?recentCounts:plannedCounts;const sourceTotal=recentTotal||plannedTotal;
 const balance=patternOrder.filter(pattern=>plannedCounts[pattern]>0||sourceCounts[pattern]>0).map(pattern=>{const sets=sourceCounts[pattern];const share=sets/(sourceTotal||1);const targetShare=plannedCounts[pattern]/plannedTotal;const status:PatternBalance['status']=recentTotal&&share<targetShare*.55?'low':recentTotal&&share>targetShare*1.65?'high':'ok';return {pattern,label:progressPatternLabels[pattern],sets,share,targetShare,status,statusLabel:status==='low'?'Geride':status==='high'?'Yoğun':'Dengeli'};});
 const coachNotes:string[]=[];if(!programLogs.length)coachNotes.push('İlk antrenmanı kaydedince hedef önerileri otomatik oluşacak.');if(programLogs.length&&suggestions.some(s=>s.recommendation.includes('Kg/tekrar')))coachNotes.push('Kg ve tekrar girilen setler arttıkça öneriler daha netleşir.');const low=balance.filter(b=>b.status==='low').map(b=>b.label);if(low.length)coachNotes.push(`Son 14 günde geride kalan örüntüler: ${low.join(', ')}.`);if(!coachNotes.length)coachNotes.push('Denge iyi görünüyor; yük artışlarını küçük ve kontrollü tut.');
 return {finishedWorkouts:programLogs.filter(log=>log.finishedAt).length,completedSets,loggedVolume:Math.round(loggedVolume),bestEstimatedOneRepMax:roundHalf(bestEstimatedOneRepMax),suggestions,balance,coachNotes};
}
