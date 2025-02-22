import '@mantine/dates/styles.css';
import { Select, NumberInput, Button, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { calculateNPV } from '../util/lease_calc';
import { ExpenseStructure, LeaseInfo } from '../types';

interface Props {
  onLeaseInfoSubmission: (info: LeaseInfo) => void;
}

export default function LeaseInfoForm({ onLeaseInfoSubmission }: Props) {

  const handleLeaseInfoSubmission = (values: LeaseInfo) => {
    const pValues = {
      ...values,
      escalations: values.escalations * .01,
      inflationRate: values.inflationRate * .01,
    }
    onLeaseInfoSubmission(pValues);
  };

  const leaseInfoForm = useForm<LeaseInfo>();

  return (
    <form onSubmit={leaseInfoForm.onSubmit(handleLeaseInfoSubmission)}>
      <NumberInput
        label="Rental Area (SF)"
        placeholder="Enter total square footage"
        min={0}
        thousandSeparator=','
        {...leaseInfoForm.getInputProps('rentalArea')}
      />

      <NumberInput
        label="Lease Term (Months)"
        placeholder="Enter lease duration in months"
        min={0}
        thousandSeparator=','
        {...leaseInfoForm.getInputProps('leaseTerm')}
      />

      <NumberInput
        label="Base Rent ($/SF) per Year"
        placeholder="Enter base rent"
        min={0}
        fixedDecimalScale
        decimalScale={2}
        prefix='$'
        thousandSeparator=','
        {...leaseInfoForm.getInputProps('baseRent')}
      />

      <NumberInput
        label="Inflation Rate (% per year)"
        placeholder="Enter inflation rate"
        suffix='%'
        min={0}
        max={100}
        {...leaseInfoForm.getInputProps('inflationRate')}
      />

      <NumberInput
        label="Escalations Rate (% per year)"
        placeholder="Enter inflation rate"
        suffix='%'
        min={0}
        max={100}
        {...leaseInfoForm.getInputProps('escalations')}
      />

      <NumberInput
        label="Free Rent (Months)"
        min={0}
        thousandSeparator=','
      />

      <NumberInput
        label="Tenant Improvement Allowance ($/SF)"
        placeholder="Enter amount"
        min={0}
        fixedDecimalScale
        decimalScale={2}
        prefix='$'
        thousandSeparator=','
        {...leaseInfoForm.getInputProps('tenantImprovementAllowance')}
      />

      <Select
        label="Expense Structure"
        placeholder="Select expense structure"
        data={['NNN', 'Base Year Stop', 'Fixed']}
        {...leaseInfoForm.getInputProps('expenseStructure')}
        onChange={(value) => {
          if (value) {
            leaseInfoForm.setFieldValue('expenseStructure', value as ExpenseStructure);
          }
        }}
      />


      {(leaseInfoForm.getValues().expenseStructure === 'NNN' || leaseInfoForm.getValues().expenseStructure === 'Base Year Stop') && (
        <NumberInput
          label="Total Operating Expenses ($/SF)"
          placeholder="Enter total operating expenses"
          min={0}
          fixedDecimalScale
          decimalScale={2}
          prefix='$'
          thousandSeparator=','
          {...leaseInfoForm.getInputProps('totalOperatingExpenses')}
        />
      )}
      <Group mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}