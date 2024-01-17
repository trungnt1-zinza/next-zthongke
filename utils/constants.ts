export const ODD_ROW_CLASS = "odd";
const Event = {
  1: "Giải Cỏ",
  2: "Giải bounty",
  3: "giải công ty",
};

interface Item {
  name: string;
  event: number;
  day: string;
  count: number;
  places: number;
  bounty: number;
  jackpot: number;
}
async function fetchData() {
  const data1 = await fetch("https://azure-chief-ceder.glitch.me/test");
  const dataJson = await data1.json();
  return dataJson;
}

let pushData;

let totalThamgia = 0;

const buyinData = [
  { totalBuyin: 0, first: 0, second: 0, third: 0 },
  { totalBuyin: 1, first: 1, second: 0, third: 0 },
  { totalBuyin: 2, first: 2, second: 0, third: 0 },
  { totalBuyin: 3, first: 3, second: 0, third: 0 },
  { totalBuyin: 4, first: 4, second: 0, third: 0 },
  { totalBuyin: 5, first: 5, second: 0, third: 0 },
  { totalBuyin: 6, first: 5, second: 1, third: 0 },
  { totalBuyin: 7, first: 6, second: 1, third: 0 },
  { totalBuyin: 8, first: 6, second: 2, third: 0 },
  { totalBuyin: 9, first: 6, second: 3, third: 0 },
  { totalBuyin: 10, first: 6, second: 3, third: 1 },
  { totalBuyin: 11, first: 7, second: 3, third: 1 },
  { totalBuyin: 12, first: 7, second: 4, third: 1 },
  { totalBuyin: 13, first: 8, second: 4, third: 1 },
  { totalBuyin: 14, first: 8, second: 4, third: 2 },
  { totalBuyin: 15, first: 9, second: 4, third: 2 },
  { totalBuyin: 16, first: 9, second: 5, third: 2 },
  { totalBuyin: 17, first: 10, second: 5, third: 2 },
  { totalBuyin: 18, first: 10, second: 6, third: 2 },
  { totalBuyin: 19, first: 11, second: 6, third: 2 },
  { totalBuyin: 20, first: 11, second: 6, third: 3 },
  { totalBuyin: 21, first: 12, second: 6, third: 3 },
  { totalBuyin: 22, first: 13, second: 6, third: 3 },
  { totalBuyin: 23, first: 14, second: 6, third: 3 },
  { totalBuyin: 24, first: 15, second: 6, third: 3 },
  { totalBuyin: 25, first: 15, second: 7, third: 3 },
  { totalBuyin: 26, first: 15, second: 7, third: 4 },
  { totalBuyin: 27, first: 16, second: 7, third: 4 },
  { totalBuyin: 28, first: 16, second: 8, third: 4 },
  { totalBuyin: 29, first: 17, second: 8, third: 4 },
  { totalBuyin: 30, first: 18, second: 8, third: 4 },
  { totalBuyin: 31, first: 18, second: 8, third: 5 },
  { totalBuyin: 32, first: 19, second: 8, third: 5 },
  { totalBuyin: 33, first: 19, second: 9, third: 5 },
  { totalBuyin: 34, first: 20, second: 9, third: 5 },
  { totalBuyin: 35, first: 20, second: 10, third: 5 },
  { totalBuyin: 36, first: 21, second: 10, third: 5 },
  { totalBuyin: 37, first: 22, second: 10, third: 5 },
  { totalBuyin: 38, first: 22, second: 10, third: 6 },
  { totalBuyin: 39, first: 22, second: 11, third: 6 },
  { totalBuyin: 40, first: 23, second: 11, third: 6 },
  { totalBuyin: 41, first: 23, second: 12, third: 6 },
  { totalBuyin: 42, first: 24, second: 12, third: 6 },
  { totalBuyin: 43, first: 24, second: 13, third: 6 },
  { totalBuyin: 44, first: 25, second: 13, third: 6 },
  { totalBuyin: 45, first: 25, second: 13, third: 7 },
  { totalBuyin: 46, first: 26, second: 13, third: 7 },
  { totalBuyin: 47, first: 26, second: 14, third: 7 },
  { totalBuyin: 48, first: 27, second: 14, third: 7 },
  { totalBuyin: 49, first: 28, second: 14, third: 7 },
  { totalBuyin: 50, first: 28, second: 15, third: 7 },
];
async function process() {
  const data = await fetchData();
  data.map((item: any) => {
    if (item.count > 0) totalThamgia = totalThamgia + 1;
  });

  pushData = data.map((item: Item) => {
    let event;
    switch (item.event) {
      case 0:
        event = "Giải Cỏ";
        break;
      case 1:
        event = "Giải bounty";
        break;
      case 2:
        event = "giải công ty";
        break;
    }
    const choi = item.count ? "Có" : "Không";
    const cost = item.count * 20;
    const thamgia = `Tham gia x ${item.count}`;
    let giaithuong;
    buyinData.map((buyin) => {
      if (totalThamgia == buyin.totalBuyin) {
        switch (item.places) {
          case 1:
            giaithuong = buyin.first * 20;
            break;
          case 2:
            giaithuong = buyin.second * 20;
            break;
          case 3:
            giaithuong = buyin.third * 20;
            break;
          default:
            giaithuong = 0;
            break;
        }
      }
    });

    return [
      item.name,
      event,
      item.day,
      choi,
      cost,
      thamgia,
      item.places,
      item.bounty,
      0,
      item.jackpot,
      giaithuong,
    ];
  });
  return pushData;
}
const data1 = await process();
export const data = data1;
