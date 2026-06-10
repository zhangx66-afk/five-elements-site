const stems = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const branches = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

const stemElement = {
  甲: "wood", 乙: "wood",
  丙: "fire", 丁: "fire",
  戊: "earth", 己: "earth",
  庚: "metal", 辛: "metal",
  壬: "water", 癸: "water"
};

const stemPolarity = {
  甲: "yang", 丙: "yang", 戊: "yang", 庚: "yang", 壬: "yang",
  乙: "yin", 丁: "yin", 己: "yin", 辛: "yin", 癸: "yin"
};

const branchElement = {
  子: "water", 丑: "earth", 寅: "wood", 卯: "wood",
  辰: "earth", 巳: "fire", 午: "fire", 未: "earth",
  申: "metal", 酉: "metal", 戌: "earth", 亥: "water"
};

const hiddenStems = {
  子: ["癸"],
  丑: ["己", "癸", "辛"],
  寅: ["甲", "丙", "戊"],
  卯: ["乙"],
  辰: ["戊", "乙", "癸"],
  巳: ["丙", "戊", "庚"],
  午: ["丁", "己"],
  未: ["己", "丁", "乙"],
  申: ["庚", "壬", "戊"],
  酉: ["辛"],
  戌: ["戊", "辛", "丁"],
  亥: ["壬", "甲"]
};

const elementLabel = {
  wood: "木",
  fire: "火",
  earth: "土",
  metal: "金",
  water: "水"
};

const elementCn = {
  wood: "木",
  fire: "火",
  earth: "土",
  metal: "金",
  water: "水"
};

const strengthLabel = {
  "偏弱": "偏弱",
  "偏旺": "偏旺",
  "中和": "较平衡"
};

const elementCopy = {
  wood: {
    colors: "玉绿色、竹青色、柔和蓝绿色",
    materials: "自然纹理、叶片线条、细长造型、温润玉色",
    tone: "成长、人际、规划、柔韧"
  },
  fire: {
    colors: "朱砂红、玫瑰金、暖橘色、柔金色",
    materials: "光泽金属、太阳纹、尖角造型、聚光细节",
    tone: "表达、自信、行动力、被看见"
  },
  earth: {
    colors: "米棕色、浅金色、黄褐色、暖白色",
    materials: "几何结构、山形轮廓、陶瓷质感、厚实金属",
    tone: "稳定、承载、财富节奏、长期支撑"
  },
  metal: {
    colors: "银白色、珍珠白、铂金色、冷金色",
    materials: "干净金属、圆形吊坠、细链、清晰轮廓",
    tone: "清晰、边界、秩序、贵人助力"
  },
  water: {
    colors: "墨黑色、雾蓝色、深蓝色、银灰色",
    materials: "流线造型、波纹元素、镜面质感、深色珐琅",
    tone: "智慧、流动、休养、内在稳定"
  }
};

const birthTimeMap = {
  unknown: { branch: null, label: "时辰不详" },
  zi: { branch: "子", label: "Zi hour 23:00-00:59" },
  chou: { branch: "丑", label: "Chou hour 01:00-02:59" },
  yin: { branch: "寅", label: "Yin hour 03:00-04:59" },
  mao: { branch: "卯", label: "Mao hour 05:00-06:59" },
  chen: { branch: "辰", label: "Chen hour 07:00-08:59" },
  si: { branch: "巳", label: "Si hour 09:00-10:59" },
  wu: { branch: "午", label: "Wu hour 11:00-12:59" },
  wei: { branch: "未", label: "Wei hour 13:00-14:59" },
  shen: { branch: "申", label: "Shen hour 15:00-16:59" },
  you: { branch: "酉", label: "You hour 17:00-18:59" },
  xu: { branch: "戌", label: "Xu hour 19:00-20:59" },
  hai: { branch: "亥", label: "Hai hour 21:00-22:59" }
};

const monthBranchByApproxSolarTerm = month => {
  const map = {
    2: "寅", 3: "卯", 4: "辰", 5: "巳", 6: "午", 7: "未",
    8: "申", 9: "酉", 10: "戌", 11: "亥", 12: "子", 1: "丑"
  };
  return map[month];
};

const monthStemStart = {
  甲: 2, 己: 2,
  乙: 4, 庚: 4,
  丙: 6, 辛: 6,
  丁: 8, 壬: 8,
  戊: 0, 癸: 0
};

const jieTerms = [
  { name: "立春", month: 2, day: 4, branch: "寅" },
  { name: "惊蛰", month: 3, day: 6, branch: "卯" },
  { name: "清明", month: 4, day: 5, branch: "辰" },
  { name: "立夏", month: 5, day: 6, branch: "巳" },
  { name: "芒种", month: 6, day: 6, branch: "午" },
  { name: "小暑", month: 7, day: 7, branch: "未" },
  { name: "立秋", month: 8, day: 8, branch: "申" },
  { name: "白露", month: 9, day: 8, branch: "酉" },
  { name: "寒露", month: 10, day: 8, branch: "戌" },
  { name: "立冬", month: 11, day: 7, branch: "亥" },
  { name: "大雪", month: 12, day: 7, branch: "子" },
  { name: "小寒", month: 1, day: 6, branch: "丑" }
];

const relationForDayMaster = {
  wood: { support: ["water", "wood"], output: "fire", wealth: "earth", officer: "metal" },
  fire: { support: ["wood", "fire"], output: "earth", wealth: "metal", officer: "water" },
  earth: { support: ["fire", "earth"], output: "metal", wealth: "water", officer: "wood" },
  metal: { support: ["earth", "metal"], output: "water", wealth: "wood", officer: "fire" },
  water: { support: ["metal", "water"], output: "wood", wealth: "fire", officer: "earth" }
};

const focusAdvice = {
  career: "事业方向主要看你是更需要支撑、规则，还是更需要表达和发挥。日主偏弱时，先补底气和稳定感；日主偏旺时，更适合用规则、目标和输出把能量导出来。",
  wealth: "财富方向不是只看有没有财星，而是看日主能不能承接财富、压力和机会。能量不稳时，机会多反而容易累；能量能承载时，财富节奏才更稳。",
  love: "感情方向先看自己是否稳定。偏弱的命盘要先建立安全感和自我支撑；偏旺的命盘则要注意表达方式、柔和度和关系边界。",
  calm: "情绪稳定要看命盘是否过燥、过寒、过压或过散。调整重点不是立刻改变命运，而是找到更适合你的日常节奏。",
  balance: "生活平衡的重点是减少极端。某个元素太多时，需要释放或约束；某个元素太弱时，需要支持和滋养。"
};

const elementAction = {
  wood: "学习、拓展人脉、做长期计划、开始新项目",
  fire: "曝光、表达、面试、发布内容、主动沟通",
  earth: "整理财务、稳定作息、储蓄、打基础、做长期承诺",
  metal: "签约、谈规则、做取舍、建立边界、优化流程",
  water: "复盘、休养、研究、出行、处理信息与情绪"
};

const elementWellness = {
  wood: "注意肝胆、眼睛、压力疏导和拉伸放松；少把情绪憋住。",
  fire: "注意睡眠、心火、焦躁和过度兴奋；少熬夜，减少刺激性安排。",
  earth: "注意脾胃、饮食节奏、湿滞和久坐；规律吃饭比猛补更重要。",
  metal: "注意呼吸、皮肤、肩颈和边界感；适合做清理、断舍离和轻运动。",
  water: "注意肾水、腰背、寒湿和精力透支；适合早睡、保暖和减少内耗。"
};

let latestReading = null;

document.getElementById("birthPlacePreset")?.addEventListener("change", event => {
  const value = event.currentTarget.value;
  if (value === "custom") return;
  const [longitude, timezone, city] = value.split("|");
  document.getElementById("longitude").value = longitude;
  document.getElementById("timezone").value = timezone;
  document.getElementById("birthCity").value = city;
});

function mod(n, m) {
  return ((n % m) + m) % m;
}

function getYearPillar(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const solarYear = month < 2 || (month === 2 && day < 4) ? year - 1 : year;
  const index = mod(solarYear - 4, 60);
  return {
    stem: stems[index % 10],
    branch: branches[index % 12],
    text: `${stems[index % 10]}${branches[index % 12]}`
  };
}

function getMonthPillar(date, yearStem) {
  const branch = getSolarTermMonthBranch(date);
  const branchIndexFromYin = mod(branches.indexOf(branch) - branches.indexOf("寅"), 12);
  const stemIndex = mod(monthStemStart[yearStem] + branchIndexFromYin, 10);
  return {
    stem: stems[stemIndex],
    branch,
    text: `${stems[stemIndex]}${branch}`,
    solarTerm: getPreviousJie(date).name
  };
}

function makeDate(year, month, day) {
  return new Date(year, month - 1, day, 0, 0, 0, 0);
}

function getJieDates(year) {
  return jieTerms.map(term => ({
    ...term,
    date: makeDate(year, term.month, term.day)
  })).sort((a, b) => a.date - b.date);
}

function getPreviousJie(date) {
  const year = date.getFullYear();
  const terms = getJieDates(year);
  const previous = [...terms].reverse().find(term => date >= term.date);
  if (previous) return previous;
  return { ...jieTerms[10], date: makeDate(year - 1, 12, 7) };
}

function getNextJie(date) {
  const year = date.getFullYear();
  const next = getJieDates(year).find(term => date < term.date);
  if (next) return next;
  return { ...jieTerms[0], date: makeDate(year + 1, 2, 4) };
}

function getSolarTermMonthBranch(date) {
  return getPreviousJie(date).branch;
}

function equationOfTimeMinutes(dayOfYear) {
  const b = (2 * Math.PI * (dayOfYear - 81)) / 364;
  return 9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b);
}

function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  return Math.floor((date - start) / 86400000);
}

function getTrueSolarDate(date, clockTime, longitude, timezone) {
  const [hourText, minuteText] = (clockTime || "12:00").split(":");
  const localDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    Number(hourText || 12),
    Number(minuteText || 0),
    0,
    0
  );
  const standardLongitude = Number(timezone) * 15;
  const longitudeCorrection = (Number(longitude) - standardLongitude) * 4;
  const eot = equationOfTimeMinutes(getDayOfYear(localDate));
  return new Date(localDate.getTime() + (longitudeCorrection + eot) * 60000);
}

function getBranchFromTrueSolarHour(trueSolarDate) {
  const hour = trueSolarDate.getHours() + trueSolarDate.getMinutes() / 60;
  if (hour >= 23 || hour < 1) return "子";
  if (hour < 3) return "丑";
  if (hour < 5) return "寅";
  if (hour < 7) return "卯";
  if (hour < 9) return "辰";
  if (hour < 11) return "巳";
  if (hour < 13) return "午";
  if (hour < 15) return "未";
  if (hour < 17) return "申";
  if (hour < 19) return "酉";
  if (hour < 21) return "戌";
  return "亥";
}

function formatDateTime(date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
}

function getLocationFromForm(formData) {
  const preset = formData.get("birthPlacePreset") || "custom";
  const parts = preset !== "custom" ? preset.split("|") : [];
  const longitude = Number(formData.get("longitude") || parts[0] || 0);
  const timezone = Number(formData.get("timezone") || parts[1] || 0);
  const city = (formData.get("birthCity") || parts[2] || "未填写出生地").trim();
  return { city, longitude, timezone };
}

function getCyclePillarFromIndex(index) {
  return {
    stem: stems[mod(index, 10)],
    branch: branches[mod(index, 12)],
    text: `${stems[mod(index, 10)]}${branches[mod(index, 12)]}`
  };
}

function getPillarIndex(pillar) {
  for (let index = 0; index < 60; index += 1) {
    if (stems[index % 10] === pillar.stem && branches[index % 12] === pillar.branch) {
      return index;
    }
  }
  return 0;
}

function getForecastMonth() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 15);
}

function getAgeFromBirthDate(birthDateText) {
  const birth = new Date(`${birthDateText}T12:00:00`);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const hasHadBirthday = now.getMonth() > birth.getMonth()
    || (now.getMonth() === birth.getMonth() && now.getDate() >= birth.getDate());
  if (!hasHadBirthday) age -= 1;
  return Math.max(0, age);
}

function getDayPillar(date) {
  const utc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  const days = Math.floor(utc / 86400000);
  // 1970-01-01 is 辛巳 day in the continuous sexagenary day cycle.
  const index = mod(days + 17, 60);
  return {
    stem: stems[index % 10],
    branch: branches[index % 12],
    index,
    text: `${stems[index % 10]}${branches[index % 12]}`
  };
}

function getHourPillar(dayStem, trueSolarDate) {
  const trueBranch = getBranchFromTrueSolarHour(trueSolarDate);
  const startStemIndex = {
    甲: 0, 己: 0,
    乙: 2, 庚: 2,
    丙: 4, 辛: 4,
    丁: 6, 壬: 6,
    戊: 8, 癸: 8
  }[dayStem];
  const branchIndex = branches.indexOf(trueBranch);
  const stem = stems[mod(startStemIndex + branchIndex, 10)];
  return { stem, branch: trueBranch, text: `${stem}${trueBranch}`, label: `${trueBranch}时（真太阳时）` };
}

function scoreElements(pillars) {
  const scores = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };
  pillars.forEach(pillar => {
    if (stemElement[pillar.stem]) scores[stemElement[pillar.stem]] += 1.2;
    if (branchElement[pillar.branch]) scores[branchElement[pillar.branch]] += 1.5;
  });
  return scores;
}

function judgeDayMaster(dayMaster, monthBranch, scores) {
  const monthElement = branchElement[monthBranch];
  const relations = relationForDayMaster[dayMaster];
  let strength = scores[dayMaster] + relations.support.reduce((sum, element) => sum + scores[element] * 0.55, 0);
  if (monthElement === dayMaster) strength += 1.8;
  if (relations.support.includes(monthElement)) strength += 1.1;
  if ([relations.output, relations.wealth, relations.officer].includes(monthElement)) strength -= 0.7;

  if (strength >= 5.4) return "偏旺";
  if (strength <= 3.4) return "偏弱";
  return "中和";
}

function chooseUsefulElements(dayMaster, strength) {
  const r = relationForDayMaster[dayMaster];
  if (strength === "偏弱") {
    return {
      useful: r.support,
      avoid: [r.wealth, r.officer],
      logic: "你的日主偏弱，命盘更需要先获得支撑和滋养。简单说，就是先把自己的底气、稳定感和承载力补起来，再谈财富、压力、关系或外部目标。"
    };
  }
  if (strength === "偏旺") {
    return {
      useful: [r.output, r.wealth, r.officer],
      avoid: r.support,
      logic: "你的日主偏旺，命盘更需要把能量导出去。适合通过表达、行动、规则、目标和现实结果来平衡，而不是继续增加同类能量。"
    };
  }
  return {
    useful: [r.output, r.wealth],
    avoid: [],
    logic: "你的日主整体较平衡，重点不在猛补某一种元素，而在让能量顺畅流动。适合选择能帮助你表达、行动并落到现实结果的元素。"
  };
}

function getLuckDirection(yearStem, gender) {
  if (gender === "private") {
    return {
      direction: "暂不判断",
      text: "未填写性别时，暂不判断大运顺逆。传统八字会结合出生年份阴阳和性别，判断大运是顺行还是逆行。"
    };
  }
  const polarity = stemPolarity[yearStem];
  const isForward = (polarity === "yang" && gender === "male") || (polarity === "yin" && gender === "female");
  return {
    direction: isForward ? "顺行" : "逆行",
    text: `你的出生年为${polarity === "yang" ? "阳年" : "阴年"}，按传统八字规则，${gender === "male" ? "男命" : "女命"}大运为${isForward ? "顺行" : "逆行"}。`
  };
}

function getGenderLens(gender, dayMaster) {
  const relations = relationForDayMaster[dayMaster];
  if (gender === "male") {
    return `男命会更重视财星，因为财星常与资源、责任、财富承载和关系互动有关。以你的日主来看，财星属${elementLabel[relations.wealth]}。重点不是财星有没有，而是你能不能稳定承接它。`;
  }
  if (gender === "female") {
    return `女命会更重视官杀，因为官杀常与关系结构、承诺、标准和外部压力有关。以你的日主来看，官杀属${elementLabel[relations.officer]}。它是助力还是压力，要结合日主旺弱来看。`;
  }
  return "未填写性别时，感情、大运和男女命侧重点只做通用分析。完整报告建议补充性别后再细看。";
}

function getRelationName(dayMaster, element) {
  const r = relationForDayMaster[dayMaster];
  if (r.support.includes(element)) return element === dayMaster ? "同类/自我力量" : "印星/支持资源";
  if (element === r.output) return "食伤/表达输出";
  if (element === r.wealth) return "财星/资源财富";
  if (element === r.officer) return "官杀/规则压力";
  return "流通能量";
}

function buildLongTermReading(readingSeed) {
  const { dayMaster, strength, useful, gender } = readingSeed;
  const r = relationForDayMaster[dayMaster];
  const base = strength === "偏弱"
    ? "你的长期路线不是一开始就猛冲，而是先建立稳定感、专业能力和支持系统。越能把底盘打稳，后面的财富和关系越容易承接。"
    : strength === "偏旺"
      ? "你的长期路线适合把能量导向现实成果。越有明确目标、规则和输出场景，越容易把优势转成事业、财富和影响力。"
      : "你的长期路线重在保持流通。不要长期卡在同一种状态里，适合在学习、表达、资源整合和行动之间形成循环。";

  const career = strength === "偏弱"
    ? `事业上先看${elementNames(useful.useful)}带来的支持：贵人、学习、资质、稳定平台会比高压竞争更有利。关键机会通常来自被看见前的积累。`
    : `事业上适合使用${elementLabel[r.output]}的表达输出和${elementLabel[r.officer]}的规则压力。关键机会通常来自项目发布、职位责任、管理结构或外部挑战。`;

  const wealth = strength === "偏弱"
    ? `财富上要避免“财来压身”：机会多但体力、资源或判断力不足时，容易变成消耗。更适合先做低风险积累、稳定现金流和技能变现。`
    : `财富上可以主动承接资源，但要有边界和制度。适合通过专业输出、管理能力、项目收益或长期资产配置来放大结果。`;

  const love = gender === "female"
    ? `感情长期走向要看${elementLabel[r.officer]}官杀是否成为稳定结构。好的关系会带来秩序与承诺，不好的关系会变成压力和自我压抑。`
    : gender === "male"
      ? `感情长期走向要看${elementLabel[r.wealth]}财星是否能被稳定承接。好的关系会让现实生活更有秩序，不好的关系会放大责任和消耗。`
      : "感情长期走向重点看你是否能在关系里保持稳定自我。先建立边界，再谈吸引和承诺。";

  return { base, career, wealth, love };
}

function buildMonthlyForecast(readingSeed) {
  const forecastDate = getForecastMonth();
  const year = getYearPillar(forecastDate);
  const month = getMonthPillar(forecastDate, year.stem);
  const monthElements = [stemElement[month.stem], branchElement[month.branch]].filter(Boolean);
  const active = [...new Set(monthElements)];
  const helpful = active.filter(element => readingSeed.useful.useful.includes(element));
  const pressure = active.filter(element => readingSeed.useful.avoid.includes(element));
  const mainElement = helpful[0] || active[0] || readingSeed.useful.useful[0];
  const relation = getRelationName(readingSeed.dayMaster, mainElement);
  const monthLabel = `${forecastDate.getFullYear()}年${forecastDate.getMonth() + 1}月`;

  const overall = helpful.length > pressure.length
    ? `下个月流月为${month.text}，其中${helpful.map(e => elementLabel[e]).join("、")}与你的喜用方向相合，整体适合主动推进。`
    : pressure.length > helpful.length
      ? `下个月流月为${month.text}，其中${pressure.map(e => elementLabel[e]).join("、")}对你来说需要谨慎使用，整体宜稳不宜躁。`
      : `下个月流月为${month.text}，对你的命盘属于有机会也有压力的月份，关键在于节奏控制。`;

  const career = relation.includes("表达")
    ? "事业上适合展示成果、发内容、做提案、面试或争取曝光。注意不要说太满，先给出可执行方案。"
    : relation.includes("财星")
      ? "事业和财富容易连在一起，适合谈合作、报价、订单和资源配置。不要因短期收益牺牲长期稳定。"
      : relation.includes("官杀")
        ? "事业上会更重视规则、责任和评价，适合处理合同、制度、考核和职位责任。压力越大越要明确边界。"
        : relation.includes("印星")
          ? "事业上适合学习、复盘、拿证、找导师或整理专业体系。先补能力，再冲结果。"
          : "事业上适合稳住节奏，把手头事情做细，少分散精力。";

  const wealth = helpful.length
    ? "财富方面适合做预算、测试小项目、整理报价和优化转化。可有小机会，但仍建议控制投入比例。"
    : "财富方面不宜冲动投资或大额囤货。适合先看数据、控成本、做现金流安全垫。";

  const love = readingSeed.gender === "private"
    ? "感情方面适合观察互动质量，不急着下结论。看对方是否让你更稳定，而不是只看短期情绪。"
    : readingSeed.gender === "female"
      ? "感情方面容易看见关系里的标准、承诺和压力。适合把需求讲清楚，不要为了稳定而压抑自己。"
      : "感情方面容易牵涉现实责任、花费或承诺。适合用实际行动表达，但也要避免把关系变成纯责任。";

  const wellnessElement = pressure[0] || active[0] || readingSeed.dayMaster;
  const wellness = `${elementWellness[wellnessElement]} 这只是生活状态提醒，不替代医疗建议。`;
  const timing = `有利行动：${elementAction[mainElement]}。建议在月初做计划，月中推进关键沟通，月末复盘数据与身体状态。`;

  return { monthLabel, pillar: month.text, overall, career, wealth, love, wellness, timing };
}

function buildYearlyForecast(readingSeed) {
  const startYear = new Date().getFullYear();
  return [0, 1, 2].map(offset => {
    const year = startYear + offset;
    const pillar = getYearPillar(new Date(year, 6, 15));
    const elements = [stemElement[pillar.stem], branchElement[pillar.branch]].filter(Boolean);
    const roles = [...new Set(elements.map(element => getElementRole(readingSeed.dayMaster, element)))];
    const helpful = elements.filter(element => readingSeed.useful.useful.includes(element));
    const pressure = elements.filter(element => readingSeed.useful.avoid.includes(element));
    const phase = getLifePhase(getAgeFromBirthDate(readingSeed.birthDate) + offset);
    const mainRole = roles[0] || "印星";
    const event = getLuckEventByRole(mainRole, readingSeed.gender, phase);
    const tone = helpful.length > pressure.length
      ? "机会偏多的一年，适合主动把握窗口。"
      : pressure.length > helpful.length
        ? "考验偏重的一年，适合稳住节奏、控制风险。"
        : "机会与压力并见的一年，适合谨慎选择。";
    return {
      year,
      pillar: pillar.text,
      roles: roles.join("、"),
      tone,
      career: event.career,
      wealth: event.wealth,
      love: event.love,
      body: event.body
    };
  });
}

function buildPastMilestones(readingSeed) {
  const birthYear = Number(readingSeed.birthDate.slice(0, 4));
  const currentYear = new Date().getFullYear();
  const currentAge = getAgeFromBirthDate(readingSeed.birthDate);
  const monthIndex = getPillarIndex(readingSeed.pillars.month);
  const direction = readingSeed.luck.direction === "逆行" ? -1 : 1;
  const startAge = readingSeed.gender === "private" ? 7 : 6;

  const stages = [
    {
      age: "7-12岁",
      startAge: 7,
      endAge: 12,
      theme: "学习环境、家庭规矩、性格底色开始成形",
      note: "这个阶段常对应安全感、规则感和早期自信的建立。"
    },
    {
      age: "17-22岁",
      startAge: 17,
      endAge: 22,
      theme: "学业选择、离家变化、人际圈重组",
      note: "这个阶段容易出现第一次明显的方向选择：专业、城市、圈子或身份感。"
    },
    {
      age: "25-30岁",
      startAge: 25,
      endAge: 30,
      theme: "事业定位、感情承诺、现实压力上升",
      note: "这个阶段更容易从“想要什么”进入“能承担什么”。"
    },
    {
      age: "31-36岁",
      startAge: 31,
      endAge: 36,
      theme: "资源整合、财富节奏、长期关系和责任感",
      note: "这个阶段适合回看事业、财务与关系是否进入更稳定结构。"
    }
  ].filter(stage => stage.startAge <= currentAge);

  const luckStages = [];
  for (let age = startAge, step = 1; age <= currentAge && luckStages.length < 5; age += 10, step += 1) {
    const pillar = getCyclePillarFromIndex(monthIndex + direction * step);
    const elements = [stemElement[pillar.stem], branchElement[pillar.branch]].filter(Boolean);
    const helpful = elements.some(element => readingSeed.useful.useful.includes(element));
    const pressure = elements.some(element => readingSeed.useful.avoid.includes(element));
    const startYear = birthYear + age;
    const endYear = Math.min(startYear + 9, currentYear);
    const tone = helpful && !pressure
      ? "这一阶段多半更容易遇到助力、学习机会、贵人或正向打开。"
      : pressure && !helpful
        ? "这一阶段更容易感到压力、选择困难、关系考验或身体精力消耗。"
        : "这一阶段通常机会和压力并存，成败关键在于节奏和取舍。";
    luckStages.push({
      age: `${age}-${Math.min(age + 9, currentAge)}岁`,
      year: `${startYear}-${endYear}`,
      pillar: pillar.text,
      tone
    });
  }

  return { currentAge, stages: stages.slice(-3), luckStages: luckStages.slice(-3) };
}

function getElementRole(dayMaster, element) {
  const r = relationForDayMaster[dayMaster];
  if (element === dayMaster) return "比劫";
  if (r.support.includes(element)) return "印星";
  if (element === r.output) return "食伤";
  if (element === r.wealth) return "财星";
  if (element === r.officer) return "官杀";
  return "杂气";
}

function isSamePolarity(a, b) {
  return stemPolarity[a] === stemPolarity[b];
}

function generates(a, b) {
  return (
    (a === "wood" && b === "fire") ||
    (a === "fire" && b === "earth") ||
    (a === "earth" && b === "metal") ||
    (a === "metal" && b === "water") ||
    (a === "water" && b === "wood")
  );
}

function controls(a, b) {
  return (
    (a === "wood" && b === "earth") ||
    (a === "earth" && b === "water") ||
    (a === "water" && b === "fire") ||
    (a === "fire" && b === "metal") ||
    (a === "metal" && b === "wood")
  );
}

function getTenGod(dayStem, targetStem) {
  if (!dayStem || !targetStem || dayStem === "?" || targetStem === "?") return "未知";
  const dayEl = stemElement[dayStem];
  const targetEl = stemElement[targetStem];
  const samePolarity = isSamePolarity(dayStem, targetStem);
  if (targetEl === dayEl) return samePolarity ? "比肩" : "劫财";
  if (generates(targetEl, dayEl)) return samePolarity ? "偏印" : "正印";
  if (generates(dayEl, targetEl)) return samePolarity ? "食神" : "伤官";
  if (controls(dayEl, targetEl)) return samePolarity ? "偏财" : "正财";
  if (controls(targetEl, dayEl)) return samePolarity ? "七杀" : "正官";
  return "未知";
}

function enrichPillarWithHidden(pillar, dayStem) {
  const hidden = hiddenStems[pillar.branch] || [];
  return {
    ...pillar,
    tenGodStem: getTenGod(dayStem, pillar.stem),
    hidden: hidden.map(stem => ({
      stem,
      element: stemElement[stem],
      tenGod: getTenGod(dayStem, stem)
    }))
  };
}

function inferPattern(readingSeed) {
  const monthHidden = readingSeed.pillars.month.hidden || [];
  const mainQi = monthHidden[0];
  const monthGod = mainQi ? mainQi.tenGod : getTenGod(readingSeed.pillars.day.stem, readingSeed.pillars.month.stem);
  const usefulText = elementNames(readingSeed.useful.useful);
  const avoidText = elementNames(readingSeed.useful.avoid);
  const label = `${monthGod}格取向`;
  const explanation = `以月令为纲，月支主气落在${mainQi ? `${mainQi.stem}${elementCn[mainQi.element]}（${monthGod}）` : "未知"}，初步可按${label}参考。此处不直接定死格局，而是结合日主旺衰、藏干和五行流通判断：喜用方向为${usefulText}；需要谨慎使用的是${avoidText}。`;
  return { label, monthGod, explanation };
}

const branchClashes = {
  子: "午", 丑: "未", 寅: "申", 卯: "酉", 辰: "戌", 巳: "亥",
  午: "子", 未: "丑", 申: "寅", 酉: "卯", 戌: "辰", 亥: "巳"
};

const branchSixCombinations = {
  子: "丑", 寅: "亥", 卯: "戌", 辰: "酉", 巳: "申", 午: "未",
  丑: "子", 亥: "寅", 戌: "卯", 酉: "辰", 申: "巳", 未: "午"
};

const branchHarms = {
  子: "未", 丑: "午", 寅: "巳", 卯: "辰", 申: "亥", 酉: "戌",
  未: "子", 午: "丑", 巳: "寅", 辰: "卯", 亥: "申", 戌: "酉"
};

function analyzeBranchRelations(pillars) {
  const entries = Object.entries(pillars).map(([name, pillar]) => ({ name, branch: pillar.branch }));
  const nameMap = { year: "年支", month: "月支", day: "日支/夫妻宫", hour: "时支/子女宫" };
  const items = [];
  for (let i = 0; i < entries.length; i += 1) {
    for (let j = i + 1; j < entries.length; j += 1) {
      const a = entries[i];
      const b = entries[j];
      if (!a.branch || !b.branch || a.branch === "?" || b.branch === "?") continue;
      if (branchClashes[a.branch] === b.branch) {
        items.push(`${nameMap[a.name]}${a.branch}冲${nameMap[b.name]}${b.branch}：多主变动、迁移、关系拉扯或该宫位被引动。`);
      }
      if (branchSixCombinations[a.branch] === b.branch) {
        items.push(`${nameMap[a.name]}${a.branch}合${nameMap[b.name]}${b.branch}：多主牵连、合作、情感黏性或资源合流。`);
      }
      if (branchHarms[a.branch] === b.branch) {
        items.push(`${nameMap[a.name]}${a.branch}害${nameMap[b.name]}${b.branch}：多主暗耗、误会、隐性压力或慢性消耗。`);
      }
    }
  }
  return items.length ? items : ["原局地支未见明显六冲六合六害，整体更看五行流通和大运流年引动。"];
}

function analyzeTenGodCombos(pillars, gender) {
  const gods = Object.values(pillars).flatMap(pillar => [
    pillar.tenGodStem,
    ...(pillar.hidden || []).map(item => item.tenGod)
  ]).filter(Boolean);
  const has = god => gods.includes(god);
  const combos = [];
  if ((has("伤官") || has("食神")) && (has("正官") || has("七杀"))) {
    combos.push("食伤与官杀同见：才华表达和规则压力并存，走得好是凭能力破局，走得急则易有口舌、上级压力或制度冲突。");
  }
  if ((has("正财") || has("偏财")) && (has("正官") || has("七杀"))) {
    combos.push("财官同见：现实责任、事业名分、客户资源和财富目标容易绑定，适合重视合规、合同和长期信用。");
  }
  if ((has("正印") || has("偏印")) && (has("正官") || has("七杀"))) {
    combos.push("官印相生/杀印相生之象：适合证书资质、专业背书、平台资源、管理体系，也容易因责任而成长。");
  }
  if ((has("正财") || has("偏财")) && (has("比肩") || has("劫财"))) {
    combos.push("财星遇比劫：财来易有竞争、人情分利、合伙分账或消费压力，钱越动越要把规则讲清楚。");
  }
  if ((has("正印") || has("偏印")) && (has("食神") || has("伤官"))) {
    combos.push("印星与食伤同见：学习吸收和表达输出并存，适合把知识、经验、技能转成内容、作品或专业服务。");
  }
  if (gender === "female" && (has("正官") || has("七杀"))) {
    combos.push("女命官杀被引动：感情、婚姻、伴侣标准和外部压力需要合看，不宜只按桃花判断。");
  }
  if (gender === "male" && (has("正财") || has("偏财"))) {
    combos.push("男命财星被引动：财富、伴侣、现实责任和资源承接常会互相牵动。");
  }
  return combos.length ? combos : ["十神组合较分散，需重点看月令主气、大运流年引动，以及日主能否承接。"];
}

function buildStructuredChart(reading) {
  const p = reading.pillars;
  return {
    birth: {
      date: reading.birthDate,
      clockTime: reading.birthTime,
      city: reading.location.city,
      longitude: reading.location.longitude,
      timezone: reading.location.timezone,
      trueSolarTime: reading.trueSolarTime,
      gender: reading.gender
    },
    pillars: {
      year: p.year,
      month: p.month,
      day: p.day,
      hour: p.hour
    },
    dayMaster: `${p.day.stem}${elementCn[reading.dayMaster]}`,
    strength: strengthLabel[reading.strength],
    pattern: reading.pattern,
    fiveElements: reading.scores,
    useful: reading.useful.useful.map(element => elementLabel[element]),
    avoid: reading.useful.avoid.map(element => elementLabel[element]),
    branchRelations: reading.branchRelations,
    tenGodCombos: reading.tenGodCombos,
    luckDirection: reading.luck.direction,
    luckCycles: reading.luckCycles.map(cycle => ({
      age: cycle.age,
      year: cycle.year,
      pillar: cycle.pillar,
      status: cycle.status,
      phase: cycle.phase,
      roles: cycle.roles,
      keyYears: cycle.keyYears
    })),
    yearly: reading.yearly,
    monthly: reading.monthly
  };
}

function buildAiPrompt(reading) {
  return `你是一位资深八字命理师，擅长用传统命理体系做细致、克制、专业的命盘分析。请根据以下结构化命盘数据生成一份完整报告。

要求：
1. 不要只套模板，要围绕原局、月令、日主强弱、十神组合、刑冲合害、大运和流年层层推演。
2. 过去关键节点要用“容易对应/可能应在”表达，不要绝对断言。
3. 不同年龄阶段要用不同应事逻辑：少年不写发财，老年不写升学创业。
4. 事业、财富、感情、健康都要分开讲，并给具体可执行建议。
5. 语气要像专业命理 App 的深度报告，既有术语，又能让普通用户读懂。

请按以下结构输出：
一、命盘总论
二、日主强弱与格局
三、十神组合与性格底层
四、事业财富主线
五、感情婚姻主线
六、健康与状态提醒
七、过去关键节点验证
八、逐步大运详批
九、未来三年流年重点
十、下个月流月运势
十一、调整建议与适合颜色/材质

命盘数据：
${JSON.stringify(buildStructuredChart(reading), null, 2)}`;
}

function getLifePhase(age) {
  if (age < 16) return "child";
  if (age < 25) return "youth";
  if (age < 36) return "earlyAdult";
  if (age < 50) return "midlife";
  if (age < 66) return "mature";
  return "elder";
}

function getPhaseLabel(phase) {
  return {
    child: "童年/少年",
    youth: "青年探索期",
    earlyAdult: "成家立业初期",
    midlife: "事业责任期",
    mature: "资源沉淀期",
    elder: "晚年安养期"
  }[phase];
}

function getLuckEventByRole(role, gender, phase) {
  const relationText = gender === "male"
    ? "男命还要看财星是否牵动伴侣缘与现实责任。"
    : gender === "female"
      ? "女命还要看官杀是否牵动关系标准、承诺和压力。"
      : "未填写性别时，感情只做通用判断。";

  const map = {
    child: {
      印星: ["学习接受度、长辈照顾、学校环境较明显，容易有被保护或被管束的经历。", "主要体现为家庭供养、教育投入和父母资源，不作个人财运判断。", "感情不是重点，多体现为亲子依赖、师长缘和安全感建立。", "注意脾胃、睡眠、过敏体质和情绪敏感。"],
      比劫: ["自我意识早、同伴竞争强，容易换圈子、争强或不服管。", "多体现为零花钱、人情分享、玩乐消费，不代表真正赚钱。", "同伴关系影响大，容易因朋友、比较、面子产生情绪。", "注意磕碰、运动伤、急躁和发脾气。"],
      食伤: ["表达欲、兴趣才艺、口才和创意较明显，也可能贪玩、不爱被约束。", "多体现为兴趣带来的小奖励、比赛表现或父母投入，不作大财判断。", "更像早熟、爱表现、喜欢被关注。", "注意熬夜、上火、用眼和注意力分散。"],
      财星: ["现实感较早，可能较早懂得比较物质条件、零花钱或家庭经济差异。", "财星在少年期多看家庭条件、消费欲、父母为其投入，不代表本人发财。", "男命可能早有好感或对异性好奇，但仍以成长环境为主。", "注意饮食、脾胃、甜食和体重波动。"],
      官杀: ["规矩、考试、管教、压力感明显，容易遇到严格老师、严厉家庭或制度约束。", "财务不是重点，多体现为家庭规则和资源分配。", "关系上更怕犯错或被评价，容易形成谨慎性格。", "注意压力、睡眠、紧张和呼吸肩颈。"]
    },
    youth: {
      印星: ["适合升学、考证、选专业、遇导师或进入稳定平台，也可能犹豫保守。", "收入多来自家庭支持、奖学金、实习补贴或专业积累，不宜夸大财运。", "感情更重安全感，容易有暗恋、旧情牵挂或家人意见干预。", "注意思虑过重、睡眠和脾胃吸收。"],
      比劫: ["社交圈重组，自我意识增强，容易离家、换城市、换圈层或与同辈竞争。", "钱容易花在人情、社交、兴趣、合伙尝试上，需避免冲动消费。", "感情上选择变多，也容易因自由、朋友、面子反复。", "注意肝火、运动伤和压力硬扛。"],
      食伤: ["适合表达、内容、作品、销售、面试、比赛、实习展示，容易想跳出原路线。", "可有兼职、副业、作品变现苗头，但重点仍是技能试水。", "桃花和互动增加，表达欲强，但也容易挑剔或不稳定。", "注意熬夜、用脑过度和上火。"],
      财星: ["开始接触真实赚钱逻辑：兼职、实习、客户、商业意识或消费压力。", "有财运苗头，但年龄尚轻，多是小钱、经验钱、资源机会，不宜理解成大富。", relationText, "注意饮食不规律、代谢和为了赚钱或玩乐过度消耗。"],
      官杀: ["考试、入职、资格、上级评价、制度压力明显，适合进体制化平台或接受训练。", "收入以稳定实习、工资、补贴为主，守规则比冒险更有利。", gender === "female" ? "女命可能遇到较认真或有压力感的对象，也容易被关系标准影响。" : "感情容易受学业、工作压力或自我要求影响。", "注意焦虑、失眠、肩颈和压力型不适。"]
    },
    earlyAdult: {
      印星: ["适合深造、拿证、进入稳定平台、获得贵人或专业背书，但行动可能偏慢。", "财运靠专业、资质和长期信任积累，适合稳步提价，不适合急投机。", "感情要看安全感与现实稳定，容易考虑同居、婚姻、家人意见。", "注意久坐、脾胃、睡眠和精神内耗。"],
      比劫: ["独立创业、换赛道、合伙、团队竞争明显，自我主张变强。", "财务上合伙、人情、朋友项目、竞争消耗明显，账目必须清楚。", "感情容易因独立性、朋友圈、事业选择拉扯。", "注意肝胆、筋骨、急躁和过劳。"],
      食伤: ["适合内容输出、销售转化、个人品牌、技术展示、创业试错。", "钱多来自技能、客户、流量、副业和项目制收入，可见成果越多越有利。", "感情互动多，吸引力提升，但要避免只追求新鲜感。", "注意熬夜、心火、口舌是非和作息失衡。"],
      财星: ["现实赚钱机会增强，容易遇到客户、订单、投资念头、买房买车或现金流压力。", "这是能真正看财运的阶段之一，但伴随投入、周转和风险判断，不是单纯来钱。", gender === "male" ? "男命财星常牵动伴侣缘，容易出现确定关系、结婚、为家庭花费或现实选择。" : "女命财星多体现生活质量、资源安全感和共同财务安排。", "注意脾胃、湿气、饮食和赚钱压力。"],
      官杀: ["职位责任、上级压力、升职考核、合同规则明显，可能被迫承担更大责任。", "适合稳定职业收入、制度内晋升和长期合同，不宜灰色操作。", gender === "female" ? "女命官杀容易牵动婚恋承诺、重要对象或关系考验。" : "男命容易因事业压力影响亲密关系。", "注意压力失眠、肩颈、头痛和紧绷。"]
    },
    midlife: {
      印星: ["事业进入专业沉淀期，适合做顾问、管理、教学、资质升级或靠口碑稳定。", "财富来自积累、资历、长期客户和保守配置，重稳不重快。", "家庭中长辈、房产、子女教育或安全感议题突出。", "注意慢性疲劳、脾胃、睡眠和久坐。"],
      比劫: ["团队、人脉、股权、合伙和竞争明显，容易重新洗牌。", "财务上既有扩大盘子的机会，也有被分利、人情债或合伙风险。", "关系里要避免强势、冷战或各过各的。", "注意血压、肝火、筋骨和压力爆发。"],
      食伤: ["适合把经验产品化、公开表达、带团队、做品牌或开拓副业。", "财富来自输出、渠道、客户转化和可复制经验。", "感情需要沟通质量，表达好是升温，表达差是口舌。", "注意心火、睡眠、眼睛和过度用脑。"],
      财星: ["事业财富联动强，容易有资产、投资、公司收入、家庭开销和现金流管理。", "这是财星较能显现实结果的阶段，但越要防杠杆、担保和冲动扩张。", gender === "male" ? "男命也容易对应伴侣关系、婚姻责任或因钱影响关系。" : "女命更看共同资产、家庭资源和生活质量压力。", "注意代谢、脾胃、体重和应酬。"],
      官杀: ["责任、职位、权力、名誉和规则压力加重，适合规范化、制度化、拿头衔。", "财富宜走稳健、合规、长期职业回报，合同税务要清楚。", gender === "female" ? "女命关系中承诺与压力并见，可能出现婚姻结构调整或伴侣责任议题。" : "男命要避免把工作压力带进家庭。", "注意焦虑、血压、肩颈、睡眠和压力病。"]
    },
    mature: {
      印星: ["适合退到专业背后、做顾问、传承经验、整理资产和生活结构。", "财富以守成、配置、稳定收益、房产或长期保障为主。", "家庭、子女、长辈和精神安全感变重要。", "注意脾胃、睡眠、骨关节和慢性疲劳。"],
      比劫: ["朋友、兄弟姐妹、团队、人情往来仍会影响生活，需减少无效消耗。", "财务上防借贷、人情投资、合伙纠纷，守住边界最重要。", "感情里要减少固执和争输赢。", "注意肝胆、血压、筋骨和情绪急躁。"],
      食伤: ["适合兴趣输出、教学分享、内容沉淀、轻创业或把经验变成作品。", "可有副业、小规模变现或兴趣收入，但不宜过度透支。", "关系中需要轻松沟通和共同兴趣。", "注意心火、睡眠、眼睛和过度操心。"],
      财星: ["财富重点转向资产管理、退休规划、家庭支出、子女资源和生活品质。", "有财星不代表还要猛冲赚钱，更适合守财、配置和降低风险。", "关系会受家庭财务、子女、居住和安全感影响。", "注意代谢、脾胃、湿气和应酬饮食。"],
      官杀: ["规则、责任、社会身份、家庭权威感仍在，但要学会放权。", "财务宜保守合规，少碰高压高风险项目。", "关系中避免控制感过强，重在互相照应。", "注意压力、心脑血管、肩颈和睡眠。"]
    },
    elder: {
      印星: ["重点转向休养、精神寄托、子女支持、生活安定和经验传承，不再按升学深造解读。", "财富以养老金、储蓄、资产安全、医疗保障和子女资源为主。", "感情家庭重在陪伴、照护、晚辈关系和内心安定。", "注意脾胃、睡眠、骨关节、记忆力和慢性病管理。"],
      比劫: ["老朋友、兄弟姐妹、晚辈互动较多，也可能因人情和固执产生消耗。", "财务上防被骗、借钱、人情支出和不必要投资。", "家庭中要少争主导权，多给晚辈空间。", "注意跌倒、筋骨、血压和情绪波动。"],
      食伤: ["适合兴趣、表达、旅行、带孙、分享经验，但不宜过劳。", "财富不主大开拓，可有兴趣小收入，但以开心和健康为先。", "感情家庭重在沟通，少挑剔，多表达感谢。", "注意心火、睡眠、眼睛和体力透支。"],
      财星: ["重点是养老资产、家庭财务分配、子女支出、医疗保障和生活品质。", "有财星也不宜理解为老年暴富，更要看守财、防骗、防高风险投资。", "家庭关系容易围绕钱、房产、照护责任产生议题。", "注意脾胃、代谢、血糖和湿气。"],
      官杀: ["晚年官杀多看规则、病痛压力、家庭责任、医疗制度和生活约束。", "财务宜合规保守，提前安排保险、遗嘱、房产和照护计划。", "关系中要减少控制和焦虑，重在稳定陪伴。", "注意血压、心脑血管、睡眠、疼痛和长期紧张。"]
    }
  };

  const [career, wealth, love, body] = (map[phase]?.[role] || map.earlyAdult[role] || map.earlyAdult.印星);
  return { career, wealth, love, body };
}

function getCycleJudgement(helpful, pressure) {
  if (helpful.length > pressure.length) {
    return "这步大运整体偏顺，容易出现助力、贵人、机会打开或阶段性突破。关键是主动承接，不要错过窗口。";
  }
  if (pressure.length > helpful.length) {
    return "这步大运考验较重，容易出现压力、取舍、关系拉扯、财务负担或身体状态提醒。关键是稳住节奏，少做高风险选择。";
  }
  return "这步大运机会和压力并存，往往一边给资源，一边给考题。走得好会升级，走得急则容易反复。";
}

function getKeyYearTone(role, phase, isHelpful, isPressure) {
  const opportunity = {
    child: "多体现为学习环境、家庭安排、比赛表现或性格变化。",
    youth: "容易对应升学、实习、圈子变化、恋爱苗头或第一次赚钱经验。",
    earlyAdult: "容易对应入职跳槽、项目机会、感情确定、搬迁买车买房等现实选择。",
    midlife: "容易对应职位变化、资产配置、家庭责任、团队洗牌或事业扩张。",
    mature: "容易对应资产整理、子女家庭、事业收束、健康管理和生活结构调整。",
    elder: "容易对应养老安排、健康检查、子女晚辈、房产财务和生活安定。"
  }[phase];
  const pressure = {
    child: "容易出现管教压力、学习适应、体质波动或家庭环境变化。",
    youth: "容易出现方向迷茫、考试压力、关系拉扯、消费冲动或离家变化。",
    earlyAdult: "容易出现工作压力、现金流紧张、感情考验、合伙分歧或身体透支。",
    midlife: "容易出现管理压力、合同税务、家庭责任、投资风险或慢性疲劳。",
    mature: "容易出现守财压力、人情消耗、子女事务、健康提醒或身份转变。",
    elder: "容易出现健康检查、照护安排、财务防骗、家庭分配或情绪孤独感。"
  }[phase];
  const roleHint = {
    印星: "主题偏学习、贵人、家宅、长辈、稳定资源。",
    比劫: "主题偏朋友、竞争、合伙、自我主张和人情往来。",
    食伤: "主题偏表达、作品、口舌、子女、兴趣和输出。",
    财星: "主题偏金钱、资源、现实责任、消费和资产。",
    官杀: "主题偏规则、职位、考试、压力、伴侣标准和责任。"
  }[role] || "";
  if (isHelpful && !isPressure) return `机会年，${opportunity}${roleHint}`;
  if (isPressure && !isHelpful) return `考验年，${pressure}${roleHint}`;
  return `转折年，机会和压力同时出现，${opportunity}${roleHint}`;
}

function buildKeyYears(startYear, endYear, readingSeed, phase) {
  const years = [];
  for (let year = startYear; year <= endYear; year += 1) {
    const pillar = getYearPillar(new Date(year, 6, 15));
    const elements = [stemElement[pillar.stem], branchElement[pillar.branch]].filter(Boolean);
    const helpful = elements.filter(element => readingSeed.useful.useful.includes(element));
    const pressure = elements.filter(element => readingSeed.useful.avoid.includes(element));
    const score = helpful.length * 2 + pressure.length;
    years.push({ year, pillar: pillar.text, elements, helpful, pressure, score });
  }
  return years
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .sort((a, b) => a.year - b.year)
    .map(item => {
      const roles = [...new Set(item.elements.map(element => getElementRole(readingSeed.dayMaster, element)))].join("、");
      const primaryRole = roles.split("、")[0];
      const tone = getKeyYearTone(primaryRole, phase, item.helpful.length > item.pressure.length, item.pressure.length > item.helpful.length);
      return `${item.year}年（${item.pillar}，${roles}）：${tone}`;
    });
}

function buildLuckCycleReading(readingSeed) {
  const birthYear = Number(readingSeed.birthDate.slice(0, 4));
  const currentYear = new Date().getFullYear();
  const currentAge = getAgeFromBirthDate(readingSeed.birthDate);
  const monthIndex = getPillarIndex(readingSeed.pillars.month);
  const direction = readingSeed.luck.direction === "逆行" ? -1 : 1;
  const startAge = readingSeed.gender === "private" ? 7 : 6;
  const cycles = [];

  for (let step = 1, age = startAge; age <= 86; step += 1, age += 10) {
    const pillar = getCyclePillarFromIndex(monthIndex + direction * step);
    const elements = [stemElement[pillar.stem], branchElement[pillar.branch]].filter(Boolean);
    const roles = [...new Set(elements.map(element => getElementRole(readingSeed.dayMaster, element)))];
    const helpful = elements.filter(element => readingSeed.useful.useful.includes(element));
    const pressure = elements.filter(element => readingSeed.useful.avoid.includes(element));
    const mainRole = roles[0] || "印星";
    const phase = getLifePhase(age);
    const event = getLuckEventByRole(mainRole, readingSeed.gender, phase);
    const startYear = birthYear + age;
    const endYear = birthYear + age + 9;
    const status = currentAge < age ? "未来大运" : currentAge > age + 9 ? "已走过" : "当前大运";

    cycles.push({
      age: `${age}-${age + 9}岁`,
      year: `${startYear}-${endYear}`,
      pillar: pillar.text,
      status,
      phase: getPhaseLabel(phase),
      roles: roles.join("、"),
      judgement: getCycleJudgement(helpful, pressure),
      career: event.career,
      wealth: event.wealth,
      love: event.love,
      body: event.body,
      keyYears: buildKeyYears(startYear, endYear, readingSeed, phase)
    });
  }

  return cycles;
}

function buildReading(formData) {
  const birthDate = new Date(`${formData.get("birthDate")}T12:00:00`);
  const birthClockTime = formData.get("birthClockTime") || "12:00";
  const gender = formData.get("gender") || "private";
  const focus = formData.get("focus");
  const location = getLocationFromForm(formData);
  const trueSolarDate = getTrueSolarDate(birthDate, birthClockTime, location.longitude, location.timezone);
  const chartDate = trueSolarDate;
  const rawYear = getYearPillar(chartDate);
  const rawMonth = getMonthPillar(chartDate, rawYear.stem);
  const rawDay = getDayPillar(chartDate);
  const rawHour = getHourPillar(rawDay.stem, trueSolarDate);
  const year = enrichPillarWithHidden(rawYear, rawDay.stem);
  const month = enrichPillarWithHidden(rawMonth, rawDay.stem);
  const day = enrichPillarWithHidden(rawDay, rawDay.stem);
  const hour = enrichPillarWithHidden(rawHour, rawDay.stem);
  const knownPillars = [year, month, day].concat(hour.branch === "?" ? [] : [hour]);
  const scores = scoreElements(knownPillars);
  const dayMaster = stemElement[day.stem];
  const strength = judgeDayMaster(dayMaster, month.branch, scores);
  const useful = chooseUsefulElements(dayMaster, strength);
  const luck = getLuckDirection(year.stem, gender);
  const topUseful = useful.useful[0];
  const secondUseful = useful.useful[1] || useful.useful[0];

  const reading = {
    birthDate: formData.get("birthDate"),
    birthTime: birthClockTime,
    gender,
    location,
    trueSolarTime: formatDateTime(trueSolarDate),
    focus,
    style: formData.get("style"),
    pillars: { year, month, day, hour },
    dayMaster,
    strength,
    scores,
    useful,
    luck,
    genderLens: getGenderLens(gender, dayMaster),
    title: `${elementLabel[dayMaster]}日主，${strengthLabel[strength]}`,
    color: `${elementCopy[topUseful].colors}${secondUseful !== topUseful ? `，可辅以${elementCopy[secondUseful].colors}` : ""}`,
    material: `${elementCopy[topUseful].materials}${secondUseful !== topUseful ? `；${elementCopy[secondUseful].materials}` : ""}`,
    focusAdvice: focusAdvice[focus]
  };
  reading.pattern = inferPattern(reading);
  reading.longTerm = buildLongTermReading(reading);
  reading.yearly = buildYearlyForecast(reading);
  reading.monthly = buildMonthlyForecast(reading);
  reading.past = buildPastMilestones(reading);
  reading.luckCycles = buildLuckCycleReading(reading);
  reading.branchRelations = analyzeBranchRelations(reading.pillars);
  reading.tenGodCombos = analyzeTenGodCombos(reading.pillars, gender);
  reading.aiPrompt = buildAiPrompt(reading);
  return reading;
}

function scoreBars(scores) {
  const max = Math.max(...Object.values(scores), 1);
  return Object.entries(scores).map(([element, value]) => `
    <div class="score-row">
      <span>${elementLabel[element]}</span>
      <div class="score-track"><i style="width:${Math.round((value / max) * 100)}%"></i></div>
      <em>${value.toFixed(1)}</em>
    </div>
  `).join("");
}

function elementNames(elements) {
  if (!elements.length) return "暂无明显需要避开的元素，重点是保持五行流通。";
  return elements.map(element => `${elementLabel[element]}（${elementCopy[element].tone}）`).join("、");
}

function hiddenStemText(pillar) {
  if (!pillar.hidden || !pillar.hidden.length) return "无";
  return pillar.hidden.map(item => `${item.stem}${elementCn[item.element]}-${item.tenGod}`).join("、");
}

function buildAiStyleReport(reading) {
  const p = reading.pillars;
  const currentCycle = reading.luckCycles.find(cycle => cycle.status === "当前大运") || reading.luckCycles[0];
  const nextCycle = reading.luckCycles.find(cycle => cycle.status === "未来大运") || reading.luckCycles[1];
  const relationText = reading.branchRelations.join("；");
  const comboText = reading.tenGodCombos.join("；");
  const usefulText = elementNames(reading.useful.useful);
  const avoidText = elementNames(reading.useful.avoid);
  const currentYear = reading.yearly[0];

  return {
    overview: `此命以${p.day.stem}${elementCn[reading.dayMaster]}为日主，生于${p.month.branch}月，月令取${p.month.solarTerm}之后。原局四柱为${p.year.text}年、${p.month.text}月、${p.day.text}日、${p.hour.text}时。整体来看，日主为${strengthLabel[reading.strength]}，不是单纯旺弱一句话可断，而要结合月令、藏干、十神透出和地支关系来看。当前盘面最重要的取用方向是${usefulText}，${avoidText === "暂无明显需要避开的元素，重点是保持五行流通。" ? "忌神不明显，重在流通与阶段选择。" : `需要谨慎的是${avoidText}。`}`,
    structure: `此盘月令主气为${p.month.hidden?.[0] ? `${p.month.hidden[0].stem}${elementCn[p.month.hidden[0].element]}，对应${p.month.hidden[0].tenGod}` : "未明"}，故可参考${reading.pattern.label}。天干上年干${p.year.stem}为${p.year.tenGodStem}，月干${p.month.stem}为${p.month.tenGodStem}，时干${p.hour.stem}为${p.hour.tenGodStem}。地支方面，${relationText} 十神组合方面，${comboText} 这些组合说明此命不是单一财官或单一印比，而是事业责任、资源承接、表达输出之间互相牵动。`,
    careerWealth: `事业财富方面，命局既见财星，也见官印与食伤，说明不是纯靠偏财横发的盘，更像通过专业能力、规则平台、项目责任、客户资源逐步累积。若大运流年引动财官，容易出现职位责任增加、客户订单、收入结构调整、买房买车或现金流压力。若引动食伤，则更适合内容输出、销售转化、技术展示、个人品牌和副业试水。真正要注意的是：财来时要看日主能否承接，不能只看有没有财星。`,
    love: reading.gender === "male"
      ? `感情方面，男命以财星为重要参考。此盘财星被引动时，往往不只代表钱，也代表伴侣缘、现实责任、关系中的花费与承诺。适合在事业和财务节奏稳定后谈长期关系；若在压力较大的官杀年份强行推进关系，容易因为工作、钱、家庭责任而形成拉扯。`
      : reading.gender === "female"
        ? `感情方面，女命以官杀为重要参考。官杀被引动时，容易出现重要对象、关系承诺、标准压力或婚恋考验。若官杀为助力，关系能带来稳定结构；若官杀成压，则容易在关系里感到被要求、被评判或失去弹性。`
        : `感情方面，未填写性别时先做通用判断。此盘关系质量不宜只看桃花，而要看自我稳定、现实责任和沟通方式是否匹配。`,
    past: `过去节点上，${currentCycle ? `当前之前已走过的大运中，${reading.luckCycles.filter(c => c.status === "已走过").slice(-2).map(c => `${c.age}的${c.pillar}运`).join("、")}较值得回看。` : ""} 少年阶段更可能应在家庭环境、学习管束、迁移或性格底色；青年阶段更可能应在专业选择、离家、圈层变化、恋爱苗头和第一次赚钱经验。若这些阶段与你实际经历能对上，说明排盘方向有参考价值。`,
    luck: currentCycle
      ? `当前处于${currentCycle.age}、${currentCycle.year}的${currentCycle.pillar}大运，阶段属性为${currentCycle.phase}，十神主题为${currentCycle.roles}。此运的核心不是一句好坏，而是${currentCycle.judgement} 事业上${currentCycle.career} 财富上${currentCycle.wealth} 感情家庭方面${currentCycle.love} 其中关键年份包括：${currentCycle.keyYears.join("；")}。${nextCycle ? `下一步${nextCycle.pillar}大运会把主题转向${nextCycle.roles}，需要提前做资源和心态准备。` : ""}`
      : "当前大运信息不足，需要补充出生时间和出生地后再判断。",
    nextYears: `未来三年重点：${reading.yearly.map(y => `${y.year}年${y.pillar}，${y.tone}`).join(" ")} 其中${currentYear.year}年更要留意${currentYear.roles}被引动，事业上${currentYear.career} 财富上${currentYear.wealth}`,
    month: `下个月流月为${reading.monthly.pillar}，${reading.monthly.overall} 事业方面：${reading.monthly.career} 财富方面：${reading.monthly.wealth} 感情方面：${reading.monthly.love} 健康状态：${reading.monthly.wellness}`,
    advice: `调整建议：颜色和材质可以围绕${reading.color}，风格上适合${reading.material}。现实行动上，不建议把命理理解成“等运来”，而应把喜用方向落到具体行为：补能力、理现金流、控风险、选对合作关系、在合适年份主动推进。`
  };
}

function renderReading(reading) {
  const panel = document.getElementById("resultPanel");
  const { year, month, day, hour } = reading.pillars;
  const report = buildAiStyleReport(reading);
  panel.innerHTML = `
    <span class="result-kicker">AI 命理师报告原型</span>
    <h3>免费命盘摘要：<span class="element-title">${reading.title}</span></h3>
    <div class="pillar-grid" aria-label="四柱">
      <div><span>年柱</span><strong>${year.text}</strong></div>
      <div><span>月柱</span><strong>${month.text}</strong></div>
      <div><span>日柱</span><strong>${day.text}</strong></div>
      <div><span>时柱</span><strong>${hour.text}</strong></div>
    </div>
    <div class="score-card">
      <strong>排盘依据</strong>
      <div class="result-list compact">
        <div><strong>出生地与真太阳时</strong><span>${reading.location.city}｜经度 ${reading.location.longitude}｜UTC ${reading.location.timezone}｜真太阳时约 ${reading.trueSolarTime}</span></div>
        <div><strong>日主与格局</strong><span>${day.stem}${elementCn[reading.dayMaster]}日主，${strengthLabel[reading.strength]}；${reading.pattern.label}</span></div>
        <div><strong>喜用方向</strong><span>${elementNames(reading.useful.useful)}</span></div>
        <div><strong>刑冲合害</strong><span>${reading.branchRelations.join("；")}</span></div>
        <div><strong>十神组合</strong><span>${reading.tenGodCombos.join("；")}</span></div>
      </div>
    </div>
    <div class="score-card">
      <strong>五行分布</strong>
      ${scoreBars(reading.scores)}
    </div>
    <div class="forecast-block pro-report">
      <h4>深度报告预览</h4>
      <section><h5>一、命盘总论</h5><p>${report.overview}</p></section>
      <section><h5>二、格局与十神结构</h5><p>${report.structure}</p></section>
      <section><h5>三、事业财富主线</h5><p>${report.careerWealth}</p></section>
      <section><h5>四、感情婚姻主线</h5><p>${report.love}</p></section>
      <section><h5>五、过去关键节点验证</h5><p>${report.past}</p></section>
      <section><h5>六、当前大运详批</h5><p>${report.luck}</p></section>
      <section><h5>七、未来三年流年</h5><p>${report.nextYears}</p></section>
      <section><h5>八、下月运势</h5><p>${report.month}</p></section>
      <section><h5>九、调整建议</h5><p>${report.advice}</p></section>
    </div>
    <div class="forecast-block ai-prompt-block">
      <h4>API 接入提示词</h4>
      <p class="forecast-note">正式部署后，点击下方按钮会把这份结构化命盘发送给 DeepSeek，由 AI 生成更自然的逐盘深度报告。API Key 只放在服务器环境变量里，不会暴露在网页代码中。</p>
      <button class="button primary generate-ai-report" type="button">生成 DeepSeek 深度报告</button>
      <div class="api-status" id="apiStatus" role="status"></div>
      <div class="deepseek-report" id="deepseekReport" hidden></div>
      <textarea class="ai-prompt" readonly>${reading.aiPrompt}</textarea>
      <button class="button secondary copy-ai-prompt" type="button">复制深度解读提示词</button>
    </div>
    <p class="result-disclaimer">
      说明：当前深度报告为本地模拟版本，专业感会明显优于模板卡片；正式上线建议接入 AI API，让模型基于结构化命盘逐盘生成完整报告。健康内容仅作生活状态提醒，不替代医疗建议；事业、财富和感情内容仅作参考，不构成保证。
    </p>
  `;

  const leadSection = document.getElementById("leadSection");
  leadSection.hidden = false;
  leadSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatAiReport(report) {
  const safe = escapeHtml(report || "").trim();
  if (!safe) return "";
  return safe
    .split(/\n{2,}/)
    .map(paragraph => `<p>${paragraph.replace(/\n/g, "<br>")}</p>`)
    .join("");
}

async function generateDeepseekReport() {
  if (!latestReading) return;

  const button = document.querySelector(".generate-ai-report");
  const status = document.getElementById("apiStatus");
  const reportBox = document.getElementById("deepseekReport");
  if (!button || !status || !reportBox) return;

  button.disabled = true;
  button.textContent = "DeepSeek 正在生成...";
  status.textContent = "正在根据四柱、十神、格局、大运流年生成深度报告，请稍等。";
  reportBox.hidden = true;
  reportBox.innerHTML = "";

  try {
    const response = await fetch("/api/generate-report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: latestReading.aiPrompt,
        model: "deepseek-v4-flash"
      })
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.error || "DeepSeek 接口暂时不可用");
    }

    reportBox.innerHTML = `
      <h5>DeepSeek 生成版</h5>
      ${formatAiReport(data.report)}
    `;
    reportBox.hidden = false;
    status.textContent = "已生成 DeepSeek 深度报告。";
  } catch (error) {
    status.textContent = `还不能直接生成：${error.message}。如果你现在是 file:// 本地预览，需要先部署到 Vercel，或用本地服务器运行后端接口。`;
  } finally {
    button.disabled = false;
    button.textContent = "生成 DeepSeek 深度报告";
  }
}

document.getElementById("readingForm").addEventListener("submit", event => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  latestReading = buildReading(formData);
  renderReading(latestReading);
});

document.addEventListener?.("click", event => {
  if (event.target.classList.contains("generate-ai-report")) {
    generateDeepseekReport();
    return;
  }

  if (!event.target.classList.contains("copy-ai-prompt")) return;
  const textarea = document.querySelector(".ai-prompt");
  if (!textarea) return;
  textarea.select();
  document.execCommand("copy");
  event.target.textContent = "已复制";
  setTimeout(() => {
    event.target.textContent = "复制深度解读提示词";
  }, 1600);
});

document.getElementById("leadForm").addEventListener("submit", event => {
  event.preventDefault();
  if (!latestReading) return;

  const lead = {
    createdAt: new Date().toISOString(),
    name: document.getElementById("leadName").value.trim(),
    contact: document.getElementById("contact").value.trim(),
    budget: document.getElementById("budget").value,
    reading: latestReading
  };

  const leads = JSON.parse(localStorage.getItem("fiveElementsLeads") || "[]");
  leads.push(lead);
  localStorage.setItem("fiveElementsLeads", JSON.stringify(leads));

  document.getElementById("savedMessage").textContent = "已保存。正式上线时，这里可以接入邮件系统、Google Sheet、Airtable 或 CRM。";
  event.currentTarget.reset();
});

document.getElementById("exportLeads").addEventListener("click", () => {
  const leads = JSON.parse(localStorage.getItem("fiveElementsLeads") || "[]");
  if (!leads.length) {
    alert("当前浏览器还没有保存潜客信息。");
    return;
  }

  const rows = [
    ["createdAt", "name", "contact", "budget", "birthDate", "birthTime", "gender", "focus", "dayMaster", "strength", "luckDirection", "useful", "avoid"].join(",")
  ];

  leads.forEach(lead => {
    rows.push([
      lead.createdAt,
      lead.name,
      lead.contact,
      lead.budget,
      lead.reading.birthDate,
      lead.reading.birthTime,
      lead.reading.gender,
      lead.reading.focus,
      `${lead.reading.pillars.day.stem}${elementLabel[lead.reading.dayMaster]}`,
      strengthLabel[lead.reading.strength],
      lead.reading.luck.direction,
      lead.reading.useful.useful.map(element => elementLabel[element]).join("/"),
      lead.reading.useful.avoid.map(element => elementLabel[element]).join("/")
    ].map(value => `"${String(value).replaceAll('"', '""')}"`).join(","));
  });

  const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "bazi-reading-leads.csv";
  link.click();
  URL.revokeObjectURL(link.href);
});
