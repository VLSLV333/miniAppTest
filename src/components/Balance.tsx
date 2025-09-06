import {HStack, Text, Icon} from "@chakra-ui/react";
import { FaCoins } from "react-icons/fa";
import {useAppStore} from "../store/appStore";

function BalanceBox({label, value}: {label: string, value: number}){
    return (
        <HStack
            justify="space-between"
            bg="rgba(255,255,255,0.08)"
            border="1px solid rgba(255,255,255,0.08)"
            rounded="xl"
            p={3}
        >
            <HStack>
                <Icon as={FaCoins} boxSize={6} color="white"/>
                <Text fontSize="sm" color="white" fontWeight="bold">{value}</Text>
            </HStack>
            <Text fontSize="sm" color="white"  fontWeight="medium">
                {label}
            </Text>
        </HStack>
    )
}

export default function Balance(){
    const dc = useAppStore((s) => s.balance.dc)
    const tickets = useAppStore((s) => s.balance.tickets)
    return (
        <HStack gap={3}>
            <BalanceBox label="DC" value={dc}></BalanceBox>
            <BalanceBox label="Билетов" value={tickets}></BalanceBox>
        </HStack>
    )
}