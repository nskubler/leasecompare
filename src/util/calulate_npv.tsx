import { ExpenseStructure, PropertyInfo, LeaseInfo } from "../types";

// TODO: ensure correctness
export function calculateNPV(
  rentalArea: number, // SF
  leaseTermMonths: number, // months
  baseRentMonthly: number, // $/SF / month
  escalations: number, // percentage (annual base rent increase)
  tenantImprovementAllowance: number, // $
  discountRateAnnual: number, // percentage (annual)
  operatingExpensesMonthly: number, // $/SF / month
  type: ExpenseStructure
): number {
  let currBaseRent = baseRentMonthly;
  let currOpEx = operatingExpensesMonthly;
  let npv = -tenantImprovementAllowance; // Upfront cost, already in present value
  const discountRateMonthly = Math.pow(1 + discountRateAnnual, 1 / 12) - 1; // Convert annual to monthly rate

  for (let month = 0; month < leaseTermMonths; month++) {
    // annual calculations: escalate rent and apply inflation to opex
    if (month > 0 && month % 12 === 0) {
      currBaseRent *= 1 + escalations;
      currOpEx *= 1 + escalations; // Assuming OpEx grows at the same rate, adjust if needed
    }

    let monthlyExpense = 0;
    switch (type) {
      case 'NNN':
        monthlyExpense = (currBaseRent + currOpEx) * rentalArea;
        break;
      case 'Base Year Stop':
        monthlyExpense = (month >= 12 ? (currBaseRent + currOpEx) : currBaseRent) * rentalArea;
        break;
      case 'Fixed':
        monthlyExpense = currBaseRent * rentalArea;
        break;
      default:
        throw new Error(`Unknown ExpenseStructure: ${type}`);
    }

    // Discount the monthly cash flow to present value
    npv += monthlyExpense / Math.pow(1 + discountRateMonthly, month);
  }
  
  return npv;
}
