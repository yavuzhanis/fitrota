import { exercises } from './exercises';
import type { Exercise, Goal, Place, Profile, Program, PlannedExercise, Workout, WeightBand, Muscle } from './types';
export const goalNames: Record<Goal,string> = {fat_loss:'Yağ yakımı',weight_loss:'Kilo verme',muscle:'Kas kazanımı',tone:'Sıkılaşma',bodyweight:'Vücut ağırlığı'};
export const placeNames: Record<Place,string> = {gym:'Spor salonu',home:'Ev · Ekipmansız',home_equipped:'Ev · Ekipmanlı'};
export const bandOf = (weight:number): WeightBand => weight < 60 ? '40-60' : weight < 85 ? '60-85' : weight < 110 ? '85-110' : '110+';
export const validateProfile = (p:Profile):string[] => { const errors:string[]=[]; if(!Number.isFinite(p.weight)||p.weight<40||p.weight>350) errors.push('Kilo 40–350 kg arasında olmalı.'); if(!Number.isFinite(p.height)||p.height<120||p.height>240) errors.push('Boy 120–240 cm arasında olmalı.'); if(!Number.isInteger(p.age)||p.age<18||p.age>90) errors.push('Bu uygulama 18–90 yaş yetişkinler içindir.'); if(![2,3,4,5,6].includes(p.days)) errors.push('Haftalık gün sayısı geçersiz.'); if(![20,30,45,60].includes(p.minutes)) errors.push('Süre seçimi geçersiz.'); if((p.riskFlags??[]).length&&!p.medicalClearance) errors.push('Seçtiğin sağlık riskleri için önce sağlık uzmanı onayını işaretlemelisin.'); return errors; };
const hash=(s:string)=>Array.from(s).reduce((h,c)=>Math.imul(31,h)+c.charCodeAt(0)|0,17)>>>0;
const shuffle=<T,>(arr:T[],seed:number):T[]=>{ const a=[...arr]; let n=seed||1; for(let i=a.length-1;i>0;i--){n^=n<<13;n^=n>>>17;n^=n<<5;const j=(n>>>0)%(i+1);[a[i],a[j]]=[a[j],a[i]];}return a;};
const compatible=(e:Exercise,p:Profile)=>{if(p.place==='home' && e.equipment!=='bodyweight') return false;if(p.place==='home_equipped'&&!['bodyweight','dumbbell','band'].includes(e.equipment))return false; if(p.level==='beginner'&&e.difficulty!=='beginner')return false;if(p.level==='intermediate'&&e.difficulty==='advanced')return false; const cautious=p.weight<50 || p.weight>=110 || p.limitations.length>0 || (p.age>=60&&p.level==='beginner');if(cautious&&e.impact!=='low')return false;if(p.limitations.includes('knee')&&(e.impact!=='low'||/squat|lunge|step-up|merdiven|leg extension|leg press/i.test(e.name)))return false;if(p.limitations.includes('back')&&/deadlift|row|good morning|squat|pull-through|superman/i.test(e.name))return false;if(p.limitations.includes('shoulder')&&/press|şınav|raise|fly|overhead|pull-up|pulldown|face pull/i.test(e.name))return false;return true;};
const getPool=(p:Profile,muscle:Muscle,seed:number)=>shuffle(exercises.filter(e=>compatible(e,p)&&(muscle==='full'?['upper','lower','core'].includes(e.muscle):e.muscle===muscle)),seed);
export const estimateWorkoutMinutes=(plan:PlannedExercise[]):number=>5+4+plan.reduce((n,e)=>n+(e.duration??e.sets*0.7)+Math.max(0,e.sets-1)*e.rest/60+0.4,0);
const mk=(e:Exercise,p:Profile,day:number,index:number):PlannedExercise=>{
 const isCardio=e.muscle==='cardio';const isCore=e.muscle==='core';const beginner=p.level==='beginner';
 const sets=isCardio?1:(p.minutes<=20?2:beginner?2:p.level==='advanced'?4:3);
 const timeCardio=Math.max(6,Math.min(25,Math.floor(p.minutes*(p.goal==='fat_loss'||p.goal==='weight_loss'?0.37:0.24))));
 return {instanceId:`d${day}-${index}-${e.id}`,exerciseId:e.id,sets,reps:isCardio?`${timeCardio} dk`:isCore&&e.id.includes('plank')?'20–35 sn':beginner?'10–12':'8–12',rest:isCardio?30:beginner?75:90,duration:isCardio?timeCardio:undefined};
};
export function generateProgram(profile:Profile,variation=0):Program{
 const errors=validateProfile(profile);if(errors.length)throw Error(errors.join(' '));
 const seed=hash(`${JSON.stringify(profile)}-${variation}`);const workouts:Workout[]=[];
 const split:Muscle[][]=profile.days<=3?Array.from({length:profile.days},()=>['lower','upper','core'] as Muscle[]):Array.from({length:profile.days},(_,i)=>i%2===0?['upper','core']:['lower','core']);
 const cardioGoal=['fat_loss','weight_loss'].includes(profile.goal);
 for(let i=0;i<profile.days;i++){
  const focus=profile.days<=3?'full':i%2===0?'upper':'lower';const picks:Exercise[]=[];
  const wanted=profile.minutes<=20?3:profile.minutes<=30?4:profile.minutes<=45?5:6;
  const muscles=split[i];let cycle=0;
  while(picks.length<wanted && cycle<wanted*5){const m=muscles[cycle%muscles.length];const pool=getPool(profile,m,seed+i*157+cycle*41);const prior=new Set(workouts.slice(-2).flatMap(w=>w.exercises.map(x=>x.exerciseId)));const picked=pool.find(e=>!picks.some(x=>x.id===e.id)&&(!prior.has(e.id)||pool.length<=3));if(picked)picks.push(picked);cycle++;}
  const plan=picks.map((e,j)=>mk(e,profile,i,j));
  if((cardioGoal||profile.goal==='bodyweight')&& profile.minutes>=30){let options=getPool(profile,'cardio',seed+i*13);if(profile.place==='gym') options=options.filter(e=>['bike','elliptical','walk','march'].includes(e.id));const cardio=options.find(e=>e.id!==workouts[i-1]?.exercises.at(-1)?.exerciseId);if(cardio) plan.push(mk(cardio,profile,i,plan.length));}
  // İstenen süreyi aşan hareketleri (çekirdek en az iki hareket olacak şekilde) çıkar.
  while(plan.length>2 && estimateWorkoutMinutes(plan)>profile.minutes)plan.splice(plan.length-1,1);
  workouts.push({id:`gun-${i+1}`,title:`${i+1}. Gün · ${focus==='full'?'Tüm Vücut':focus==='upper'?'Üst Vücut':'Alt Vücut'}`,subtitle:cardioGoal?'Kuvvet + düşük darbeli kardiyo':'Kontrollü kuvvet ve hareket kalitesi',focus,exercises:plan});
 }
 const notes=['Antrenmandan önce 5 dakika hafif ısın; sonunda 3–5 dakika tempoyu düşür.','Aynı kas gruplarının yoğun çalışmalarına mümkün olduğunca 48 saat ara ver.','Keskin ağrı, baş dönmesi veya göğüs ağrısı olursa egzersizi durdur.'];
 if(profile.days<=3)notes.push('Tam vücut günlerini haftaya mümkün olduğunca aralıklı yerleştir (ör. pazartesi/çarşamba/cuma).');
 else notes.push('Üst/alt vücut günlerini dönüşümlü uygulayarak aynı kas grubuna toparlanma zamanı tanı.');
 if(profile.weight<50)notes.unshift('50 kg altı için düşük darbeli, kontrollü hareketlere öncelik verildi; kilo tek başına sağlık riskini belirlemez.');
 if(profile.weight>=110)notes.unshift('110+ kg için düşük darbeli hareketlere öncelik verildi; kilo tek başına sağlık riskini belirlemez.');
 if(profile.limitations.length)notes.unshift('Belirttiğin kısıtlar doğrultusunda bazı hareketler filtrelendi; bu tıbbi uygunluk değerlendirmesi değildir.');
 if((profile.riskFlags??[]).length)notes.unshift('Sağlık riskleri işaretlendi; program yalnızca genel egzersiz rehberidir ve uzman onayının yerini tutmaz.');
 if(profile.age>=60)notes.unshift('Denge ve hareket kontrolüne öncelik ver; gerekirse uzman eşliğinde ilerle.');
 if(profile.goal==='weight_loss')notes.push('Kilo kaybında antrenman kadar sürdürülebilir beslenme ve düzenli uyku da önemlidir.');
 return {id:`p-${seed}`,createdAt:new Date().toISOString(),profile,workouts,seed,notes};
}

/** Aynı bölgeye, ekipmana ve güvenlik kısıtlarına göre alternatifler. */
export function alternativesFor(profile:Profile,exerciseId:string,excludedIds:string[]=[]):Exercise[]{
 const current=exercises.find(e=>e.id===exerciseId);if(!current)return [];
 const banned=new Set([exerciseId,...excludedIds]);
 return exercises.filter(e=>e.muscle===current.muscle&&compatible(e,profile)&&!banned.has(e.id))
  .sort((a,b)=>Number(a.equipment!==current.equipment)-Number(b.equipment!==current.equipment)||a.name.localeCompare(b.name,'tr'));
}
