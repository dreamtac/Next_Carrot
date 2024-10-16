import { redirect } from 'next/navigation';

export async function GET() {
    const puuush = await fetch(`${process.env.NOTI}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: 'Next.JS',
            body: 'Puuush 테스트입니다.!',
        }),
        cache: 'no-cache',
    });
    console.log(puuush);

    const response = await fetch('https://reqres.in/api/users');
    const json = await response.json();
    console.log(json.data[0].avatar);
    return redirect(`${json.data[0].avatar}`);
}
