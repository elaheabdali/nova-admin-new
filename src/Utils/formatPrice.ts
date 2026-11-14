import { AppLanguage } from '../types/Enums/AppLanguage';

const USD_TO_IRR_RATE = 600000;

export function formatPrice(price: number, language: AppLanguage): string {
  if (language === AppLanguage.Persian) {
    const rialAmount = Math.round(price * USD_TO_IRR_RATE);
    const formattedNumber = new Intl.NumberFormat('fa-IR').format(rialAmount);
    return `${formattedNumber} ریال`;
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}