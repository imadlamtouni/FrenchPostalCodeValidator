# FrenchPostalCodeValidator

The component allows to check if a french postal code is valid or not. If the postal code is valid, it will return the city name which you can map or not into another field.

This component is using a public API to check the code postal and to get the name of the city.

For more information, you can visit the official website of the api:
- https://api.gouv.fr/les-api/api_carto_codes_postaux
- https://apicarto.ign.fr/api/doc/pdf/docUser_moduleCodesPostaux.pdf


### Demo
![CPT2303081551-493x216](https://user-images.githubusercontent.com/127231787/223746115-027506ea-df2a-4ba1-8e82-170f2caf65af.gif)


### Configuration
|Parameters|Type|Required|
|:---------|:---------------|:----:|
|FrenchPostalCodeValidatorControl_postalCodeValue|SingleLine.Text|Yes|
|FrenchPostalCodeValidatorControl_cityNameValue|SingleLine.Text|No|

Example:

![Sans titre](https://user-images.githubusercontent.com/127231787/223787448-ef0be316-6474-4b2b-bd35-78c1f40dd90c.png)


