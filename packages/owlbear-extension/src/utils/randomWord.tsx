const words = [
    "ability","able","aboard","about","above","accept","accident","according",
    "account","accurate","acres","across","act","action","active","activity",
    "ago","agree","ahead","aid","air","airplane","alike","alive",
    "all","allow","almost","alone","along","aloud","alphabet","already",
    "also","although","am","among","amount","ancient","angle","angry",
    "animal","announced","another","answer","ants","any","anybody","anyone",
    "appropriate","are","area","arm","army","around","arrange","arrangement",
    "arrive","arrow","art","article","as","aside","ask","asleep",
    "at","ate","atmosphere","atom","atomic","attached","attack","attempt",
    "away","baby","back","bad","badly","bag","balance","ball",
    "balloon","band","bank","bar","bare","bark","barn","base",
    "baseball","basic","basis","basket","bat","battle","be","bean",
    "bee","been","before","began","beginning","begun","behavior","behind",
    "being","believed","bell","belong","below","belt","bend","beneath",
    "bent","beside","best","bet","better","between","beyond","bicycle",
    "bigger","biggest","bill","birds","birth","birthday","bit","bite",
    "blue","board","boat","body","bone","book","border","born",
    "both","bottle","bottom","bound","bow","bowl","box","boy",
    "breathe","breathing","breeze","brick","bridge","brief","bright","bring",
    "build","building","built","buried","burn","burst","bus","bush",
    "business","busy","but","butter","buy","by","cabin","cage",
    "cake","call","calm","came","camera","camp","can","canal",
    "cannot","cap","capital","captain","captured","car","carbon","card",
    "care","careful","carefully","carried","carry","case","cast","castle",
    "cat","catch","cattle","caught","cause","cave","cell","cent",
    "center","central","century","certain","certainly","chain","chair","chamber",
    "check","cheese","chemical","chest","chicken","chief","child","children",
    "choice","choose","chose","chosen","church","circle","circus","citizen",
    "city","class","classroom","claws","clay","clean","clear","clearly",
    "climate","climb","clock","close","closely","closer","cloth","clothes",
    "clothing","cloud","club","coach","coal","coast","coat","coffee",
    "come","comfortable","coming","command","common","community","company","compare",
    "cool","copper","copy","corn","corner","correct","correctly","cost",
    "cotton","could","count","country","couple","courage","course","court",
    "cover","cow","cowboy","crack","cream","create","creature","crew",
    "crop","cross","crowd","cry","cup","curious","current","curve",
    "customs","cut","cutting","daily","damage","dance","danger","dangerous",
    "dark","darkness","date","daughter","dawn","day","dead","deal",
    "dear","death","decide","declared","deep","deeply","deer","definition",
    "degree","depend","depth","describe","desert","design","desk","detail",
    "determine","develop","development","diagram","diameter","did","die","differ",
    "disease","dish","distance","distant","divide","division","do","doctor",
    "does","dog","doing","doll","dollar","done","donkey","door",
    "dot","double","doubt","down","dozen","draw","drawn","dream",
    "drop","dropped","drove","dry","duck","due","dug","dull",
    "during","dust","duty","each","eager","ear","earlier","early",
    "earn","earth","easier","easily","east","easy","eat","eaten",
    "edge","education","effect","effort","egg","eight","either","electric",
    "energy","engine","engineer","enjoy","enough","enter","entire","entirely",
    "environment","equal","equally","equator","equipment","escape","especially","essential",
    "establish","even","evening","event","eventually","ever","every","everybody",
    "everyone","everything","everywhere","evidence","exact","exactly","examine","example",
    "expression","extra","eye","face","facing","fact","factor","factory",
    "failed","fair","fairly","fall","fallen","familiar","family","famous",
    "far","farm","farmer","farther","fast","fastened","faster","fat",
    "father","favorite","fear","feathers","feature","fed","feed","feel",
    "feet","fell","fellow","felt","fence","few","fewer","field",
    "film","final","finally","find","fine","finest","finger","finish",
    "fire","fireplace","firm","first","fish","five","fix","flag",
    "flower","fly","fog","folks","follow","food","foot","football",
    "for","force","foreign","forest","forget","forgot","forgotten","form",
    "former","fort","forth","forty","forward","fought","found","four",
    "friendly","frighten","frog","from","front","frozen","fruit","fuel",
    "full","fully","fun","function","funny","fur","furniture","further",
    "future","gain","game","garage","garden","gas","gasoline","gate",
    "gather","gave","general","generally","gentle","gently","get","getting",
    "giant","gift","girl","give","given","giving","glad","glass",
    "green","grew","ground","group","grow","grown","growth","guard",
    "guess","guide","gulf","gun","habit","had","hair","half",
    "halfway","hall","hand","handle","handsome","hang","happen","happened",
    "happily","happy","harbor","hard","harder","hardly","has","hat",
    "hearing","heart","heat","heavy","height","held","hello","help",
    "higher","highest","highway","hill","him","himself","his","history",
    "hit","hold","hole","hollow","home","honor","hope","horn",
    "horse","hospital","hot","hour","house","how","however","huge",
    "human","hundred","hung","hungry","hunt","hunter","hurried","hurry",
    "hurt","husband","ice","idea","identity","if","ill","image",
    "imagine","immediately","importance","important","impossible","improve","in","inch",
    "include","including","income","increase","indeed","independent","indicate","individual",
    "is","island","it","its","itself","jack","jar","jet",
    "job","join","joined","journey","joy","judge","jump","jungle",
    "just","keep","kept","key","kids","kill","kind","kitchen",
    "knew","knife","know","knowledge","known","label","labor","lack",
    "largest","last","late","later","laugh","law","lay","layers",
    "lead","leader","leaf","learn","least","leather","leave","leaving",
    "led","left","leg","length","lesson","let","letter","level",
    "line","lion","lips","liquid","list","listen","little","live",
    "living","load","local","locate","location","log","lonely","long",
    "longer","look","loose","lose","loss","lost","lot","loud",
    "love","lovely","low","lower","luck","lucky","lunch","lungs",
    "lying","machine","machinery","mad","made","magic","magnet","mail",
    "manufacturing","many","map","mark","market","married","mass","massage",
    "mean","means","meant","measure","meat","medicine","meet","melted",
    "mice","middle","might","mighty","mile","military","milk","mill",
    "mix","mixture","model","modern","molecular","moment","money","monkey",
    "motion","motor","mountain","mouse","mouth","move","movement","movie",
    "moving","mud","muscle","music","musical","must","my","myself",
    "mysterious","nails","name","nation","national","native","natural","naturally",
    "nature","near","nearby","nearer","nearest","nearly","necessary","neck",
    "no","nobody","nodded","noise","none","noon","nor","north",
    "nose","not","note","noted","nothing","notice","noun","now",
    "number","numeral","nuts","object","observe","obtain","occasionally","occur",
    "ocean","of","off","offer","office","officer","official","oil",
    "old","older","oldest","on","once","one","only","onto",
    "open","operation","opinion","opportunity","opposite","or","orange","orbit",
    "order","ordinary","organization","organized","origin","original","other","ought",
    "our","ourselves","out","outer","outline","outside","over","own",
    "pair","palace","pale","pan","paper","paragraph","parallel","parent",
    "park","part","particles","particular","particularly","partly","parts","party",
    "pass","passage","past","path","pattern","pay","peace","pen",
    "pencil","people","per","percent","perfect","perfectly","perhaps","period",
    "pictured","pie","piece","pig","pile","pilot","pine","pink",
    "pipe","pitch","place","plain","plan","plane","planet","planned",
    "pleasure","plenty","plural","plus","pocket","poem","poet","poetry",
    "point","pole","police","policeman","political","pond","pony","pool",
    "possibly","post","pot","potatoes","pound","pour","powder","power",
    "pretty","prevent","previous","price","pride","primitive","principal","principle",
    "proud","prove","provide","public","pull","pupil","pure","purple",
    "purpose","push","put","putting","quarter","queen","question","quick",
    "quickly","quiet","quietly","quite","rabbit","race","radio","railroad",
    "raw","rays","reach","read","reader","ready","real","realize",
    "red","refer","refused","region","regular","related","relationship","religious",
    "remain","remarkable","remember","remove","repeat","replace","replied","report",
    "rhyme","rhythm","rice","rich","ride","riding","right","ring",
    "rise","rising","river","road","roar","rock","rocket","rocky",
    "round","route","row","rubbed","rubber","rule","ruler","run",
    "satisfied","save","saved","saw","say","scale","scared","scene",
    "school","science","scientific","scientist","score","screen","sea","search",
    "season","seat","second","secret","section","see","seed","seeing",
    "seems","seen","seldom","select","selection","sell","send","sense",
    "setting","settle","settlers","seven","several","shade","shadow","shake",
    "sheet","shelf","shells","shelter","shine","shinning","ship","shirt",
    "shoe","shoot","shop","shore","short","shorter","shot","should",
    "sit","sitting","situation","six","size","skill","skin","sky",
    "smile","smoke","smooth","snake","snow","so","soap","social",
    "solution","solve","some","somebody","somehow","someone","something","sometime",
    "southern","space","speak","special","species","specific","speech","speed",
    "spell","spend","spent","spider","spin","spirit","spite","split",
    "standard","star","stared","start","state","statement","station","stay",
    "stiff","still","stock","stomach","stone","stood","stop","stopped",
    "store","storm","story","stove","straight","strange","stranger","straw",
    "stronger","struck","structure","struggle","stuck","student","studied","studying",
    "suggest","suit","sum","summer","sun","sunlight","supper","supply",
    "swept","swim","swimming","swing","swung","syllable","symbol","system",
    "table","tail","take","taken","tales","talk","tall","tank",
    "team","tears","teeth","telephone","television","tell","temperature","ten",
    "them","themselves","then","theory","there","therefore","these","they",
    "thou","though","thought","thousand","thread","three","threw","throat",
    "tie","tight","tightly","till","time","tin","tiny","tip",
    "tired","title","to","tobacco","today","together","told","tomorrow",
    "torn","total","touch","toward","tower","town","toy","trace",
    "treated","tree","triangle","tribe","trick","tried","trip","troops",
    "turn","twelve","twenty","twice",
    "under","underline","understanding","unhappy","union","unit","universe","unknown",
    "unless","until","unusual","up","upon","upper","upward","us",
    "use","useful","using","usual","usually","valley","valuable","value",
    "vapor","variety","various","vast","vegetable","verb","vertical","very",
    "war","warm","warn","was","wash","waste","watch","water",
    "wave","way","we","weak","wealth","wear","weather","week",
    "weigh","weight","welcome","well","went","were","west","western",
    "where","wherever","whether","which","while","whispered","whistle","white",
    "who","whole","whom","whose","why","wide","widely","wife",
    "wire","wise","wish","with","within","without","wolf","women",
    "won","wonder","wonderful","wood","wooden","wool","word","wore",
    "year","yellow","yes","yesterday","yet","you","young","younger",
    "your","yourself","youth","zero","zebra","zipper","zoo","zulu"
  ];
  
export function getRandomWord(firstLetterToUppercase = false) {
    const word = words[randomNumber(0, words.length - 1)];
    return firstLetterToUppercase ? word.charAt(0).toUpperCase() + word.slice(1) : word;
}
  
export function generateWords(length: number = 10, separator: string = ' ') {
    return [...Array(length)].map((_, i) => getRandomWord(i === 0)).join(separator).trim();
}
  
export function randomNumber(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min);
}