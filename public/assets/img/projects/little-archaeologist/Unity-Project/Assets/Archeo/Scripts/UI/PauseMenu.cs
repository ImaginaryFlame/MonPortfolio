using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

public class PauseMenu : MonoBehaviour
{
    [Header("References")]
    private Button settingsButton;
    private Button quitButton;
    private Button returnSettingsButton;
    private GameObject plasmasControllerUI;

    [Header("Parameters")]
    public bool isSettingsActivated;


    // Start is called before the first frame update
    void Start()
    {
        isSettingsActivated = false;
        isSettingsActivated = false;

        GetUI();
        SetUI();
    }

    private void GetUI()
    {
        settingsButton = transform.Find("SETTINGS").GetComponent<Button>();
        quitButton = transform.Find("QUIT").GetComponent<Button>();
        returnSettingsButton = transform.Find("RETURN - Settings").GetComponent<Button>();
        plasmasControllerUI = GameObject.Find("Plasma Controller");
    }

    private void SetUI()
    {
        settingsButton.gameObject.SetActive(!isSettingsActivated);
        quitButton.gameObject.SetActive(!isSettingsActivated);
        returnSettingsButton.gameObject.SetActive(isSettingsActivated);

        plasmasControllerUI.SetActive(isSettingsActivated);
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKeyUp(KeyCode.Escape))
        {
            Settings();
        }
    }

    public void Settings()
    {
        isSettingsActivated = !isSettingsActivated;
        plasmasControllerUI.SetActive(isSettingsActivated);

        settingsButton.gameObject.SetActive(!isSettingsActivated);
        returnSettingsButton.gameObject.SetActive(isSettingsActivated);
    }

    public void OpenURL(string Url)
    {
        Application.OpenURL(Url);
    }

    public void Quit(string sceneName)
    {
        SceneManager.LoadScene(sceneName);
    }
}