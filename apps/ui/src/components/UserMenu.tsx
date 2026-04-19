import { Avatar, Button, DropdownMenu } from '@radix-ui/themes';
import { SignOut } from 'phosphor-react';
import { useNavigate, useRouteLoaderData } from 'react-router';
import { authClient } from '../lib/auth-client';

export default function UserMenu() {
    const navigate = useNavigate();
    const userData = useRouteLoaderData('app');

    function logout() {
        authClient.signOut({
            fetchOptions: {
                onSuccess: () => navigate('/')
            }
        });
    }

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Button variant="soft">
                    <Avatar fallback={userData.user.name[0]} size="1" variant="solid" />
                    {userData.user.name}
                    <DropdownMenu.TriggerIcon />
                </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
                <DropdownMenu.Item onClick={logout}>
                    <SignOut /> Log Out
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
}
