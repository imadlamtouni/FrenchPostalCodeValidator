# FrenchPostalCodeValidator

The component allows to check if a french postal code is valid or not. If the postal code is valid, it will return the city name which you can map into another field. If it is not valid, an error appears.

This component is using a public API, for more information, you can visit the official website :
- https://api.gouv.fr/les-api/api_carto_codes_postaux
- https://apicarto.ign.fr/api/doc/pdf/docUser_moduleCodesPostaux.pdf


### Demo
![CPT2303081551-493x216](https://user-images.githubusercontent.com/127231787/223746115-027506ea-df2a-4ba1-8e82-170f2caf65af.gif)


### Parameters
|Parameters|Type|Required|
|:---------|:---------------|:----:|
|FrenchPostalCodeValidatorControl_postalCodeValue|SingleLine.Text|Yes|
|FrenchPostalCodeValidatorControl_cityNameValue|SingleLine.Text|No|



