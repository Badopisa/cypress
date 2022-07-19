import { useForm } from 'react-hook-form';
import { render } from '@testing-library/react';

export function renderWithReactHookForm(Ui: any, restProps: any) {
    const Wrapper = () => {
        const {
            formState: { errors }
        } = useForm();
        return <Ui errors={errors} {...restProps} />;
    };

    return {
        ...render(Ui, { wrapper: Wrapper })
    };
}
