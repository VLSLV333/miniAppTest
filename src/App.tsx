import {VStack, Text} from "@chakra-ui/react";
import Balance from "./components/Balance";
import TaskCard from "./components/taskCard/TaskCard";
import {useAppStore} from "./store/appStore";
import TaskModal from "./components/taskModal/TaskModal";

export default function App(){
  const tasks = useAppStore((s) => s.tasks); 
  
  return (
    <VStack
      maxW="580px"
      mx="auto"
      w="full"
      p={3}
    >
      <Balance />

      <VStack w="full" gap={4} align="stretch">
        <VStack align="center" gap={0} py={2}>
          <Text textStyle="lg" color="white" fontWeight="medium">СПОНСОРСКИЕ</Text>
          <Text textStyle="md" color="white/40" textAlign="center">
            Выполняй спонсорские задания и получай за них награду
          </Text>
        </VStack>

        {tasks.map((t) => (
          <TaskCard key={t.id} task={t}/>
        ))}

      </VStack>
      <TaskModal />
    </VStack>
  )
}