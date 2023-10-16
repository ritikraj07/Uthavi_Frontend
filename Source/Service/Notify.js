import { Notifee } from '@notifee/react-native';

const scheduleMonthlyNotification = async () => {
    const nextDate = new Date();
    nextDate.setDate(10);
    nextDate.setHours(7, 14, 0, 0); // Set the time to 10 AM

    await Notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
    });

    await Notifee.scheduleNotification({
        title: 'Monthly Reminder',
        body: 'This is your monthly reminder!',
        android: {
            channelId: 'default',
        },
        ios: {
            categoryId: 'general',
        },
        schedule: {
            at: nextDate.getTime(),
            repeat: {
                every: 'month',
            },
        },
    });
};

export default scheduleMonthlyNotification
