# FrenchPostalCodeValidator

Here is my first control developed using PowerApps Component framework (PCF) !

The component allows to check if a french postal code is valid or not. If the postal code is valid, it will return the city name which you can map into another field.

This component is using a public API to check the code postal and to get the name of the city.

For more information, you can visit the official website of the api:
https://api.gouv.fr/les-api/api_carto_codes_postaux
https://api.gouv.fr/documentation/api_carto_codes_postaux


### Configuration
|Parameters|Type|Required|
|:---------|:---------------|:----:|
|FrenchPostalCodeValidatorControl_postalCodeValue|SingleLine.Text|Yes|
|FrenchPostalCodeValidatorControl_cityNameValue|SingleLine.Text|No|
