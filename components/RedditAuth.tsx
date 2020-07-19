import { useEffect, useContext } from 'react';
import { useRouter, NextRouter } from 'next/router';
import { useApolloClient } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-boost';

import { REDDIT_LOGIN } from '../queries';
import withData from '../hooks/withData';

import Button from './Button';
import { loginUser } from '../utils/user';
import RedditIcon from './RedditIcon';
import { Context } from 'typings';
import context from '../context';

const CLIENT_ID: string = 'OGPS_JHNLNt2sA';
const REDIRECT_URI: string = 'https://testing.keycapsets.com/sign-up/reddit';

interface RedditAuthProps {
    asLink?: boolean;
    text: string;
    callback?: Function;
    disabled: boolean;
}

export function handleRedditAuth() {
    const identifyUrl = `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=token&state=kcs&redirect_uri=${REDIRECT_URI}&duration&scope=identity`;
    window.open(identifyUrl, '_self');
}

function RedditAuth(props: RedditAuthProps): JSX.Element {
    const { text, callback, disabled, asLink = false } = props;
    const router: NextRouter = useRouter();
    const client: ApolloClient<any> = useApolloClient();
    const { dispatch } = useContext<Context>(context);

    useEffect(() => {
        const hash = window.location.hash;
        if (hash !== '') {
            const fragments: any = router.asPath
                .split('#')[1]
                .split('&')
                .reduce((res, fragment) => {
                    const [key, value] = fragment.split('=');
                    return {
                        ...res,
                        [key]: value,
                    };
                }, {});
            getAccesToken(fragments.access_token, fragments.state);
        }
    }, []);

    async function getAccesToken(token: any, state: any) {
        const readableStream: Response = await fetch('https://oauth.reddit.com/api/v1/me', {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        const { id, name, oauth_client_id, link_karma, comment_karma } = await readableStream.json();
        const {
            data: { redditLogin },
        } = await client.mutate({
            mutation: REDDIT_LOGIN,
            variables: {
                redditId: `${id}_${oauth_client_id}`,
                redditUserName: name,
            },
        });
        dispatch({
            type: 'user',
            payload: {
                user: redditLogin.user,
            },
        });
        loginUser(redditLogin);
        if (redditLogin.firstLogin) {
            window.location.href = '/user/edit';
            return;
        }
        window.location.href = '/';
    }

    return asLink ? (
        <a onClick={handleRedditAuth}>
            <RedditIcon variant="dark" />
            {text}
        </a>
    ) : (
        <Button variant="primary" size="md" onClick={handleRedditAuth} isDisabled={disabled}>
            <RedditIcon variant="white" size={16} />
            {text}
        </Button>
    );
}

export default RedditAuth;
