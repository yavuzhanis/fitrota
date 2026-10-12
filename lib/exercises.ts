import type { Exercise } from './types';
const E = (id:string,name:string,muscle:Exercise['muscle'],equipment:Exercise['equipment'],difficulty:Exercise['difficulty'],impact:Exercise['impact'],instructions:string[], alternatives?:string[]):Exercise => ({id,name,muscle,equipment,difficulty,impact,instructions,alternatives});
export const exercises: Exercise[] = [
E('walk','Tempolu yürüyüş','cardio','bodyweight','beginner','low',['Rahat tempoyla başla, nefesini kontrol et.','Konuşabildiğin ama hafif zorlandığın ritimde yürü.']),
E('march','Yerinde yürüyüş','cardio','bodyweight','beginner','low',['Omuzlarını gevşet.','Kollarını doğal biçimde sallayarak adımla.']),
E('bike','Sabit bisiklet','cardio','cardio','beginner','low',['Sele yüksekliğini ayarla.','Eklem ağrısı yaratmayan dirençte pedal çevir.']),
E('elliptical','Eliptik bisiklet','cardio','cardio','beginner','low',['Tutacakları kavra, dik dur.','Kontrollü ve düşük tempoda ilerle.']),
E('step_touch','Yana adım','cardio','bodyweight','beginner','low',['Sağa ve sola adım at.','Dizlerini kilitlemeden kontrollü hareket et.']),
E('chair_squat','Sandalyeye otur-kalk','lower','bodyweight','beginner','low',['Sağlam bir sandalyenin önünde ayakta dur.','Kalçanı geriye gönderip kontrollü otur, tekrar kalk.']),
E('wall_push','Duvar şınavı','upper','bodyweight','beginner','low',['Ellerini omuz genişliğinde duvara yerleştir.','Dirsekleri büküp göğsünü duvara yaklaştır, geri it.']),
E('incline_push','Yüksek zeminde şınav','upper','bodyweight','beginner','low',['Ellerini sabit, sağlam yüksek bir yüzeye koy.','Vücudunu düz tutarak dirsekleri kontrollü bük.']),
E('pushup','Şınav','upper','bodyweight','intermediate','medium',['Avuçlarını omuz hizasında yere yerleştir.','Gövdeni düz tutarak aşağı in ve yukarı it.']),
E('glute_bridge','Kalça köprüsü','lower','bodyweight','beginner','low',['Sırtüstü uzan ve dizlerini bük.','Kalçanı sıkıp yukarı kaldır, kontrollü indir.']),
E('bird_dog','Bird dog','core','bodyweight','beginner','low',['Dört ayak pozisyonuna gel.','Karşı kol ve bacağını yavaşça uzat, taraf değiştir.']),
E('dead_bug','Dead bug','core','bodyweight','beginner','low',['Sırtüstü uzan, kollarını ve dizlerini yukarı al.','Belini sabit tutarak karşı kol ve bacağı uzat.']),
E('plank_wall','Duvar plank','core','bodyweight','beginner','low',['Ön kollarını duvara dayayıp biraz geri çekil.','Karın kaslarını sıkıp gövdeni düz tut.']),
E('plank','Ön kol plank','core','bodyweight','intermediate','medium',['Dirseklerini omuzlarının altında tut.','Kalçanı düşürmeden nefes alıp ver.']),
E('standing_calf','Ayakta baldır yükselişi','lower','bodyweight','beginner','low',['Destek alarak dik dur.','Topuklarını yükselt, yavaşça yere bırak.']),
E('reverse_lunge','Geri adım lunge','lower','bodyweight','intermediate','medium',['Bir ayağınla geriye kontrollü adım at.','Öndeki dizini ayak doğrultusunda tutarak yüksel.']),
E('side_legs','Yana bacak açma','lower','bodyweight','beginner','low',['Sabit bir yerden destek al.','Bacağını yana küçük bir açıyla kaldırıp indir.']),
E('db_row','Dambıl row','upper','dumbbell','beginner','low',['Sırtını nötr tutarak hafifçe öne eğil.','Dambılı kalçana doğru çek, yavaş indir.']),
E('db_press','Dambıl göğüs press','upper','dumbbell','beginner','low',['Bench veya yerde sırtüstü yat.','Dambılları kontrollü yukarı it ve indir.']),
E('db_shoulder','Dambıl omuz press','upper','dumbbell','intermediate','low',['Dik otur ve ağırlıkları omuz hizasında tut.','Kontrollü yukarı it, belini aşırı kavislendirme.']),
E('db_rdl','Dambıl Romanian deadlift','lower','dumbbell','intermediate','low',['Dizlerini hafifçe bük.','Kalçanı geri göndererek ağırlıkları bacak boyunca indir.']),
E('db_goblet','Goblet squat','lower','dumbbell','intermediate','medium',['Dambılı göğüs önünde tut.','Kalçanı geriye göndererek kontrollü çömel.']),
E('db_curl','Dambıl biceps curl','upper','dumbbell','beginner','low',['Dirseklerini gövdene yakın tut.','Ağırlığı sallamadan kaldır ve indir.']),
E('band_row','Direnç bandı row','upper','band','beginner','low',['Bandı güvenli şekilde sabitle.','Dirseklerini geriye çekerek kürek kemiklerini yaklaştır.']),
E('band_press','Direnç bandı göğüs press','upper','band','beginner','low',['Bandı arkada güvenli şekilde sabitle.','Ellerini öne doğru uzatarak bandı it.']),
E('band_walk','Bantla yana yürüyüş','lower','band','beginner','low',['Bandı dizlerinin üstüne veya ayak bileğine tak.','Kısa kontrollü yan adımlar at.']),
E('leg_press','Leg press','lower','machine','beginner','low',['Koltuğu dizlerini rahatça bükebileceğin şekilde ayarla.','Dizleri kilitlemeden platformu it, yavaş geri getir.']),
E('seated_row','Oturarak row makinesi','upper','machine','beginner','low',['Göğsünü dik tut, tutacakları kavra.','Dirseklerini geriye çek, kürek kemiklerini birleştir.']),
E('chest_press','Chest press makinesi','upper','machine','beginner','low',['Oturak yüksekliğini tutacaklar göğüs hizasında olacak şekilde ayarla.','Dirseklerini kilitlemeden it ve kontrollü geri dön.']),
E('lat_pull','Lat pulldown','upper','cable','beginner','low',['Barı omuzdan biraz geniş tut.','Omuzları yükseltmeden barı üst göğse doğru çek.']),
E('leg_curl','Leg curl makinesi','lower','machine','beginner','low',['Makineyi bacak ölçüne göre ayarla.','Topuklarını kalçaya doğru kontrollü çek.']),
E('leg_ext','Leg extension','lower','machine','beginner','low',['Diz hizanı cihazın dönme noktasına ayarla.','Bacaklarını kontrollü uzat, ağırlığı bırakma.']),
E('cable_face','Cable face pull','upper','cable','intermediate','low',['İpi yüz hizasında tut.','Dirsekleri yana açarak ipi yüzüne doğru çek.']),
E('cable_push','Kablo triceps pushdown','upper','cable','beginner','low',['Dirseklerini yanlarda sabit tut.','Kabloyu aşağı it, yavaşça başlangıca dön.']),
E('smith_squat','Smith squat','lower','machine','intermediate','medium',['Barı omuz üzerinde uygun yüksekliğe ayarla.','Kontrollü çömel ve yüksel.']),
E('bench_press','Bench press','upper','barbell','advanced','medium',['Bench üzerinde ayaklarını yere sabitle.','Barı kontrollü indir ve göğüsten yukarı it.']),
E('barbell_row','Barbell row','upper','barbell','advanced','medium',['Kalçadan öne eğil, sırtını düz tut.','Barı gövdene çekip kontrollü indir.']),
E('barbell_squat','Barbell squat','lower','barbell','advanced','medium',['Barı üst sırtına sabitle.','Karın kaslarını sıkıp kontrollü çömel.']),
];

// Genişletilmiş, yerel ve çevrimdışı çalışan egzersiz kataloğu.
// Her varyasyon bağımsız kimlik taşır; isim, ekipman ve yönergeleri bulunur.
type Group = [string, Exercise['muscle'], Exercise['equipment'], Exercise['difficulty'], Exercise['impact'], string[]];
const expandedGroups: Group[] = [
 ['Diz üstü şınav','upper','bodyweight','beginner','low',['Dizleri yere koy, gövdeyi düz tut.','Dirsekleri kontrollü büküp geri it.']],
 ['Dar şınav','upper','bodyweight','intermediate','medium',['Eller omuzdan hafif dar, gövde düz.','Dirsekleri gövde yanında bük, kontrollü yüksel.']],
 ['Geniş şınav','upper','bodyweight','intermediate','medium',['Eller omuzdan geniş, gövde sabit.','Göğsü kontrollü indir, güçlü it.']],
 ['Pike şınav','upper','bodyweight','intermediate','medium',['Kalçayı yukarı al, omuzları sabitle.','Başını kontrollü yere yaklaştır, yukarı it.']],
 ['Ayakta ters mekik','core','bodyweight','beginner','low',['Dik dur ve karnını sık.','Dizi göğse çekerek gövdeyi dengede tut.']],
 ['Yan plank diz destekli','core','bodyweight','beginner','low',['Alt diz yerde, dirsek omuz altında.','Kalçayı kontrollü kaldır ve indir.']],
 ['Yan plank','core','bodyweight','intermediate','medium',['Dirsek omuz altında, ayaklar üst üste.','Kalçayı kaldırıp gövdeyi düz tut.']],
 ['Hollow hold','core','bodyweight','advanced','medium',['Belini yerde tut, kolları uzat.','Hareket aralığını bel konumunu koruyarak ayarla.']],
 ['Oturarak diz çekme','core','bodyweight','beginner','low',['Sandalyede dik otur, ellerle destek al.','Tek dizi kontrollü kaldır, taraf değiştir.']],
 ['Ayakta gövde rotasyonu','core','bodyweight','beginner','low',['Dik dur, kalçaları sabit tut.','Gövdeyi ağrısız aralıkta yana çevir.']],
 ['Superman','core','bodyweight','intermediate','low',['Yüzüstü uzan, boynunu nötr tut.','Kol ve bacakları hafif kaldırıp indir.']],
 ['Step-up alçak basamak','lower','bodyweight','beginner','low',['Sağlam alçak basamağa adım at.','Dengeyi koruyup yavaşça geri in.']],
 ['Box squat','lower','bodyweight','beginner','low',['Sağlam kutuya kontrollü otur.','Ayaklardan güç alarak kalk.']],
 ['Sumo squat','lower','bodyweight','intermediate','medium',['Ayakları omuzdan geniş aç.','Dizleri ayak yönünde tutarak çömel.']],
 ['Tek bacak kalça köprüsü','lower','bodyweight','intermediate','low',['Sırtüstü uzan, bir diz bükülü.','Kalçayı dengeli kaldırıp indir.']],
 ['Destekli split squat','lower','bodyweight','beginner','low',['Sabit bir yerden destek al.','Kısa hareket aralığında kontrollü alçal.']],
 ['Duvar oturuşu','lower','bodyweight','beginner','low',['Sırtı duvara yasla, dizleri rahat açıda tut.','Nefesini tutmadan pozisyonu koru.']],
 ['Ayakta kalça ekstansiyonu','lower','bodyweight','beginner','low',['Destek alarak dik dur.','Bacağı kalçadan arkaya uzatıp indir.']],
 ['Dambıl lateral raise','upper','dumbbell','beginner','low',['Hafif ağırlıklarla dik dur.','Kolları omuz hizasına kadar yana kaldır.']],
 ['Dambıl front raise','upper','dumbbell','beginner','low',['Dirsekleri hafif bük, gövde sabit.','Kolları kontrollü öne kaldır.']],
 ['Dambıl reverse fly','upper','dumbbell','intermediate','low',['Kalçadan hafif eğil, sırtı düz tut.','Kolları yana aç, kürek kemiklerini sık.']],
 ['Dambıl hammer curl','upper','dumbbell','beginner','low',['Avuç içleri birbirine baksın.','Dirsekler sabitken dambılları kaldır.']],
 ['Dambıl triceps extension','upper','dumbbell','intermediate','low',['Baş üstünde dambılı sabit tut.','Dirsekleri büküp kontrollü uzat.']],
 ['Dambıl pullover','upper','dumbbell','intermediate','low',['Bench üstünde sırtını sabitle.','Dambılı kontrollü baş üstüne götür ve geri getir.']],
 ['Dambıl floor press','upper','dumbbell','beginner','low',['Yere sırtüstü yat, dirsekleri kontrollü indir.','Ağırlıkları yukarı it.']],
 ['Dambıl split squat','lower','dumbbell','intermediate','medium',['Adım pozisyonu al, ağırlıkları yanında tut.','Kontrollü alçal ve yüksel.']],
 ['Dambıl step-up','lower','dumbbell','intermediate','medium',['Düşük ve sağlam basamağa çık.','Yavaşça geri in, dengeyi koru.']],
 ['Dambıl calf raise','lower','dumbbell','beginner','low',['Dambılları yanında tut, destek kullan.','Topukları kaldırıp yavaş indir.']],
 ['Dambıl sumo deadlift','lower','dumbbell','intermediate','low',['Ayakları geniş aç, gövdeyi sabit tut.','Kalçadan güç alıp ağırlığı kaldır.']],
 ['Bant pull-apart','upper','band','beginner','low',['Bandı göğüs önünde tut.','Omuzları yükseltmeden bandı yana aç.']],
 ['Bant biceps curl','upper','band','beginner','low',['Bandı ayağının altında sabitle.','Dirsekleri büküp kontrollü geri indir.']],
 ['Bant triceps extension','upper','band','beginner','low',['Bandı güvenle sabitle.','Dirsekleri sabit tutarak kolları uzat.']],
 ['Bant lateral raise','upper','band','beginner','low',['Bandı ayağınla sabitle.','Kolu yana yavaş kaldırıp indir.']],
 ['Bant good morning','lower','band','intermediate','low',['Bandı güvenle konumlandır.','Kalçadan menteşe yaparak gövdeyi indir.']],
 ['Bant glute bridge','lower','band','beginner','low',['Bandı diz üstüne koy.','Kalçayı kaldırırken dizleri hizalı tut.']],
 ['Bant squat','lower','band','beginner','low',['Bandı dizlerin üstüne geçir.','Dizleri hizalı tutarak otur-kalk yap.']],
 ['Bant clamshell','lower','band','beginner','low',['Yan yat, dizler bükülü.','Üst dizi yavaşça açıp kapat.']],
 ['Seated chest fly makinesi','upper','machine','beginner','low',['Oturak yüksekliğini ayarla.','Kolları göğüs önünde kontrollü birleştir.']],
 ['Reverse pec deck','upper','machine','beginner','low',['Göğüs pedine yaslan.','Kolları kontrollü geriye aç.']],
 ['Assisted pull-up','upper','machine','intermediate','low',['Destek ağırlığını ayarla.','Omuzları sabitleyip kendini yukarı çek.']],
 ['Machine shoulder press','upper','machine','beginner','low',['Oturak yüksekliğini ayarla.','Tutacakları kontrollü yukarı it.']],
 ['Machine biceps curl','upper','machine','beginner','low',['Dirsekleri ped üzerinde sabitle.','Ağırlığı sallamadan kaldır.']],
 ['Machine triceps extension','upper','machine','beginner','low',['Dirsekleri cihaz eksenine yerleştir.','Kolları kontrollü uzat.']],
 ['Seated calf raise','lower','machine','beginner','low',['Ayak parmaklarını platforma koy.','Topukları yavaşça kaldır ve indir.']],
 ['Hip abduction makinesi','lower','machine','beginner','low',['Makineyi rahat oturuşa ayarla.','Dizleri kontrollü yana aç.']],
 ['Hip adduction makinesi','lower','machine','beginner','low',['Dizleri pedlere yerleştir.','Bacakları kontrollü birleştir.']],
 ['Hack squat makinesi','lower','machine','intermediate','medium',['Omuz ve sırt pedlerini ayarla.','Dizleri ayak yönünde tutarak alçal.']],
 ['Glute kickback makinesi','lower','machine','beginner','low',['Kalçayı makinede sabitle.','Bacağı kontrollü arkaya it.']],
 ['Cable fly','upper','cable','intermediate','low',['Kabloları göğüs seviyesine ayarla.','Kolları önde kontrollü birleştir.']],
 ['Cable lateral raise','upper','cable','beginner','low',['Kabloyu en alta ayarla.','Kolu yana kontrollü kaldır.']],
 ['Cable curl','upper','cable','beginner','low',['Dirsekleri yanında tut.','Barı veya ipi kontrollü yukarı çek.']],
 ['Cable overhead triceps','upper','cable','intermediate','low',['İpi baş üstüne konumlandır.','Dirsekleri sabit tutarak uzat.']],
 ['Straight arm pulldown','upper','cable','intermediate','low',['Kablonun karşısında ayakta dur.','Kolları hafif bükülü aşağı doğru çek.']],
 ['Single arm cable row','upper','cable','beginner','low',['Gövdeyi döndürmeden tutacağı çek.','Kürek kemiğini geriye al.']],
 ['Cable pull-through','lower','cable','intermediate','low',['Kabloyu bacak arasından geçir.','Kalçayı geriye gönderip doğrul.']],
 ['Cable glute kickback','lower','cable','beginner','low',['Bilek aparatı güvenli bağlansın.','Bacağı arkaya kontrollü uzat.']],
 ['Pallof press','core','cable','beginner','low',['Kabloya yan dur, gövdeyi sabitle.','Tutacağı öne itip döndürmeden geri çek.']],
 ['Barbell hip thrust','lower','barbell','intermediate','low',['Üst sırtı bench üzerinde destekle.','Kalçayı kaldırırken belini aşırı uzatma.']],
 ['Barbell Romanian deadlift','lower','barbell','advanced','low',['Dizleri hafif bük, kalçadan menteşe yap.','Barı bacaklara yakın tutarak doğrul.']],
 ['Barbell overhead press','upper','barbell','advanced','medium',['Gövdede stabiliteyi sağla.','Barı baş üstüne kontrollü it.']],
 ['Barbell curl','upper','barbell','intermediate','low',['Dirsekleri gövde yanında tut.','Barı sallamadan kaldır.']],
 ['Incline bench press','upper','barbell','advanced','medium',['Bench açısını ayarla, omuzları sabitle.','Barı kontrollü indir ve it.']],
 ['Kürek ergometresi','cardio','cardio','beginner','low',['Önce bacaklardan itiş başlat.','Kol çekişini kontrollü tamamla.']],
 ['Yürüyüş bandı eğimli yürüyüş','cardio','cardio','beginner','low',['Düşük eğimle başla.','Nefes kontrolünü koruyacak hızda yürü.']],
 ['Recumbent bisiklet','cardio','cardio','beginner','low',['Sırtı destekli seleye otur.','Rahat aralıkta pedal çevir.']],
 ['Merdiven makinesi','cardio','cardio','intermediate','medium',['Tutamakları güvenle kavra.','Kısa adımlarla dengeli çık.']],
 ['Düşük tempolu gölge boksu','cardio','bodyweight','beginner','low',['Ayakları sabit veya küçük adımlarla hareket ettir.','Kolları kontrollü uzat, sert kilitleme.']],
 ['Yavaş diz çekerek yürüyüş','cardio','bodyweight','beginner','low',['Destek yakınında dik dur.','Dizleri sırayla rahat yüksekliğe kaldır.']],
 ['Yana adım ve kol açma','cardio','bodyweight','beginner','low',['Küçük yana adım at.','Kolları omuz rahatlığına göre aç.']],
 ['Düşük etkili aerobik adım','cardio','bodyweight','beginner','low',['Zıplamadan hafif ritmik adımlarla hareket et.','Temponu konuşabilecek düzeyde tut.']],
 ['Topuk dokundurma kardiyo','cardio','bodyweight','beginner','low',['Topuğu öne hafif dokundur.','Kollarla ritmi destekle.']],
 ['Ayakta hamstring esnetme','lower','bodyweight','beginner','low',['Dizi hafif bük, kalçadan eğil.','Esnemeyi zorlamadan kısa süre koru.']],
 ['Kedi-deve mobilitesi','core','bodyweight','beginner','low',['Dört ayakta rahat pozisyon al.','Omurgayı yavaş ve ağrısız hareket ettir.']],
];
const expanded = expandedGroups.map(([name,muscle,equipment,difficulty,impact,instructions],i):Exercise=>({
 id:`ext_${i+1}`,name,muscle,equipment,difficulty,impact,instructions
}));
exercises.push(...expanded);
// Teknik varyasyonlar özgün hareketlerin kontrollü uygulama biçimleridir.
// Bunlar yeni anatomik hareketler gibi sunulmaz; temel hareket ID'si korunur.
const techniqueVariants = [
 { suffix:'· Yavaş eksantrik', tip:'İniş veya dönüş evresini yaklaşık 3 saniyede tamamla; ağırlığı uygun seviyeye düşür.' },
 { suffix:'· 1 sn duraklama', tip:'Hareketin kontrollü ve ağrısız bölümünde bir saniye durakla; nefesini tutma.' },
 { suffix:'· Kısa hareket açıklığı', tip:'Hareketi yalnızca kontrol edebildiğin ağrısız aralıkta gerçekleştir; gerekirse uzman görüşü al.' },
];
const strengthBase = exercises.filter(e=>e.muscle!=='cardio' && !/esnetme|mobilite|plank|hold|oturuşu|wall sit/i.test(e.name));
const generatedVariations:Exercise[] = strengthBase.flatMap(e=>techniqueVariants.map((v,i)=>({
 ...e,id:`${e.id}_tech${i+1}`,name:`${e.name} ${v.suffix}`,
 instructions:[...e.instructions,v.tip],alternatives:[e.id]
})));
exercises.push(...generatedVariations.slice(0,Math.max(0,390-exercises.length)));
const cardioIntervals=exercises.filter(e=>e.muscle==='cardio'&&e.impact==='low').map(e=>({...e,id:`${e.id}_interval`,name:`${e.name} · Hafif interval`,instructions:[...e.instructions,'1 dakika rahat tempo ile 1 dakika biraz daha canlı tempoyu dönüşümlü uygula; nefesin aşırı zorlanmasın.']}));
exercises.push(...cardioIntervals.slice(0,Math.max(0,390-exercises.length)));
export const exerciseCount = exercises.length;
export const baseExerciseCount=exercises.filter(e=>!/_tech\d+$/.test(e.id)).length;
export function movementPattern(e:Exercise):NonNullable<Exercise['pattern']>{
 if(e.muscle==='cardio')return 'cardio';if(e.muscle==='core')return 'core';
 const name=e.name.toLocaleLowerCase('tr');
 if(/row|çekiş|pull|lat |curl|reverse|face|kürek|biceps/i.test(name))return 'pull';
 if(/deadlift|hinge|hip thrust|bridge|good morning|pull-through|kalça/i.test(name))return 'hinge';
 if(e.muscle==='lower')return 'squat';return 'push';
}
export function exerciseDemonstration(e:Exercise):string{
 // Açılacak bağlantı video arama sonuçlarıdır, doğrulanmış uygulama videosu değildir.
 return `https://www.youtube.com/results?search_query=${encodeURIComponent(e.name.replace(/ · .*/, '')+' exercise proper form')}`;
}

export const exerciseById = (id: string) => exercises.find((e) => e.id === id);
