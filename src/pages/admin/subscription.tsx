import React from 'react'
import { FormImage, FormDetails } from '@/components/Form';
import { Flex,Tabs,Tab,TabList, TabPanel,TabPanels, HStack, Text,Stack} from '@chakra-ui/react'
import PlanCard from '@/components/Elements/Card/PlanCard';
import { PlanData } from '@/data/PlanData';
import Router, { useRouter } from 'next/router';


const Subscription = () => {
  const {monthly, yearly} = PlanData
  const router = useRouter()
  const handleSubscription = (title:string, time:string) => {
        console.log(title)
        console.log(time)
        router.push('/admin/choose-payment')
  }
  return (
    <Flex h="auto" direction={{base:'column-reverse', md:'row'}} bg='primary'>
        <FormImage isAdmin image="/images/image/hero-bg.jpg" title="Club Admin Platform" body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut purus rhoncus lectus."/>
        <FormDetails mt="0" hasFooter={false} coloredTitle="Choose" title="Subscription plan" subTitle="Please fill in the following details to bring your dream to life">
       <Tabs variant='unstyled' >
            <TabList bg='dark' w='50%' rounded={5} p='0.5rem 1rem'>
                <Tab _selected={{ color: 'white', bg: 'primary', rounded:'5px' }}>Monthly</Tab>
                <Tab _selected={{ color: 'white', bg: 'primary', rounded:'5px' }}>Yearly</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <Stack spacing={8} direction={['column', 'row']}>
                        <PlanCard handleSubscription={(title, time)=>handleSubscription(title, time)} title='BASIC' benefits={monthly.basic.benefits} price={monthly.basic.price} time='month'/>
                        <PlanCard handleSubscription={(title, time)=>handleSubscription(title, time)} title='PREMIUM' benefits={monthly.premium.benefits} price={monthly.premium.price} time='month'/>
                    </Stack>
                </TabPanel>
                <TabPanel>
                    <Stack spacing={8} direction={['column', 'row']}>
                        <PlanCard handleSubscription={(title, time)=>handleSubscription(title, time)} title='BASIC' benefits={yearly.basic.benefits}  price={yearly.basic.price} time='month'/>
                        <PlanCard handleSubscription={(title, time)=>handleSubscription(title, time)} title='BASIC' benefits={yearly.premium.benefits} price={yearly.premium.price} time='month'/>
                    </Stack>
                </TabPanel>
            </TabPanels>
       </Tabs>
   </FormDetails>   
    </Flex>
      
  )
}

export default Subscription