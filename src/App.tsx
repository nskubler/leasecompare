import '@mantine/core/styles.css';
import { Paper, Box, Stack, MantineProvider, Divider } from '@mantine/core';
import LeaseInfoForm from './components/lease_info_form.tsx';
import PropertyInfoForm from './components/property_info_form.tsx';

export default function App() {

  return (
    <MantineProvider>
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '7vh 0',
        }}
      >
        <Paper
          withBorder
          shadow="md"
          p="xl"
          radius="md"
          style={{
            backgroundColor: '#f8f9fa',
            minHeight: 300,
            minWidth: '60vw',
          }}
        >
          <Stack>
            <LeaseInfoForm />
          </Stack>
        </Paper>

      </Box>
    </MantineProvider>
  );
}
