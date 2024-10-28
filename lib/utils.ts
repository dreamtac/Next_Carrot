export function formatToTimeAgo(date: string): string {
    const now = new Date().getTime();
    const time = new Date(date).getTime();
    const diffInMS = now - time;

    const minuteInMS = 1000 * 60;
    const hourInMS = minuteInMS * 60;
    const dayInMS = hourInMS * 24;
    const monthInMS = dayInMS * 30;
    const yearInMS = dayInMS * 365;

    if (diffInMS < hourInMS) {
        const diffInMinutes = Math.floor(diffInMS / minuteInMS);
        return diffInMinutes === 0 ? '방금 전' : `${diffInMinutes}분 전`;
    } else if (diffInMS < dayInMS) {
        const diffInHours = Math.floor(diffInMS / hourInMS);
        return `${diffInHours}시간 전`;
    } else if (diffInMS < monthInMS) {
        const diffInDays = Math.floor(diffInMS / dayInMS);
        return `${diffInDays}일 전`;
    } else if (diffInMS < yearInMS) {
        const diffInMonths = Math.floor(diffInMS / monthInMS);
        return `${diffInMonths}달 전`;
    } else {
        const diffInYears = Math.floor(diffInMS / yearInMS);
        return `${diffInYears}년 전`;
    }
}

export function formatToWon(price: number): string {
    return price.toLocaleString('ko-KR');
}
