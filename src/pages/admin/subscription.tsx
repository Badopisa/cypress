import React from 'react';
import { FormImage, FormDetails } from '@/components/Form';
import {
    Flex,
    Tabs,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Stack,
    HStack,
    Img,
    Text, Box
} from '@chakra-ui/react';
import PlanCard from '@/components/Elements/Card/PlanCard';
import { PlanData } from '@/data/PlanData';
import { useRouter } from 'next/router';
import NavBar from '@/components/Layout/NavBar';
import Steps4 from "@/components/Team/Steps4";

const Subscription = () => {
    const { monthly, yearly } = PlanData;
    const router = useRouter();
    const handleSubscription = (title: string, time: string, price: number, benefits: string[]) => {
        console.log(title);
        console.log(time);
        console.log('price', price);
        console.log('benefits', benefits);

        router.push(
            `/admin/choose-payment?title=${title}&time=${time}&price=${price}&benefits=${benefits}`
        );
    };
    return (
        <>
            <NavBar />
            <Flex
                direction={'column'}
                bg="white"
                color={'black'}
                overflowY={'auto'}
                minHeight="completeY"
                alignItems="center"
                justifyContent="center">
                <Box mx={'auto'} w={'320px'} mb={'38px'}>
                    <Steps4 current={4} />
                </Box>
                <FormDetails
                    mt="0"
                    hasFooter={false}
                    title="Choose subscription plan"
                    subtitle="Select one to proceed">
                    <Tabs variant="unstyled">
                        <TabList
                            justifyContent={'center'}
                            bg="white"
                            w="100%"
                            mb={'40px'}
                            rounded={5}
                            p="0.5rem 1rem">
                            <Tab _selected={{ color: 'white', bg: 'primary', rounded: '5px' }}>
                                Monthly Billing
                            </Tab>
                            <Tab _selected={{ color: 'white', bg: 'primary', rounded: '5px' }}>
                                Yearly Billing
                            </Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Stack
                                    justifyContent={'space-between'}
                                    spacing={8}
                                    direction={{ base: 'column', md: 'row' }}>
                                    <PlanCard
                                        handleSubscription={(
                                            title: any,
                                            time: any,
                                            price: any,
                                            benefits: any
                                        ) => handleSubscription(title, time, price, benefits)}
                                        title="Starter"
                                        benefits={monthly.basic.benefits}
                                        price={monthly.basic.price}
                                        time="month"
                                    />
                                    <PlanCard
                                        handleSubscription={(
                                            title: any,
                                            time: any,
                                            price: any,
                                            benefits: any
                                        ) => handleSubscription(title, time, price, benefits)}
                                        title="Premium"
                                        borderColor={'purple'}
                                        benefits={monthly.premium.benefits}
                                        price={monthly.premium.price}
                                        time="month"
                                    />
                                    <PlanCard
                                        handleSubscription={(
                                            title: any,
                                            time: any,
                                            price: any,
                                            benefits: any
                                        ) => handleSubscription(title, time, price, benefits)}
                                        title="Ultra"
                                        benefits={monthly.main.benefits}
                                        price={monthly.main.price}
                                        time="month"
                                    />
                                </Stack>
                            </TabPanel>
                            <TabPanel>
                                <Stack
                                    justifyContent={'space-between'}
                                    spacing={8}
                                    direction={{ base: 'column', md: 'row' }}>
                                    <PlanCard
                                        handleSubscription={(
                                            title: any,
                                            time: any,
                                            price: any,
                                            benefits: any
                                        ) => handleSubscription(title, time, price, benefits)}
                                        title="Starter"
                                        benefits={yearly.basic.benefits}
                                        price={yearly.basic.price}
                                        time="year"
                                    />
                                    <PlanCard
                                        handleSubscription={(
                                            title: any,
                                            time: any,
                                            price: any,
                                            benefits: any
                                        ) => handleSubscription(title, time, price, benefits)}
                                        title="Premium"
                                        borderColor={'purple'}
                                        benefits={yearly.premium.benefits}
                                        price={yearly.premium.price}
                                        time="year"
                                    />
                                    <PlanCard
                                        handleSubscription={(
                                            title: any,
                                            time: any,
                                            price: any,
                                            benefits: any
                                        ) => handleSubscription(title, time, price, benefits)}
                                        title="Ultra"
                                        benefits={yearly.main.benefits}
                                        price={yearly.main.price}
                                        time="year"
                                    />
                                </Stack>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </FormDetails>
                <HStack my={'40px'} w={'full'} justifyContent={'center'}>
                    <HStack onClick={() => router.back()} cursor={'pointer'}>
                        <Img alt="back" src="/images/icons/arrow-circle-left.svg" />
                        <Text>Go back</Text>
                    </HStack>
                </HStack>
            </Flex>
        </>
    );
};

export default Subscription;
