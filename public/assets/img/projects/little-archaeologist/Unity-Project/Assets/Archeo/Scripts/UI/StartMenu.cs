using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;


public enum Language
{
    Franch, English
}

public enum ZoomMethod
{
    Pinch, Slider
}

public class StartMenu : MonoBehaviour
{
    [Header("References")]
    [SerializeField] Options settings;
    [SerializeField] ObjectSelected objectSelected;

    private GameObject title;
    private GameObject startButton;
    private GameObject quitButton;
    private GameObject helpButton;
    private GameObject settingsButton;
    private GameObject settingsPanel;
    private GameObject returnSettingsButton;
    private Dropdown languageDropdown;
    private Dropdown zoomMethodDropdown;
    private Slider rotationSensibility;
    private Text rotationText;
    private Slider zoomSensibility;
    private Text zoomText;
    private GameObject adminButton;
    private GameObject adminPannel;
    private GameObject connexionAdminButton;
    private InputField connexionAdminIdInputField;
    private InputField connexionAdminPasswordInputField;
    private GameObject returnAdminButton;
    private GameObject creditsButton;
    private GameObject[] creditsPannel;
    private GameObject returnCreditsButton;
    private GameObject mainMenu;


    [Header("Parameters")]
    [SerializeField] string administratorId;
    [SerializeField] string administratorPassword;
    private bool isSettingsActivated;
    private bool isCreditsActivated;
    private bool isAdminActivated;


    // Start is called before the first frame update
    void Start()
    {
        GetUI();
        SetUI();
    }


    private void GetUI()
    {
        title = transform.Find("Titre").gameObject;
        startButton = transform.Find("COMMENCER").gameObject;
        quitButton = transform.Find("QUITTER").gameObject;
        helpButton = transform.Find("AIDE").gameObject;
        settingsButton = transform.Find("PARAMETRES").gameObject;
        settingsPanel = transform.Find("Parametres panel").gameObject;
        returnSettingsButton = transform.Find("Return - PARAMETRES").gameObject;
        rotationSensibility = settingsPanel.transform.GetChild(0).GetChild(0).GetChild(0).Find("SENSIBILITE Rotation").GetComponent<Slider>();
        rotationText = settingsPanel.transform.GetChild(0).GetChild(0).GetChild(0).Find("Sensibilite de la rotation").GetComponent<Text>();
        languageDropdown = settingsPanel.transform.GetChild(0).GetChild(0).GetChild(0).Find("LANGUES").GetComponent<Dropdown>();
        zoomMethodDropdown = settingsPanel.transform.GetChild(0).GetChild(0).GetChild(0).Find("ZOOM").GetComponent<Dropdown>();
        zoomSensibility = settingsPanel.transform.GetChild(0).GetChild(0).GetChild(0).Find("SENSIBILITE Zoom").GetComponent<Slider>();
        zoomText = settingsPanel.transform.GetChild(0).GetChild(0).GetChild(0).Find("Sensibilite du zoom").GetComponent<Text>();
        creditsButton = settingsPanel.transform.GetChild(0).GetChild(0).GetChild(0).Find("CREDITS").gameObject;
        creditsPannel = new GameObject[3];
        creditsPannel[0] = transform.Find("Groupe entreprises").gameObject;
        creditsPannel[1] = transform.Find("Groupe equipe").gameObject;
        creditsPannel[2] = transform.Find("Groupe ecoles").gameObject;
        returnCreditsButton = transform.Find("Return - CREDITS").gameObject;
        adminButton = settingsPanel.transform.GetChild(0).GetChild(0).GetChild(0).Find("ADMINISTRATEUR").gameObject;
        adminPannel = transform.Find("Connexion Administrateur").gameObject;
        connexionAdminIdInputField = adminPannel.transform.Find("IDENTIFIANT").GetComponent<InputField>();
        connexionAdminPasswordInputField = adminPannel.transform.Find("MOT DE PASSE").GetComponent<InputField>();
        connexionAdminButton = adminPannel.transform.Find("CONNEXION").gameObject;
        returnAdminButton = transform.Find("Return - ADMINISTRATEUR").gameObject;
        mainMenu = GameObject.FindAnyObjectByType<SelectionMenu>().gameObject;
    }

    private void SetUI()
    {
        isCreditsActivated = false;
        isSettingsActivated = false;
        isAdminActivated = false;

        title.SetActive(true);
        startButton.SetActive(true);
        quitButton.SetActive(true);
        helpButton.SetActive(true);
        settingsButton.SetActive(!isSettingsActivated);
        settingsPanel.SetActive(isSettingsActivated);
        returnSettingsButton.SetActive(isSettingsActivated);
        creditsButton.SetActive(!isCreditsActivated);
        for (int i = 0; i < creditsPannel.Length; i++)
        {
            creditsPannel[i].SetActive(isCreditsActivated);
        }
        returnCreditsButton.gameObject.SetActive(isCreditsActivated);
        adminButton.SetActive(!isAdminActivated);
        adminPannel.SetActive(isAdminActivated);
        connexionAdminButton.SetActive(isAdminActivated);
        returnAdminButton.SetActive(isAdminActivated);

        languageDropdown.value = 0;
        ChangeLanguage(languageDropdown);
        zoomMethodDropdown.value = 0;
        ChangeZoomMethod(zoomMethodDropdown);
        rotationSensibility.value = 5;
        ChangeRotationSensibility(rotationSensibility);
        zoomSensibility.value = 5;
        ChangeZoomSensibility(zoomSensibility);

        this.gameObject.SetActive(!objectSelected.isGameLaunched);
        mainMenu.SetActive(objectSelected.isGameLaunched);
    }


    public void Settings()
    {
        isSettingsActivated = !isSettingsActivated;
        settingsButton.SetActive(!isSettingsActivated);
        settingsPanel.SetActive(isSettingsActivated);
        returnSettingsButton.SetActive(isSettingsActivated);

        title.SetActive(!isSettingsActivated);
        startButton.SetActive(!isSettingsActivated);
        quitButton.SetActive(!isSettingsActivated);
        helpButton.SetActive(!isSettingsActivated);
    }

    public void ChangeLanguage(Dropdown dropdown)
    {
        settings.language = (Language)dropdown.value;
    }

    public void ChangeZoomMethod(Dropdown dropdown)
    {
        settings.zoomMethod = (ZoomMethod)dropdown.value;
    }

    public void ChangeRotationSensibility(Slider slider)
    {
        rotationText.text = "Sensibilite de la rotation : " + slider.value.ToString();
        settings.rotationSensibility = (int)slider.value;
    }

    public void ChangeZoomSensibility(Slider slider)
    {
        zoomText.text = "Sensibilite du zoom : " + slider.value.ToString();
        settings.zoomSensibility = (int)slider.value;
    }


    public void Credits()
    {
        isCreditsActivated = !isCreditsActivated;
        returnCreditsButton.gameObject.SetActive(isCreditsActivated);
        for (int i = 0; i < creditsPannel.Length; i++)
        {
            creditsPannel[i].SetActive(isCreditsActivated);
        }

        settingsPanel.SetActive(!isCreditsActivated);
    }

    public void Administrator()
    {
        isAdminActivated = !isAdminActivated;
        adminPannel.SetActive(isAdminActivated);
        connexionAdminButton.SetActive(isAdminActivated);
        returnAdminButton.SetActive(isAdminActivated);

        settingsPanel.SetActive(!isAdminActivated);
    }

    public void AdministratorConnextion()
    {
        if (connexionAdminIdInputField.text == administratorId && connexionAdminPasswordInputField.text == administratorPassword)
        {
            Debug.Log("Bienvenu !");
        }
        else
        {
            Debug.Log("L'identifiant ou le mot de passe est incorrect");
        }
    }


    public void SelectChapter()
    {
        mainMenu.SetActive(true);
        this.gameObject.SetActive(false);
    }


    public void OpenURL(string Url)
    {
        Application.OpenURL(Url);
    }


    public void Quit()
    {
        Application.Quit();
    }
}
