import { Drawer, DrawerContent, HStack, VStack, Text, Box, Image, Button, Badge, Icon, CloseButton } from "@chakra-ui/react";
import { useUIStore } from '../../store/uiStore';
import { useAppStore } from '../../store/appStore';
import { LiaYinYangSolid } from "react-icons/lia";
import { GiTicket } from "react-icons/gi";
import { IoLogoUsd } from "react-icons/io";
import { openLink, viewport } from "@telegram-apps/sdk-react";
import { useSignal } from "@telegram-apps/sdk-react";
import styles from "./taskModal.module.css";
import { useState, useEffect } from "react";
import { showPopup } from "@telegram-apps/sdk-react";

function RewardChips({ dc = 0, tickets = 0, usdt = 0 }: { dc?: number, tickets?: number, usdt?: number }) {
    return (
        <HStack gap={2}>
            {dc > 0 && (
                <Badge rounded="xl" bg="rgba(255,255,255,0.08)" color="white" p='0.125rem 0.25rem'>
                    <Text color="white" className={styles.rewardsText}>{dc} DC</Text>
                    <Icon as={LiaYinYangSolid} rounded="xl" boxSize={4} color="white" backgroundImage="linear-gradient(to bottom right, #7e3BF1, #7D38F2)" />
                </Badge>
            )}
            {tickets > 0 && (
                <Badge rounded="xl" bg="rgba(255,255,255,0.08)" color="white" p={1}>
                    <Text className={styles.rewardsText} color="white">{tickets} билет</Text>
                    <HStack rounded="xl" backgroundImage="linear-gradient(to bottom right, #C7F86E, #6EA027)" color="white" padding="2px" >
                        <Icon as={GiTicket} color="white" />
                    </HStack>
                </Badge>
            )}
            {usdt > 0 && (
                <Badge rounded="xl" bg="rgba(255,255,255,0.08)" color="white" p={1}>
                    <Text className={styles.rewardsText} color="white">{usdt} USDT</Text>
                    <HStack rounded="xl" bg="#2196F3" color="white" padding="2px" >
                        <Icon as={IoLogoUsd} color="white" />
                    </HStack>
                </Badge>
            )}
        </HStack>
    )
}

export default function TaskModal() {
    const activeTaskId = useUIStore((s) => s.activeTaskId);
    const close = useUIStore((s) => s.closeTask);
    const task = useAppStore((s) => s.tasks.find((t) => t.id === activeTaskId));
    const checkTask = useAppStore((s) => s.checkTask);

    const insetBottom = useSignal(viewport.contentSafeAreaInsetBottom);
    const open = !!activeTaskId && !!task;

    const [taskInProgress, setTaskInProgress] = useState(task?.status === "in_progress");
    const [taskCompleted, setTaskCompleted] = useState(task?.status === "completed");

    useEffect(() => {
        setTaskInProgress(task?.status === "in_progress");
        setTaskCompleted(task?.status === "completed");
    }, [task?.status]);

    if (!task) return null;

    const dc = task.rewards.find((r) => r.type === "DC")?.amount || 0;
    const tickets = task.rewards.find((r) => r.type === "ticket")?.amount || 0;
    const usdt = task.rewards.find((r) => r.type === "USDT")?.amount || 0;

    const openPartnerLink = () => {
        if (openLink.isAvailable()) openLink(task.link)
    }

    const finalCheck = () => {
        const completed = checkTask(task.id);
        if (!completed) {
            if (showPopup.isAvailable()) {
                showPopup({
                    title: "Все задания не выполнены 😢",
                    message: "Пожалуйста, закончите задания и попробуйте снова.",
                    buttons: [{ id: 'ok', type: "default", text: "Вперед 🚀" }]
                })
            }
        }
    }

    return (
        <Drawer.Root
            placement="bottom"
            open={open}
            onOpenChange={(e) => { if (!e.open) close() }}
        >
            <Drawer.Backdrop bg="blackAlpha.700" backdropFilter="blur(7px)" onClick={() => close()} />
            <Drawer.Positioner>
                <DrawerContent
                    pb={`calc(${insetBottom ?? 0}px + 1.5rem)`}
                    bg="#140D1A"
                    color="white"
                    rounded="2xl"
                    maxW="580px"
                    className={styles.modalContainer}
                    position="relative"
                >
                    <Drawer.Header margin="auto" p={0} className={styles.modalHeader}>
                        <CloseButton position="absolute" backgroundColor="whiteAlpha.300" color="white" minW="1.5rem" height='1.5rem' rounded="full" top={3} right={3} onClick={() => close()} className={styles.closeButton} />
                        <VStack gap={4} align="center" className={styles.modalHeaderTextContainer}>
                            <VStack>
                                <Image src={task.icon} alt={task.title} rounded="lg" className={styles.modalImage} />
                                {task.partnerId && (
                                    <Text color="white/50" className={styles.modalHeaderID}>ID: {task.partnerId}</Text>
                                )}
                            </VStack>
                            <Text textAlign="center" fontWeight="700" fontSize="1.25rem" lineHeight="1.5rem" className={styles.modalHeaderHeading}>
                                {task.title}
                            </Text>
                            <RewardChips dc={dc} tickets={tickets} usdt={usdt} />
                        </VStack>
                    </Drawer.Header>

                    <Drawer.Body
                        className={styles.modalBody}
                    >
                        <Box bg="whiteAlpha.100" rounded="xl" p={4} className={styles.modalBodyTasksContainer}>
                            <VStack align="stretch" gap={2}>
                                {task.steps.map((s, i) => (
                                    <HStack key={i} align="start" gap={3} alignItems="center">
                                        <Box w={7} h={7} rounded="full" bg="whiteAlpha.300" display="grid" placeItems="center" fontSize="sm" minW="1.75rem" minH="1.75rem">
                                            {i + 1}
                                        </Box>
                                        <Text fontSize="md">{s}</Text>
                                    </HStack>
                                ))}
                            </VStack>
                        </Box>
                    </Drawer.Body>

                    <Drawer.Footer className={styles.modalFooter}>
                        {taskInProgress && (<VStack w="full" gap={2}>
                            {task.link && (<Button
                                w="full"
                                size="lg"
                                rounded="xl"
                                backgroundImage="linear-gradient(146.07deg, #9F7BE0 6.95%, #7428F5 93.78%)"
                                border='none'
                                _hover={{ opacity: 0.9 }}
                                onClick={openPartnerLink}
                                className={styles.modalFooterButton}
                            >
                                Открыть
                            </Button>)}
                            <Button
                                w="full"
                                size="lg"
                                rounded="xl"
                                bg="#FFFFFF24;"
                                _hover={{ opacity: 0.9 }}
                                onClick={() => finalCheck()}
                                className={styles.modalFooterButton}
                            >
                                Проверить задание
                            </Button>
                        </VStack>)}
                        {taskCompleted && (<VStack w="full">
                            <Button
                                w="full"
                                size="lg"
                                rounded="xl"
                                bg="#4caf50"
                                _hover={{ opacity: 0.9 }}
                                onClick={() => close()}
                                className={styles.modalFooterButton}
                            >
                                Готово!
                            </Button>
                        </VStack>)}
                    </Drawer.Footer>
                </DrawerContent>
            </Drawer.Positioner>
        </Drawer.Root>
    )

}
