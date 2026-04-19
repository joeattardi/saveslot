import { Button } from '@radix-ui/themes';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import FormField from '../../components/ui/FormField';
import Input from '../../components/ui/Input';
import Label from '../../components/ui/Label';
import Section from '../../components/ui/Section';
import classes from './AddGame.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface AddGameFormData {
    name: string;
}

function addGame(game: AddGameFormData) {
    return fetch('/api/games', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(game)
    });
}

export default function AddGame() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {
        handleSubmit,
        control,
        formState: { isSubmitting, errors }
    } = useForm<AddGameFormData>({
        defaultValues: { name: '' }
    });

    const mutation = useMutation({
        mutationFn: addGame,
        async onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['games'] });
            navigate('/app');
        }
    });

    function onSubmit(data: AddGameFormData) {
        mutation.mutate(data);
    }

    return (
        <div className={classes.container}>
            <title>Add Game | SaveSlot</title>

            <Section title="Add a Game" description="Start tracking a new game in your collection.">
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                    <FormField>
                        <Label htmlFor="name" label="Game name" />
                        <Input
                            id="name"
                            name="name"
                            control={control}
                            rules={{ required: 'Game name is required' }}
                            placeholder="e.g. The Legend of Zelda"
                            size="3"
                            autoFocus
                            error={errors.name?.message}
                        />
                    </FormField>
                    <Button type="submit" size="3" loading={isSubmitting}>
                        Add game
                    </Button>
                </form>
            </Section>
        </div>
    );
}
