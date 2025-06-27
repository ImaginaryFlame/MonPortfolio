using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;
using UnityEngine.Video;

public class SelectionMenu : MonoBehaviour
{
    [Header("References")]
    [SerializeField] ObjectSelected objectSelected;

    private GameObject chapterTitle;
    private GameObject chapterSelection;
    private GameObject returnChapterButton;
    private GameObject videoScreen;
    private VideoPlayer videoPlayer;
    private GameObject restartVideoButton;
    private GameObject nextVideoButton;
    private GameObject returnVideoButton;
    private GameObject nextDescriptionButton;
    private GameObject photosPanel;
    private Text descriptionText;
    private GameObject objectTitle;
    private GameObject[] objectSelections;
    private GameObject missionButton;
    private GameObject mission;
    private Text missionText;
    private GameObject proposition;
    private GameObject propositionButton;
    private Text propositionText;
    private GameObject nextObjectsButton;
    private GameObject returnObjectsButton;
    private GameObject startMenu;

    [Header("Parameters")]
    [SerializeField] int chaptersCount = 5;
    [SerializeField] string[] descriptions;
    [SerializeField] string[] sceneNames;
    private string sceneName;
    [SerializeField] string[] missions;
    [SerializeField] string[] propositions;
    [SerializeField] string defaultObjectTitle;
    [SerializeField] string missionTitle;
    [SerializeField] string propositionTitle;
    private bool isChapterSelected;
    private bool isVideoPlaying;
    //private int chapterIndex;
    //private bool[] isVideosWached;


    // Start is called before the first frame update
    void Start()
    {
        GetUI();
        SetUI();
    }

    void Update()
    {
        if (isVideoPlaying)
        {
            Debug.Log("Video started");
            if (videoPlayer.frame == ((int)videoPlayer.frameCount - 1))
            {
                Debug.Log("Video ended");
                isVideoPlaying = false;
                restartVideoButton.SetActive(!isVideoPlaying);
                nextVideoButton.SetActive(!isVideoPlaying);
                videoPlayer.Stop();
                videoPlayer.gameObject.SetActive(isVideoPlaying);
                objectSelected.isVideosWached[objectSelected.chapterIndex] = true;
            }
        }
    }


    private void GetUI()
    {
        chapterTitle = transform.Find("Chapitre").gameObject;
        chapterSelection = transform.Find("Selection du chapitre").gameObject;
        returnChapterButton = transform.Find("Return - CHAPITRES").gameObject;
        objectTitle = transform.Find("Objet").gameObject;
        objectSelections = new GameObject[chaptersCount];
        for (int i = 0; i < chaptersCount; i++)
        {
            objectSelections[i] = transform.Find("Selection de l'objet " + (i + 1)).gameObject;
        }
        missionButton = transform.Find("VOTRE MISSION").gameObject;
        mission = transform.Find("Mission").gameObject;
        missionText = mission.transform.GetChild(0).GetChild(0).Find("Text").GetComponent<Text>();
        propositionButton = transform.Find("PROPOSITION POUR ENSEIGNANT").gameObject;
        proposition = transform.Find("Proposition").gameObject;
        propositionText = proposition.transform.GetChild(0).GetChild(0).Find("Text").GetComponent<Text>();
        nextObjectsButton = transform.Find("SUITE Objets").gameObject;
        returnObjectsButton = transform.Find("Return - OBJETS").gameObject;
        videoScreen = transform.Find("Video screen").gameObject;
        videoPlayer = transform.Find("Video player").GetComponent<VideoPlayer>();
        restartVideoButton = transform.Find("REJOUER Video").gameObject;
        nextVideoButton = transform.Find("SUITE Video").gameObject;
        returnVideoButton = transform.Find("Return - VIDEO").gameObject;
        photosPanel = transform.Find("Photos").gameObject;
        nextDescriptionButton = transform.Find("SUITE Description").gameObject;
        descriptionText = transform.Find("Description Chapitre").GetComponent<Text>();
        startMenu = GameObject.FindAnyObjectByType<StartMenu>().gameObject;
    }

    private void SetUI()
    {
        isChapterSelected = true;
        isVideoPlaying = false;

        ReturnToChapters();
        if (objectSelected.isGameLaunched)
        {
            NextToDescription();
        }
    }


    public void LaunchVideo(int index)
    {
        objectSelected.chapterIndex = index - 1;
        chapterTitle.SetActive(isVideoPlaying);
        chapterSelection.SetActive(isVideoPlaying);
        returnChapterButton.SetActive(isVideoPlaying);
        restartVideoButton.SetActive(isVideoPlaying);
        nextVideoButton.SetActive(objectSelected.isVideosWached[objectSelected.chapterIndex]);
        returnVideoButton.SetActive(!isVideoPlaying);
        videoScreen.SetActive(!isVideoPlaying);
        videoPlayer.gameObject.SetActive(!isVideoPlaying);
        videoPlayer.Play();
        descriptionText.text = descriptions[objectSelected.chapterIndex];
        missionText.text = missions[objectSelected.chapterIndex].ToString();
        propositionText.text = propositions[objectSelected.chapterIndex].ToString();
        isVideoPlaying = !isVideoPlaying;
    }

    public void RestartVideo()
    {
        LaunchVideo(objectSelected.chapterIndex + 1);
    }
    public void NextToVideo()
    {
        isVideoPlaying = false;
        descriptionText.gameObject.SetActive(!isVideoPlaying);
        videoPlayer.Stop();
        videoPlayer.gameObject.SetActive(isVideoPlaying);
        videoScreen.SetActive(isVideoPlaying);
        restartVideoButton.SetActive(isVideoPlaying);
        nextVideoButton.SetActive(isVideoPlaying);
        returnVideoButton.SetActive(isVideoPlaying);
        photosPanel.SetActive(!isVideoPlaying);
        nextDescriptionButton.SetActive(!isVideoPlaying);
    }

    public void NextToDescription()
    {
        SelectObject(objectSelected.chapterIndex);
    }

    public void ReturnToChapters()
    {
        isChapterSelected = false;
        isVideoPlaying = false;
        chapterTitle.SetActive(!isChapterSelected);
        chapterSelection.SetActive(!isChapterSelected);
        returnChapterButton.SetActive(!isChapterSelected);
        objectTitle.SetActive(isChapterSelected);
        objectTitle.GetComponent<Text>().text = defaultObjectTitle;
        for (int i = 0; i < objectSelections.Length; i++)
        {
            objectSelections[i].SetActive(isChapterSelected);
        }
        missionButton.SetActive(isChapterSelected);
        mission.SetActive(isChapterSelected);
        propositionButton.SetActive(isChapterSelected);
        proposition.SetActive(isChapterSelected);
        nextObjectsButton.SetActive(isChapterSelected);
        returnObjectsButton.SetActive(isChapterSelected);
        videoScreen.SetActive(isVideoPlaying);
        videoPlayer.gameObject.SetActive(isVideoPlaying);
        videoPlayer.Stop();
        restartVideoButton.SetActive(isVideoPlaying);
        nextVideoButton.SetActive(isVideoPlaying);
        returnVideoButton.SetActive(isVideoPlaying);
        descriptionText.gameObject.SetActive(isVideoPlaying);
        photosPanel.SetActive(false);
        nextDescriptionButton.SetActive(false);
    }

    public void SelectObject(int historicPeriod)
    {
        //isChapterSelected = !isChapterSelected;
        objectTitle.SetActive(true);
        for (int i = 0; i < objectSelections.Length; i++)
        {
            objectSelections[historicPeriod].SetActive(true);
        }
        missionButton.SetActive(true);
        //propositionButton.SetActive(true);
        nextObjectsButton.SetActive(true);
        returnObjectsButton.SetActive(true);
        chapterTitle.SetActive(false);
        chapterSelection.SetActive(false);
        returnChapterButton.SetActive(false);
        descriptionText.gameObject.SetActive(false);
        photosPanel.SetActive(false);
        nextDescriptionButton.SetActive(false);
    }

    public void DisplayMission()
    {
        if (proposition.activeInHierarchy)
        {
            proposition.SetActive(false);
        }
        if (mission.activeInHierarchy)
        {
            objectTitle.GetComponent<Text>().text = defaultObjectTitle;
            objectSelections[objectSelected.chapterIndex].SetActive(true);
            mission.SetActive(false);
        }
        else
        {
            objectTitle.GetComponent<Text>().text = missionTitle;
            objectSelections[objectSelected.chapterIndex].SetActive(false);
            mission.SetActive(true);
        }
    }

    public void DisplayPropositions()
    {
        if (mission.activeInHierarchy)
        {
            mission.SetActive(false);
        }
        if (proposition.activeInHierarchy)
        {
            objectTitle.GetComponent<Text>().text = defaultObjectTitle;
            objectSelections[objectSelected.chapterIndex].SetActive(true);
            proposition.SetActive(false);
        }
        else
        {
            objectTitle.GetComponent<Text>().text = propositionTitle;
            objectSelections[objectSelected.chapterIndex].SetActive(false);
            proposition.SetActive(true);
        }
    }

    public void ChooseObject(int sceneIndex)
    {
        sceneName = sceneNames[sceneIndex - 1];
        Debug.Log(sceneName);
        objectSelected.objectIndex = sceneIndex - 1;
    }

    public void LaunchObjectScene()
    {
        objectSelected.isGameLaunched = true;
        SceneManager.LoadScene(sceneName);
    }


    public void ReturnToStartMenu()
    {
        startMenu.SetActive(true);
        this.gameObject.SetActive(false);
    }
}
