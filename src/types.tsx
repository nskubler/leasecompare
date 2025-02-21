export type ExpenseStructure = 'NNN' | 'Base Year Stop' | 'Fixed';

export type PropertyInfo = {
    buildingName: string;
    analysisType: string;
    assetType: string;
    commencementDate: Date;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zip: string;
  };

export type LeaseInfo = {
    rentalArea: number;
    leaseTerm: number;
    baseRent: number;
    escalations: number;
    freeRent: number;
    tenantImprovementAllowance: number;
    operatingExpenses: number;
    inflationRate: number;
    expenseStructure: ExpenseStructure;
  }