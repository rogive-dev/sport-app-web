import { subDays, subHours } from 'date-fns';

const now = new Date();

export const notifications = [
  {
    id: '5e8883f1b51cc1956a5a1ec0',
    author: 'SportApp',
    avatar: '/assets/avatars/avatar-jie-yan-song.png',
    createdAt: subHours(now, 2).getTime(),
    job: 'Tienes un nuevo plan de entrenamiento',
    read: false,
    type: 'new_plan',
  },
  {
    id: '20d9df4f23fff19668d7031c',
    createdAt: subDays(now, 1).getTime(),
    description: 'Logistics management is now available',
    read: true,
    type: 'new_event',
  },
];
