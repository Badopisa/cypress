import { NextPage } from 'next'
import { Stack, Flex, SimpleGrid, Text, VStack, Img, Box, Heading, Image } from '@chakra-ui/react';
import Hero from '@/components/Layout/Hero/Hero'
import Banner from '@/components/Layout/Banner/Banner';
import FeatureCard from '@/components/Elements/Card/FeatureCard';
import OfferCard from '@/components/Elements/Card/OfferCard';
import FooterHero from "@/components/Layout/Footer/FooterHero"

const Home: NextPage = () => {
  return (
      <Box w='full' bg="black">
        <Hero 
          image='/images/image/hero-bg.jpg' 
          heading='Get Real Time Soccer Analysis' 
          subHeading='Digitalize, Optimize, Standardize, Mobilize' 
          mouseImage="/images/image/mouse.svg"
        />
        <Flex px={{base: 4, md: "24" }} py={{base: 4, md: 24 }} id="about" bg='black' color='white'>
          <Stack direction={['column', 'row']} spacing={24}>
            <Image src="/images/image/about.jpg" alt="image" borderRadius={'sm'} maxW={{base:'full',md:'xl'}}/>
            <VStack spacing={4} align='left' justifyContent='center'>
                <Text color='muted'>ABOUT SONALYSIS</Text>
                <Flex w={{base:'100%',md:'30%'}} mt={0}>
                <Heading as='h1'><Text as='span' color='yellow'>WHO </Text>WE ARE</Heading>
                </Flex>
                <Flex w={{base:'100%',md:'90%'}}>
                    <Text>
                        Sonalysis is our aim at providing/delivering in real time detailed analytics of a soccer game to users right from their comfort in Africa and beyond.
                        We hope to distribute information to both technical and non-technical users by making our application user friendly and easily accessible.
                        Creating a web application that can collate analytical data from a soccer match that will be accessible to anyone.
                    </Text>
                </Flex>
            </VStack>
          </Stack>
        </Flex>
        <Banner 
            heading='Start Your Analysis' 
            subHeading='Experience Now'
            content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tortor, nullam id aliquam.'
        />
        <Flex mt={{base: 10, md:0}} bg='black' color='white' >
            <Flex backgroundImage='/images/image/hero-bg.jpg' w='full' h={{base:'80%',md:'80vh'}} px={{base: 4, md: 32 }} py={{base: 4, md: 24 }}>
                <SimpleGrid columns={{base:1, md:3}} w='full' spacing={20} >
                    <FeatureCard image='/images/image/coach.jpg' heading='A COACH' title='GET STARTED AS' />
                    <FeatureCard image='/images/image/player.jpg' heading='A PLAYER' title='GET STARTED AS' />
                    <FeatureCard image='/images/image/analyst.jpg' heading='CLUB ADMIN' title='GET STARTED AS'/>
                </SimpleGrid>
            </Flex>
        </Flex>
        <VStack spacing={10} mt={20}  justifyContent='center' px={{base: 4, md: 16 }}  bg='black' color='white'>
            <VStack px={{base: 4, md: 24 }} w='full' align='left'>
                <Text color={'muted'} fontSize='lg' fontWeight='normal'>FEATURES</Text>
                <Flex w={{base:'100%',md:'40%'}} mt='0 !important'>
                    <Text  variant="title">What We <Text as='span' color='yellow'>Offer</Text> You</Text>
                </Flex>
            </VStack>
            <SimpleGrid  columns={{base: 1, md: 3}} spacing={8}>
                <OfferCard image="images/image/analysis.jpg" title='Data Analytics' subTitle='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tortor, nullam id aliquam.'/>
                <OfferCard image="images/image/recruitment.svg" title='Recruitment' subTitle='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tortor, nullam id aliquam.'/>
                <OfferCard image="images/image/analysis.jpg" title='Highlight Reels' subTitle='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tortor, nullam id aliquam.'/>
            </SimpleGrid>
        </VStack>
        <FooterHero/>
      </Box>
  )
}

export default Home
