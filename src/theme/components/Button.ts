export const Button = {
    variants: {
        action: {
            _hover: {
                color: '#fff',
                bg: 'primary'
            },
            color: '#fff',
            bg: 'primary',
            _focus: {
                boxShadow: 'none'
            }
        },
        outline: {
            color: '#fff',
            _hover: {
                color: '#fff',
                bg: 'ash'
            },
            _focus: {
                boxShadow: 'none'
            }
        },
        actionOutline: {
            color: '#fff',
            border: '1px solid',
            _hover: {
                color: '#fff',
                bg: 'primary'
            },
            _focus: {
                boxShadow: 'none'
            }
        },
        actionWhite: {
            _hover: {
                color: '#fff',
                bg: 'primary'
            },
            color: 'dark',
            bg: 'white',
            _focus: {
                boxShadow: 'none'
            }
        },
        actionBare: {
            _hover: {
                color: '#fff',
                bg: 'primary'
            },
            color: 'white',
            bg: 'deepAsh',
            _focus: {
                boxShadow: 'none'
            }
        },
        bare: {
            color: 'white',
            bg: 'transparent',
            _focus: {
                boxShadow: 'none'
            }
        }
    }
};
