using System;
using System.Collections;
using System.Collections.Generic;
using Unity.VisualScripting;
using UnityEditor;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Video;

public class ToolsManager : MonoBehaviour
{
    [Header("References")]
    [SerializeField] ObjectSelected objectSelected;
    private CameraSystem cameraSystem;

    private Image mesureImage;

    private GameObject background;
    private VideoPlayer videoPlayer;
    private GameObject videoScreen;
    private GameObject nextToVideoButton;
    private GameObject replayVideoButton;
    private GameObject returnVideoButton;
    private GameObject infos;
    //private Image infosImage;
    private GameObject returnInfos;
    private GameObject document;
    private Image documentImage;
    private GameObject returnDocument;
    [SerializeField] GameObject[] quiz;
    private Text[] quizQuestions1;
    private Button[] quizQuestions1Awnsers1;
    private Button[] quizQuestions1Awnsers2;
    private Button[] quizQuestions1Awnsers3;
    private GameObject returnQuiz;
    private Text objectName;

    [SerializeField] string[] objectsName;
    [SerializeField] Sprite[] objectsDimensionsImage;
    [SerializeField] GameObject[] objectsDocument;
    [SerializeField] GameObject[] objectsNotes;
    [SerializeField] VideoClip[] objectsVideo;

    private GameObject canva;
    private GameObject[] canvaButtons;

    [Header("Parameters")]
    [SerializeField] int objectNumber = 3;
    [SerializeField] int[] goodAwnserQuiz1;
    private bool[] isVideoWatched;
    private bool isVideoPlaying;
    private bool isInfosDisplaying;
    private bool isDocumentDisplaying;
    private bool isQuizDisplaying;




    // Start is called before the first frame update
    void Start()
    {
        GetUI();
        SetUI();
    }

    // Update is called once per frame
    void Update()
    {

        if (isVideoPlaying)
        {
            Debug.Log("Video started");
            if (videoPlayer.frame == ((int)videoPlayer.frameCount - 1))
            {
                Debug.Log("Video ended");
                isVideoPlaying = false;
                replayVideoButton.SetActive(!isVideoPlaying);
                //nextToVideoButton.SetActive(!isVideoPlaying);
                videoPlayer.Stop();
                videoPlayer.gameObject.SetActive(isVideoPlaying);
                isVideoWatched[objectSelected.objectIndex] = true;
            }
        }

    }


    private void GetUI()
    {
        cameraSystem = GameObject.FindFirstObjectByType<CameraSystem>();
        background = transform.Find("Image de fond").gameObject;
        videoPlayer = transform.Find("Video player").GetComponent<VideoPlayer>();
        videoScreen = transform.Find("Video screen").gameObject;
        nextToVideoButton = transform.Find("SUITE Video").gameObject;
        replayVideoButton = transform.Find("REJOUER Video").gameObject;
        returnVideoButton = transform.Find("Return - VIDEO").gameObject;
        infos = transform.Find("Infos").gameObject;
        //infosImage = infos.transform.GetChild(0).GetChild(0).GetChild(0).GetComponent<Image>();
        returnInfos = transform.Find("Return - INFOS").gameObject;
        document = transform.Find("Document").gameObject;
        documentImage = document.transform.GetChild(0).GetChild(0).GetChild(0).GetComponent<Image>();
        returnDocument = transform.Find("Return - DOCUMENT").gameObject;
        quizQuestions1 = new Text[goodAwnserQuiz1.Length];
        quizQuestions1[0] = quiz[0].transform.GetChild(0).GetChild(0).GetChild(0).Find("Question 1").GetChild(0).GetComponent<Text>();
        quizQuestions1[1] = quiz[0].transform.GetChild(0).GetChild(0).GetChild(0).Find("Question 2").GetChild(0).GetComponent<Text>();
        quizQuestions1[2] = quiz[0].transform.GetChild(0).GetChild(0).GetChild(0).Find("Question 3").GetChild(0).GetComponent<Text>();
        quizQuestions1Awnsers1 = new Button[3];
        quizQuestions1Awnsers1[0] = quizQuestions1[0].transform.parent.Find("Reponse 1.1").GetComponent<Button>();
        quizQuestions1Awnsers1[1] = quizQuestions1[0].transform.parent.Find("Reponse 1.2").GetComponent<Button>();
        quizQuestions1Awnsers1[2] = quizQuestions1[0].transform.parent.Find("Reponse 1.3").GetComponent<Button>();
        quizQuestions1Awnsers2 = new Button[3];
        quizQuestions1Awnsers2[0] = quizQuestions1[1].transform.parent.Find("Reponse 2.1").GetComponent<Button>();
        quizQuestions1Awnsers2[1] = quizQuestions1[1].transform.parent.Find("Reponse 2.2").GetComponent<Button>();
        quizQuestions1Awnsers2[2] = quizQuestions1[1].transform.parent.Find("Reponse 2.3").GetComponent<Button>();
        quizQuestions1Awnsers3 = new Button[3];
        quizQuestions1Awnsers3[0] = quizQuestions1[2].transform.parent.Find("Reponse 3.1").GetComponent<Button>();
        quizQuestions1Awnsers3[1] = quizQuestions1[2].transform.parent.Find("Reponse 3.2").GetComponent<Button>();
        quizQuestions1Awnsers3[2] = quizQuestions1[2].transform.parent.Find("Reponse 3.3").GetComponent<Button>();
        returnQuiz = transform.Find("Return - QUIZ").gameObject;

        canva = GameObject.Find("Canvas");
        canvaButtons = new GameObject[6];
        canvaButtons[0] = canva.transform.GetChild(0).Find("RESET").gameObject;
        canvaButtons[1] = canva.transform.GetChild(0).Find("RETURN").gameObject;
        //canvaButtons[2] = canva.transform.GetChild(0).Find("EYE").gameObject;
        canvaButtons[2] = canva.transform.GetChild(0).Find("VIDEO").gameObject;
        canvaButtons[3] = canva.transform.GetChild(0).Find("MESURE").gameObject;
        canvaButtons[4] = canva.transform.GetChild(0).Find("QUIZ").gameObject;
        //canvaButtons[6] = canva.transform.GetChild(0).Find("INFOS").gameObject;
        canvaButtons[5] = canva.transform.GetChild(0).Find("DOCUMENT").gameObject;
        objectName = canva.transform.GetChild(0).Find("Object name").GetComponent<Text>();
        mesureImage = canva.transform.GetChild(0).Find("MeasureObject").GetComponent<Image>();

        isVideoWatched = new bool[objectNumber];
    }

    private void SetUI()
    {
        nextToVideoButton.SetActive(false);
        //infosImage.sprite = objectsNotes[objectSelected.objectIndex].GetComponent<SpriteRenderer>().sprite;
        if (objectsDocument[objectSelected.objectIndex] != null)
        {
            documentImage.sprite = objectsDocument[objectSelected.objectIndex].GetComponent<SpriteRenderer>().sprite;
        }

        mesureImage.gameObject.SetActive(false);
        if (objectsDimensionsImage[objectSelected.objectIndex] != null)
        {
            mesureImage.sprite = objectsDimensionsImage[objectSelected.objectIndex];
        }
        objectName.gameObject.SetActive(true);
        objectName.text = objectsName[objectSelected.objectIndex];

        document.SetActive(false);

        for (int i = 0; i < quiz.Length; i++)
        {
            if (quiz[i] != null)
            {
                quiz[i].SetActive(false);
            }
        }

        for (int i = 0; i < isVideoWatched.Length; i++)
        {
            isVideoWatched[i] = false;
        }
        isVideoPlaying = true;
        isInfosDisplaying = true;
        isDocumentDisplaying = true;
        isQuizDisplaying = true;

        DisplayVideo();
        DisplayInfos();
        DisplayDocument();
        DisplayQuiz();

        returnQuiz.SetActive(false);
        returnDocument.SetActive(false);
    }


    public void DisplayVideo()
    {
        cameraSystem.enabled = isVideoPlaying;

        background.SetActive(!isVideoPlaying);
        replayVideoButton.SetActive(!isVideoPlaying);
        returnVideoButton.SetActive(!isVideoPlaying);
        videoScreen.SetActive(!isVideoPlaying);
        videoPlayer.gameObject.SetActive(!isVideoPlaying);
        videoPlayer.clip = objectsVideo[objectSelected.objectIndex];
        if (!isVideoPlaying)
        {
            videoPlayer.Play();
        }
        else
        {
            videoPlayer.Stop();
        }

        isVideoPlaying = !isVideoPlaying;
    }

    public void ReplayVideo()
    {
        videoPlayer.Stop();
        isVideoPlaying = false;
        DisplayVideo();
    }


    public void DisplayInfos()
    {
        for (int i = 0; i < canvaButtons.Length; i++)
        {
            canvaButtons[i].SetActive(isInfosDisplaying);
        }

        infos.SetActive(!isInfosDisplaying);
        returnInfos.SetActive(!isInfosDisplaying);

        isInfosDisplaying = !isInfosDisplaying;
    }


    public void DisplayDocument()
    {
        if (objectsDocument[objectSelected.objectIndex] != null)
        {
            for (int i = 0; i < canvaButtons.Length; i++)
            {
                canvaButtons[i].SetActive(isDocumentDisplaying);
            }

            document.SetActive(!isDocumentDisplaying);
            returnDocument.SetActive(!isDocumentDisplaying);

            isDocumentDisplaying = !isDocumentDisplaying;
        }
    }


    public void DisplayQuiz()
    {
        if (quiz[objectSelected.objectIndex] != null)
        {
            for (int i = 0; i < canvaButtons.Length; i++)
            {
                canvaButtons[i].SetActive(isQuizDisplaying);
            }
            cameraSystem.enabled = isQuizDisplaying;

            quiz[objectSelected.objectIndex].SetActive(!isQuizDisplaying);
            returnQuiz.SetActive(!isQuizDisplaying);
            isQuizDisplaying = !isQuizDisplaying;
        }
    }

    public void DisplayAwnser(GameObject name)
    {
        string question = name.name.Replace("Reponse ", "").Remove(1, 2);
        string awnser = name.name.Replace("Reponse ", "").Remove(0, 2);
        string quizName = name.transform.parent.parent.parent.parent.parent.name.Replace("Quiz ", "");

        int questionIndex = Convert.ToInt32(question);
        int awnserIndex = Convert.ToInt32(awnser);
        int quizIndex = Convert.ToInt32(quizName);

        if (VerifyAwnser(questionIndex, awnserIndex))
        {
            switch (quizIndex)
            {
                case 1:
                    quizQuestions1[questionIndex - 1].color = Color.green;
                    break;
                case 2:
                    break;
                case 3:
                    break;
            }
        }
        else
        {
            switch (quizIndex)
            {
                case 1:
                    quizQuestions1[questionIndex - 1].color = Color.red;
                    break;
                case 2:
                    break;
                case 3:
                    break;
            }
        }

        Debug.Log(questionIndex);
        switch (questionIndex)
        {
            case 1:
                for (int i = 0; i < quizQuestions1Awnsers1.Length; i++)
                {
                    quizQuestions1Awnsers1[i].GetComponent<Image>().color = new Color(255, 0, 0, 100);
                    quizQuestions1Awnsers1[i].interactable = false;
                }
                quizQuestions1Awnsers1[goodAwnserQuiz1[questionIndex - 1] - 1].GetComponent<Image>().color = new Color(0, 255, 0, 100);
                break;
            case 2:
                for (int i = 0; i < quizQuestions1Awnsers2.Length; i++)
                {
                    quizQuestions1Awnsers2[i].GetComponent<Image>().color = new Color(255, 0, 0, 100);
                    quizQuestions1Awnsers2[i].interactable = false;
                }
                quizQuestions1Awnsers2[goodAwnserQuiz1[questionIndex - 1] - 1].GetComponent<Image>().color = new Color(0, 255, 0, 100);
                break;
            case 3:
                for (int i = 0; i < quizQuestions1Awnsers3.Length; i++)
                {
                    quizQuestions1Awnsers3[i].GetComponent<Image>().color = new Color(255, 0, 0, 100);
                    quizQuestions1Awnsers3[i].interactable = false;
                }
                quizQuestions1Awnsers3[goodAwnserQuiz1[questionIndex - 1] - 1].GetComponent<Image>().color = new Color(0, 255, 0, 100);
                break;
        }
    }

    private bool VerifyAwnser(int questionIndex, int awnserIndex)
    {
        if (awnserIndex == goodAwnserQuiz1[questionIndex - 1])
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}
