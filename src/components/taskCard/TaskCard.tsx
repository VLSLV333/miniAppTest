import {Box, HStack, VStack, Text, Button, Badge, Icon, Image} from "@chakra-ui/react";
import {motion} from "framer-motion";
import { LiaYinYangSolid } from "react-icons/lia";
import { GiTicket } from "react-icons/gi";
import { IoLogoUsd } from "react-icons/io";
import {useAppStore, type Task} from "../../store/appStore";
import {useUIStore} from "../../store/uiStore";
import {Check } from "lucide-react"
import styles from "./taskCard.module.css";

const MotionBox = motion.create(Box);

function Rewards({dc = 0, tickets = 0, usdt = 0}: {dc?: number, tickets?: number, usdt?: number}){

    const dcPresent = dc > 0;
    const ticketsPresent = tickets > 0;
    const usdtPresent = usdt > 0;

    const nonZero = [dc,tickets,usdt].filter((n) => n > 0);

    const twoPresent = nonZero.length === 2;

    return (
        <HStack width={"100%"} justifyContent={"space-evenly"} flexWrap={"wrap"}>
            {dcPresent && (<HStack>
                <Badge rounded="xl" bg="rgba(255,255,255,0.08)" color="white" className={styles.rewardValueText}>
                    { twoPresent && (
                        <>
                            <Text as="span">{dc}</Text>
                            <Text as="span" className={styles.hideTypeTwo}> DC</Text>
                        </>
                    )}
                    { !twoPresent && (<Text as="span">{dc} DC</Text>)}
                    <Icon as={LiaYinYangSolid} rounded="xl" boxSize={4} color="white" bg={"#6c46ff"}/>
                </Badge>
            </HStack>)}
            {ticketsPresent &&(<HStack>
                <Badge rounded="xl" bg="rgba(255,255,255,0.08)" color="white" className={styles.rewardValueText}>
                    { twoPresent  &&(<>
                                        <Text as="span">{tickets}</Text>
                                        <Text as="span" className={styles.hideTypeTwo}> билет</Text>
                                    </>
                    )}
                    { !twoPresent && (<Text as="span">{tickets} билет</Text>)}
                    <HStack  rounded="xl" bg="#4caf50" color="white" padding="2px" >
                        <Icon as={GiTicket} color="white" />
                    </HStack> 
                </Badge>
            </HStack>)}
            {usdtPresent && (<HStack>
                <Badge rounded="xl" bg="rgba(255,255,255,0.08)" color="white" className={styles.rewardValueText}>
                    { twoPresent &&( <>
                                        <Text as="span">{usdt}</Text>
                                        <Text as="span" className={styles.hideTypeTwo}> USDT</Text>
                                    </>
                    )}
                    { !twoPresent && (<Text as="span">{usdt} USDT</Text>)}

                    <HStack  rounded="xl" bg="#2196F3" color="white" padding="2px" >
                        <Icon as={IoLogoUsd} color="white" />
                    </HStack>
                </Badge>
            </HStack>)}
        </HStack>
    )
}

export default function TaskCard({task}: {task: Task}){
    const getStarted = useAppStore((s) => s.getStarted);
    const openTask = useUIStore((s) => s.openTask)

    const openAndStart = () =>{
        getStarted(task.id); 
        openTask(task.id)
    }
    
    const ActionBtn = () => {
        if (task.status === 'not_started'){
            return (
                <Button size="sm" rounded="md" bg="#6c46ff"_hover={{opacity: 0.9}} onClick={(e) => {e.stopPropagation(); openAndStart()}} className={styles.taskBtn + " " + styles.rewardText}>
                    Начать
                </Button>
            )
        }
        if (task.status === "in_progress"){
            return (
                <Button size="sm" rounded="md" bg="#4caf50" _hover={{opacity: 0.9}} onClick={(e) => {e.stopPropagation(); openTask(task.id)}} className={styles.taskBtn + " " + styles.rewardText}>
                    Продолжить
                </Button>
            )
        }
        if (task.status === "completed"){
            return (
                <HStack color="white/70" className={styles.rewardText}>
                    <Text>Выполнено</Text>
                    <Check size={16} />
                </HStack>        
            )
        }
    }

    return (
        <MotionBox
            whileTap={{scale: 0.9}}
            bg="rgba(255,255,255,0.08)"
            border="1px solid rgba(255,255,255,0.08)"
            rounded="xl"
            onClick={() => openAndStart()}
            className={styles.motBox}
        >
            <HStack w="full" align="center" justifyContent="space-between" className={styles.taskContainer} >
                <Image src={task.icon} alt={task.title} rounded="md" objectFit="cover" loading="lazy" className={styles.rewardImage} />
                <VStack className={styles.rewardTextContainer}>
                    <Text fontWeight="medium" textAlign="center" className={styles.rewardText}>{task.title}</Text>
                    <Rewards dc={task.rewards.find((r) => r.type === "DC")?.amount || 0} tickets={task.rewards.find((r) => r.type === "ticket")?.amount || 0} usdt={task.rewards.find((r) => r.type === "USDT")?.amount || 0} />
                </VStack>
                <ActionBtn />
            </HStack>
        </MotionBox>
    )
}