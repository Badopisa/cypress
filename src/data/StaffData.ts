interface StaffType {
    id: number;
    file: string;
    staffName: string;
    staffPosition: string;
}

export const staffData: StaffType[] = [
    {
        id: 1,
        file: '/images/imgs/scott.svg',
        staffName: 'Michael Scott',
        staffPosition: 'Manager'
    },
    {
        id: 2,
        file: '/images/imgs/edward.svg',
        staffName: 'Andy Barnad',
        staffPosition: 'Ass. Manager'
    },
    {
        id: 3,
        file: '/images/imgs/edwin.svg',
        staffName: 'Michael Scott',
        staffPosition: 'Victor Edwin'
    },
    {
        id: 4,
        file: '/images/imgs/hudson.svg',
        staffName: 'Stanley Hudson',
        staffPosition: 'Striking Coach'
    }
];
