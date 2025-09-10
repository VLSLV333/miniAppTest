import { VStack, Text } from "@chakra-ui/react";

export default function CTA() {
    return (
        <VStack gap={0} >
            <Text textStyle="lg" color="white" fontWeight="700" fontSize='1rem'>СПОНСОРСКИЕ</Text>
            <Text textStyle="md" color="white/40" textAlign="center" fontWeight='400' fontSize='1rem'>
                Выполняй спонсорские задания и получай за них награду
            </Text>
        </VStack>
    )
}