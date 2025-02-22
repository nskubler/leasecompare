import '@mantine/core/styles.css';
import { Paper, Center, Stack, MantineProvider, Divider, NumberFormatter, Table } from '@mantine/core';
import LeaseInfoForm from './components/lease_info_form.tsx';
import { useState } from 'react';
import { LeaseInfo } from './types.tsx';
import { calculateNPV, calculateNER, calculateSimpleNER } from './util/lease_calc.tsx';

export default function App() {
  const [npv, setNPV] = useState<null | number>(null);
  const [ner, setNER] = useState<null | number>(null);
  const [simpleNER, setSimpleNER] = useState<null | number>(null);

  const handleLeaseInfoSubmission = (leaseInfo: LeaseInfo) => {
    setNPV(calculateNPV(leaseInfo));
    setNER(calculateNER(leaseInfo));
    setSimpleNER(calculateSimpleNER(leaseInfo));
  };

  return (
    <MantineProvider>
      <Center style={{ height: '100vh' }}> {/* Keeps everything centered */}
        <Paper
          withBorder
          shadow="md"
          p="xl"
          radius="md"
          style={{
            backgroundColor: '#f8f9fa',
            minHeight: 300,
            width: '90vw', // Use % width instead of minWidth to prevent overflow
            maxWidth: 600, // Constrain the max width
          }}
        >
          <Stack>
            {npv !== null && (
              <>
                <Table
                  variant="vertical"
                  layout="fixed"
                  withTableBorder
                  style={{ tableLayout: "fixed", width: "100%" }} // Prevent table expansion
                >
                  <Table.Tbody>
                    <Table.Tr>
                      <Table.Th style={{ width: "50%", textAlign: "left" }}><b>NPV</b></Table.Th>
                      <Table.Td style={{ width: "50%" }}>
                        {!npv ? '_' : (<NumberFormatter prefix="$ " value={npv} decimalScale={2} thousandSeparator />)}
                      </Table.Td>
                    </Table.Tr>

                    <Table.Tr>
                      <Table.Th style={{ width: "50%", textAlign: "left" }}><b>NER</b></Table.Th>
                      <Table.Td style={{ width: "50%" }}>
                        {!ner ? '_' : (<NumberFormatter prefix="$ " value={ner} decimalScale={2} thousandSeparator />)}
                      </Table.Td>
                    </Table.Tr>

                    <Table.Tr>
                      <Table.Th style={{ width: "50%", textAlign: "left" }}><b>Simple NER</b></Table.Th>
                      <Table.Td style={{ width: "50%" }}>
                        {!simpleNER ? '_' : (<NumberFormatter prefix="$ " value={simpleNER} decimalScale={2} thousandSeparator />)}
                      </Table.Td>
                    </Table.Tr>
                  </Table.Tbody>
                </Table>
                <Divider />
              </>
            )}

            <LeaseInfoForm onLeaseInfoSubmission={handleLeaseInfoSubmission} />
          </Stack>
        </Paper>
      </Center>
    </MantineProvider>
  );
}
