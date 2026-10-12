import type {Goal,Profile} from './types';
export type DietType='balanced'|'vegetarian'|'vegan';
export type Allergy='milk'|'egg'|'gluten'|'nuts'|'soy';
export type ActivityLevel='low'|'moderate'|'high';
export type NutritionPrefs={diet:DietType;allergies:Allergy[];meals:3|4|5;activity?:ActivityLevel};
export type Food={name:string;portion:string;kcal:number;protein:number;carbs:number;fat:number;tags:Allergy[];diets:DietType[]};
export type Meal={name:string;foods:Food[];kcal:number;protein:number;carbs:number;fat:number};
export type NutritionTargets={kcal:number;maintenanceKcal:number;protein:number;carbs:number;fat:number;activity:ActivityLevel;activityLabel:string;strategy:string;adjustment:number};
export type NutritionDay={day:number;meals:Meal[];kcal:number;protein:number;carbs:number;fat:number;targetKcal:number;deltaKcal:number;portionFactor:number;portionNote:string};
export type NutritionPlan={id:string;createdAt:string;preferences:NutritionPrefs&{activity:ActivityLevel};profileSnapshot:Pick<Profile,'age'|'height'|'weight'|'goal'>;targets:NutritionTargets;days:NutritionDay[];note:string;guidance:string[]};
export const activityNames:Record<ActivityLevel,string>={low:'Az hareketli',moderate:'Orta aktif',high:'Çok aktif'};
const all:DietType[]=['balanced','vegetarian','vegan'];
const veg:DietType[]=['balanced','vegetarian'];
const onlyAll:DietType[]=['balanced'];
const food=(name:string,portion:string,kcal:number,protein:number,carbs:number,fat:number,tags:Allergy[],diets:DietType[]):Food=>({name,portion,kcal,protein,carbs,fat,tags,diets});
const templates:Record<string,Food[]>={
 breakfast:[
 food('Yulaf, muz ve chia','60 g yulaf + 1 muz + 15 g chia + su',390,12,67,10,['gluten'],all),
 food('Yumurta, tam tahıllı ekmek ve domates','2 yumurta + 2 dilim ekmek + 1 domates',390,23,38,15,['egg','gluten'],veg),
 food('Tofu sote ve patates','150 g tofu + 200 g patates + sebze',395,22,44,13,['soy'],all),
 food('Yoğurt, yulaf ve meyve','200 g yoğurt + 50 g yulaf + 1 meyve',405,19,61,9,['milk','gluten'],veg),
 food('Nohut ezmesi ve mısır galetası','150 g nohut ezmesi + 4 galeta + salatalık',410,16,57,13,[],all),
 food('Karabuğday lapası ve armut','90 g kuru karabuğday + 1 armut',415,13,81,4,[],all)],
 lunch:[
 food('Izgara tavuk, bulgur ve salata','140 g tavuk + 180 g pişmiş bulgur + salata + 1 tk yağ',555,49,47,15,['gluten'],onlyAll),
 food('Mercimek, pirinç ve sebze','250 g pişmiş mercimek + 170 g pilav + sebze',570,26,98,9,[],all),
 food('Ton balıklı pirinç kasesi','130 g ton balığı + 200 g pirinç + sebze + 1 yk yağ',560,39,62,17,[],onlyAll),
 food('Nohutlu kinoa salatası','220 g nohut + 150 g pişmiş kinoa + sebze',570,25,91,13,[],all),
 food('Peynirli sebzeli makarna','95 g kuru makarna + 60 g beyaz peynir + sebze',555,24,71,19,['milk','gluten'],veg),
 food('Tofulu pirinç ve brokoli','180 g tofu + 200 g pirinç + 150 g brokoli',550,28,68,18,['soy'],all)],
 dinner:[
 food('Fırın balık, patates ve salata','170 g balık + 260 g patates + salata + 1 tk yağ',550,43,54,17,[],onlyAll),
 food('Kuru fasulye ve pirinç','250 g fasulye + 180 g pilav + salata',555,24,94,11,[],all),
 food('Hindi, karabuğday ve sebze','150 g hindi + 180 g pişmiş karabuğday + sebze',545,45,61,13,[],onlyAll),
 food('Sebzeli mercimek köftesi ve humus','250 g mercimek köftesi + 100 g humus + yeşillik',565,24,83,17,[],all),
 food('Etli sebze ve bulgur','150 g yağsız et + 160 g pişmiş bulgur + sebze',560,43,50,19,['gluten'],onlyAll),
 food('Fırın tofu ve tatlı patates','180 g tofu + 260 g tatlı patates + sebze',555,28,68,18,['soy'],all)],
 snack:[
 food('Elma ve kabak çekirdeği','1 orta elma + 30 g kabak çekirdeği',260,10,30,14,[],all),
 food('Muz ve kavrulmuş nohut','1 muz + 50 g leblebi',275,11,50,4,[],all),
 food('Yoğurt ve yaban mersini','220 g yoğurt + 120 g yaban mersini',210,13,27,5,['milk'],veg),
 food('Kuru kayısı ve ceviz','45 g kuru kayısı + 30 g ceviz',300,6,32,19,['nuts'],all),
 food('Humus ve havuç','130 g humus + 200 g havuç',320,11,35,17,[],all),
 food('Soya yoğurdu ve meyve','200 g soya yoğurdu + 1 muz',235,10,40,5,['soy'],all)]
};
const names=['Kahvaltı','Öğle','Akşam'];
const activities:ActivityLevel[]=['low','moderate','high'];
const activityFactor:Record<ActivityLevel,number>={low:1.25,moderate:1.45,high:1.65};
const goalAdjustment:Record<Goal,number>={fat_loss:-350,weight_loss:-450,muscle:250,tone:-150,bodyweight:0};
const goalStrategy:Record<Goal,string>={fat_loss:'hafif kalori açığı',weight_loss:'kontrollü kalori açığı',muscle:'hafif kalori fazlası',tone:'korumaya yakın denge',bodyweight:'performans odaklı bakım'};
const proteinPerKg:Record<Goal,number>={fat_loss:1.6,weight_loss:1.6,muscle:1.8,tone:1.5,bodyweight:1.5};
const roundTo=(value:number,step:number)=>Math.round(value/step)*step;
const safePrefs=(prefs:NutritionPrefs):NutritionPrefs&{activity:ActivityLevel}=>{
 const diet: DietType = all.includes(prefs.diet)?prefs.diet:'balanced';
 const meals = ([3,4,5] as const).includes(prefs.meals as 3|4|5)?prefs.meals:4;
 const activity = activities.includes(prefs.activity as ActivityLevel)?prefs.activity as ActivityLevel:'moderate';
 const allowedAllergies:Allergy[]=['milk','egg','gluten','nuts','soy'];
 const allergies = Array.isArray(prefs.allergies)?prefs.allergies.filter((a):a is Allergy=>allowedAllergies.includes(a as Allergy)):[];
 return {diet,meals,activity,allergies};
};
export function estimateNutritionTargets(profile:Profile,prefs:NutritionPrefs):NutritionTargets{
 const safe=safePrefs(prefs);
 const neutralBmr=Math.max(1200,10*profile.weight+6.25*profile.height-5*profile.age-78);
 const maintenanceKcal=roundTo(neutralBmr*activityFactor[safe.activity],25);
 const adjustment=goalAdjustment[profile.goal];
 const kcal=Math.max(1400,roundTo(maintenanceKcal+adjustment,25));
 const proteinWeight=Math.min(profile.weight,110);
 const protein=Math.min(220,roundTo(proteinWeight*proteinPerKg[profile.goal],5));
 const fat=Math.max(45,roundTo((kcal*.25)/9,5));
 const carbs=Math.max(80,roundTo((kcal-protein*4-fat*9)/4,5));
 return {kcal,maintenanceKcal,protein,carbs,fat,activity:safe.activity,activityLabel:activityNames[safe.activity],strategy:goalStrategy[profile.goal],adjustment};
}
function pick(category:string,prefs:NutritionPrefs,seed:number):Food {
 const possible=templates[category].filter(f=>f.diets.includes(prefs.diet)&&!f.tags.some(a=>prefs.allergies.includes(a)));
 if(!possible.length)throw new Error('Tercihlerine uygun yeterli öğün bulunamadı. Alerji seçimlerini kontrol et.');
 return possible[((seed%possible.length)+possible.length)%possible.length];
}
function makeMeal(name:string,foods:Food[]):Meal{return {name,foods,kcal:foods.reduce((a,f)=>a+f.kcal,0),protein:foods.reduce((a,f)=>a+f.protein,0),carbs:foods.reduce((a,f)=>a+f.carbs,0),fat:foods.reduce((a,f)=>a+f.fat,0)};}
function scaleMeal(meal:Meal,factor:number):Meal{return {...meal,kcal:Math.round(meal.kcal*factor),protein:Math.round(meal.protein*factor),carbs:Math.round(meal.carbs*factor),fat:Math.round(meal.fat*factor)};}
function makeDay(day:number,meals:Meal[],targets:NutritionTargets):NutritionDay{
 const rawKcal=meals.reduce((n,m)=>n+m.kcal,0);
 const portionFactor=Number(Math.min(1.25,Math.max(.8,targets.kcal/rawKcal)).toFixed(2));
 const adjusted=meals.map(m=>scaleMeal(m,portionFactor));
 const kcal=adjusted.reduce((n,m)=>n+m.kcal,0);
 const protein=adjusted.reduce((n,m)=>n+m.protein,0);
 const carbs=adjusted.reduce((n,m)=>n+m.carbs,0);
 const fat=adjusted.reduce((n,m)=>n+m.fat,0);
 const pct=Math.round(Math.abs(1-portionFactor)*100);
 const portionNote=portionFactor<.96?`Hedefe yaklaşmak için örnek porsiyonları yaklaşık %${pct} küçült; önce yağ ve tahıl eklerini azalt.`:portionFactor>1.04?`Hedefe yaklaşmak için örnek porsiyonları yaklaşık %${pct} büyüt; protein ve kompleks karbonhidrat kaynaklarına ek porsiyon ekle.`:'Porsiyonlar hedef aralığına yakın; açlık/tokluk sinyaline göre küçük ayarlama yap.';
 return {day,meals:adjusted,kcal,protein,carbs,fat,targetKcal:targets.kcal,deltaKcal:kcal-targets.kcal,portionFactor,portionNote};
}
export function generateNutrition(profile:Profile,prefs:NutritionPrefs,variation=0):NutritionPlan {
 const safe=safePrefs(prefs);
 if(!['balanced','vegetarian','vegan'].includes(safe.diet)||![3,4,5].includes(safe.meals)||!Array.isArray(safe.allergies))throw Error('Beslenme tercihleri geçersiz.');
 if(profile.age<18)throw Error('Bu modül yalnızca yetişkinler için hazırlanmıştır.');
 const targets=estimateNutritionTargets(profile,safe);
 const days:NutritionDay[]=Array.from({length:7},(_,i)=>{
  const meals=names.map((name,j)=>makeMeal(name,[pick(['breakfast','lunch','dinner'][j],safe,i*3+j+variation*5)]));
  if(safe.meals>=4)meals.splice(2,0,makeMeal('Ara öğün 1',[pick('snack',safe,i+variation*3)]));
  if(safe.meals===5)meals.push(makeMeal('Ara öğün 2',[pick('snack',safe,i+3+variation*4)]));
  return makeDay(i+1,meals,targets);
 });
 const goalNote:Record<Goal,string>={fat_loss:'Yağ kaybı için öğün düzeni yanında sürdürülebilir hareket ve uyku önemlidir.',weight_loss:'Kilo değişimi kişiden kişiye farklıdır; kalori ihtiyacı yalnızca kiloya göre belirlenemez.',muscle:'Kas kazanımında yeterli beslenme, kuvvet egzersizi ve toparlanma birlikte değerlendirilmelidir.',tone:'Sıkılaşma hedefinde sürdürülebilir egzersiz ve dengeli beslenme önemlidir.',bodyweight:'Vücut ağırlığı antrenmanlarını desteklemek için düzenli öğünler tercih edilebilir.'};
 const guidance=[
  `${activityNames[targets.activity]} seçimine göre bakım enerjisi yaklaşık ${targets.maintenanceKcal} kcal; ${targets.strategy} için başlangıç hedefi ${targets.kcal} kcal.`,
  `Günlük protein hedefi yaklaşık ${targets.protein} g; ana öğünlerde avuç içi büyüklüğünde protein kaynağı planla.`,
  `Porsiyon katsayısı günlük menüyü hedefe yaklaştırır; gerçek ihtiyaç haftalık kilo, performans ve açlık durumuna göre ayarlanmalıdır.`
 ];
 return {id:`diet-${Date.now()}-${variation}`,createdAt:new Date().toISOString(),preferences:{...safe,allergies:[...safe.allergies]},profileSnapshot:{age:profile.age,height:profile.height,weight:profile.weight,goal:profile.goal},targets,days,note:goalNote[profile.goal],guidance};
}
