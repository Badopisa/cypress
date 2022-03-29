import Link from '@/components/Elements/Link/Link';
import {
    Stack,
    Flex,
    Button,
    Text,
    VStack,
    Heading,
    Image
  } from '@chakra-ui/react';

const Hero = ({image,heading, subHeading, mouseImage}: {image: string, heading: string, subHeading: string, mouseImage: string}) => {
return (
    <Flex
        w='full'
        h='100vh'
        backgroundImage={image}
        backgroundSize='cover'
        backgroundPosition='center center'
    >
        <VStack
          w="full"
          justify="center"
          px={{base: 4, md: 8 }}
          bgGradient={'linear(to-r, blackAlpha.600, transparent)'}
        >
            <Stack maxW={'2xl'} align="center" spacing={16}>
                <Heading
                    fontWeight={600}
                    fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                    color="white"
                    textAlign="center"
                    lineHeight="tall"
                >
                    {heading} 
                </Heading>
                <Text
                color={'white'}
                fontWeight="light"
                lineHeight={1.2}
                fontSize={{ base: 'lg', md: 'lg' }}
                >
                    {subHeading}
                </Text>
                <Button variant="action">
                    Get Started
                </Button>
                <Link href="#about">
                    <Image src={mouseImage}/>
                </Link>
            </Stack>
        </VStack>
      </Flex>
    )
}

export default Hero
