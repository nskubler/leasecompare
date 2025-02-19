export type ExpenseStructure = 'NNN' | 'Base Year Stop' | 'Fixed';

export type PropertyInfo = {
    buildingName: string;
    analysisType: string;
    assetType: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zip: string;
  };

export type LeaseInfo = {
    rentalArea: number;
    leaseTerm: number;
    commencementDate: Date;
    baseRent: number;
    escalations: number;
    freeRent: number;
    tenantImprovementAllowance: number;
    expenseStructure: ExpenseStructure;
    totalOperatingExpenses: number;
    baseYearAmount: number;
    inflationRate: number;
  }