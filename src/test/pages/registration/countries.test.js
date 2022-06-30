// import { CountriesSelector } from '@/components/Form/CountriesSelector';
// import { renderWithReactHookForm } from '@/utils/testingHelpers';
// import { getAllByRole } from '@testing-library/react';
// import React from 'react';
// import { fireEvent, render, screen } from '../../text-utils';

// const countries = [
//     {
//         name: {
//             common: 'Select Country'
//         },
//         id: 1
//     },
//     {
//         name: {
//             common: 'Afghanistan'
//         },
//         id: 2
//     },
//     {
//         name: {
//             common: 'Albania'
//         },
//         id: 3
//     },
//     {
//         name: {
//             common: 'Algeria'
//         },
//         id: 4
//     }
// ];

// describe('Countries Selector working properly', () => {
//     beforeEach(() => {
//         renderWithReactHookForm(CountriesSelector, {
//             map: countries?.map((country) => (
//                 <option key={country.id} value={country.name.common}>
//                     {country.name.common}
//                 </option>
//             ))
//         });
//     });

//     it('renders Countries Selector component without crashing', async () => {
//         expect(await screen.findByTestId('countries-dropdown')).toBeDefined();
//     });

//     it('can change the value of the dropdown', () => {
//         const countriesDropdown = screen.getByTestId('countries-dropdown');

//         const display = countriesDropdown.children[1];

//         expect(display.textContent).toBe('Select CountrySelect CountryAfghanistanAlbaniaAlgeria');

//         console.log(display.textContent);

//         fireEvent.click(countriesDropdown);

//         const dropdownOptions = getAllByRole(countriesDropdown, 'option');

//         fireEvent.click(dropdownOptions[2]);

//         expect(display.textContent).toBe('Select CountrySelect CountryAfghanistanAlbaniaAlgeria');

//         console.log(display.textContent);
//     });
// });
