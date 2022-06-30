type PlanDataType = {
    [type: string]: SubPlanType;
};

type SubPlanType = {
    price: number;
    benefits: string[];
};
export const PlanData: { [type: string]: PlanDataType } = {
    monthly: {
        basic: {
            price: 300,
            benefits: [
                'Good Video Quality',
                'Good Video Quality',
                'Good Video Quality',
                'Good Video Quality'
            ]
        },
        premium: {
            price: 600,
            benefits: [
                'Good Video Quality',
                'Good Video Quality',
                'Good Video Quality',
                'Good Video Quality',
                'Good Video Quality',
                'Good Video Quality',
                'Good Video Quality'
            ]
        }
    },
    yearly: {
        basic: {
            price: 1200,
            benefits: [
                'Good Video Quality',
                'Good Video Quality',
                'Good Video Quality',
                'Good Video Quality'
            ]
        },
        premium: {
            price: 5000,
            benefits: [
                'Good Video Quality',
                'Good Video Quality',
                'Good Video Quality',
                'Good Video Quality',
                'Good Video Quality',
                'Good Video Quality',
                'Good Video Quality'
            ]
        }
    }
};
