import {HStack, Text, Icon} from "@chakra-ui/react";
import { FaCoins } from "react-icons/fa";
import {useAppStore} from "../../store/appStore";
import styles from "./balance.module.css";

function BalanceBox({label, value}: {label: string, value: number}){
    return (
        <HStack
            justify="center"
            bg="#FFFFFF14"
            border="1px solid #FFFFFF33"
            rounded="xl"
            flex={1}
            gap='0.25rem'
            className={styles.balanceBox}
        >
            <HStack gap='0.25rem'>
                <Icon as={FaCoins} boxSize={6} color="white"/>
                <Text fontSize="sm" color="white" fontWeight="600">{value }</Text>
            </HStack>
            <Text fontSize="sm" color="white"  fontWeight="600">
                {label}
            </Text>
        </HStack>
    )
}

export default function Balance(){
    const dc = useAppStore((s) => s.balance.dc)
    const tickets = useAppStore((s) => s.balance.tickets)
    return (
        <HStack gap={4} width='100%' justify='space-between'>
            <BalanceBox label="DC" value={dc}></BalanceBox>
            <BalanceBox label="Билетов" value={tickets}></BalanceBox>
        </HStack>
    )
}