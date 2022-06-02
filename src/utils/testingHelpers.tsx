import {FormProvider, useForm} from "react-hook-form";
import {render} from "@testing-library/react";

export function withReactHookForm(WrappedComponent: any, restProps: any) {
    const HOC = () => {
        const methods = useForm();
        // const {
        //     register,
        //     formState: { errors },
        // } = useForm();

        return (
            <WrappedComponent {...restProps} {...methods} />
        );
    };

    return HOC;
}

export function renderWithReactHookForm(
    Ui: any,
    restProps: any
) {
    let reactHookFormMethods = {};

    const Wrapper = ({ children }: any) => {
        const methods = useForm();
        return <Ui {...methods} {...restProps} />;
    };

    return {
        ...render(Ui, { wrapper: Wrapper })
    };
}
