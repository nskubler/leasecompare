import { ExpenseStructure, PropertyInfo, LeaseInfo } from "../types";

// TODO: ensure correctness
export function calculateNPV(info: LeaseInfo): number {

  let currBaseRent = info.baseRent;
  let currOpEx = info.operatingExpenses;
  let npv = -info.tenantImprovementAllowance;
  const discountRateMonthly = Math.pow(1 + info.inflationRate, 1 / 12) - 1;

  for (let month = 0; month < info.leaseTerm; month++) {
    // annual calculations: escalate rent and apply inflation to opex
    if (month > 0 && month % 12 === 0) {
      currBaseRent *= 1 + info.escalations;
      currOpEx *= 1 + info.escalations; // Assuming OpEx grows at the same rate, adjust if needed
    }

    let monthlyExpense = 0;
    switch (info.expenseStructure) {
      case 'NNN':
        monthlyExpense = (currBaseRent + currOpEx) * info.rentalArea;
        break;
      case 'Base Year Stop':
        monthlyExpense = (month >= 12 ? (currBaseRent + currOpEx) : currBaseRent) * info.rentalArea;
        break;
      case 'Fixed':
        monthlyExpense = currBaseRent * info.rentalArea;
        break;
      default:
        throw new Error(`Unknown ExpenseStructure: ${info.expenseStructure}`);
    }

    // discount monthly cash flow to present value
    npv += monthlyExpense / Math.pow(1 + discountRateMonthly, month);
  }

  return npv;
}
