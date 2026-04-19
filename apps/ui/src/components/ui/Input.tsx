import { TextField } from '@radix-ui/themes';
import { Warning } from 'phosphor-react';
import { type ComponentProps } from 'react';
import {
    Controller,
    type Control,
    type FieldValues,
    type Path,
    type RegisterOptions
} from 'react-hook-form';
import classes from './Input.module.css';

interface InputProps<T extends FieldValues = FieldValues> extends Omit<
    ComponentProps<typeof TextField.Root>,
    'name'
> {
    name: Path<T>;
    control: Control<T>;
    rules?: RegisterOptions<T, Path<T>>;
    error?: string;
}

export default function Input<T extends FieldValues = FieldValues>({
    control,
    rules,
    name,
    error,
    ...rest
}: InputProps<T>) {
    return (
        <div className={classes.input}>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => <TextField.Root {...field} {...rest} />}
            />
            {error && (
                <span className={classes.fieldError}>
                    <Warning /> {error}
                </span>
            )}
        </div>
    );
}
