import React from 'react';

const LicenseFooter = () => {
    return ( 
        <div className="bg-red-300 p-2 font-semibold text-center text-sm">
            All of the data and images comes from the&nbsp;<a target="_blank" href="https://world.openfoodfacts.org/" className="underline">openfoodfacts.org</a> database. 
            Those elements are licenced under the&nbsp;
            <a target="_blank" href="https://creativecommons.org/licenses/by-sa/4.0/" className="underline">Creative Commons Attribution-ShareAlike 4.0 International license</a> and&nbsp;
            <a target="_blank" href="https://opendatacommons.org/licenses/odbl/1-0/" className="underline">Open Data Commons Open Database License</a>.
        </div>
     );
}
 
export default LicenseFooter;