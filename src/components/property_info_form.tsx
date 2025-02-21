import { PropertyInfo } from "../types";
import { useForm } from "@mantine/form";
import { DatePickerInput } from "@mantine/dates";
import { Button, Flex, Group, Select, TextInput, Title } from "@mantine/core";
import { useState } from "react";

export default function PropertyInfoForm() {
    const US_STATES: string[] = [
        'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA',
        'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA',
        'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY',
        'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX',
        'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
    ];

    const propertyInfoForm = useForm<PropertyInfo>({
        validate: {
            buildingName: (value) => (/^[A-Za-z0-9\s\-,.&'()#]+$/.test(value) ? null : "Invalid building name"),
            analysisType: (value) => (value !== '' ? null : "Please select an analysis type"),
            assetType: (value) => (value !== '' ? null : "Please select an asset type"),
            commencementDate: (value => value !== null ? null : "Please select a commencement date"),
            addressLine1: (value) => (/^[A-Za-z0-9\s\-,.#'()/]+$/.test(value) ? null : "Please enter a valid address"),
            addressLine2: (value) => (/^$|^[A-Za-z0-9\s\-,.#'()/]+$/.test(value) ? null : "Please enter a valid address"),
            city: (value) => (/^[A-Za-z\s\-']{2,100}$/.test(value) ? null : "Please enter a valid city"),
            state: (value) => (value !== '' ? null : "Please select a state"),
            zip: (value) => (/^\d{5}$/.test(value) ? null : "Please enter a valid ZIP code"),
        }
    });

    const [isEditing, setIsEditing] = useState<boolean>(true);

    return isEditing ? (
        <form onSubmit={propertyInfoForm.onSubmit((values) => {
            setIsEditing(false);
        })}>
            <TextInput
                label="Building Name"
                placeholder="Enter building name"
                {...propertyInfoForm.getInputProps('buildingName')}
            />

            <Select
                label="Analysis Type"
                placeholder="Select analysis type"
                data={['Landlord Proposal', 'Tenant Counter', 'Other']}
                {...propertyInfoForm.getInputProps('analysisType')}
            />

            <Select
                label="Asset Type"
                placeholder="Select asset type"
                data={['Office', 'Industrial', 'Flex', 'Retail']}
                {...propertyInfoForm.getInputProps('assetType')}
            />

            <DatePickerInput
                label="Commencement Date"
                placeholder="Select date"
                {...propertyInfoForm.getInputProps('commencementDate')}
            />

            <TextInput
                label="Address Line 1"
                placeholder="Street address"
                {...propertyInfoForm.getInputProps('addressLine1')}
            />

            <TextInput
                label="Address Line 2"
                placeholder="Apartment, suite, etc. (optional)"
                {...propertyInfoForm.getInputProps('addressLine2')}
            />

            <Group grow>
                <TextInput
                    label="City"
                    placeholder="Enter city"
                    {...propertyInfoForm.getInputProps('city')}
                />

                <Select
                    label="State"
                    placeholder="Select state"
                    data={US_STATES.map((state) => ({ value: state, label: state }))}
                    {...propertyInfoForm.getInputProps('state')}
                />

                <TextInput
                    label="ZIP Code"
                    placeholder="Enter ZIP code"
                    {...propertyInfoForm.getInputProps('zip')}
                />
            </Group>

            <Group mt="md">
                <Button type="submit">Save</Button>
            </Group>
        </form>
    ) : (
        <Flex align="center" justify="space-between">
            <Title order={2}>{propertyInfoForm.getValues().buildingName}</Title>
            <Button variant="outline" onClick={() => setIsEditing(true)}>Edit</Button>
        </Flex>
    );
}
