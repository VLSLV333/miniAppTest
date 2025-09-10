import { VStack } from "@chakra-ui/react";
import Balance from "./components/balance/Balance";
import TaskCard from "./components/taskCard/TaskCard";
import CTA from "./components/cta/CTA";
import { useAppStore } from "./store/appStore";
import TaskModal from "./components/taskModal/TaskModal";

export default function App() {
  const tasks = useAppStore((s) => s.tasks);

  return (
    <VStack
      maxW="580px"
      mx="auto"
      w="full"
      px={5}
      py={8}
      gap='1rem'
    >
      <Balance />

      <CTA />

      <VStack w="full" align="stretch" gap='0.5rem'>
        {tasks.map((t) => (
          <TaskCard key={t.id} task={t} />
        ))}

      </VStack>
      <TaskModal />
    </VStack>
  )
}