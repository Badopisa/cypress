export const Button = {
    variants: {
        action: {
            _hover: {
                color: '#fff',
                bg: 'black'
            },
            transition: 'black 500ms ease-out',
            transitionDuration: '500ms',
            color: '#fff',
            bg: 'linear-gradient(to right, #9741FF, #645EFD, #007DB3)',
            fontSize: '16px',
            fontWeight: '400',
            _focus: {
                boxShadow: 'none'
            }
        },
        action2: {
            _hover: {
                color: '#fff',
                bg: 'black'
            },
            transitionDuration: '200ms',
            color: 'black',
            bg: 'secondaryButton',
            fontSize: '16px',
            fontWeight: '400',
            _focus: {
                boxShadow: 'none'
            }
        },
        text: {
            _hover: {
                color: 'linear-gradient(to right, #9741FF, #645EFD, #007DB3)',
                bg: 'transparent'
            },
            transitionDuration: '200ms',
            color: 'black',
            bg: 'transparent',
            fontSize: '16px',
            fontWeight: '400',
            _focus: {
                boxShadow: 'none'
            }
        }
    },
    // The default size and variant values
    defaultProps: {
        variant: 'action'
    }
};
