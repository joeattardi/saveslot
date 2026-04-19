import classes from './Section.module.css';
import { Box, Card } from '@radix-ui/themes';

interface SectionProps {
    title: string;
    description?: string;
    children: React.ReactNode;
}

export default function Section({ title, description, children }: SectionProps) {
    return (
        <Box width="100%" maxWidth="450px">
            <Card>
                <section className={classes.cardContent}>
                    <header className={classes.header}>
                        <h2 className={classes.title}>{title}</h2>
                        {description && <p className={classes.description}>{description}</p>}
                    </header>
                    <div className={classes.body}>{children}</div>
                </section>
            </Card>
        </Box>
    );
}
