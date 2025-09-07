import {create} from 'zustand';

export type TaskStatus = 'not_started' | 'in_progress' | 'completed';

export interface Reward {
    type: 'DC' | 'USDT' | 'ticket';
    amount: number;
}

export interface UserBalance {
    dc: number;
    tickets: number;
    usdt: number;
}

export interface Task {
    id: string;
    title: string;
    icon: string;
    rewards: Reward[];
    steps: string[];
    link: string;
    status: TaskStatus;
    partnerId?: string;
}

interface AppState {
    balance: UserBalance;
    tasks: Task[];
    getStarted:(id: string) => void; 
    checkTask:(id: string) => boolean; 
}

export const useAppStore = create<AppState>((set) => ({
    balance: {dc: 0, tickets: 0, usdt: 0},
    tasks: [
        {
            "id":"1",
            "title":"Qzino App - Заработай 20 USDT",
            "icon":"https://placehold.co/64x64/4CAF50/FFFFFF?text=Q",
            "rewards": [
                {type: "DC", amount: 150},
                {type: "USDT", amount: 0.25},
                {type: "ticket", amount: 10}
            ],
            "steps":[
                "Нажми кнопку ниже, чтобы открыть бота Qzino",
                "Прокрути 3 раза колесо фортуны",
                "Вступи в клан \"Dreamcoin\"",
                "Вернись сюда и получи награду"
            ],
            "link":"https://google.com",
            "status":"not_started",
            "partnerId":"fer3242d-gr"
        },
        {
            "id":"2",
            "title":"Подписаться на канал Major",
            "icon":"https://placehold.co/64x64/2196F3/FFFFFF?text=M",
            "rewards": [
                {type: "DC", amount: 50},
                {type: "ticket", amount: 1},
            ],
            "steps":[
                "Нажми кнопку ниже, для перехода в канал",
                "Подпишись на канал Major",
                "Вернись сюда и получи награду"
            ],
            "link":"https://google.com",
            "status":"in_progress"
        },
        {
            "id":"3",
            "title":"Пройти квиз о криптовалютах",
            "icon":"https://placehold.co/64x64/6c46ff/FFFFFF?text=Q",
            "rewards": [
                {type: "DC", amount: 100}
            ],
            "steps":[
                "Открой квиз по ссылке ниже",
                "Ответь на все 10 вопросов",
                "Набери минимум 8 правильных ответов",
                "Вернись сюда и получи награду"
            ],
            "link":"https://google.com",
            "status":"completed"
        }
    ],
    getStarted: (id:string) => set((s) => ({
        tasks: s.tasks.map((t) => (t.id === id && t.status === 'not_started' ? {...t, status: 'in_progress'} : t))
    })),
    checkTask: (id:string) => {
        let taskCompleted = false;
        set((s) => {
            const task = s.tasks.find((t) => t.id === id);
            if (!task || task.status !== 'in_progress') return {};

            taskCompleted = Math.random() > 0.5;

            if (!taskCompleted) return {};

            const dcAmount = task.rewards.find((r) => r.type === "DC")?.amount || 0;
            const ticketsAmount = task.rewards.find((r) => r.type === "ticket")?.amount || 0;
            const usdtAmount = task.rewards.find((r) => r.type === "USDT")?.amount || 0;

            return {
                balance:{
                    dc: s.balance.dc + dcAmount,
                    tickets: s.balance.tickets + ticketsAmount,
                    usdt: s.balance.usdt + usdtAmount
                },
                tasks: s.tasks.map((t) => (t.id === id ? {...t, status: "completed"} : t))
            }
        });
        return taskCompleted;
},
}));
