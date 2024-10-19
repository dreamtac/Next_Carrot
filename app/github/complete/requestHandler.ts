export async function getAccessToken(code: string): Promise<{ error?: string; access_token?: string }> {
    const accessTokenParams = new URLSearchParams({
        client_id: process.env.GITHUB_CLIENT_ID!,
        client_secret: process.env.GITHUB_CLIENT_SECRET!,
        code: code,
    }).toString();

    const accessTokenURL = `https://github.com/login/oauth/access_token?${accessTokenParams}`;

    const response = await fetch(accessTokenURL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
        },
    });

    const result = await response.json();
    return result;
}

export async function getUserEmails(access_token: string): Promise<string> {
    const userEmailResponse = await fetch('https://api.github.com/user/emails', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        cache: 'no-cache',
    });

    const userEmailData = await userEmailResponse.json();
    let userEmail;
    userEmailData.forEach((element: { primary: boolean; email: string }) => {
        if (element.primary === true) {
            userEmail = element.email;
        }
    });
    return userEmail!;
}

export async function getUserProfile(access_token: string): Promise<{ id: string; login: string; avatar_url: string }> {
    const userProfileResponse = await fetch('https://api.github.com/user', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        cache: 'no-cache',
    });
    const userProfileData = await userProfileResponse.json();
    const profile = {
        id: userProfileData.id,
        login: userProfileData.login,
        avatar_url: userProfileData.avatar_url,
    };
    return profile;
}
