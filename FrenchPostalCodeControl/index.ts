/* eslint-disable @typescript-eslint/no-var-requires */
import { IInputs, IOutputs } from "./generated/ManifestTypes";

const validFileNameIcon = "validIcon";
const notValidFileNameIcon = "notValidIcon";

export class FrenchPostalCodeValidatorControl
  implements ComponentFramework.StandardControl<IInputs, IOutputs>
{
  private _postalCodeValue: string;
  private _cityNameValue: string;

  private _notifyOutputChanged: () => void;

  private _inputElement: HTMLInputElement;
  private _inputImgElement: HTMLElement;

  private _context: ComponentFramework.Context<IInputs>;
  private _refreshData: EventListenerOrEventListenerObject;
  /**
   * Empty constructor.
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  /**
   * Used to initialize the control instance. Controls can kick off remote server calls 
      and other initialization actions here.
   * Data-set values are not initialized here, use updateView.
   * @param context The entire property bag available to control via Context Object; 
      It contains values as set up by the customizer mapped to property names defined 
      in the manifest, as well as utility functions.
   * @param notifyOutputChanged A callback method to alert the framework that the 
      control has new outputs ready to be retrieved asynchronously.
   * @param state A piece of data that persists in one session for a single user. 
      Can be set at any point in a controls life cycle by calling 'setControlState' 
      in the Mode interface.
   * @param container If a control is marked control-type='standard', it will receive 
      an empty div element within which it can render its content.
*/
  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ): void {
    this._context = context;
    this._notifyOutputChanged = notifyOutputChanged;

    this._refreshData = this.refreshData.bind(this);

    //Get parameters
    this._postalCodeValue = context.parameters.postalCodeValue.raw!;

    this._inputElement = document.createElement("input");
    this._inputElement.setAttribute("type", "text");
    this._inputElement.setAttribute("class", "pcfinputcontrol");
    this._inputElement.addEventListener("change", this.refreshData.bind(this));
    this._inputElement.value = this._postalCodeValue;

    this._inputImgElement = document.createElement("img");
    this._inputImgElement.setAttribute("class", "pcfimagecontrol");
    this._inputImgElement.setAttribute("height", "24px");

    container.appendChild(this._inputElement);
    container.appendChild(this._inputImgElement);
  }

  public refreshData(evt: Event | null): void {
    this._postalCodeValue = this._inputElement.value;
    this._cityNameValue = "";
    if (this._postalCodeValue) {     
      this._inputImgElement.removeAttribute("hidden");
      fetch(
        "https://apicarto.ign.fr/api/codes-postaux/communes/" +
          this._postalCodeValue
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          this.findAndSetImage(notValidFileNameIcon);          
          this._notifyOutputChanged();
          return Promise.reject(response);
        })
        .then((body) => {
          this.findAndSetImage(validFileNameIcon);
          this._cityNameValue = body[0].nomCommune;
          this._notifyOutputChanged();
          console.log(body);
        })
        .catch((error) => {
          console.error("error in execution", error);
        });
    } else {
      this._inputImgElement.setAttribute("hidden", "hidden");
      this._notifyOutputChanged();
    }
  }

  /**
   * Called when any value in the property bag has changed. This includes field values, 
      data-sets, global values such as container height and width, offline status, control 
      metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; 
      It contains values as set up by the customizer mapped to names defined in the manifest, 
      as well as utility functions
*/
  public updateView(context: ComponentFramework.Context<IInputs>): void {
    // Add code to update control view
    // storing the latest context from the control.
    this._inputElement.disabled = context.mode.isControlDisabled;
  }

  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, 
      expecting object[s] for property marked as "bound" or "output"
*/
  public getOutputs(): IOutputs {
    return {
      postalCodeValue: this._postalCodeValue,
      cityNameValue: this._cityNameValue,
    };
  }

  /**
   * Called when the control is to be removed from the DOM tree. 
      Controls should use this call for cleanup.
   * i.e. cancelling any pending remote calls, removing listeners, etc.
*/
  public destroy(): void {
    // Add code to cleanup control if necessary
    this._inputElement.removeEventListener("input", this._refreshData);
  }

  /**
   * Called when a change is detected in the phone number input
   * @param imageName Name of the image to retrieve
   */
  private findAndSetImage(imageName: string) {
    this._context.resources.getResource(
      "img/" + imageName + ".png",
      (data) => {
        this._inputImgElement.setAttribute(
          "src",
          this.generateImageSrcUrl(".png", data)
        );
      },
      () => {
        console.log("Error when downloading " + imageName + ".png image.");
      }
    );
  }
  
  /**
   * Called when a change is detected in the phone number input
   * @param filetype Name of the image extension
   * @param fileContent Base64 image content
   */
  private generateImageSrcUrl(fileType: string, fileContent: string): string {
    return "data:image/" + fileType + ";base64," + fileContent;
  }

  /**
   *  Show Error Message
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private showError(): void {}
}
