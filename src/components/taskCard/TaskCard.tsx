import { Box, HStack, VStack, Text, Button, Badge, Icon, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { LiaYinYangSolid } from "react-icons/lia";
import { GiTicket } from "react-icons/gi";
import { IoLogoUsd } from "react-icons/io";
import { useAppStore, type Task } from "../../store/appStore";
import { useUIStore } from "../../store/uiStore";
import { Check } from "lucide-react"
import styles from "./taskCard.module.css";

const MotionBox = motion.create(Box);

function Rewards({ dc = 0, tickets = 0, usdt = 0 }: { dc?: number, tickets?: number, usdt?: number }) {

    const dcPresent = dc > 0;
    const ticketsPresent = tickets > 0;
    const usdtPresent = usdt > 0;

    return (
        <HStack width={"100%"} justifyContent={"start"} flexWrap={"wrap"} gap='0.25rem'>
            {dcPresent && (
                <Badge rounded="xl" bg="rgba(255,255,255,0.08)" color="white" className={styles.rewardValueText}>
                    <Text as="span" fontWeight='700' fontSize='0.75rem'>{dc} DC</Text>
                    <Icon as={LiaYinYangSolid} rounded="xl" boxSize={4} color="white" backgroundImage="linear-gradient(to bottom right, #7e3BF1, #7D38F2)" />
                </Badge>
            )}
            {ticketsPresent && (
                <Badge rounded="xl" bg="rgba(255,255,255,0.08)" color="white" className={styles.rewardValueText}>
                    <Text as="span" fontWeight='700' fontSize='0.75rem'>{tickets} билет</Text>
                    <HStack rounded="xl" backgroundImage="linear-gradient(to bottom right, #C7F86E, #6EA027)" color="white" padding="2px" >
                        <Icon as={GiTicket} color="white" />
                    </HStack>
                </Badge>
            )}
            {usdtPresent && (
                <Badge rounded="xl" bg="rgba(255,255,255,0.08)" color="white" className={styles.rewardValueText}>
                    <Text as="span" fontWeight='700' fontSize='0.75rem'>{usdt} USDT</Text>
                    <HStack rounded="xl" bg="#2196F3" color="white" padding="2px" >
                        <Icon as={IoLogoUsd} color="white" />
                    </HStack>
                </Badge>
            )}
        </HStack>
    )
}

export default function TaskCard({ task }: { task: Task }) {
    const getStarted = useAppStore((s) => s.getStarted);
    const openTask = useUIStore((s) => s.openTask)

    const openAndStart = () => {
        getStarted(task.id);
        openTask(task.id)
    }

    const ActionBtn = () => {
        if (task.status === 'not_started') {
            return (
                <Button size="sm" rounded="md" backgroundImage="linear-gradient(to bottom right, #9F7BE0, #7428F5)" fontWeight='700' fontSize='0.75rem' _hover={{ opacity: 0.9 }} onClick={(e) => { e.stopPropagation(); openAndStart() }} className={styles.taskBtn}>
                    Начать
                </Button>
            )
        }
        if (task.status === "in_progress") {
            return (
                <Button size="sm" rounded="md" fontWeight='700' bg='#83B63A' fontSize='0.75rem' _hover={{ opacity: 0.9 }} onClick={(e) => { e.stopPropagation(); openTask(task.id) }} className={styles.taskBtn}>
                    Собрать
                </Button>
            )
        }
        if (task.status === "completed") {
            return (
                <HStack color="white/70" fontWeight='700' fontSize='0.75rem'>
                    <Text>Готово</Text>
                    <Check size={16} />
                </HStack>
            )
        }
    }

    return (
        <MotionBox
            whileTap={{ scale: 0.9 }}
            bg="#FFFFFF1A"
            border="1px solid #FFFFFF1A"
            rounded="xl"
            onClick={() => openAndStart()}
            className={styles.motBox}
        >
            <HStack w="full" align="center" justifyContent="space-between" className={styles.taskContainer} >
                <HStack gap='0.75rem'>
                    <Image src={task.icon} alt={task.title} rounded="md" objectFit="cover" loading="lazy" className={styles.rewardImage} />
                    <VStack className={styles.rewardTextContainer} alignItems='start'>
                        <Text className={styles.rewardText} >{task.title}</Text>
                        <Rewards dc={task.rewards.find((r) => r.type === "DC")?.amount || 0} tickets={task.rewards.find((r) => r.type === "ticket")?.amount || 0} usdt={task.rewards.find((r) => r.type === "USDT")?.amount || 0} />
                    </VStack>
                </HStack>
                <ActionBtn />
            </HStack>
        </MotionBox>
    )
}