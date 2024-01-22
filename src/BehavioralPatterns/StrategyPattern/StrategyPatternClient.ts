import { Discount } from "./Discount";
import { MovieTicket } from "./MovieTicket";
import { config } from "./config.json";

export const StrategyPatternClient = async () => {
  const mt: MovieTicket = new MovieTicket();
  const originalPrice: number = 60.0;
  let currentPrice: number | undefined;

  mt.setPrice(originalPrice);
  console.log(`原始价格为${originalPrice}`);
  console.log("------------------------");

  const currentDiscount = await import(`./${config}`);

  const discount: Discount = new currentDiscount[config]();
  mt.setDiscount(discount);

  currentPrice = mt.getPrice();
  console.log(`折后价为${currentPrice}`);
};
