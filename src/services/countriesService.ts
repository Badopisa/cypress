export async function fetchCountries() {
    //Fetching countries from the API
    const countriesResponse = await fetch('https://restcountries.com/v3.1/all');
    const countriesData = await countriesResponse.json();

    //Sorting the countries by common name
    return countriesData.sort(function (a: any, b: any) {
        const nameA = a.name.common.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.common.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        // names must be equal
        return 0;
    });
}
